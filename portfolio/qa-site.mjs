import { chromium } from "playwright";

const baseUrl = process.env.PORTFOLIO_URL ?? "http://127.0.0.1:4173";
const routes = [
  "/", "/work", "/services", "/services/ai", "/services/web",
  "/services/infrastructure", "/about", "/contact", "/mentions-legales",
];
const routeSet = new Set(routes);
const widths = [320, 360, 390, 768, 1024, 1440];
const browser = await chromium.launch({ headless: true });
const failures = [];
const titles = new Set();

try {
  const page = await browser.newPage();

  for (const path of routes) {
    for (const width of widths) {
      await page.setViewportSize({ width, height: 900 });
      const response = await page.goto(new URL(path, baseUrl).toString(), {
        waitUntil: "networkidle",
      });

      if (!response?.ok()) failures.push(`${path} returned HTTP ${response?.status() ?? "no response"}`);

      const result = await page.evaluate(() => ({
        title: document.title,
        width: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        missingAlt: document.querySelectorAll("img:not([alt])").length,
        hasH1: Boolean(document.querySelector("h1")),
        invalidInternalLinks: [...document.querySelectorAll<HTMLAnchorElement>('a[href^="/"]')]
          .map((link) => link.getAttribute("href")?.split(/[?#]/)[0] ?? "/")
          .filter((href) => href && ![
            "/", "/work", "/services", "/services/ai", "/services/web",
            "/services/infrastructure", "/about", "/contact", "/mentions-legales",
          ].includes(href)),
      }));

      if (result.scrollWidth > result.width) failures.push(`${path} overflows at ${width}px (${result.scrollWidth}px)`);
      if (result.missingAlt > 0) failures.push(`${path} has ${result.missingAlt} images without alt attributes`);
      if (!result.hasH1 && path !== "/mentions-legales") failures.push(`${path} has no H1`);
      if (result.invalidInternalLinks.length) failures.push(`${path} has invalid internal links: ${result.invalidInternalLinks.join(", ")}`);

      if (width === 1440) {
        if (titles.has(result.title)) failures.push(`Duplicate page title: ${result.title}`);
        titles.add(result.title);
      }
    }
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(new URL("/", baseUrl).toString(), { waitUntil: "networkidle" });
  const menu = page.locator(".nav__trigger");
  await menu.click();
  if (!(await page.locator("#nav-overlay").evaluate((element) => element.classList.contains("nav-overlay--open")))) {
    failures.push("Mobile navigation did not open");
  }
  await page.keyboard.press("Escape");
  if (await page.locator("#nav-overlay").evaluate((element) => element.classList.contains("nav-overlay--open"))) {
    failures.push("Mobile navigation did not close on Escape");
  }

  if (failures.length) {
    console.error("Portfolio QA failed:\n- " + failures.join("\n- "));
    process.exitCode = 1;
  } else {
    console.log(`Portfolio QA passed: ${routes.length} routes, ${widths.length} viewport widths, unique titles, internal links, image alt attributes, and mobile menu.`);
  }
} finally {
  await browser.close();
}
