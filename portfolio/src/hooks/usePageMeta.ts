import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PAGE_META: Record<string, { title: string; description: string; noIndex?: boolean }> = {
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

const DEFAULT_META = {
  title: "Page Not Found | Yash Malik",
  description: "The page you requested could not be found.",
  noIndex: true,
};

function setMeta(selector: string, attribute: string, value: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    const [key, content] = attribute.split("=");
    element.setAttribute(key, content.replaceAll('"', ""));
    document.head.appendChild(element);
  }
  element.setAttribute("content", value);
}

export function usePageMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = PAGE_META[pathname] ?? DEFAULT_META;
    document.title = meta.title;
    setMeta('meta[name="description"]', 'name="description"', meta.description);
    setMeta('meta[property="og:title"]', 'property="og:title"', meta.title);
    setMeta('meta[property="og:description"]', 'property="og:description"', meta.description);
    setMeta('meta[name="twitter:title"]', 'name="twitter:title"', meta.title);
    setMeta('meta[name="twitter:description"]', 'name="twitter:description"', meta.description);
    setMeta('meta[name="robots"]', 'name="robots"', meta.noIndex ? "noindex, nofollow" : "index, follow");
    setMeta('meta[property="og:url"]', 'property="og:url"', window.location.origin + pathname);
    setMeta('meta[property="og:image"]', 'property="og:image"', window.location.origin + "/poster-showcase.jpg");
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.origin + pathname;

  }, [pathname]);
}
