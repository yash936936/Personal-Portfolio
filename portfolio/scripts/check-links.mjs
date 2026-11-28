import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const portfolioRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcRoot = path.join(portfolioRoot, "src");
const publicRoot = path.join(portfolioRoot, "public");

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectFiles(fullPath));
    } else if (/\.(tsx?|jsx?)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

const failures = [];
const appSource = await readFile(path.join(srcRoot, "App.tsx"), "utf8");
const editorialSource = await readFile(path.join(srcRoot, "data", "editorial.ts"), "utf8");
const sitemap = await readFile(path.join(publicRoot, "sitemap.xml"), "utf8");
const indexHtml = await readFile(path.join(portfolioRoot, "index.html"), "utf8");

const routes = [...appSource.matchAll(/<Route\s+path="([^"]+)"/g)].map((match) => match[1]);
const blogSlugs = new Set(
  [...editorialSource.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]),
);

function routeExists(target) {
  if (routes.includes(target)) return true;

  return routes.some((route) => {
    if (!route.includes(":")) return false;
    const prefix = route.slice(0, route.indexOf("/:"));
    if (!target.startsWith(prefix + "/")) return false;
    if (route === "/blog/:slug") return blogSlugs.has(target.slice("/blog/".length));
    return true;
  });
}

const sourceFiles = await collectFiles(srcRoot);
for (const file of sourceFiles) {
  const source = await readFile(file, "utf8");
  const relative = path.relative(portfolioRoot, file);

  for (const match of source.matchAll(/(?:to|href)\s*=\s*["'](\/[^"'#?\s]*)["']/g)) {
    const target = match[1];
    if (!routeExists(target)) {
      failures.push(relative + ": internal route does not exist: " + target);
    }
  }

  for (const match of source.matchAll(/<img\b[^>]*>/gs)) {
    if (!/\balt\s*=/.test(match[0])) {
      failures.push(relative + ": image is missing an alt attribute");
    }
  }

  for (const match of source.matchAll(/<a\b[^>]*target=["']_blank["'][^>]*>/gs)) {
    if (!/\brel=["'][^"']*(?:noopener|noreferrer)/.test(match[0])) {
      failures.push(relative + ": new-tab link is missing noopener/noreferrer");
    }
  }

  const sourceWithoutInputHints = source.replace(/\bplaceholder\s*=\s*(["']).*?\1/gs, "");
  if (/\bPLACEHOLDER\b|Lorem ipsum|TODO:|FIXME:|Coming soon|replace this text/i.test(sourceWithoutInputHints)) {
    failures.push(relative + ": unresolved placeholder or TODO text found");
  }

  if (source.includes('href={github ?? "#"}')) {
    failures.push(relative + ": empty project link falls back to #");
  }
}

for (const match of sitemap.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g)) {
  const url = new URL(match[1]);
  if (!routeExists(url.pathname)) {
    failures.push("sitemap.xml: URL is not registered in the router: " + url.pathname);
  }
}

for (const match of indexHtml.matchAll(/(?:href|src)=["'](\/(?:favicon|icons)[^"'?#]*)["']/g)) {
  const assetPath = path.join(publicRoot, match[1].slice(1));
  try {
    await readFile(assetPath);
  } catch {
    failures.push("index.html: referenced public asset does not exist: " + match[1]);
  }
}

if (failures.length > 0) {
  console.error("Portfolio link/content checks failed:");
  for (const failure of failures) console.error(" - " + failure);
  process.exitCode = 1;
} else {
  console.log(
    "Portfolio checks passed: " +
    sourceFiles.length + " source files, " +
    routes.length + " routes, " +
    blogSlugs.size + " blog slugs, and sitemap destinations checked.",
  );
}
