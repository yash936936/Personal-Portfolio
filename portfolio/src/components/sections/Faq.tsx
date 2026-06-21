import { faqs } from "../../data/content";
import Reveal from "../Reveal";
import "./Faq.css";

import { useState } from "react";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="faq">
      <div className="container faq__grid">
        <Reveal>
          <h2 className="faq__heading">A few things people ask</h2>
        </Reveal>

        <div className="faq__list">
          {faqs.map((item, i) => (
            <Reveal key={i} delay={i * 70}>
              <FaqItem
                q={item.q}
                a={item.a}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({
  q,
  a,
  isOpen,
  onToggle,
}: {
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`faq-item ${isOpen ? "faq-item--open" : ""}`}>
      <button className="faq-item__trigger" onClick={onToggle} aria-expanded={isOpen}>
        <span className="faq-item__q">{q}</span>
        <span className="faq-item__icon" aria-hidden="true">
          <span />
          <span />
        </span>
      </button>
      <div className="faq-item__panel">
        <div className="faq-item__answer">{a}</div>
      </div>
    </div>
  );
}
