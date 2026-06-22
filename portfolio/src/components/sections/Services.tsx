import { useState } from "react";
import { Link } from "react-router-dom";
import { offers } from "../../data/content";
import Reveal from "../Reveal";
import "./Services.css";

const PILLS = [
  { label: "Be precise", bg: "var(--color-primary)", fg: "var(--color-on-primary)" },
  { label: "Be fast", bg: "var(--color-surface-dark)", fg: "var(--color-on-dark)" },
  { label: "Be bold", bg: "var(--color-accent-teal)", fg: "var(--color-ink)" },
] as const;

export default function Services() {
  const [active, setActive] = useState<number | null>(null);

  function toggle(i: number) {
    setActive((cur) => (cur === i ? null : i));
  }

  return (
    <section className="services">
      <div className="container">
        <div className="services__intro">
          <Reveal>
            <span className="services__eyebrow">Be precise. Be fast. Be bold.</span>
            <h2 className="services__heading">
              Turning ambition <br /> into shipped systems
            </h2>
          </Reveal>

          <Reveal delay={100} className="services__intro-right">
            <p className="services__sub">
              I combine strategy, engineering, and design to build the thing you actually
              need — and make sure it reaches production.
            </p>
            <Link to="/contact" className="services__cta">
              Book a call
            </Link>
          </Reveal>
        </div>

        <Reveal delay={140}>
          <div className="services__stage">
            <span className="services__ring services__ring--a" aria-hidden="true" />
            <span className="services__ring services__ring--b" aria-hidden="true" />

            {offers.map((offer, i) => {
              const pill = PILLS[i];
              const isActive = active === i;
              return (
                <div
                  key={offer.href}
                  className={[
                    "services__item",
                    `services__item--${i}`,
                    isActive ? "services__item--active" : "",
                  ].join(" ")}
                >
                  <button
                    type="button"
                    className="services__pill"
                    style={{ background: pill.bg, color: pill.fg }}
                    onClick={() => toggle(i)}
                    aria-expanded={isActive}
                  >
                    <span className="services__pill-icon" aria-hidden="true">
                      <svg viewBox="0 0 20 20" focusable="false">
                        <path d="M4 10h11M11 6l4 4-4 4" />
                      </svg>
                    </span>
                    {pill.label}
                  </button>

                  <div className="services__card" aria-hidden={!isActive}>
                    <button
                      type="button"
                      className="services__close"
                      onClick={() => setActive(null)}
                      aria-label="Close"
                      tabIndex={isActive ? 0 : -1}
                    >
                      <svg viewBox="0 0 20 20" focusable="false">
                        <path d="M5 5l10 10M15 5L5 15" />
                      </svg>
                    </button>

                    <span className="services__card-kicker">{offer.kicker}</span>
                    <h3 className="services__card-title">
                      {offer.title.split("\n").map((line, li) => (
                        <span key={li} className="services__card-title-row">
                          {line}
                        </span>
                      ))}
                    </h3>

                    <Link
                      to={offer.href}
                      className="services__card-link"
                      data-cursor="link"
                      tabIndex={isActive ? 0 : -1}
                    >
                      <span>{offer.desc}</span>
                      <span className="services__card-arrow" aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                          <path
                            d="M4 14L14 4M14 4H6M14 4V12"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
