import { Link } from "react-router-dom";
import Reveal from "../Reveal";
import "./ContactBand.css";

export default function ContactBand() {
  return (
    <section className="contact-band">
      <div className="container contact-band__inner">
        <Reveal>
          <h2 className="contact-band__heading">
            Got a project worth <br /> building well?
          </h2>
          <Link to="/contact" className="contact-band__cta">
            Book a call
          </Link>
        </Reveal>

        <Reveal delay={120}>
          <div className="contact-band__avatars" aria-hidden="true">
            {Array.from({ length: 4 }).map((_, i) => (
              <span
                key={i}
                className="contact-band__avatar"
                style={{
                  background: `hsl(${18 + i * 26}, 38%, ${58 - i * 4}%)`,
                  zIndex: 4 - i,
                  transform: `translateX(${i * -18}px)`,
                }}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}