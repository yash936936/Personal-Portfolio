import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import ContactBand from "../components/sections/ContactBand";
import Reveal from "../components/Reveal";
import { projects } from "../data/content";
import "./Work.css";

const RELATED_LINKS: Record<string, Array<{ label: string; to: string }>> = {
  agm: [
    { label: "AI and agentic systems", to: "/services/ai" },
    { label: "Research and evaluation notes", to: "/blog/evaluating-rag-beyond-retrieval" },
  ],
  "sysdesign-ai": [
    { label: "AI and agentic systems", to: "/services/ai" },
  ],
  "coding-harness": [
    { label: "Agent workflow design", to: "/blog/designing-bounded-agent-workflows" },
    { label: "AI and agentic systems", to: "/services/ai" },
  ],
  "legal-ai": [
    { label: "Evaluating RAG systems", to: "/blog/evaluating-rag-beyond-retrieval" },
    { label: "AI and agentic systems", to: "/services/ai" },
  ],
  fathom: [
    { label: "Building a local research assistant", to: "/blog/building-a-local-research-assistant" },
    { label: "Evaluating RAG systems", to: "/blog/evaluating-rag-beyond-retrieval" },
  ],
  "document-analysis": [
    { label: "Evaluating RAG systems", to: "/blog/evaluating-rag-beyond-retrieval" },
    { label: "Software development and testing", to: "/services/web" },
  ],
  "lora-pipeline": [
    { label: "AI and model training", to: "/services/ai" },
  ],
};

export default function Work() {
  return (
    <div className="work-page">
      <PageHeader
        eyebrow="Selected work"
        title="Systems, experiments and products."
        sub="A closer look at the problems, architecture and implementation choices behind selected projects."
      />

      <section className="container work-intro">
        <Reveal>
          <p>
            I document what each project does, how it is structured and which parts
            are implemented. Where a repository is still a prototype, I say so.
          </p>
        </Reveal>
      </section>

      <section className="container project-grid" aria-label="Project case studies">
        {projects.map((project, index) => (
          <Reveal key={project.slug} delay={Math.min(index, 5) * 55}>
            <article
              id={"project-" + project.slug}
              className="project-card"
              style={{ "--project-accent": project.color } as CSSProperties}
            >
              <div className="project-card__top">
                <span className="project-card__category">{project.category}</span>
                <span className="project-card__year">{project.year}</span>
              </div>
              <div className="project-card__title-row">
                <h2>{project.title}</h2>
                <span className="project-card__status">{project.status}</span>
              </div>
              <p className="project-card__description">{project.description}</p>

              <div className="project-card__architecture">
                <h3>Architecture and implementation</h3>
                <p>{project.architecture}</p>
              </div>

              <div className="project-card__evidence">
                <h3>Technical evidence</h3>
                <ul>
                  {project.evidence.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>

              <div className="project-card__stack" aria-label="Technology stack">
                {project.stack.map((item) => <span key={item}>{item}</span>)}
              </div>

              <div className="project-card__related">
                <h3>Explore related work</h3>
                <div className="project-card__related-links">
                  {(RELATED_LINKS[project.slug] ?? []).map((item) => (
                    <Link key={item.to} to={item.to}>{item.label} <span aria-hidden="true">↗</span></Link>
                  ))}
                </div>
              </div>

              <a
                className="project-card__link"
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={"View " + project.title + " source on GitHub"}
              >
                View repository <span aria-hidden="true">↗</span>
              </a>
            </article>
          </Reveal>
        ))}
      </section>

      <ContactBand />
    </div>
  );
}
