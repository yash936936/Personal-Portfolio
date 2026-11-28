import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });

try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });

  await page.goto("http://127.0.0.1:4173", { waitUntil: "domcontentloaded" });
  await page.screenshot({ path: "qa-hero-desktop.png", fullPage: false });

  const initialTitle = await page.locator("h1[aria-hidden='false']").first().innerText();

  // The hero changes state from scroll direction; its visual switch is not a button.
  await page.mouse.wheel(0, 360);
  await page.waitForTimeout(1400);
  const scrolledTitle = await page.locator("h1[aria-hidden='false']").first().innerText();
  await page.screenshot({ path: "qa-hero-desktop-scrolled.png", fullPage: false });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.screenshot({ path: "qa-hero-mobile.png", fullPage: false });

  const metrics = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    heroHeight: document.querySelector(".hero")?.getBoundingClientRect().height,
  }));

  const report = { initialTitle, scrolledTitle, metrics };
  console.log(JSON.stringify(report, null, 2));

  if (metrics.scrollWidth > metrics.clientWidth) {
    throw new Error("Horizontal overflow detected at the mobile viewport.");
  }
} finally {
  await browser.close();
}
