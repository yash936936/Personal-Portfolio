import { useEffect, useState } from "react";
import "./SitePreloader.css";

const MINIMUM_DISPLAY_MS = 4000;
const MAXIMUM_DISPLAY_MS = 5000;

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
      <div className="exscem-loader" aria-hidden="true">
        <span className="exscem-loader__shape" />
        <span className="exscem-loader__shape exscem-loader__shape--delayed" />
      </div>
    </div>
  );
}
