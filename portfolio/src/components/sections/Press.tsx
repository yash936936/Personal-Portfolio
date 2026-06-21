import { press } from "../../data/content";
import Reveal from "../Reveal";
import "./Press.css";

export default function Press() {
  return (
    <section className="press">
      <div className="container">
        <Reveal>
          <p className="press__label">Featured / shared on</p>
          <div className="press__row">
            {press.map((p) => (
              <span className="press__item" key={p}>
                {p}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
