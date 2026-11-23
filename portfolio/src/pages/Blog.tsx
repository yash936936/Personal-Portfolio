import { Link, Navigate, useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import { blogPosts } from "../data/editorial";
import "./Blog.css";

export default function Blog() {
  const { slug } = useParams();
  const article = blogPosts.find((note) => note.slug === slug);

  if (slug && !article) {
    return <Navigate to="/blog" replace />;
  }

  if (article) {
    return (
      <div className="blog-page">
        <PageHeader
          eyebrow={article.category}
          title={article.title}
          sub={article.excerpt}
        />
        <article className="container blog-article">
          <Link to="/blog" className="blog-article__back">
            <span aria-hidden="true">←</span> All blogs
          </Link>
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
          {blogPosts.map((note, index) => (
            <Reveal key={note.slug} delay={index * 60}>
              <article className="blog-card">
                <div className="blog-card__meta">
                  <span>{note.category}</span>
                  <span>{note.readingTime}</span>
                </div>
                <h2>{note.title}</h2>
                <p>{note.excerpt}</p>
                <Link to={"/blog/" + note.slug}>
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
