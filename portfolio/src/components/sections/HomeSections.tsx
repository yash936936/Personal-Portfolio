import { Link } from "react-router-dom";
import Reveal from "../Reveal";
import { projects } from "../../data/content";
import { blogPosts } from "../../data/editorial";
import "./HomeSections.css";

const FEATURED = ["agm", "sysdesign-ai", "coding-harness", "fathom"];
const RESEARCH_THREADS = [
  {
    title: "Persistent memory and agent context",
    text: "How can an agent keep useful context, preserve provenance, correct outdated facts and abstain when evidence is missing?",
    project: "AGM",
    slug: "agm",
  },
  {
    title: "Bounded agents and execution safety",
    text: "How should profiles, tools, permissions, memory and workspaces fit together without granting unnecessary access?",
    project: "Coding Harness",
    slug: "coding-harness",
  },
  {
    title: "Evidence and citation verification",
    text: "How can research systems trace claims to sources and identify answers that the retrieved evidence cannot support?",
    project: "Fathom",
    slug: "fathom",
  },
];

export function FeaturedProjects() {
  const featuredProjects = FEATURED
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is (typeof projects)[number] => Boolean(project));

  return (
    <section className="home-section home-featured">
      <div className="container">
        <div className="home-section__heading home-section__heading--row">
          <div>
            <span className="home-section__eyebrow">Selected work</span>
            <h2>Featured projects</h2>
          </div>
          <Link to="/work" className="home-section__text-link">All projects ↗</Link>
        </div>
        <div className="home-featured__grid">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 65}>
              <article className="home-project-card">
                <div className="home-project-card__meta">
                  <span>{project.category}</span>
                  <span>{project.status}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="home-project-card__stack">
                  {project.stack.slice(0, 4).map((item) => <span key={item}>{item}</span>)}
                </div>
                <Link to={"/work/" + project.slug} className="home-project-card__link">
                  Read architecture notes <span aria-hidden="true">↗</span>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ResearchAndBlog() {
  return (
    <section className="home-section research-writing">
      <div className="container">
        <div className="home-section__heading">
          <span className="home-section__eyebrow">Ideas and technical notes</span>
          <h2>Research &amp; Blog</h2>
          <p className="home-section__intro">
            Questions explored through project prototypes, technical articles and evaluation notes.
          </p>
        </div>
        <div className="research-writing__layout">
          <div className="research-writing__questions">
            <h3>Research questions</h3>
            {RESEARCH_THREADS.map((thread) => (
              <article className="research-writing__question" key={thread.slug}>
                <h4>{thread.title}</h4>
                <p>{thread.text}</p>
                <Link to={"/work/" + thread.slug}>Explore {thread.project} ↗</Link>
              </article>
            ))}
          </div>
          <div className="research-writing__articles">
            <div className="research-writing__articles-heading">
              <h3>Recent writing</h3>
              <Link to="/blog">Visit the blog ↗</Link>
            </div>
            {blogPosts.map((post) => (
              <article className="research-writing__article" key={post.slug}>
                <span>{post.category} · {post.readingTime}</span>
                <h4>{post.title}</h4>
                <p>{post.excerpt}</p>
                <Link to={"/blog/" + post.slug}>Read article ↗</Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
