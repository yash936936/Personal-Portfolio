import { Link, Navigate, useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import { technicalNotes } from "../data/editorial";
import "./Writing.css";

export default function Writing() {
  const { slug } = useParams();
  const article = technicalNotes.find((note) => note.slug === slug);

  if (slug && !article) {
    return <Navigate to="/writing" replace />;
  }

  if (article) {
    return (
      <div className="writing-page">
        <PageHeader
          eyebrow={article.category}
          title={article.title}
          sub={article.excerpt}
        />
        <article className="container writing-article">
          <Link to="/writing" className="writing-article__back">
            <span aria-hidden="true">←</span> All writing
          </Link>
          <p className="writing-article__label">Technical note · {article.readingTime}</p>
          <p className="writing-article__intro">{article.introduction}</p>
          {article.sections.map((section) => (
            <section className="writing-article__section" key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.points && (
                <ul>
                  {section.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
              )}
            </section>
          ))}
          <aside className="writing-article__takeaways">
            <h2>Key points</h2>
            <ul>
              {article.takeaways.map((takeaway) => <li key={takeaway}>{takeaway}</li>)}
            </ul>
          </aside>
          <Link to="/writing" className="writing-article__back writing-article__back--bottom">
            <span aria-hidden="true">←</span> Back to writing
          </Link>
        </article>
      </div>
    );
  }

  return (
    <div className="writing-page">
      <PageHeader
        eyebrow="Writing"
        title="Notes from the work."
        sub="Technical writing on agentic systems, retrieval, model adaptation and practical AI engineering."
      />
      <section className="container writing-list" aria-label="Technical notes">
        <div className="writing-list__intro">
          <Reveal>
            <p>
              These are working technical notes written to explain design choices,
              engineering trade-offs and evaluation methods. They are not presented
              as peer-reviewed papers or external publications.
            </p>
          </Reveal>
        </div>
        <div className="writing-list__grid">
          {technicalNotes.map((note, index) => (
            <Reveal key={note.slug} delay={index * 60}>
              <article className="writing-card">
                <div className="writing-card__meta">
                  <span>{note.category}</span>
                  <span>{note.readingTime}</span>
                </div>
                <h2>{note.title}</h2>
                <p>{note.excerpt}</p>
                <Link to={"/writing/" + note.slug}>
                  Read the note <span aria-hidden="true">↗</span>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
