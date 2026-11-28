import { useEffect } from "react";

const PLAUSIBLE_SCRIPT_ID = "plausible-analytics";

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, string> }) => void;
  }
}

export default function SiteAnalytics() {
  useEffect(() => {
    const domain = import.meta.env.VITE_PLAUSIBLE_DOMAIN?.trim();
    if (!domain || !/^[a-z0-9.-]+$/i.test(domain)) return;

    if (!document.getElementById(PLAUSIBLE_SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = PLAUSIBLE_SCRIPT_ID;
      script.defer = true;
      script.src = "https://plausible.io/js/script.js";
      script.dataset.domain = domain;
      document.head.appendChild(script);
    }

    const trackInteraction = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      let eventName: string | undefined;
      const label = link.textContent?.trim().replace(/\\s+/g, " ").slice(0, 80) ?? "";
      if (href.startsWith("mailto:")) eventName = "Contact email click";
      else if (href === "/contact") eventName = "Contact CTA click";
      else if (href.startsWith("/work/")) eventName = "Project detail click";
      else if (href.startsWith("https://github.com/")) eventName = "GitHub click";
      else if (href.startsWith("/blog/")) eventName = "Blog article click";
      if (eventName) window.plausible?.(eventName, { props: { label, destination: href } });
    };

    const trackContactSuccess = () => window.plausible?.("Contact form submitted");
    document.addEventListener("click", trackInteraction);
    document.addEventListener("portfolio:contact-success", trackContactSuccess);
    return () => {
      document.removeEventListener("click", trackInteraction);
      document.removeEventListener("portfolio:contact-success", trackContactSuccess);
    };
  }, []);

  return null;
}
