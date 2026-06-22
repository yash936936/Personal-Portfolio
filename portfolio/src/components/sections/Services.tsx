import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { offers } from "../../data/content";
import Reveal from "../Reveal";
import "./Services.css";

// Short pill label + accent color + stage position for each offer.
// side: which edge the pill hugs (controls which way the card opens)
// vAnchor: "top" | "bottom" — controls whether the card drops down or pops up,
//   so it never runs into the stage edge.
// depth: how far this pill drifts with the cursor (px) — varying it per
//   item is what gives the parallax its sense of layering.
// floatDelay: offsets each pill's idle bob so they don't move in sync.
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
    bg: "#4f6f8a",
    fg: "#fdfaf5",
    style: { top: "42%", right: "6%" },
    side: "right" as const,
    vAnchor: "top" as const,
    depth: 24,
    floatDelay: "1.4s",
  },
  {
    label: "Deployment & Infra",
    bg: "var(--color-accent-teal)",
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

  function open(i: number) {
    setActive(i);
  }

  function close() {
    setActive(null);
  }

  function toggle(i: number) {
    // touch/keyboard fallback — hover handles desktop
    setActive((cur) => (cur === i ? null : i));
  }

  // Tracks the cursor inside the stage and exposes it as CSS variables
  // (--mx / --my, both -0.5..0.5) so each pill can drift toward/away from
  // the cursor at its own depth, purely in CSS — no per-frame re-renders.
  function handleStageMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / rect.width - 0.5;
    const my = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--mx", mx.toFixed(3));
    el.style.setProperty("--my", my.toFixed(3));
  }

  function handleStageMouseLeave() {
    const el = stageRef.current;
    if (!el) return;
    el.style.setProperty("--mx", "0");
    el.style.setProperty("--my", "0");
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
          <div
            className="services__stage"
            ref={stageRef}
            onMouseMove={handleStageMouseMove}
            onMouseLeave={handleStageMouseLeave}
          >
            <span className="services__ring services__ring--a" aria-hidden="true" />
            <span className="services__ring services__ring--b" aria-hidden="true" />

            {offers.map((offer, i) => {
              const meta = META[i];
              const isActive = active === i;
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
                  onMouseEnter={() => open(i)}
                  onMouseLeave={close}
                >
                  <div
                    className="services__item-inner"
                    style={
                      { "--float-delay": meta.floatDelay } as unknown as React.CSSProperties
                    }
                  >
                    <button
                      type="button"
                      className="services__pill"
                      style={{ background: meta.bg, color: meta.fg }}
                      onClick={() => toggle(i)}
                      aria-expanded={isActive}
                    >
                      {meta.label}
                      <span className="services__pill-icon" aria-hidden="true">
                        <svg className="services__icon services__icon--arrow" viewBox="0 0 20 20" focusable="false">
                          <path d="M4 10h11M11 6l4 4-4 4" />
                        </svg>
                        <svg className="services__icon services__icon--close" viewBox="0 0 20 20" focusable="false">
                          <path d="M5 5l10 10M15 5L5 15" />
                        </svg>
                      </span>
                    </button>

                    <div className="services__card" aria-hidden={!isActive}>
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
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}