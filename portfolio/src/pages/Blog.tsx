import { useState } from "react";
import { gsap } from "gsap";
import { Link, Navigate, useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import { blogPosts } from "../data/editorial";
import "./Blog.css";

const RELATED_WORK: Record<string, Array<{ label: string; slug: string }>> = {
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
    const related = RELATED_WORK[article.slug] ?? [];
    return <div className="blog-page">
      <PageHeader eyebrow={article.category} title={article.title} sub={article.excerpt} />
      <article className="container blog-article">
        <p className="blog-article__label">Blog · {article.readingTime}</p>
        <p className="blog-article__intro">{article.introduction}</p>
        {article.sections.map((section) => <section className="blog-article__section" key={section.heading}>
          <h2>{section.heading}</h2>
          {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {section.points && <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}
        </section>)}
        <aside className="blog-article__takeaways"><h2>Key points</h2><ul>{article.takeaways.map((item) => <li key={item}>{item}</li>)}</ul></aside>
        {related.length > 0 && <section className="blog-article__related" aria-labelledby="related-work-heading">
          <h2 id="related-work-heading">Related work</h2>
          <div className="blog-article__related-links">
            {related.map((item) => <Link key={item.slug} to={"/work/" + item.slug}>{item.label}</Link>)}
          </div>
        </section>}
        <div className="blog-article__footer-nav"><Link to="/work">Explore work</Link><Link to="/blog" className="blog-article__back">Back to blog</Link></div>
      </article>
    </div>;
  }

  const categories = ["All", ...Array.from(new Set(blogPosts.map((post) => post.category)))];
  const visiblePosts = activeCategory === "All" ? blogPosts : blogPosts.filter((post) => post.category === activeCategory);
  return <div className="blog-page">
    <PageHeader eyebrow="Blog" title="Notes on AI systems and engineering." sub="Technical articles, build breakdowns and research notes from practical engineering work." />
    <section className="container blog-list" aria-label="Blog articles">
      <div className="blog-list__intro"><Reveal><p>Browse by topic, then follow each article into the work or architecture it explains. The articles focus on design choices, implementation and evaluation.</p></Reveal></div>
      <div className="writing-filters" aria-label="Filter blog articles by topic">
        {categories.map((category) => <button type="button" key={category} className={activeCategory === category ? "writing-filter writing-filter--active" : "writing-filter"} onClick={() => setActiveCategory(category)} aria-pressed={activeCategory === category}>{category}</button>)}
      </div>
      <div className="blog-list__rows">
        {visiblePosts.map((post, index) => {
          const animateDescription = (row: HTMLElement, expanded: boolean) => {
            const description = row.querySelector<HTMLElement>(".blog-row__description");
            if (!description) return;
            gsap.killTweensOf(description);
            gsap.to(description, {
              height: expanded ? description.scrollHeight : 0,
              opacity: expanded ? 1 : 0,
              marginTop: expanded ? 14 : 0,
              duration: expanded ? 0.72 : 0.38,
              ease: expanded ? "elastic.out(1, 0.72)" : "power3.inOut",
              overwrite: true,
            });
          };
          return <Reveal key={post.slug} delay={index * 60}>
            <article
              className="blog-row"
              onMouseEnter={(event) => animateDescription(event.currentTarget, true)}
              onMouseLeave={(event) => animateDescription(event.currentTarget, false)}
              onFocusCapture={(event) => animateDescription(event.currentTarget, true)}
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) animateDescription(event.currentTarget, false);
              }}
            >
              <div className="blog-row__content">
                <div className="blog-card__meta"><span>{post.category}</span><span>{post.readingTime}</span></div>
                <h2><Link to={"/blog/" + post.slug}>{post.title}</Link></h2>
                <p>{post.excerpt}</p>
                <div className="blog-row__description"><p>{post.introduction}</p></div>
                <div className="blog-card__related">{(RELATED_WORK[post.slug] ?? []).map((item) => <Link key={item.slug} to={"/work/" + item.slug}>{item.label}</Link>)}</div>
              </div>
            </article>
          </Reveal>;
        })}
      </div>
    </section>
  </div>;
}
