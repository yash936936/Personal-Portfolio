import { Link, Navigate, useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { projects } from "../data/content";
import { projectDetails } from "../data/projectDetails";
import "./ProjectDetail.css";
export default function ProjectDetail() {
 const { slug } = useParams();
 const project = projects.find((item) => item.slug === slug);
 const detail = slug ? projectDetails[slug] : undefined;
 if (!project || !detail) return <Navigate to="/work" replace />;
 return <div className="project-detail-page">
  <PageHeader eyebrow={project.category} title={project.title} sub={project.description}/>
  <div className="container project-detail">
   <div className="project-detail__topline"><Link to="/work">← All work</Link><span>{project.status}</span></div>
   <section className="project-detail__intro"><div><span className="project-detail__eyebrow">Architecture notes</span><h2>{detail.architectureTitle}</h2></div><p>{detail.architectureIntro}</p></section>
   <section className="project-detail__diagram-section">
    <span className="project-detail__eyebrow">Architecture overview</span>
    <h3>Architecture at a glance</h3>
    <figure className="project-detail__diagram">
     <img
      src={`/architecture/${project.slug}.svg`}
      alt={`Simplified architecture diagram: ${detail.architectureTitle}`}
      width="1440"
      height={project.slug === "agm" ? "790" : "700"}
      loading="lazy"
     />
     <figcaption>
      A plain-language view of the main system flow. The detailed architecture breakdown follows below.
     </figcaption>
    </figure>
   </section>
   <section className="project-detail__flow-section"><h3>System flow</h3><div className="project-detail__flow">{detail.flow.map(step=><article className="project-detail__flow-step" key={step.name}><span className="project-detail__flow-label">Architecture layer</span><h4>{step.name}</h4><p>{step.responsibility}</p></article>)}</div></section>
   <section className="project-detail__components"><h3>Architecture breakdown</h3><div className="project-detail__component-grid">{detail.components.map(component=><article className="project-detail__component" key={component.heading}><h4>{component.heading}</h4><p>{component.body}</p><ul>{component.points.map(point=><li key={point}>{point}</li>)}</ul></article>)}</div></section>
   <section className="project-detail__stack"><h3>Technology stack</h3><div>{project.stack.map(item=><span key={item}>{item}</span>)}</div></section>
   <section className="project-detail__references"><h3>Source material</h3><div className="project-detail__reference-list"><a href={project.github} target="_blank" rel="noopener noreferrer">Source repository ↗</a>{detail.references.map(reference=><a href={reference.href} target="_blank" rel="noopener noreferrer" key={reference.href}>{reference.label} ↗</a>)}</div></section>
   <div className="project-detail__bottom"><Link to="/work">Back to all work</Link><Link to="/contact">Discuss an idea</Link></div>
  </div>
 </div>;
}
