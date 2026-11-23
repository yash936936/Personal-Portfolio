import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { technicalNotes } from "../data/editorial";

const SITE_URL = "https://personal-portfolio-yashmalik.vercel.app";
const SOCIAL_IMAGE = SITE_URL + "/og-image.svg";

interface PageMeta {
  title: string;
  description: string;
}

const PAGE_META: Record<string, PageMeta> = {
  "/": {
    title: "Yash Malik | AI Systems Engineer",
    description: "AI systems engineering, agentic workflows, applied machine learning and full-stack software architecture by Yash Malik.",
  },
  "/work": {
    title: "Selected Work | Yash Malik",
    description: "Project case studies covering agentic developer tooling, legal RAG, local research systems, document intelligence and LoRA fine-tuning.",
  },
  "/research": {
    title: "Research Interests | Yash Malik",
    description: "Research themes in reliable agentic systems, retrieval evaluation, evidence verification and efficient model adaptation.",
  },
  "/writing": {
    title: "Technical Writing | Yash Malik",
    description: "Technical notes on agentic systems, retrieval-augmented generation, evaluation and local AI research tools.",
  },
  "/about": {
    title: "About | Yash Malik",
    description: "Background, engineering interests and technical skills across AI, machine learning, agentic systems and web development.",
  },
  "/contact": {
    title: "Contact | Yash Malik",
    description: "Contact Yash Malik about AI systems, research collaboration, software engineering and technical projects.",
  },
  "/services/ai": {
    title: "AI & Agentic Systems | Yash Malik",
    description: "Applied AI, model adaptation, LLM applications and agentic workflow engineering.",
  },
  "/services/web": {
    title: "Full-Stack Development | Yash Malik",
    description: "Full-stack application development connecting AI capabilities, APIs, data and user experiences.",
  },
  "/services/infrastructure": {
    title: "Deployment & Infrastructure | Yash Malik",
    description: "Application deployment, cloud integration, backend services and infrastructure engineering.",
  },
  "/mentions-legales": {
    title: "Legal Notice | Yash Malik",
    description: "Legal notice and site information for the portfolio of Yash Malik.",
  },
};

function upsertMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(
    'meta[' + attribute + '="' + key + '"]',
  );

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.content = content;
}

function setCanonical(url: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.appendChild(element);
  }
  element.href = url;
}

function resolvePageMeta(pathname: string): PageMeta {
  if (pathname.startsWith("/writing/")) {
    const slug = pathname.split("/").filter(Boolean)[1];
    const article = technicalNotes.find((note) => note.slug === slug);
    if (article) {
      return {
        title: article.title + " | Writing by Yash Malik",
        description: article.excerpt,
      };
    }
  }

  return PAGE_META[pathname] ?? {
    title: "Yash Malik | AI Systems Engineer",
    description: "AI systems engineering, applied research and software development by Yash Malik.",
  };
}

export default function RouteMetadata() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = resolvePageMeta(pathname);
    const canonical = new URL(pathname, SITE_URL).toString();

    document.title = meta.title;
    upsertMeta("name", "description", meta.description);
    upsertMeta("name", "robots", "index, follow");
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", "Yash Malik");
    upsertMeta("property", "og:title", meta.title);
    upsertMeta("property", "og:description", meta.description);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:image", SOCIAL_IMAGE);
    upsertMeta("property", "og:image:alt", "Yash Malik — AI systems engineering, research and software architecture");
    upsertMeta("property", "og:image:type", "image/svg+xml");
    upsertMeta("property", "og:image:width", "1200");
    upsertMeta("property", "og:image:height", "630");
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", meta.title);
    upsertMeta("name", "twitter:description", meta.description);
    upsertMeta("name", "twitter:image", SOCIAL_IMAGE);
    setCanonical(canonical);
  }, [pathname]);

  return null;
}
