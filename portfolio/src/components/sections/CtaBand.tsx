import { Link } from "react-router-dom";
import Reveal from "../Reveal";
import "./CtaBand.css";

export default function CtaBand() {
  return (
    <section className="cta-band">
      <div className="container">
        <Reveal>
          <Link to="/work" className="cta-band__card" data-cursor="link">
            <div className="cta-band__media" aria-hidden="true" />
            <div className="cta-band__overlay">
              <span className="cta-band__play">
                <svg width="16" height="18" viewBox="0 0 14 16" fill="none">
                  <path d="M0 0L14 8L0 16V0Z" fill="currentColor" />
                </svg>
              </span>
              <h2 className="cta-band__title">See the work</h2>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
