import { Link } from "react-router-dom";
import type { CSSProperties } from "react";
import { offers } from "../../data/content";
import Reveal from "../Reveal";
import "./Services.css";

const CAPABILITY_META = [
  { label: "AI & agentic systems", number: "01", accent: "var(--color-primary)" },
  { label: "Software development & testing", number: "02", accent: "#58768d" },
  { label: "Deployment & infrastructure", number: "03", accent: "var(--color-accent-teal)" },
] as const;

type CapabilityStyle = CSSProperties & { "--service-accent": string };

export default function Services() {
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

        <div className="services__grid">
          {offers.map((offer, index) => {
            const meta = CAPABILITY_META[index];
            return (
              <Reveal key={offer.href} delay={index * 70}>
                <article
                  className="services__card"
                  style={{ "--service-accent": meta.accent } as CapabilityStyle}
                >
                  <div className="services__card-meta">
                    <span>{meta.number}</span>
                    <span>{meta.label}</span>
                  </div>
                  <h3 className="services__card-title">{offer.title.replace(/\n/g, " ")}</h3>
                  <p className="services__card-copy">{offer.desc}</p>
                  <Link to={offer.href} className="services__card-link">
                    Explore capability <span aria-hidden="true">↗</span>
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
