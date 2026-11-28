import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import ContactBand from "../components/sections/ContactBand";
import Faq from "../components/sections/Faq";
import "./Service.css";

interface ServiceStep {
  title: string;
  desc: string;
}

interface ServicePageProps {
  eyebrow: string;
  title: string;
  sub: string;
  steps: ServiceStep[];
  related: { label: string; href: string }[];
  accent?: string;
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

      <section className="container service-steps" aria-label="How the service works">
        {steps.map((step, index) => (
          <Reveal key={step.title} delay={index * 80}>
            <article className="service-step">
              <div className="service-step__body">
                <h2 className="service-step__title">{step.title}</h2>
                <p className="service-step__desc">{step.desc}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      <section className="container service-related">
        <Reveal>
          <span className="eyebrow">Other services</span>
        </Reveal>
        <div className="service-related__list">
          {related.map((service, index) => (
            <Reveal key={service.href} delay={index * 70}>
              <Link to={service.href} className="service-related__item" data-cursor="link">
                {service.label}
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
