import { useEffect, useRef, useState } from "react";
import Reveal from "../Reveal";
import "./SkillsRotator.css";

const CATEGORIES = [
  {
    label: "AI & ML",
    skills: [
      "LLM Orchestration", "Agentic Architecture", "OpenAI & Claude APIs",
      "LangChain / LangGraph", "Computer Vision", "Document AI",
      "Predictive Modeling", "MLOps", "Edge Deployment", "Prompt Engineering",
    ],
  },
  {
    label: "Software & Cloud",
    skills: [
      "React / TypeScript", "Next.js", "Node.js / Fastify", "MERN Stack",
      "RESTful APIs", "Microservices", "Firebase", "Supabase",
      "Cloud Infrastructure", "Python", "C / Assembly",
    ],
  },
  {
    label: "Automation & Sec",
    skills: [
      "n8n Workflows", "Selenium / Playwright", "Headless Scraping",
      "Business Process Automation", "Lead Generation Pipelines",
      "Data Aggregation", "Cybersecurity Foundations", "Network Defense",
    ],
  },
  {
    label: "Business & Ops",
    skills: [
      "Startup Leadership", "Technical Product Strategy", "Hackathon Organization",
      "Campus Ambassadorship", "Sponsorship Outreach", "Financial Markets",
      "Investor Relations (SEBI)", "Task-Board Management",
    ],
  },
] as const;

const N = CATEGORIES.length;
const INTERVAL = 4200;

export default function SkillsRotator() {
  const [active, setActive] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "100px" },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = window.setInterval(() => {
      setActive((current) => (current + 1) % N);
    }, INTERVAL);

    return () => window.clearInterval(interval);
  }, [isVisible]);

  const current = CATEGORIES[active];
  const strip = [-2, -1, 0, 1, 2].map((offset) => {
    const idx = ((active + offset) % N + N) % N;
    return { idx, offset, cat: CATEGORIES[idx] };
  });

  return (
    <section className="skills-rotator" ref={sectionRef}>
      <div className="container">
        <div className="skills-rotator__top">
          <Reveal>
            <h2 className="skills-rotator__heading">
              Engineering Intelligent, Real-World Solutions
            </h2>
          </Reveal>

          <div className="skills-rotator__right">
            <Reveal delay={80}>
              <p className="skills-rotator__copy">
                A working model needs a working interface. My expertise lies in bridging that gap, fusing AI orchestration with full-stack development so every product is intelligent under the hood and clear on the screen.
              </p>
            </Reveal>

            <Reveal delay={110}>
              <div className="skills-rotator__strip-wrap">
                <div className="skills-rotator__strip-fade skills-rotator__strip-fade--left" />
                <div className="skills-rotator__strip-fade skills-rotator__strip-fade--right" />
                <div className="skills-rotator__strip">
                  {strip.map(({ idx, offset, cat }) => (
                    <button
                      type="button"
                      key={`${idx}-${offset}`}
                      className={[
                        "skills-rotator__strip-item",
                        offset === 0 ? "skills-rotator__strip-item--active" : "",
                        Math.abs(offset) === 2 ? "skills-rotator__strip-item--far" : "",
                      ].filter(Boolean).join(" ")}
                      onClick={() => setActive(idx)}
                      aria-pressed={active === idx}
                    >
                      <span className="skills-rotator__strip-text">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <p className="skills-rotator__eyebrow">What I've worked on</p>
              <div className="skills-rotator__pills">
                {current.skills.map((skill) => (
                  <span className="skills-rotator__pill" key={skill}>{skill}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
