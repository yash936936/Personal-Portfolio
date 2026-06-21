import { Link } from "react-router-dom";
import { showcase } from "../../data/content";
import Reveal from "../Reveal";
import "./Showcase.css";

export default function Showcase() {
  return (
    <section className="showcase">
      <div className="container">
        <Reveal>
          <h2 className="showcase__heading">Be precise. Be fast. Be bold.</h2>
        </Reveal>

        <div className="showcase__grid">
          {showcase.map((item, i) => (
            <Reveal key={i} delay={i * 60}>
              <Link to={item.href} className="showcase__card" data-cursor="link">
                <div
                  className="showcase__media"
                  style={{
                    background: `linear-gradient(155deg, ${item.color} 0%, var(--color-surface-dark) 130%)`,
                  }}
                >
                  <span className="showcase__play" aria-hidden="true">
                    <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
                      <path d="M0 0L14 8L0 16V0Z" fill="currentColor" />
                    </svg>
                  </span>
                </div>
                <div className="showcase__copy">
                  <span className="showcase__label">{item.label}</span>
                  <p className="showcase__title">{item.title}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
