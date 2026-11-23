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
    if (¶»§q«^