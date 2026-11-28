import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import ContactBand from "../components/sections/ContactBand";
import Faq from "../components/sections/Faq";
import "./Service.css";

interface ServiceStep {
  step: string;
  title: string;
  desc: string;
}

interface ServicePageProps {
  eyebrow: string;
  title: string;
  sub: string;
  steps: ServiceStep[];
  related: { label: string; href: string }[];
  /** Accent color tying this service to its homepage pill (e.g. var(--color-primary)) */
  accent?: string;
  /** Text color that sits well on top of `accent` */
  onAccent?: string;
}

export default function ServicePage({
  eyebrow,
  title,
  sub,
  steps,
  related,
  accent = "var(--color-primary)",
  onAccent = "var(--color-on-primary)",
}: ServicePageProps) {
  return (
    <div
      className="service-page"
      style={{ "--service-accent": accent, "--service-on-accent": onAccent } as CSSProperties}
    >
      <PageHeader eyebrow={eyebrow} title={title} sub={sub} />

      <section className="container service-steps">
        {steps.map((s, i) => (
          <Reveal key={s.title} delay={i * 80}>
            <div className="service-step">
              
              <div className="service-step__body">
                <h3 className="service-step__title">{s.title}</h3>
                <p className="service-step__desc">{s.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="container service-related">
        <Reveal>
          <span className="eyebrow">Other services</span>
        </Reveal>
        <div className="service-related__list">
          {related.map((r, i) => (
            <Reveal key={r.href} delay={i * 70}>
              <Link to={r.href} className="service-related__item">
                
                {r.label}
                
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <Faq />
      <ContactBand />
    </div>
  );
}