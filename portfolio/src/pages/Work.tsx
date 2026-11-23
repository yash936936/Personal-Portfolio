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
          <p>{workItem.description}</p>
        </header>

        <section className="case-study__architecture">
          <div className="case-study__section-heading">
            <span>Architecture overview</span>
            <h3>{detail.architectureTitle}</h3>
          </div>
          <p className="case-study__architecture-intro">{detail.architectureIntro}</p>
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

        <div className="case-study__details">
          <section className="case-study__block">
            <h3>Design decisions</h3>
            <ul>{detail.designDecisions.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
          <section className="case-study__block">
            <h3>Implementation and evaluation</h3>
            <ul>{detail.evaluation.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
        </div>

        <aside className="case-study__limits">
          <span>Limitations and validation status</span>
          <ul>{detail.limitations.map((item) => <li key={item}>{item}</li>)}</ul>
        </aside>

        <section className="case-study__stack-section">
          <h3>Technology stack</h3>
          <div className="case-study__stack">
            {workItem.stack.map((skill) => <span key={skill}>{skill}</span>)}
          </div>
        </section>

        <div className="case-study__links">
          <a href={workItem.github} target="_blank" rel="noopener noreferrer">Source repository ↗</a>
          {detail.references.map((reference) => (
            <a href={reference.href} target="_blank" rel="noopener noreferrer" key={reference.href}>
              {reference.label} ↗
            </a>
          ))}
        </div>
      </article>
    </Reveal>
  );
}

export default function Work() {
  return (
    <div className="work-page">
      <PageHeader
        eyebrow="Selected work"
        title="AI systems, architecture and engineering."
        sub="Architecture notes, design decisions and implementation details for every build."
      />
      <section className="container work-intro">
        <p>
          Each build is documented as a technical case study. The notes explain the system flow,
          the role of each major component, the reasoning behind key design choices and the
          evidence available for its current state. Prototype limits and unfinished validation
          are stated where relevant.
        </p>
      </section>
      <section className="container work-case-studies" aria-label="Architecture case studies">
        {projects.map((item, index) => (
          <ProjectCaseStudy key={item.slug} slug={item.slug} index={index} />
        ))}
      </section>
      <ContactBand />
    </div>
  );
}
