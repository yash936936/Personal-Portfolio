import { sectors } from "../../data/content";
import Reveal from "../Reveal";
import "./SectorsIntro.css";

export default function SectorsIntro() {
  return (
    <section className="sectors">
      <div className="container sectors__grid">
        <Reveal>
          <h2 className="sectors__heading">
            Engineering at the service of real products
          </h2>
        </Reveal>

        <div className="sectors__right">
          <Reveal delay={80}>
            <p className="sectors__copy">
              For years I've worked across the stack on problems that need both a trained
              model and a working interface — not one or the other. Understanding both
              halves shapes how I scope, build, and ship every project.
            </p>
          </Reveal>

          <Reveal delay={160}>
            <p className="sectors__label">Where I've worked</p>
            <div className="sectors__tags">
              {sectors.map((s) => (
                <span className="sectors__tag" key={s}>
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
