import { Link } from "react-router-dom";
import Reveal from "../Reveal";
import "./ContactBand.css";

export default function ContactBand() {
  return (
    <section className="contact-band">
      <div className="container contact-band__inner">
        <Reveal>
          <div className="contact-band__row">
            <h2 className="contact-band__heading">
              Have a system worth <br /> building well?
            </h2>
            <Link to="/contact" className="contact-band__cta">
              Start a conversation
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
