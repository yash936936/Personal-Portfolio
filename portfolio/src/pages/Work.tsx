import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import ContactBand from "../components/sections/ContactBand";
import Reveal from "../components/Reveal";
import { projects } from "../data/content";
import "./Work.css";

export default function Work() {
  return (
    <div className="work-page">
      <PageHeader
        eyebrow="Projects"
        title="Systems, tools and applied AI."
        sub="Each project has its own architecture notes, design decisions, implementation details and current validation status."
      />
      <section className="container work-projects">
        <div className="work-projects__intro">
          <p>Explore the system design behind each build. The notes distinguish implemented components from evaluation results and unfinished acceptance work.</p>
        </div>
        <div className="work-projects__grid">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={Math.min(index, 6) * 45}>
              <article className="work-project-card">
                <div className="work-project-card__meta">
                  <span>{project.category}</span>
                  <span>{project.status}</span>
                </div>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <div className="work-project-card__stack">
                  {project.stack.slice(0, 5).map((item) => <span key={item}>{item}</span>)}
                </div>
                <div className="work-project-card__links">
                  <Link to={"/work/" + project.slug}>Architecture notes ↗</Link>
                  <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <ContactBand />
    </div>
  );
}
