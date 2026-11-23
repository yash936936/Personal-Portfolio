import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import { researchThemes } from "../data/editorial";
import "./Research.css";

export default function Research() {
  return (
    <div className="research-page">
      <PageHeader
        eyebrow="Research"
        title="Questions worth testing."
        sub="Project-led exploration across agentic systems, retrieval quality, model adaptation and the engineering needed to evaluate them."
      />

      <section className="container research-page__intro">
        <Reveal>
          <p>
            My research interests are practical and systems-focused. I use working
            prototypes to explore specific questions, document limitations and
            identify what still needs stronger evaluation.
          </p>
          <span className="research-page__note">
            These are active research themes and engineering investigations, not a
            list of peer-reviewed publications.
          </span>
        </Reveal>
      </section>

      <section className="container research-page__themes" aria-label="Research themes">
        {researchThemes.map((theme, index) => (
          <Reveal key={theme.title} delay={index * 70}>
            <article className="research-card">
              <div className="research-card__index">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="research-card__body">
                <span className="research-card__eyebrow">Research direction</span>
                <h2>{theme.title}</h2>
                <p className="research-card__question">{theme.question}</p>
                <p className="research-card__summary">{theme.summary}</p>
                <h3>Evidence in current work</h3>
                <ul>
                  {theme.evidence.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <div className="research-card__links">
                  {theme.links.map((link) => (
                    <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                      {link.label}
                      <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </section>
    </div>
  );
}
