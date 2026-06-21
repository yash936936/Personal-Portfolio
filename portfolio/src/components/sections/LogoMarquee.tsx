import { logos } from "../../data/content";
import "./LogoMarquee.css";

export default function LogoMarquee() {
  const doubled = [...logos, ...logos];

  return (
    <section className="marquee">
      <div className="marquee__track-wrap">
        <div className="marquee__track">
          {doubled.map((logo, i) => (
            <span className="marquee__item" key={i}>
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
