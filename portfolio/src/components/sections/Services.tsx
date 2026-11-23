import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { offers } from "../../data/content";
import Reveal from "../Reveal";
import "./Services.css";

const META = [
  { label: "AI & Agentic Systems", bg: "var(--color-primary)", fg: "var(--color-on-primary)", style: { top: "8%", left: "34%" }, side: "left" as const, vAnchor: "top" as const, depth: 16, floatDelay: "0s" },
  { label: "Software Development & Testing", bg: "#4f6f8a", fg: "#fdfaf5", style: { top: "42%", right: "6%" }, side: "right" as const, vAnchor: "top" as const, depth: 24, floatDelay: "1.4s" },
  { label: "Deployment & Infra", bg: "var(--color-accent-teal)", fg: "var(--color-ink)", style: { top: "76%", left: "5%" }, side: "left" as const, vAnchor: "bottom" as const, depth: 12, floatDelay: "2.6s" },
] as const;

export default function Services() {
  const [active, setActive] = useState<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();

  useEffect(() => () => { if (closeTimerRef.current) clearTimeout(closeTimerRef.current); }, []);

  function open(index: number) {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setActive(index);
  }
  function close() {
    closeTimerRef.current = setTimeout(() => setActive(null), 300);
  }
  function toggle(index: number) {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    if (active === index) navigate(offers[index].href);
    else setActive(index);
  }
  function handleStageMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const element = stageRef.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    element.style.setProperty("--mx", ((event.clientX - rect.left) / rect.width - 0.5).toFixed(3));
    element.style.setProperty("--my", ((event.clientY - rect.top) / rect.height - 0.5).toFixed(3));
  }
  function handleStageMouseLeave() {
    stageRef.current?.style.setProperty("--mx", "0");
    stageRef.current?.style.setProperty("--my", "0");
  }

  return (
    <section className="services">
      <div className="container">
        <div className="services__intro">
          <Reveal>
            <span className="services__eyebrow">Engineering capabilities</span>
            <h2 className="services__heading">Designing, building <br /> and testing systems</h2>
          </Reveal>
          <Reveal delay={100} className="services__intro-right">
            <p className="services__sub">
              AI engineering leads the work. Software development, testing and infrastructure
              help turn prototypes into usable applications.
            </p>
            <Link to="/contact" className="services__cta">Discuss a project</Link>
          </Reveal>
        </div>
        <Reveal delay={140}>
          <div className="services__stage" ref={stageRef} onMouseMove={handleStageMouseMove} onMouseLeave={handleStageMouseLeave}>
            <span className="services__ring services__ring--a" aria-hidden="true" />
            <span className="services__ring services__ring--b" aria-hidden="true" />
            {offers.map((offer, index) => {
              const meta = META[index];
              const isActive = active === index;
              return (
                <div
                  key={offer.href}
                  className={["services__item", `services__item--${meta.side}`, `services__item--anchor-${meta.vAnchor}`, isActive ? "services__item--active" : ""].join(" ")}
                  style={{ ...meta.style, "--depth": `${meta.depth}px` } as unknown as React.CSSProperties}
                  onMouseEnter={() => open(index)}
                  onMouseLeave={close}
                >
                  <div className="services__item-inner" style={{ "--float-delay": meta.floatDelay } as unknown as React.CSSProperties}>
                    <button type="button" className="services__pill" style={{ background: meta.bg, color: meta.fg }} onClick={() => toggle(index)} aria-expanded={isActive}>
                      {meta.label}
                      <span className="services__pill-icon" aria-hidden="true">
                        <svg className="services__icon services__icon--arrow" viewBox="0 0 20 20" focusable="false"><path d="M4 10h11M11 6l4 4-4 4" /></svg>
                        <svg className="services__icon services__icon--close" viewBox="0 0 20 20" focusable="false"><path d="M5 5l10 10M15 5L5 15" /></svg>
                      </span>
                    </button>
                    <div className="services__card" aria-hidden={!isActive}>
                      <span className="services__card-kicker">{offer.kicker}</span>
                      <h3 className="services__card-title">
                        {offer.title.split("\n").map((line) => <span key={line} className="services__card-title-row">{line}</span>)}
                      </h3>
                      <Link to={offer.href} className="services__card-link" data-cursor="link" tabIndex={isActive ? 0 : -1}>
                        <span>{offer.desc}</span>
                        <span className="services__card-arrow" aria-hidden="true">
                          <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M4 14L14 4M14 4H6M14 4V12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
