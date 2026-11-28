import { useEffect } from "react";

export default function Analytics() {
  const token = import.meta.env.VITE_CF_WEB_ANALYTICS_TOKEN;

  useEffect(() => {
    if (!token || document.querySelector('script[data-portfolio-analytics="cloudflare"]')) return;

    const script = document.createElement("script");
    script.defer = true;
    script.src = "https://static.cloudflareinsights.com/beacon.min.js";
    script.dataset.portfolioAnalytics = "cloudflare";
    script.dataset.cfBeacon = JSON.stringify({ token, spa: true });
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [token]);

  return null;
}
