import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import { blogPosts } from "../data/editorial";
import "./Blog.css";

const RELATED_PROJECTS: Record<string, Array<{ label: string; slug: string }>> = {
  "designing-bounded-agent-workflows": [{ label: "Coding Harness", slug: "coding-harness" }],
  "evaluating-rag-beyond-retrieval": [
    { label: "AGM", slug: "agm" },
    { label: "Legal AI Assistant", slug: "legal-ai" },
    { label: "AI Document Analysis API", slug: "document-analysis" },
  ],
  "building-a-local-research-assistant": [{ label: "Fathom Research Assistant", slug: "fathom" }],
};

export default function Blog() {
  const { slug } = useParams();
  const [activeCategory, setActiveCategory] = useState("All");
  const article = blogPosts.find((post) => post.slug === slug);

  if (slug && !article) return <Navigate to="/blog" replace />;

  if (article) {
    const related = RELATED_PROJECTS[article.slug] ?? [];
    return <div className="blog-page">
      <PageHeader eyebrow={article.category} title={article.title} sub={article.excerpt} />
      <article className="container blog-article">
        <nav className="blog-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link><span aria-hidden="true">/</span><Link to="/blog">Writing</Link>
          <span aria-hidden="true">/</span><span aria-current="page">{article.title}</span>
        </nav>
        <p className="blog-article__label">Writing · {article.readingTime}</p>
        <p className="blog-article__intro">{article.introduction}</p>
        {article.sections.map((section) => <section className="blog-article__section" key={section.heading}>
          <h2>{section.heading}</h2>
          {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {section.points && <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}
        </section>)}
        <aside className="blog-article__takeaways"><h2>Key points</h2><ul>{article.takeaways.map((item) => <li key={item}>{item}</li>)}</ul></aside>
        {related.length > 0 && <section className="blog-article__related" aria-labelledby="related-projects-heading">
          <h2 id="related-projects-heading">Related case studies</h2>
          <div className="blog-article__related-links">{related.map((project) => <Link key={project.slug} to={"/work#project-" + project.slug}>{project.label} ↗</Link>)}</div>
        </section>}
        <div className="blog-article__footer-nav"><Link to="/research">Research notes ↗</Link><Link to="/blog" className="blog-article__back">← Back to writing</Link></div>
      </article>
    </div>;
  }

  const categories = ["All", ...Array.from(new Set(blogPosts.map((post) => post.category)))];
  const visiblePosts = activeCategory === "All" ? blogPosts : blogPosts.filter((post) => post.category === activeCategory);

  return <div className="blog-page">
    <PageHeader eyebrow="Writing" title="Notes on AI systems and research." sub="Technical articles, project breakdowns and research notes from practical engineering work." />
    <section className="container blog-list" aria-label="Writing and technical articles">
      <div className="blog-list__intro"><Reveal><p>Browse by topic, then follow each article into the project or research question it explains. Articles focus on architecture, design trade-offs and evaluation.</p></Reveal></div>
      <div className="writing-filters" aria-label="Filter writing by topic">
        {categories.map((category) => <button type="button" key={category} className={activeCategory === category ? "writing-filter writing-filter--active" : "writing-filter"} onClick={() => setActiveCategory(category)} aria-pressed={activeCategory === category}>{category}</button>)}
      </div>
      <div className="blog-list__grid">
        {visiblePosts.map((post, index) => <Reveal key={post.slug} delay={index * 60}>
          <article className="blog-card">
            <div className="blog-card__meta"><span>{post.category}</span><span>{post.readingTime}</span></div>
            <h2>{post.title}</h2><p>{post.excerpt}</p>
            <div className="blog-card__related">{(RELATED_PROJECTS[post.slug] ?? []).map((project) => <Link key={project.slug} to={"/work#project-" + project.slug}>{project.label}</Link>)}</div>
            <Link to={"/blog/" + post.slug}>Read article ↗</Link>
          </article>
        </Reveal>)}
      </div>
      <div className="blog-list__research-link"><Link to="/research">Explore the research section ↗</Link></div>
    </section>
  </div>;
}
