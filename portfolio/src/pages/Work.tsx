import PageHeader from "../components/PageHeader";
import ProjectRow from "../components/ProjectRow";
import ContactBand from "../components/sections/ContactBand";
import Reveal from "../components/Reveal";
import { projects } from "../data/content";
import "./Work.css";

export default function Work() {
  return (
    <div className="work-page">
      <PageHeader
        eyebrow="Selected work"
        title="Models, pipelines, products."
        sub="A running list of things I've trained, built, and shipped."
      />

      <section className="container" style={{ paddingBottom: 64 }}>
        <div className="project-row-list">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={Math.min(i, 6) * 50}>
              <ProjectRow
                title={p.title}
                year={p.year}
                category={p.category}
                color={p.color}
                href={`/work/${p.slug}`}
                github={p.github}
              />
            </Reveal>
          ))}
        </div>
      </section>

      <ContactBand />
    </div>
  );
}