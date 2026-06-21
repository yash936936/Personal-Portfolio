import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { heroLines, heroTag } from "../../data/content";
import "./Hero.css";

const INTERVAL = 4200;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setEntered(true), 80);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroLines.length);
    }, INTERVAL);
    return () => window.clearInterval(id);
  }, []);

  const selectSlide = (nextIndex: number) => setIndex(nextIndex);
  const advanceSlide = () => setIndex((current) => (current + 1) % heroLines.length);

  return (
    <section className={`hero ${entered ? "hero--entered" : ""}`}>
      <div className="container hero__inner">
        <div className="hero__visual">
          <button
            className={`hero__switch hero__switch--${index}`}
            type="button"
            onClick={advanceSlide}
            aria-label="Show next hero statement"
          >
            <div className="hero__switch-surface">
              <span className="hero__switch-control" aria-hidden="true">
                <svg viewBox="0 0 64 64" focusable="false">
                  <path d="M13 32h37M36 17l15 15-15 15" />
                </svg>
              </span>
            </div>
          </button>
          <span className="hero__visual-hint">Click to explore</span>
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

          <div className="hero__progress" role="tablist" aria-label="Headline selector">
            {heroLines.map((line, lineIndex) => (
              <button
                key={line.title}
                type="button"
                role="tab"
                aria-selected={lineIndex === index}
                aria-label={`Show statement ${lineIndex + 1}`}
                className={`hero__progress-item ${lineIndex === index ? "hero__progress-item--active" : ""}`}
                onClick={() => selectSlide(lineIndex)}
              >
                <span>{String(lineIndex + 1).padStart(2, "0")}</span>
                <i />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
