import { chromium } from "playwright";

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
      if (Math.max(result.documentWidth, result.bodyWidth) > result.viewportWi¶»§q«^