import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { offers } from "../../data/content";
import Reveal from "../Reveal";
import "./Services.css";

const CAPABILITY_META = [
  { label: "AI & agentic systems", number: "", accent: "var(--color-primary)" },
  { label: "Software development", number: "", accent: "var(--color-primary)" },
  { label: "Deployment & infrastructure", number: "", accent: "var(--color-primary)" },
] as const;

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const detailRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    detailRefs.current.forEach((element, index) => {
      if (!element) return;
      gsap.killTweensOf(element);
      gsap.to(element, {
        height: index === activeIndex ? "auto" : 0,
        opacity: index === activeIndex ? 1 : 0,
        duration: reduceMotion ? 0 : index === activeIndex ? 0.72 : 0.28,
        ease: index === activeIndex ? "elastic.out(1, 0.78)" : "power3.inOut",
        overwrite: "auto",
      });
    });
    const elements = detailRefs.current;
    return () => elements.forEach((element) => element && gsap.killTweensOf(element));
  }, [activeIndex]);

  return (
    <section className="services" id="engineering-capabilities">
      <div className="container">
        <div className="services__intro">
          <Reveal>
            <span className="services__eyebrow">Engineering capabilities</span>
            <h2 className="services__heading">Designing, building <br /> and delivering systems</h2>
          </Reveal>
          <Reveal delay={100} className="services__intro-right">
            <p className="services__sub">
              AI engineering leads the work. Software development and infrastructure
              help turn prototypes into dependable applications.
            </p>
            <Link to="/contact" className="services__cta">Discuss an idea</Link>
          </Reveal>
        </div>
        <div className="services__list" id="capability-list" aria-label="Engineering capabilities">
          {offers.map((offer, index) => {
            const meta = CAPABILITY_META[index];
            const isActive = activeIndex === index;
            const detailId = `capability-detail-${index}`;
            return (
              <article
                className={`services__row ${isActive ? "is-active" : ""}`}
                key={offer.href}
                style={{ "--service-accent": meta.accent } as CSSProperties}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={(event) => {
                  if (!event.currentTarget.contains(document.activeElement)) {
                    setActiveIndex((current) => current === index ? -1 : current);
                  }
                }}
                onFocusCapture={() => setActiveIndex(index)}
                onBlurCapture={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                    setActiveIndex((current) => current === index ? -1 : current);
                  }
                }}
              >
                <div className="services__row-trigger">
                  
                  <Link to={offer.href} className="services__row-title" onFocus={() => setActiveIndex(index)}>
                    {offer.title.replace(/\n/g, " ")}
                  </Link>
                  <span className="services__row-label">{meta.label}</span>
                  <button
                    type="button"
                    className="services__row-icon"
                    aria-label={`${isActive ? "Collapse" : "Expand"} ${meta.label}`}
                    aria-expanded={isActive}
                    aria-controls={detailId}
                    onFocus={() => setActiveIndex(index)}
                    onClick={() => setActiveIndex(isActive ? -1 : index)}
                  >
                    <span aria-hidden="true">{isActive ? "−" : "+"}</span>
                  </button>
                </div>
                <div
                  className="services__row-detail"
                  id={detailId}
                  aria-hidden={!isActive}
                  ref={(element) => { detailRefs.current[index] = element; }}
                >
                  <div className="services__row-detail-inner">
                    <p>{offer.desc}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
