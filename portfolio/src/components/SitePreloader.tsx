import { useEffect, useState } from "react";
import "./SitePreloader.css";

const DISPLAY_DURATION_MS = 3000;

export default function SitePreloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(false);
    }, DISPLAY_DURATION_MS);

    return () => window.clearTimeout(timer);
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
