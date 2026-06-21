import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { heroLines, heroTag } from "../../data/content";
import "./Hero.css";

type Tilt = "top" | "bottom";

export default function Hero() {
  const [entered, setEntered] = useState(false);
  const [tilt, setTilt] = useState<Tilt>("top");
  const lastScrollY = useRef(0);

  // The pill has two resting positions (top / bottom), and the headline
  // has two slides — they're driven by the same scroll-derived state so
  // they always change together.
  const index = tilt === "top" ? 0 : 1;

  useEffect(() => {
    const timer = window.setTimeout(() => setEntered(true), 80);
    lastScrollY.current = window.scrollY;
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = currentY - lastScrollY.current;

        // Ignore tiny jitters; only react to a deliberate scroll move.
        if (Math.abs(delta) > 4) {
          setTilt(delta > 0 ? "bottom" : "top");
          lastScrollY.current = currentY;
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className={`hero ${entered ? "hero--entered" : ""}`}>
      <div className="container hero__inner">
        <div className="hero__visual">
          <div className={`hero__switch hero__switch--${tilt}`}>
            <div className="hero__switch-surface">
              <span className="hero__switch-control" aria-hidden="true">
                <svg viewBox="0 0 64 64" focusable="false">
                  <path d="M13 32h37M36 17l15 15-15 15" />
                </svg>
              </span>
            </div>
          </div>
          <span className="hero__visual-hint">Scroll to explore</span>
        </div>

        <div className="hero__content">
          <span className="eyebrow hero__eyebrow">{heroTag}</span>

          <div className="hero__headline-stack" aria-live="polite">
            {heroLines.map((line, lineIndex) => (
              <h1
                key={line.title}
                className={`hero__headline ${lineIndex === index ? "hero__headline--active" : ""}`}
                aria-hidden={lineIndex !== index}
              >
                {line.title.split("\n").map((part) => (
                  <span className="hero__headline-row" key={part}>
                    <span>{part}</span>
                  </span>
                ))}
              </h1>
            ))}
          </div>

          <div className="hero__content-footer">
            <div className="hero__sub-stack">
              {heroLines.map((line, lineIndex) => (
                <p
                  key={line.sub}
                  className={`hero__sub ${lineIndex === index ? "hero__sub--active" : ""}`}
                  aria-hidden={lineIndex !== index}
                >
                  {line.sub}
                </p>
              ))}
            </div>

            <div className="hero__actions">
              <Link to="/contact" className="hero__cta">
                Let&apos;s talk
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M4 10h11M11 6l4 4-4 4" />
                </svg>
              </Link>
              <Link to="/work" className="hero__work-link">
                See the work
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}