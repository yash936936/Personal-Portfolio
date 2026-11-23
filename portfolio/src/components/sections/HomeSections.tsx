import { Link } from "react-router-dom";
import Reveal from "../Reveal";
import ArchitectureDiagram from "./ArchitectureDiagram";
import type { ArchitectureVariant } from "./ArchitectureDiagram";
import { projects } from "../../data/content";
import { blogPosts } from "../../data/editorial";
import "./HomeSections.css";

const FOCUS = ["LLMs", "Agentic AI", "Memory Systems", "Retrieval and RAG", "Applied ML", "AI Architecture", "Evaluation"];
const QUESTIONS = [
  { n: "01", title: "Persistent memory and agent context", text: "How should agents store, retrieve, correct and revoke information without losing provenance?", project: "AGM", href: "/work#project-agm" },
  { n: "02", title: "Bounded agent workflows", text: "How should tools, memory, permissions and execution environments be composed with clear limits?", project: "Coding Harness", href: "/work#project-coding-harness" },
  { n: "03", title: "Evidence-led research", text: "How can a research assistant connect claims to sources and recognise insufficient evidence?", project: "Fathom", href: "/work#project-fathom" },
];
const CAPABILITIES = [
  { n: "01", title: "AI engineering", text: "LLM applications, agentic workflows, retrieval systems, model integration and applied machine learning." },
  { n: "02", title: "Software development and testing", text: "Application architecture, APIs, interface development, test automation and quality checks." },
  { n: "03", title: "Deployment and infrastructure", text: "Backend services, databases, cloud integration, deployment workflows and operational boundaries." },
];
const RELATED: Record<string, string[]> = {
  "designing-bounded-agent-workflows": ["Coding Harness"],
  "evaluating-rag-beyond-retrieval": ["AGM", "Legal AI Assistant"],
  "building-a-local-research-assistant": ["Fathom"],
};

export function FocusAreas() {
  return <section className="home-section home-focus">
    <div className="container">
      <div className="home-section__heading">
        <span className="home-section__eyebrow">02 · Focus areas</span>
        <h2>What I work on</h2>
      </div>
      <div className="home-focus__list">
        {FOCUS.map((item, i) => <span className="home-focus__item" key={item}><span>{String(i + 1).padStart(2, "0")}</span>{item}</span>)}
      </div>
    </div>
  </section>;
}

export function FeaturedProjects() {
  return <section className="home-section home-featured">
    <div className="container">
      <div className="home-section__heading home-section__heading--row">
        <div><span className="home-section__eyebrow">03 · Featured projects</span><h2>Systems I am building</h2></div>
        <Link to="/work" className="home-section__text-link">View all projects ↗</Link>
      </div>
      <div className="home-featured__grid">
        {projects.slice(0, 3).map((project, i) => (
          <Reveal key={project.slug} delay={i * 70}>
            <article className="home-project-card">
              <div className="home-project-card__meta"><span>{project.category}</span><span>{project.status}</span></div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <ArchitectureDiagram variant={project.slug as ArchitectureVariant} compact />
              <div className="home-project-card__bottom">
                <span>{project.stack.slice(0, 3).join(" · ")}</span>
                <Link to={"/work#project-" + project.slug}>Explore case study ↗</Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>;
}

export function ResearchPreview() {
  return <section className="home-section home-research">
    <div className="container">
      <div className="home-section__heading home-section__heading--row">
        <div><span className="home-section__eyebrow">04 · Research and experiments</span><h2>Questions behind the projects</h2></div>
        <Link to="/research" className="home-section__text-link">Open research notes ↗</Link>
      </div>
      <p className="home-section__intro">Research questions, technical experiments, evaluation and lessons learned. I separate what is implemented from what has actually been validated.</p>
      <div className="home-research__list">
        {QUESTIONS.map((item) => <article className="home-research__item" key={item.n}>
          <span className="home-research__number">{item.n}</span>
          <div><h3>{item.title}</h3><p>{item.text}</p><Link to={item.href}>Project: {item.project} ↗</Link></div>
        </article>)}
      </div>
    </div>
  </section>;
}

export function Capabilities() {
  return <section className="home-section home-capabilities">
    <div className="container">
      <div className="home-section__heading"><span className="home-section__eyebrow">05 · Engineering capabilities</span><h2>From AI systems to dependable software</h2></div>
      <div className="home-capabilities__grid">
        {CAPABILITIES.map((item) => <article className="home-capability" key={item.n}><span>{item.n}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}
      </div>
    </div>
  </section>;
}

export function WritingPreview() {
  return <section className="home-section home-writing">
    <div className="container">
      <div className="home-section__heading home-section__heading--row">
        <div><span className="home-section__eyebrow">06 · Writing</span><h2>Notes from the workbench</h2></div>
        <Link to="/blog" className="home-section__text-link">All writing ↗</Link>
      </div>
      <div className="home-writing__grid">
        {blogPosts.map((post) => <article className="home-writing__card" key={post.slug}>
          <span>{post.category} · {post.readingTime}</span><h3>{post.title}</h3><p>{post.excerpt}</p>
          <div className="home-writing__related">{(RELATED[post.slug] ?? []).map((name) => <span key={name}>{name}</span>)}</div>
          <Link to={"/blog/" + post.slug}>Read article ↗</Link>
        </article>)}
      </div>
    </div>
  </section>;
}

export function HomeContact() {
  return <section className="home-section home-contact">
    <div className="container home-contact__inner">
      <div><span className="home-section__eyebrow">07 · Contact</span><h2>Work on a question worth solving.</h2><p>Research collaboration · Engineering opportunities · Technical discussions</p></div>
      <Link to="/contact" className="home-contact__link">Get in touch ↗</Link>
    </div>
  </section>;
}
