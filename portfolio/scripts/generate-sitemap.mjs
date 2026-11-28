import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

for (const envFile of [".env", ".env.local"]) {
  try {
    process.loadEnvFile(envFile);
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }
}

const rawSiteUrl = process.env.VITE_SITE_URL;

if (!rawSiteUrl) {
  console.warn("VITE_SITE_URL is not set. Skipping absolute sitemap generation.");
  process.exit(0);
}

let siteUrl;
try {
  const parsed = new URL(rawSiteUrl);
  if (parsed.protocol !== "https:" && parsed.hostname !== "localhost") {
    throw new Error("VITE_SITE_URL must use HTTPS outside localhost.");
  }
  siteUrl = parsed.origin;
} catch (error) {
  console.error("Invalid VITE_SITE_URL:", error instanceof Error ? error.message : error);
  process.exit(1);
}

const routes = [
  "/",
  "/work",
  "/work/agm",
  "/work/sysdesign-ai",
  "/work/coding-harness",
  "/work/fathom",
  "/services",
  "/services/ai",
  "/services/web",
  "/services/infrastructure",
  "/about",
  "/contact",
  "/mentions-legales",
];

const urls = routes.map((route) => `  <url><loc>${siteUrl}${route}</loc></url>`).join("\n");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

await writeFile(resolve("public/sitemap.xml"), sitemap, "utf8");
await writeFile(
  resolve("public/robots.txt"),
  `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`,
  "utf8",
);
console.log(`Generated sitemap for ${siteUrl}`);
