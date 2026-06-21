import { testimonials } from "../../data/content";
import Reveal from "../Reveal";
import "./Testimonials.css";

function Stars({ count }: { count: number }) {
  return (
    <span className="testimonial-card__stars" aria-label={`${count} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill={i < count ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.4">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

export default function Testimonials() {
  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="testimonials">
      <div className="container">
        <Reveal>
          <span className="eyebrow">What people say</span>
          <h2 className="testimonials__heading">Trusted by the people I've built with</h2>
        </Reveal>
      </div>

      <div className="testimonials__track-wrap">
        <div className="testimonials__track">
          {doubled.map((t, i) => (
            <article className="testimonial-card" key={i}>
              <div className="testimonial-card__top">
                <span className="testimonial-card__avatar" aria-hidden="true">
                  {t.name.charAt(0)}
                </span>
                <div>
                  <p className="testimonial-card__name">{t.name}</p>
                  <p className="testimonial-card__role">{t.role}</p>
                </div>
              </div>
              <p className="testimonial-card__quote">“{t.quote}”</p>
              <Stars count={t.rating} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
