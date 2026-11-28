import { useEffect, useState } from "react";
import "./SitePreloader.css";

const MINIMUM_DISPLAY_MS = 1500;
const MAXIMUM_DISPLAY_MS = 4500;

export default function SitePreloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("portfolio-preloader-seen") === "1") {
        setVisible(false);
        return;
      }
    } catch {
      // If storage is unavailable, show the loader for this page load.
    }

    let finished = false;
    let loaded = document.readyState === "complete";
    const startedAt = Date.now();

    const finish = () => {
      if (finished || !loaded) return;
      const remaining = Math.max(0, MINIMUM_DISPLAY_MS - (Date.now() - startedAt));
      window.setTimeout(() => {
        if (finished) return;
        finished = true;
        setVisible(false);
        try {
          sessionStorage.setItem("portfolio-preloader-seen", "1");
        } catch {
          // The loader still works when session storage is unavailable.
        }
      }, remaining);
    };

    const onLoad = () => {
      loaded = true;
      finish();
    };

    if (loaded) finish();
    else window.addEventListener("load", onLoad, { once: true });

    const safetyTimer = window.setTimeout(() => {
      if (finished) return;
      finished = true;
      setVisible(false);
      try {
        sessionStorage.setItem("portfolio-preloader-seen", "1");
      } catch {
        // Ignore unavailable storage.
      }
    }, MAXIMUM_DISPLAY_MS);

    return () => {
      window.removeEventListener("load", onLoad);
      window.clearTimeout(safetyTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="site-preloader" role="status" aria-label="Loading portfolio">
      <div className="site-preloader__visual" aria-hidden="true">
        <svg className="site-preloader__ring" viewBox="0 0 120 120">
          <defs>
            <linearGradient id="preloader-ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8a7fc7" />
              <stop offset="52%" stopColor="#5db8a6" />
              <stop offset="100%" stopColor="#cc785c" />
            </linearGradient>
            <filter id="preloader-ring-glow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <circle className="site-preloader__ring-base" cx="60" cy="60" r="39" />
          <circle className="site-preloader__ring-orbit" cx="60" cy="60" r="39" />
          <circle className="site-preloader__ring-core" cx="60" cy="60" r="39" />
        </svg>
        <span className="site-preloader__orb" />
        <span className="site-preloader__reflection" />
      </div>
      <span className="site-preloader__wordmark">YASH MALIK</span>
    </div>
  );
}
