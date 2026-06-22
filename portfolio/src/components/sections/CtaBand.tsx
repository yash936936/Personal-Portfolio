import { Link } from "react-router-dom";
import Reveal from "../Reveal";
import "./CtaBand.css";

const tags = [
  "Full-Stack", "AI/ML", "React", "Node.js",
  "System Design", "FastAPI", "TypeScript", "Cloudflare",
];

export default function CtaBand() {
  return (
    <section className="cta-band">
      <div className="container">
        <Reveal>
          <Link to="/work" className="cta-band__card" data-cursor="link">
            {/* Warm cream background with subtle texture */}
            <div className="cta-band__media" aria-hidden="true" />

            {/* Floating tag pills */}
            <div className="cta-band__tags" aria-hidden="true">
              {tags.map((tag, i) => (
                <span
                  key={tag}
                  className="cta-band__tag"
                  style={{ "--i": i } as React.CSSProperties}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Center content */}
            <div className="cta-band__overlay">
              <p className="cta-band__eyebrow">Selected Projects</p>
              <h2 className="cta-band__title">See the work</h2>
              <span className="cta-band__arrow">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                View all projects
              </span>
            </div>

            {/* Terracotta glow orbs */}
            <div className="cta-band__orb cta-band__orb--a" aria-hidden="true" />
            <div className="cta-band__orb cta-band__orb--b" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}