import { createRequire } from "node:module";

const require = createRequire(process.env.PLAYWRIGHT_PACKAGE ?? import.meta.url);
const { chromium } = require("playwright");

const baseUrl = process.env.PORTFOLIO_URL ?? "http://127.0.0.1:4173";
const routes = [
  "/",
  "/work",
  "/blog",
  "/blog/designing-bounded-agent-workflows",
  "/blog/evaluating-rag-beyond-retrieval",
  "/blog/building-a-local-research-assistant",
  "/about",
  "/contact",
  "/services/ai",
  "/services/web",
  "/services/infrastructure",
  "/mentions-legales",
  "/__portfolio_404_check__",
];
const viewports = [320, 360, 390, 768, 1024, 1440];
const browser = await chromium.launch({ headless: true });
const failures = [];

try {
  const page = await browser.newPage();

  for (const width of viewports) {
    await page.setViewportSize({ width, height: 900 });

    for (const route of routes) {
      const response = await page.goto(new URL(route, baseUrl).toString(), {
        waitUntil: "domcontentloaded",
      });

      await page.waitForFunction(() => document.querySelector("main h1") !== null, null, {
        timeout: 5_000,
      }).catch(() => undefined);

      const result = await page.evaluate(() => ({
        viewportWidth: window.innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        bodyWidth: document.body.scrollWidth,
        headingCount: document.querySelectorAll("main h1").length,
      }));

      if (!response?.ok()) {
        failures.push(route + " at " + width + "px returned " + response?.status());
      }
      if (Math.max(result.documentWidth, result.bodyWidth) > result.viewportWidth + 1) {
        failures.push(
          route + " at " + width + "px overflows horizontally (" +
          Math.max(result.documentWidth, result.bodyWidth) + "px / " +
          result.viewportWidth + "px viewport)",
        );
      }
      if (result.headingCount < 1) {
        failures.push(route + " at " + width + "px did not render a page heading");
      }
    }
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(new URL("/", baseUrl).toString(), { waitUntil: "domcontentloaded" });

  const menuButton = page.locator('button[aria-controls="site-navigation-overlay"]');
  await menuButton.click();
  if (await menuButton.getAttribute("aria-expanded") !== "true") {
    failures.push("mobile navigation did not open");
  }

  await page.keyboard.press("Escape");
  if (await menuButton.getAttribute("aria-expanded") !== "false") {
    failures.push("mobile navigation did not close on Escape");
  }
  if (!(await menuButton.evaluate((button) => button === document.activeElement))) {
    failures.push("mobile navigation did not return focus to its trigger");
  }

  await page.goto(new URL("/__portfolio_404_check__", baseUrl).toString(), {
    waitUntil: "domcontentloaded",
  });
  await page.waitForFunction(
    () => document.querySelector('meta[name="robots"]')?.getAttribute("content") === "noindex, follow",
    null,
    { timeout: 5_000 },
  ).catch(() => undefined);

  const notFoundTitle = await page.locator("main h1").first().innerText().catch(() => "");
  if (!notFoundTitle.toLowerCase().includes("doesn't exist")) {
    failures.push("unknown route did not display the custom 404 page");
  }
  const robots = await page.locator('meta[name="robots"]').getAttribute("content");
  if (robots !== "noindex, follow") {
    failures.push("custom 404 page is missing noindex metadata");
  }

  if (failures.length > 0) {
    console.error("Browser checks failed:");
    for (const failure of failures) console.error(" - " + failure);
    process.exitCode = 1;
  } else {
    console.log(
      "Browser checks passed: " + routes.length + " routes across " +
      viewports.length + " viewports, plus mobile navigation and 404 checks.",
    );
  }
} finally {
  await browser.close();
}
