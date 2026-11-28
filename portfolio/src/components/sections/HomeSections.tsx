import { useEffect } from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { projects } from "../../data/content";
import { blogPosts } from "../../data/editorial";
import "./HomeSections.css";

const FEATURED = ["agm", "sysdesign-ai", "coding-harness", "fathom"];
const RESEARCH_THREADS = [
  { title: "Persistent memory and agent context", text: "How can an agent keep useful context, preserve provenance, correct outdated facts and abstain when evidence is missing?", work: "AGM", slug: "agm" },
  { title: "Bounded agents and execution safety", text: "How should profiles, tools, permissions, memory and workspaces fit together without granting unnecessary access?", work: "Coding Harness", slug: "coding-harness" },
  { title: "Evidence and citation verification", text: "How can research systems trace claims to sources and identify answers that the retrieved evidence cannot support?", work: "Fathom", slug: "fathom" },
];

export function FeaturedProjects() {
  const featuredProjects = FEATURED
    .map((slug) => projects.find((item) => item.slug === slug))
    .filter((item): item is (typeof projects)[number] => Boolean(item));

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cards = document.querySelectorAll<HTMLElement>(".home-project-card");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const card = entry.target as HTMLElement;
        const index = Number(card.dataset.stackIndex || 0);
        gsap.fromTo(card,
          { y: 38, rotation: index % 2 === 0 ? -5 : 5, opacity: 0.45 },
          {
            y: 0, rotation: 0, opacity: 1, duration: 0.95,
            delay: index * 0.08, ease: "elastic.out(1, 0.68)",
            onComplete: () => gsap.set(card, { clearProps: "transform,opacity" }),
          },
        );
        observer.unobserve(card);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    cards.forEach((card) => observer.observe(card));
    return () => {
      observer.disconnect();
      cards.forEach((card) => gsap.killTweensOf(card));
    };
  }, []);

  return (
    <section className="home-section home-featured">
      <div className="container">
        <div className="home-section__heading home-section__heading--row">
          <div><span className="home-section__eyebrow">Selected work</span><h2>Featured work</h2></div>
          <Link to="/work" className="home-section__text-link">All work</Link>
        </div>
        <p className="home-featured__intro">
          From architecture to working prototypes. Explore the engineering behind agent memory,
          AI-assisted system design, multi-agent developer tooling and research automation.
        </p>
        <div className="home-featured__layout">
          <div className="home-featured__stack" aria-label="Featured work case studies">
            {featuredProjects.map((item, index) => (
              <article className="home-project-card" key={item.slug} data-stack-index={index} style={{ "--stack-index": index, "--stack-rotation": index % 2 === 0 ? "-1.2deg" : "1deg" } as CSSProperties}>
                <div className="home-project-card__meta"><span>{item.category}</span><span>{item.status}</span></div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="home-project-card__stack">{item.stack.slice(0, 4).map((skill) => <span key={skill}>{skill}</span>)}</div>
                <Link to={"/work/" + item.slug} className="home-project-card__link">Read architecture notes</Link>
              </article>
            ))}
          </div>
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
          <p className="home-section__intro">Questions explored through working prototypes, technical articles and evaluation notes.</p>
        </div>
        <div className="research-writing__layout">
          <div className="research-writing__questions">
            <h3>Research questions</h3>
            {RESEARCH_THREADS.map((thread) => (
              <article className="research-writing__question" key={thread.slug}>
                <h4>{thread.title}</h4><p>{thread.text}</p>
                <Link to={"/work/" + thread.slug}>Explore {thread.work}</Link>
              </article>
            ))}
          </div>
          <div className="research-writing__articles">
            <div className="research-writing__articles-heading"><h3>Recent writing</h3><Link to="/blog">Visit the blog</Link></div>
            {blogPosts.map((post) => (
              <article className="research-writing__article" key={post.slug}>
                <span>{post.category} · {post.readingTime}</span><h4>{post.title}</h4><p>{post.excerpt}</p>
                <Link to={"/blog/" + post.slug}>Read article</Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
