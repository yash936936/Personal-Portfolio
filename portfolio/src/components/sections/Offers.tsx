import { Link } from "react-router-dom";
import { offers } from "../../data/content";
import Reveal from "../Reveal";
import "./Offers.css";

export default function Offers() {
  return (
    <section className="offers">
      <div className="container">
        <div className="offers__intro">
          <Reveal>
            <h2 className="offers__heading">
              Turning ambition <br /> into shipped systems
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="offers__sub">
              I combine strategy, engineering, and design to build the thing you actually
              need — and make sure it reaches production.
            </p>
            <Link to="/contact" className="offers__cta">
              Book a call
            </Link>
          </Reveal>
        </div>

        <div className="offers__grid">
          {offers.map((offer, i) => (
            <Reveal key={offer.href} delay={i * 90}>
              <Link to={offer.href} className="offer-card" data-cursor="link">
                <span className="offer-card__kicker">{offer.kicker}</span>
                <h3 className="offer-card__title">
                  {offer.title.split("\n").map((line, li) => (
                    <span key={li} className="offer-card__title-row">
                      {line}
                    </span>
                  ))}
                </h3>
                <p className="offer-card__desc">{offer.desc}</p>
                <span className="offer-card__arrow" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M4 14L14 4M14 4H6M14 4V12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
