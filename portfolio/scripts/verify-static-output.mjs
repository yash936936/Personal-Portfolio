import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const pages = [
  ["/", "Yash Malik | AI & Full-Stack Engineer"],
  ["/work", "Selected Work | Yash Malik"],
  ["/services", "Engineering Capabilities | Yash Malik"],
  ["/services/ai", "AI & Agentic Systems | Yash Malik"],
  ["/services/web", "Full-Stack Development | Yash Malik"],
  ["/services/infrastructure", "Deployment & Infrastructure | Yash Malik"],
  ["/about", "About Yash Malik | AI Engineering & Research"],
  ["/contact", "Contact Yash Malik | Project Enquiries"],
  ["/mentions-legales", "Legal Notice | Yash Malik"],
];

const siteUrl = process.env.VITE_SITE_URL ? new URL(process.env.VITE_SITE_URL).origin : null;
const seenTitles = new Set();

for (const [route, expectedTitle] of pages) {
  const file = route === "/" ? "dist/index.html" : `dist/${route.slice(1)}/index.html`;
  const html = await readFile(resolve(file), "utf8");
  const encodedTitle = expectedTitle.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
  assert.ok(html.includes(`<title>${encodedTitle}</title>`), `Missing route title for ${route}`);
  assert.ok(html.includes('name="description"'), `Missing meta description for ${route}`);
  assert.ok(!seenTitles.has(expectedTitle), `Duplicate page title: ${expectedTitle}`);
  seenTitles.add(expectedTitle);

  if (siteUrl) {
    assert.ok(html.includes(`rel="canonical" href="${siteUrl}${route}"`), `Missing canonical for ${route}`);
  }
}

const notFound = await readFile(resolve("dist/404.html"), "utf8");
assert.ok(notFound.includes('name="robots" content="noindex, nofollow"'), "404 page must be noindex");

if (siteUrl) {
  const sitemap = await readFile(resolve("dist/sitemap.xml"), "utf8");
  for (const [route] of pages) {
    assert.ok(sitemap.includes(`<loc>${siteUrl}${route}</loc>`), `Sitemap is missing ${route}`);
  }
}

console.log(`Verified static SEO output for ${pages.length} routes.`);
