import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { blogPosts } from "../data/editorial";
import { projects } from "../data/content";

const SITE_URL = "https://personal-portfolio-yashmalik.vercel.app";
const SOCIAL_IMAGE = SITE_URL + "/og-image.svg";
interface PageMeta { title: string; description: string; }
const PAGE_META: Record<string, PageMeta> = {
  "/": { title: "Yash Malik | AI Systems Engineer", description: "AI systems engineering, agentic workflows, software development and applied machine learning." },
  "/work": { title: "Work and Architecture Notes | Yash Malik", description: "Technical case studies and architecture notes for AI and software builds." },
  "/blog": { title: "Blog | Yash Malik", description: "Technical articles, build breakdowns and research notes on AI systems and engineering." },
  "/about": { title: "About | Yash Malik", description: "AI engineering interests, research questions and recent work." },
  "/contact": { title: "Contact | Yash Malik", description: "Contact Yash Malik about AI engineering, research collaboration and technical discussions." },
  "/services/ai": { title: "AI Systems and Agentic Workflows | Yash Malik", description: "Applied AI, model adaptation, LLM applications and agentic workflow engineering." },
  "/services/web": { title: "Software Development and Testing | Yash Malik", description: "Software design, application development, automated testing and quality checks for dependable products." },
  "/services/infrastructure": { title: "Deployment and Infrastructure | Yash Malik", description: "Application deployment, cloud integration, backend services and infrastructure engineering." },
  "/mentions-legales": { title: "Legal Notice | Yash Malik", description: "Legal notice and site information for the portfolio of Yash Malik." },
};
function upsertMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>('meta[' + attribute + '="' + key + '"]');
  if (!element) { element = document.createElement("meta"); element.setAttribute(attribute, key); document.head.appendChild(element); }
  element.content = content;
}
function removeMeta(attribute: "name" | "property", key: string) {
  document.head.querySelector('meta[' + attribute + '="' + key + '"]')?.remove();
}
function setCanonical(url: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) { element = document.createElement("link"); element.rel = "canonical"; document.head.appendChild(element); }
  element.href = url;
}
function removeCanonical() { document.head.querySelector('link[rel="canonical"]')?.remove(); }
function getBlogPost(pathname: string) {
  if (!pathname.startsWith("/blog/")) return undefined;
  const slug = pathname.split("/").filter(Boolean)[1];
  return blogPosts.find((post) => post.slug === slug);
}
function getWorkItem(pathname: string) {
  if (!pathname.startsWith("/work/")) return undefined;
  const slug = pathname.split("/").filter(Boolean)[1];
  return projects.find((item) => item.slug === slug);
}
function resolvePageMeta(pathname: string): PageMeta {
  const article = getBlogPost(pathname);
  if (article) return { title: article.title + " | Blog by Yash Malik", description: article.excerpt };
  const workItem = getWorkItem(pathname);
  if (workItem) return { title: workItem.title + " | Architecture Notes", description: workItem.description };
  return PAGE_META[pathname] ?? { title: "Page not found | Yash Malik", description: "The requested page could not be found. Browse work, blog or about." };
}
function upsertStructuredData(pathname: string, meta: PageMeta) {
  const knownPath = Boolean(PAGE_META[pathname] || getBlogPost(pathname) || getWorkItem(pathname));
  const article = getBlogPost(pathname);
  const project = getWorkItem(pathname);
  const pageUrl = new URL(pathname, SITE_URL).toString();
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": SITE_URL + "/#person",
        name: "Yash Malik",
        url: SITE_URL + "/",
        jobTitle: "AI Systems Engineer",
        sameAs: ["https://github.com/yash936936", "https://www.linkedin.com/in/yashmalik-/"],
      },
      ...(knownPath ? [{
        "@type": "WebPage",
        "@id": pageUrl + "#webpage",
        url: pageUrl,
        name: meta.title,
        description: meta.description,
        isPartOf: { "@id": SITE_URL + "/#website" },
        about: { "@id": SITE_URL + "/#person" },
      }] : []),
      ...(article ? [{
        "@type": "Article",
        headline: article.title,
        description: article.excerpt,
        mainEntityOfPage: pageUrl,
        author: { "@id": SITE_URL + "/#person" },
        publisher: { "@id": SITE_URL + "/#person" },
      }] : []),
      ...(project ? [{
        "@type": "CreativeWork",
        name: project.title,
        description: project.description,
        url: pageUrl,
        creator: { "@id": SITE_URL + "/#person" },
      }] : []),
      ...(pathname === "/" ? [{
        "@type": "WebSite",
        "@id": SITE_URL + "/#website",
        url: SITE_URL + "/",
        name: "Yash Malik",
        publisher: { "@id": SITE_URL + "/#person" },
      }] : []),
    ],
  };
  let script = document.getElementById("portfolio-structured-data") as HTMLScriptElement | null;
  if (!script) { script = document.createElement("script"); script.id = "portfolio-structured-data"; script.type = "application/ld+json"; document.head.appendChild(script); }
  script.textContent = JSON.stringify(data);
}
export default function RouteMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const meta = resolvePageMeta(pathname);
    const knownPath = Boolean(PAGE_META[pathname] || getBlogPost(pathname) || getWorkItem(pathname));
    const canonical = new URL(pathname, SITE_URL).toString();
    document.title = meta.title;
    upsertMeta("name", "description", meta.description);
    upsertMeta("name", "robots", knownPath ? "index, follow" : "noindex, follow");
    upsertMeta("property", "og:type", getBlogPost(pathname) ? "article" : "website");
    upsertMeta("property", "og:site_name", "Yash Malik");
    upsertMeta("property", "og:title", meta.title);
    upsertMeta("property", "og:description", meta.description);
    upsertMeta("property", "og:image", SOCIAL_IMAGE);
    upsertMeta("property", "og:image:alt", "Yash Malik — AI systems engineering, research and software architecture");
    upsertMeta("property", "og:image:type", "image/svg+xml");
    upsertMeta("property", "og:image:width", "1200");
    upsertMeta("property", "og:image:height", "630");
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", meta.title);
    upsertMeta("name", "twitter:description", meta.description);
    upsertMeta("name", "twitter:image", SOCIAL_IMAGE);
    if (knownPath) { upsertMeta("property", "og:url", canonical); setCanonical(canonical); }
    else { removeMeta("property", "og:url"); removeCanonical(); }
    upsertStructuredData(pathname, meta);
  }, [pathname]);
  return null;
}
