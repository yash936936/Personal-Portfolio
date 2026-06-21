import { useParams, Link, Navigate } from "react-router-dom";
import { projects } from "../data/content";
import Reveal from "../components/Reveal";
import ContactBand from "../components/sections/ContactBand";
import "./ProjectDetail.css";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const otherProjects = projects.filter((p) => p.slug !== slug).slice(0, 4);

  if (!project) return <Navigate to="/work" replace />;

  return (
    <>
      <section className="project-hero">
        <div className="container">
          <Reveal>
            <Link to="/work" className="project-hero__back">
              ← All work
            </Link>
            <span className="eyebrow project-hero__eyebrow">{project.category} · {project.year}</span>
            <h1 className="project-hero__title">{project.title}</h1>
          </Reveal>
        </div>
      </section>

      <section className="project-cover container">
        <Reveal>
          <div
            className="project-cover__media"
            style={{ background: `linear-gradient(150deg, ${project.color}, var(--color-surface-dark) 140%)` }}
          />
        </Reveal>
      </section>

      <section className="project-meta container">
        <Reveal>
          <div className="project-meta__grid">
            <div>
              <span className="project-meta__label">Role</span>
              <p className="project-meta__value">Engineering &amp; design</p>
            </div>
            <div>
              <span className="project-meta__label">Stack</span>
              <p className="project-meta__value">Python, React, FastAPI</p>
            </div>
            <div>
              <span className="project-meta__label">Year</span>
              <p className="project-meta__value">{project.year}</p>
            </div>
            <div>
              <span className="project-meta__label">Status</span>
              <p className="project-meta__value">Shipped</p>
            </div>
          </div>

          <p className="project-meta__copy">
            Placeholder case-study copy — replace with the real write-up: the problem, the
            constraints, the approach taken, and the outcome once it shipped.
          </p>
        </Reveal>
      </section>

      <section className="project-gallery container">
        {[0, 1].map((i) => (
          <Reveal key={i} delay={i * 90}>
            <div
              className="project-gallery__media"
              style={{
                background: `linear-gradient(${120 + i * 40}deg, var(--color-surface-card), ${project.color}33)`,
              }}
            />
          </Reveal>
        ))}
      </section>

      <section className="project-next container">
        <Reveal>
          <h2 className="project-next__heading">More work</h2>
        </Reveal>
        <div className="project-next__grid">
          {otherProjects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 70}>
              <Link to={`/work/${p.slug}`} className="project-next__card" data-cursor="link">
                <div
                  className="project-next__media"
                  style={{ background: `linear-gradient(150deg, ${p.color}, var(--color-surface-dark))` }}
                />
                <span className="project-next__title">{p.title}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <ContactBand />
    </>
  );
}