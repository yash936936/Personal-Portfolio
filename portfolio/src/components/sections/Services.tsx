import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { offers } from "../../data/content";
import Reveal from "../Reveal";
import "./Services.css";

const META = [
  {
    label: "AI & Agentic Systems",
    bg: "var(--color-primary)",
    fg: "var(--color-on-primary)",
    style: { top: "8%", left: "34%" },
    side: "left" as const,
    vAnchor: "top" as const,
    depth: 16,
    floatDelay: "0s",
  },
  {
    label: "Full-stack Web Apps",
    bg: "var(--color-surface-dark)",
    fg: "var(--color-on-dark)",
    style: { top: "42%", right: "6%" },
    side: "right" as const,
    vAnchor: "top" as const,
    depth: 24,
    floatDelay: "1.4s",
  },
  {
    label: "Deployment & Infra",
    bg: "var(--color-surface-card)",
    fg: "var(--color-ink)",
    style: { top: "76%", left: "5%" },
    side: "left" as const,
    vAnchor: "bottom" as const,
    depth: 12,
    floatDelay: "2.6s",
  },
] as const;

export default function Services() {
  const [active, setActive] = useState<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  function open(index: number) {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setActive(index);
  }

  function close() {
    closeTimerRef.current = setTimeout(() => setActive(null), 300);
  }

  function toggle(index: number) {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    if (active === index) {
      navigate(offers[index].href);
    } else {
      setActive(index);
    }
  }

  function handleStageMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const element = stageRef.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const mx = (event.clientX - rect.left) / rect.width - 0.5;
    const my = (event.clientY - rect.top) / rect.height - 0.5;
    element.style.setProperty("--mx", mx.toFixed(3));
    element.style.setProperty("--my", my.toFixed(3));
  }

  function handleStageMouseLeave() {
    const element = stageRef.current;
    if (!element) return;
    element.style.setProperty("--mx", "0");
    element.style.setProperty("--my", "0");
  }

  return (
    <section className="services" aria-labelledby="services-heading">
      <div className="container">
        <div className="services__intro">
          <Reveal>
            <span className="services__eyebrow">Be precise. Be fast. Be bold.</span>
            <h2 id="services-heading" className="services__heading">
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
          <div
            className="services__stage"
            ref={stageRef}
            onMouseMove={handleStageMouseMove}
            onMouseLeave={handleStageMouseLeave}
          >
            <span className="services__ring services__ring--a" aria-hidden="true" />
            <span className="services__ring services__ring--b" aria-hidden="true" />

            {offers.map((offer, index) => {
              const meta = META[index];
              const isActive = active === index;
              return (
                <div
                  key={offer.href}
                  className={[
                    "services__item",
                    `services__item--${meta.side}`,
                    `services__item--anchor-${meta.vAnchor}`,
                    isActive ? "services__item--active" : "",
                  ].join(" ")}
                  style={
                    { ...meta.style, "--depth": `${meta.depth}px` } as unknown as React.CSSProperties
                  }
                  onMouseEnter={() => open(index)}
                  onMouseLeave={close}
                >
                  <div
                    className="services__item-inner"
                    style={{ "--float-delay": meta.floatDelay } as unknown as React.CSSProperties}
                  >
                    <button
                      type="button"
                      className="services__pill"
                      style={{ background: meta.bg, color: meta.fg }}
                      onClick={() => toggle(index)}
                      aria-expanded={isActive}
                      aria-controls={`service-card-${index}`}
                    >
                      {meta.label}
                      <span className="services__pill-icon" aria-hidden="true">
                        <svg className="services__icon services__icon--plus" viewBox="0 0 20 20" focusable="false">
                          <path d="M10 4v12M4 10h12" />
                        </svg>
                        <svg className="services__icon services__icon--close" viewBox="0 0 20 20" focusable="false">
                          <path d="M5 5l10 10M15 5L5 15" />
                        </svg>
                      </span>
                    </button>

                    <div
                      id={`service-card-${index}`}
                      className="services__card"
                      aria-hidden={!isActive}
                    >
                      <h3 className="services__card-title">
                        {offer.title.split("\n").map((line, lineIndex) => (
                          <span key={lineIndex} className="services__card-title-row">
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
                        {offer.desc}
                      </Link>
                    </div>
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
