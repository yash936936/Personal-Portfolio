import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { heroLines, heroTag } from "../../data/content";
import "./Hero.css";

const INTERVAL = 3400;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % heroLines.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero">
      <div className="container hero__inner">
        <span className={`eyebrow hero__eyebrow ${entered ? "is-in" : ""}`}>{heroTag}</span>

        <div className="hero__headline-stack">
          {heroLines.map((line, i) => (
            <h1
              key={i}
              className={`hero__headline ${i === index ? "hero__headline--active" : ""} ${entered ? "is-in" : ""}`}
              aria-hidden={i !== index}
            >
              {line.title.split("\n").map((part, pi) => (
                <span className="hero__headline-row" key={pi}>
                  {part}
                </span>
              ))}
            </h1>
          ))}
        </div>

        <div className={`hero__sub-stack ${entered ? "is-in" : ""}`}>
          {heroLines.map((line, i) => (
            <p
              key={i}
              className={`hero__sub ${i === index ? "hero__sub--active" : ""}`}
              aria-hidden={i !== index}
            >
              {line.sub}
            </p>
          ))}
        </div>

        <div className={`hero__actions ${entered ? "is-in" : ""}`}>
          <Link to="/contact" className="hero__cta">
            Let's talk
          </Link>
          <Link to="/work" className="hero__cta hero__cta--ghost">
            See the work
          </Link>
        </div>

        <div className="hero__dots" role="tablist" aria-label="Headline selector">
          {heroLines.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === index}
              aria-label={`Headline ${i + 1}`}
              className={`hero__dot ${i === index ? "hero__dot--active" : ""}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
