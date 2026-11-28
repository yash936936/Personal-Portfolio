import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

for (const envFile of [".env", ".env.local"]) {
  try {
    process.loadEnvFile(envFile);
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }
}

const siteUrl = process.env.VITE_SITE_URL ? new URL(process.env.VITE_SITE_URL).origin : null;
const pages = {
  "/": {
    title: "Yash Malik | AI & Full-Stack Engineer",
    description: "Yash Malik builds AI systems, agentic workflows, and full-stack products, from model architecture to production interfaces.",
  },
  "/work": {
    title: "Selected Work | Yash Malik",
    description: "Explore AI engineering, research tooling, machine learning, and full-stack projects built by Yash Malik.",
  },
  "/services": {
    title: "Engineering Capabilities | Yash Malik",
    description: "AI and agentic systems, full-stack product development, and cloud deployment capabilities.",
  },
  "/services/ai": {
    title: "AI & Agentic Systems | Yash Malik",
    description: "Model training, fine-tuning, retrieval, and agentic workflow engineering by Yash Malik.",
  },
  "/services/web": {
    title: "Full-Stack Development | Yash Malik",
    description: "Responsive web applications, API architecture, and full-stack product engineering.",
  },
  "/services/infrastructure": {
    title: "Deployment & Infrastructure | Yash Malik",
    description: "Cloud deployment, infrastructure setup, and production-ready application delivery.",
  },
  "/about": {
    title: "About Yash Malik | AI Engineering & Research",
    description: "Learn about Yash Malik's engineering work, research interests, and technical focus across LLMs, NLP, and agentic AI.",
  },
  "/contact": {
    title: "Contact Yash Malik | Project Enquiries",
    description: "Get in touch with Yash Malik about AI engineering, agentic systems, and full-stack product development.",
  },
  "/mentions-legales": {
    title: "Legal Notice | Yash Malik",
    description: "Legal information and website notices for the Yash Malik portfolio.",
  },
};

const escapeAttribute = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");

function setMeta(html, selector, attribute, value) {
  const safeValue = escapeAttribute(value);
  const pattern = new RegExp(`<meta ${selector}="[^"]*" content="[^"]*"\\s*\\/?>`);
  const tag = `<meta ${selector}="${attribute}" content="${safeValue}" />`;
  if (pattern.test(html)) return html.replace(pattern, tag);
  return html.replace("</head>", `    ${tag}\\n  </head>`);
}

const template = await readFile(resolve("dist/index.html"), "utf8");

for (const [route, meta] of Object.entries(pages)) {
  let html = template.replace(/<title>[^<]*<\\/title>/, `<title>${escapeAttribute(meta.title)}</title>`);
  html = setMeta(html, "name", "description", meta.description);
  html = setMeta(html, "property", "og:title", meta.title);
  html = setMeta(html, "property", "og:description", meta.description);
  html = setMeta(html, "name", "twitter:title", meta.title);
  html = setMeta(html, "name", "twitter:description", meta.description);

  if (siteUrl) {
    const canonical = `<link rel="canonical" href="${siteUrl}${route}" />`;
    html = html.replace("</head>", `    ${canonical}\\n  </head>`);
    html = setMeta(html, "property", "og:url", `${siteUrl}${route}`);
    html = setMeta(html, "property", "og:image", `${siteUrl}/poster-showcase.jpg`);
  }

  const outputPath = route === "/" ? resolve("dist/index.html") : resolve("dist", route.slice(1), "index.html");
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html, "utf8");
}

const notFound = template
  .replace(/<title>[^<]*<\\/title>/, "<title>Page Not Found | Yash Malik</title>")
  .replace(/<meta name="robots" content="[^"]*"\\s*\\/?>/, '<meta name="robots" content="noindex, nofollow" />')
  .replace(/<meta name="description" content="[^"]*"\\s*\\/?>/, '<meta name="description" content="The page you requested could not be found." />');
await writeFile(resolve("dist/404.html"), notFound, "utf8");

console.log(`Generated static metadata for ${Object.keys(pages).length} routes.`);
