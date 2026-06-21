import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import "./Blog.css";

const notes = [
  { title: "Debugging PicklingError on Windows multiprocessing", date: "Mar 2026", tag: "ML Ops" },
  { title: "Three-stage document reconstruction: lessons learned", date: "Feb 2026", tag: "Computer Vision" },
  { title: "Deploying a FastAPI + Keras service to Railway", date: "Jan 2026", tag: "Deployment" },
  { title: "Why I stopped splitting before stratifying", date: "Dec 2025", tag: "Data" },
];

export default function Blog() {
  return (
    <>
      <PageHeader
        eyebrow="Notes"
        title="Things I've learned shipping this stuff."
        sub="Short write-ups from real projects — placeholders for now."
      />

      <section className="container blog-list">
        {notes.map((n, i) => (
          <Reveal key={n.title} delay={i * 70}>
            <article className="blog-row">
              <span className="blog-row__tag">{n.tag}</span>
              <h3 className="blog-row__title">{n.title}</h3>
              <span className="blog-row__date">{n.date}</span>
            </article>
          </Reveal>
        ))}
      </section>
    </>
  );
}
