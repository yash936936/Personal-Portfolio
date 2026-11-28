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
              Methodical approach, clear communication, honest scoping, deadlines that
              hold. I'll make you trust an engineer again.
            </p>
            <div className="approach__row">
              <Link to="/contact" className="approach__cta">
                Let's take the time to talk
              </Link>
              <Link to="/work" className="approach__cta approach__cta--work" data-cursor="link">
                <span className="approach__cta-title">Explore Work</span>
                <span className="approach__switch" aria-hidden="true">
                  <span className="approach__switch-thumb" />
                </span>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
