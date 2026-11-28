import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import ContactBand from "../components/sections/ContactBand";
import Reveal from "../components/Reveal";
import { projects } from "../data/content";
import { projectDetails } from "../data/projectDetails";
import "./Work.css";

function ProjectCaseStudy({ slug, index }: { slug: string; index: number }) {
  const workItem = projects.find((item) => item.slug === slug);
  const detail = projectDetails[slug];
  if (!workItem || !detail) return null;

  return (
    <Reveal delay={Math.min(index, 5) * 55}>
      <article className="case-study" id={"work-" + workItem.slug}>
        <header className="case-study__header">
          <div className="case-study__meta">
            <span>{workItem.category}</span>
            <span className="case-study__status">{workItem.status}</span>
          </div>
          <h2>{workItem.title}</h2>
        </header>

        <section className="case-study__architecture">
          <div className="case-study__section-heading">
            <span>Architecture overview</span>
            <h3>{detail.architectureTitle}</h3>
          </div>
          <p className="case-study__architecture-intro">{detail.architectureIntro}</p>
        </section>

        <section className="case-study__diagram-section">
          <h3>Architecture at a glance</h3>
          <figure className="case-study__diagram">
            <img
              src={"/architecture/" + workItem.slug + ".svg"}
              alt={"Simplified architecture diagram: " + detail.architectureTitle}
              width="1440"
              height={workItem.slug === "agm" ? "790" : "700"}
              loading="lazy"
            />
            <figcaption>
              A plain-language view of the main system flow. The detailed engineering notes follow below.
            </figcaption>
          </figure>
        </section>

        <section className="case-study__flow-section">
          <h3>System flow</h3>
          <div className="case-study__flow">
            {detail.flow.map((step) => (
              <article className="case-study__flow-step" key={step.name}>
                <span className="case-study__flow-label">Architecture layer</span>
                <h4>{step.name}</h4>
                <p>{step.responsibility}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="case-study__components">
          <h3>Architecture breakdown</h3>
          <div className="case-study__component-grid">
            {detail.components.map((component) => (
              <article className="case-study__component" key={component.heading}>
                <h4>{component.heading}</h4>
                <p>{component.body}</p>
                <ul>{component.points.map((point) => <li key={point}>{point}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section className="case-study__stack-section">
          <h3>Technology stack</h3>
          <div className="case-study__stack">
            {workItem.stack.map((skill) => <span key={skill}>{skill}</span>)}
          </div>
        </section>

        <div className="case-study__links">
          <a href={workItem.github} target="_blank" rel="noopener noreferrer">Source repository</a>
          {detail.references.map((reference) => (
            <a href={reference.href} target="_blank" rel="noopener noreferrer" key={reference.href}>
              {reference.label}
            </a>
          ))}
        </div>
      </article>
    </Reveal>
  );
}

export default function Work() {
  const [selectedPrototype, setSelectedPrototype] = useState("agm");
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const updateScrollState = () => {
      setShowBackToTop(window.scrollY > 420);
    };
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  const scrollToTop = () => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <div className="work-page">
      <div className="work-page__intro">
        <PageHeader
          eyebrow="Selected work"
          title="AI systems, architecture and engineering."
        />
      <section className="container prototype-picker" id="work-projects" aria-label="Choose a prototype">
        <div className="prototype-picker__track" role="group" aria-label="Prototypes">
          {projects.map((item) => (
            <button
              type="button"
              key={item.slug}
              className={`prototype-picker__tab ${selectedPrototype === item.slug ? "is-active" : ""}`}
              aria-pressed={selectedPrototype === item.slug}
              onClick={() => {
                setSelectedPrototype(item.slug);
                document.getElementById("work-" + item.slug)?.scrollIntoView({
                  behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
                  block: "start",
                });
              }}
            >
              {({
                agm: "Adaptive Graph Memory",
                "sysdesign-ai": "SysDesign AI",
                "coding-harness": "Harness",
                "legal-ai": "Legal AI Assistant",
                fathom: "Research Assistant",
                "document-analysis": "Document Analysis API",
                "lora-pipeline": "LoRA",
              }[item.slug] ?? item.title)}
            </button>
          ))}
        </div>
      </section>

      </div>
      <section className="container work-case-studies" aria-label="Architecture case studies">
        {projects.map((item, index) => (
          <ProjectCaseStudy key={item.slug} slug={item.slug} index={index} />
        ))}
      </section>
      <ContactBand />
      <button
        type="button"
        className={"work-back-to-top" + (showBackToTop ? " is-visible" : "")}
        onClick={scrollToTop}
        aria-label="Scroll to top"
        aria-hidden={!showBackToTop}
        tabIndex={showBackToTop ? 0 : -1}
      >
        <span aria-hidden="true">↑</span>
      </button>
    </div>
  );
}
