import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import { offers } from "../data/content";
import "./ServicesIndex.css";

export default function ServicesIndex() {
  return (
    <div className="services-index">
      <PageHeader
        eyebrow="Engineering capabilities"
        title="Build the system, not just the screen."
        sub="From model design to product interfaces and deployment, each layer is planned to work as one system."
      />

      <section className="container services-index__list" aria-label="Engineering capabilities">
        {offers.map((offer, index) => (
          <Reveal key={offer.href} delay={index * 70}>
            <Link to={offer.href} className="services-index__card">
              <div>
                <h2>
                  {offer.title.split("\n").map((line, lineIndex) => (
                    <span key={lineIndex}>{line}</span>
                  ))}
                </h2>
                <p>{offer.desc}</p>
              </div>
              <span className="services-index__open" aria-hidden="true">+</span>
            </Link>
          </Reveal>
        ))}
      </section>
    </div>
  );
}
