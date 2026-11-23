import { Link, Navigate, useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import { blogPosts } from "../data/editorial";
import "./Blog.css";

const RELATED_PROJECTS: Record<string, Array<{ label: string; slug: string }>> = {
  "designing-bounded-agent-workflows": [
    { label: "Coding Harness", slug: "coding-harness" },
  ],
  "evaluating-rag-beyond-retrieval": [
    { label: "Legal AI Assistant", slug: "legal-ai" },
    { label: "AI Document Analysis API", slug: "document-analysis" },
  ],
  "building-a-local-research-assistant": [
    { label: "Fathom Research Assistant", slug: "fathom" },
  ],
};

export default function Blog() {
  const { slug } = useParams();
  const article = blogPosts.find((post) => post.slug === slug);

  if (slug && !article) {
    return <Navigate to="/blog" replace />;
  }

  if (article) {
    const relatedProjects = RELATED_PROJECTS[article.slug] ?? [];

    return (
      <div className="blog-page">
        <PageHeader
          eyebrow={article.category}
          title={article.title}
          sub={article.excerpt}
        />
        <article className="container blog-article">
          <nav className="blog-breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/blog">Blog</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{article.title}</span>
          </nav>
          <p className="blog-article__label">Blog article · {article.readingTime}</p>
          <p className="blog-article__intro">{article.introduction}</p>
          {article.sections.map((section) => (
            <section className="blog-article__section" key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.points && (
                <ul>
                  {section.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
              )}
            </section>
          ))}
          <aside className="blog-article__takeaways">
            <h2>Key points</h2>
            <ul>
              {article.takeaways.map((takeaway) => <li key={takeaway}>{takeaway}</li>)}
            </ul>
          </aside>

          {relatedProjects.length > 0 && (
            <section className="blog-article__related" aria-labelledby="related-projects-heading">
              <h2 id="related-projects-heading">Related projects</h2>
              <div className="blog-article__related-links">
                {relatedProjects.map((project) => (
                  <Link key={project.slug} to={"/work#project-" + project.slug}>
                    {project.label} <span aria-hidden="true">↗</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <Link to="/blog" className="blog-article__back blog-article__back--bottom">
            <span aria-hidden="true">←</span> Back to blogs
          </Link>
        </article>
      </div>
    );
  }

  return (
    <div className="blog-page">
      <PageHeader
        eyebrow="Blog"
        title="Ideas from the workbench."
        sub="Articles on agentic systems, retrieval, model adaptation and practical AI engineering."
      />
      <section className="container blog-list" aria-label="Blog articles">
        <div className="blog-list__intro">
          <Reveal>
            <p>
              These blog articles explain design choices, engineering trade-offs and
              evaluation methods drawn from practical engineering work.
            </p>
          </Reveal>
        </div>
        <div className="blog-list__grid">
          {blogPosts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 60}>
              <article className="blog-card">
                <div className="blog-card__meta">
                  <span>{post.category}</span>
                  <span>{post.readingTime}</span>
                </div>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <Link to={"/blog/" + post.slug}>
                  Read article <span aria-hidden="true">↗</span>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
