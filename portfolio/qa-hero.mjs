import { chromium } from "file:///C:/Users/seema/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs";

const browser = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});

const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.goto("http://127.0.0.1:4173", { waitUntil: "networkidle" });
await page.screenshot({ path: "hero-desktop.png", fullPage: false });

const initialTitle = await page.locator("h1[aria-hidden='false']").innerText();
await page.locator(".hero__switch-control").click({ force: true });
await page.waitForTimeout(1100);
const switchTitle = await page.locator("h1[aria-hidden='false']").innerText();
await page.locator(".hero__progress-item").nth(1).click();
await page.waitForTimeout(1100);
const changedTitle = await page.locator("h1[aria-hidden='false']").innerText();
await page.screenshot({ path: "hero-desktop-state-2.png", fullPage: false });

await page.setViewportSize({ width: 390, height: 844 });
await page.reload({ waitUntil: "networkidle" });
await page.screenshot({ path: "hero-mobile.png", fullPage: false });

const metrics = await page.evaluate(() => ({
  scrollWidth: document.documentElement.scrollWidth,
  clientWidth: document.documentElement.clientWidth,
  heroHeight: document.querySelector(".hero")?.getBoundingClientRect().height,
}));

console.log(JSON.stringify({ initialTitle, switchTitle, changedTitle, metrics }, null, 2));
await browser.close();
