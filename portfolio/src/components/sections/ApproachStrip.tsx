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
            <Link to="/contact" className="approach__cta">
              Let's take the time to talk
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
