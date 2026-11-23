import { Link } from "react-router-dom";
import Reveal from "../Reveal";
import "./ApproachStrip.css";

export default function ApproachStrip() {
  return (
    <section className="approach">
      <div className="container">
        <Reveal>
          <div className="approach__card">
            <p className="approach__text">
              Thoughtful architecture, bounded workflows and honest evaluation.
              I build AI systems that are useful, understandable and clear about
              what they can and cannot do.
            </p>
            <div className="approach__row">
              <Link to="/contact" className="approach__cta">
                Let&apos;s discuss an idea
              </Link>
              <Link to="/work" className="approach__cta approach__cta--work" data-cursor="link">
                <span className="approach__cta-title">Explore the work</span>
                <span className="approach__cta-arrow">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Browse all work
                </span>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
