import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { offers } from "../../data/content";
import Reveal from "../Reveal";
import "./Services.css";

const CAPABILITY_META = [
  { label: "AI & agentic systems", number: "01", accent: "var(--color-primary)" },
  { label: "Software development & testing", number: "02", accent: "#58768d" },
  { label: "Deployment & infrastructure", number: "03", accent: "var(--color-accent-teal)" },
] as const;

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const detailRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    detailRefs.current.forEach((element, index) => {
      if (!element) return;
      gsap.killTweensOf(element);

      if (index === activeIndex) {
        gsap.to(element, {
          height: "auto",
          opacity: 1,
          duration: reduceMotion ? 0 : 0.72,
          ease: "elastic.out(1, 0.78)",
          overwrite: "auto",
        });
      } else {
        gsap.to(element, {
          height: 0,
          opacity: 0,
          duration: reduceMotion ? 0 : 0.28,
          ease: "power3.inOut",
          overwrite: "auto",
        });
      }
    });

    return () => {
      detailRefs.current.forEach((element) => {
        if (element) gsap.killTweensOf(element);
      });
    };
  }, [activeIndex]);

  return (
    <section className="services">
      <div className="container">
        <div className="services__intro">
          <Reveal>
            <span className="services__eyebrow">Engineering capabilities</span>
            <h2 className="services__heading">Designing, building <br /> and testing systems</h2>
          </Reveal>
          <Reveal delay={100} className="services__intro-right">
            <p className="services__sub">
              AI engineering leads the work. Software development, testing and infrastructure
              help turn prototypes into dependable applications.
            </p>
            <Link to="/contact" className="services__cta">Discuss an idea</Link>
          </Reveal>
        </div>

        <div
          className="services__list"
          onMouseLeave={() => setActiveIndex(-1)}
          aria-label="Engineering capabilities"
        >
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
              >
                <button
                  type="button"
                  className="services__row-trigger"
                  aria-expanded={isActive}
                  aria-controls={detailId}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(isActive ? -1 : index)}
                >
                  <span className="services__row-number">{meta.number}</span>
                  <span className="services__row-title">{offer.title.replace(/\n/g, " ")}</span>
                  <span className="services__row-label">{meta.label}</span>
                  <span className="services__row-icon" aria-hidden="true">↗</span>
                </button>

                <div
                  className="services__row-detail"
                  id={detailId}
                  aria-hidden={!isActive}
                  ref={(element) => { detailRefs.current[index] = element; }}
                >
                  <div className="services__row-detail-inner">
                    <p>{offer.desc}</p>
                    <Link to={offer.href} className="services__row-link">
                      Explore capability <span aria-hidden="true">↗</span>
                    </Link>
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
