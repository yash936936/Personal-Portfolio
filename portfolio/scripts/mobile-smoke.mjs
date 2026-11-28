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
const internalLinks = new Set();
const pageTitles = new Map();

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
        title: document.title.trim(),
        description: document.querySelector('meta[name="description"]')?.getAttribute("content")?.trim() ?? "",
        internalLinks: [...document.querySelectorAll('a[href^="/"]')].map((link) => link.getAttribute("href")).filter(Boolean),
        brokenAnchors: [...document.querySelectorAll('a[href="#"], a:not([href])')].length,
        imagesMissingAlt: [...document.querySelectorAll("img")].filter((image) => !image.hasAttribute("alt")).length,
        unnamedButtons: [...document.querySelectorAll("button")].filter((button) => !(button.innerText.trim() || button.getAttribute("aria-label") || button.getAttribute("title"))).length,
        overflowElements: [...document.querySelectorAll("body *")]
          .map((element) => {
            const rect = element.getBoundingClientRect();
            return {
              tag: element.tagName.toLowerCase(),
              className: typeof element.className === "string" ? element.className : "",
              text: (element.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 70),
              left: Math.round(rect.left),
              right: Math.round(rect.right),
              width: Math.round(rect.width),
            };
          })
          .filter((element) => element.right > window.innerWidth + 1 || element.left < -1)
          .sort((a, b) => b.right - a.right)
          .slice(0, 8),
      }));

      if (!response?.ok()) {
        failures.push(route + " at " + width + "px returned " + response?.status());
      }
      if (result.title) {
        const previousTitle = pageTitles.get(route);
        if (previousTitle && previousTitle !== result.title) failures.push(route + " produced inconsistent page titles across viewports");
        pageTitles.set(route, result.title);
      } else {
        failures.push(route + " at " + width + "px has no document title");
      }
      if (!result.description) failures.push(route + " at " + width + "px has no meta description");
      if (result.brokenAnchors) failures.push(route + " at " + width + "px contains " + result.brokenAnchors + " empty or placeholder anchors");
      if (result.imagesMissingAlt) failures.push(route + " at " + width + "px contains images without alt attributes");
      if (result.unnamedButtons) failures.push(route + " at " + width + "px contains " + result.unnamedButtons + " buttons without accessible names");
      for (const href of result.internalLinks) {
        try { internalLinks.add(new URL(href, baseUrl).pathname); } catch { failures.push(route + " contains an invalid internal link: " + href); }
      }
      if (Math.max(result.documentWidth, result.bodyWidth) > result.viewportWidth + 1) {
        failures.push(
          route + " at " + width + "px overflows horizontally (" +
          Math.max(result.documentWidth, result.bodyWidth) + "px / " +
          result.viewportWidth + "px viewport). Offenders: " +
          JSON.stringify(result.overflowElements),
        );
      }
      if (result.headingCount < 1) {
        failures.push(route + " at " + width + "px did not render a page heading");
      }
    }
  }

  const titles = [...pageTitles.entries()];
  const duplicateTitles = titles.filter(([route, title]) => titles.some(([otherRoute, otherTitle]) => otherRoute !== route && otherTitle === title));
  for (const [route, title] of duplicateTitles) failures.push(route + " shares a non-unique title: " + title);

  await page.setViewportSize({ width: 1440, height: 900 });
  for (const path of internalLinks) {
    const response = await page.goto(new URL(path, baseUrl).toString(), { waitUntil: "domcontentloaded" });
    await page.waitForFunction(() => document.querySelector("main h1") !== null, null, { timeout: 5_000 }).catch(() => undefined);
    const routeState = await page.evaluate(() => ({
      title: document.title,
      robots: document.querySelector('meta[name="robots"]')?.getAttribute("content"),
      heading: document.querySelector("main h1")?.textContent?.trim() ?? "",
    }));
    if (!response?.ok() || !routeState.heading || routeState.robots === "noindex, follow") {
      failures.push("internal link does not resolve to an indexable page: " + path);
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

  let mockedContactStatus = 200;
  const siteOrigin = new URL(baseUrl).origin;
  await page.route("**/*", (route) => {
    const request = route.request();
    if (request.method() === "POST" && new URL(request.url()).origin !== siteOrigin) {
      return route.fulfill({
        status: mockedContactStatus,
        contentType: "application/json",
        body: JSON.stringify(mockedContactStatus < 300 ? { success: true } : { error: "Test failure" }),
      });
    }
    return route.continue();
  });
  await page.goto(new URL("/contact", baseUrl).toString(), { waitUntil: "domcontentloaded" });
  if (await page.locator(".contact-form__captcha").count() === 0) {
    await page.locator('input[name="name"]').fill("Portfolio Test");
    await page.locator('input[name="email"]').fill("test@example.com");
    await page.locator('textarea[name="message"]').fill("Automated contact form success-state check.");
    await page.getByRole("button", { name: "Send Message" }).click();
    await page.locator(".contact-success").waitFor({ timeout: 5_000 }).catch(() => undefined);
    if (!(await page.locator(".contact-success").innerText().catch(() => "")).includes("Message sent.")) {
      failures.push("contact form did not display its success message");
    }

    mockedContactStatus = 502;
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.locator('input[name="name"]').fill("Portfolio Test");
    await page.locator('input[name="email"]').fill("test@example.com");
    await page.locator('textarea[name="message"]').fill("Automated contact form error-state check.");
    await page.getByRole("button", { name: "Send Message" }).click();
    await page.getByRole("alert").waitFor({ timeout: 5_000 }).catch(() => undefined);
    if (!(await page.getByRole("alert").innerText().catch(() => "")).includes("Something went wrong")) {
      failures.push("contact form did not display its error message");
    }
  }
  await page.unroute("**/*");

  await page.goto(new URL("/__portfolio_404_check__", baseUrl).toString(), {
    waitUntil: "domcontentloaded",
  });
  await page.waitForFunction(
    () => document.querySelector('meta[name="robots"]')?.getAttribute("content") === "noindex, follow",
    null,
    { timeout: 5_000 },
  ).catch(() => undefined);

  const notFoundTitle = await page.locator("main h1").first().innerText().catch(() => "");
  if (!notFoundTitle.toLowerCase().includes("crossed the event horizon")) {
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
