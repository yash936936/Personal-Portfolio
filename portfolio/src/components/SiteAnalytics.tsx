import { useEffect } from "react";

const PLAUSIBLE_SCRIPT_ID = "plausible-analytics";

export default function SiteAnalytics() {
  useEffect(() => {
    const domain = import.meta.env.VITE_PLAUSIBLE_DOMAIN?.trim();
    if (!domain || !/^[a-z0-9.-]+$/i.test(domain)) return;

    if (document.getElementById(PLAUSIBLE_SCRIPT_ID)) return;

    const script = document.createElement("script");
    script.id = PLAUSIBLE_SCRIPT_ID;
    script.defer = true;
    script.src = "https://plausible.io/js/script.js";
    script.dataset.domain = domain;
    document.head.appendChild(script);
  }, []);

  return null;
}
