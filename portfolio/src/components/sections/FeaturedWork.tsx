import { Link } from "react-router-dom";
import { projects } from "../../data/content";
import Reveal from "../Reveal";
import "./FeaturedWork.css";

export default function FeaturedWork() {
  const [featured, ...recent] = projects;

  if (!featured) return null;

  return (
    <section className="featured-work" aria-labelledby="featured-work-title">
      <div className="container">
        <Reveal className="featured-work__intro">
          <div>
            <span className="eyebrow">Selected work</span>
            <h2 id="featured-work-title" className="featured-work__heading">
              Built to work beyond the demo.
            </h2>
          </div>
          <p className="featured-work__intro-copy">
            A selection of systems, tools, and products shaped through engineering and experimentation.
          </p>
        </Reveal>

        <div className="featured-work__layout">
          <Reveal className="featured-work__lead-wrap">
            <a
              className="featured-work__lead"
              href={featured.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`Explore ${featured.title} on GitHub`}
            >
              <div className="featured-work__lead-top">
                <span className="featured-work__lead-label">Featured build</span>
                <span className="featured-work__lead-mark" aria-hidden="true">↗</span>
              </div>
              <div className="featured-work__lead-art" aria-hidden="true">
                <span className="featured-work__orbit featured-work__orbit--outer" />
                <span className="featured-work__orbit featured-work__orbit--inner" />
                <span className="featured-work__lead-core">{featured.title.split(/\\s+/).map((word) => word[0]).slice(0, 2).join("")}</span>
              </div>
              <div className="featured-work__lead-bottom">
                <div>
                  <span className="featured-work__category">{featured.category}</span>
                  <h3>{featured.title}</h3>
                </div>
                <span className="featured-work__year">{featured.year}</span>
              </div>
              <span className="featured-work__lead-cta">Explore project</span>
            </a>
          </Reveal>

          <div className="featured-work__recent">
            <div className="featured-work__recent-heading">
              <span className="eyebrow">More work</span>
              <span className="featured-work__recent-count">{recent.length} projects</span>
            </div>
            <div className="featured-work__stack">
              {recent.map((project, index) => (
                <a
                  className="featured-work__card"
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  key={project.slug}
                  style={{ "--stack-offset": `${index * 13}px`, "--stack-tilt": index % 2 === 0 ? "-0.8deg" : "0.8deg" } as React.CSSProperties}
                  aria-label={`Explore ${project.title} on GitHub`}
                >
                  <span className="featured-work__card-top">
                    <span>{project.category}</span>
                    <span aria-hidden="true">↗</span>
                  </span>
                  <span className="featured-work__card-title">{project.title}</span>
                  <span className="featured-work__card-bottom">
                    <span>{project.year}</span>
                    <span className="featured-work__card-link">View project</span>
                  </span>
                </a>
              ))}
            </div>
            <Link to="/work" className="featured-work__all-link">
              Explore all work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
