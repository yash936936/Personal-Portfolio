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
        sub="A running list of systems and products I've trained, built, and shipped."
      />

      <section className="container work-page__projects" aria-label="Project portfolio">
        <div className="project-row-list">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={Math.min(index, 6) * 50}>
              <ProjectRow
                title={project.title}
                year={project.year}
                category={project.category}
                github={project.github}
              />
            </Reveal>
          ))}
        </div>
      </section>

      <ContactBand />
    </div>
  );
}
