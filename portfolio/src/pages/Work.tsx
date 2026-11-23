import type { CSSProperties } from "react";
import PageHeader from "../components/PageHeader";
import ContactBand from "../components/sections/ContactBand";
import Reveal from "../components/Reveal";
import { projects } from "../data/content";
import "./Work.css";

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

              <a
                className="project-card__link"
                href={project.github}
                target="_blank"
                rel="noreferrer"
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
