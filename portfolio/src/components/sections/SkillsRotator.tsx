import { useEffect, useRef, useState } from "react";
import Reveal from "../Reveal";
import "./SkillsRotator.css";

const CATEGORIES = [
  {
    label: "AI & Machine Learning",
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
    label: "Data, Automation & Security",
    skills: [
      "n8n Workflows", "Selenium / Playwright", "Headless Scraping",
      "Business Process Automation", "Lead Generation Pipelines",
      "Data Aggregation", "Cybersecurity Foundations", "Network Defense",
    ],
  },
  {
    label: "Business & Operations",
    skills: [
      "Startup Leadership", "Technical Product Strategy", "Hackathon Organization",
      "Campus Ambassadorship", "Sponsorship Outreach", "Financial Markets",
      "Investor Relations (SEBI)", "Task-Board Management",
    ],
  },
] as const;

const N = CATEGORIES.length;
const INTERVAL = 2200;

export default function SkillsRotator() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function advance(next: number) {
    setAnimating(true);
    setTimeout(() => {
      setActive(next);
      setAnimating(false);
    }, 220);
  }

  function startTimer(from: number) {
    if (timerRef.current) clearInterval(timerRef.current);
    let cur = from;
    timerRef.current = setInterval(() => {
      cur = (cur + 1) % N;
      advance(cur);
    }, INTERVAL);
  }

  useEffect(() => {
    startTimer(0);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const current = CATEGORIES[active];

  const strip = [-2, -1, 0, 1, 2].map((offset) => {
    const idx = ((active + offset) % N + N) % N;
    return { idx, offset, cat: CATEGORIES[idx] };
  });

  return (
    <section className="skills-rotator">
      <div className="container">
        <div className="skills-rotator__top">
          <Reveal>
            <h2 className="skills-rotator__heading">
              Engineering Intelligent, Real-World Solutions
            </h2>
          </Reveal>

          <div className="skills-rotator__right">
            <Reveal delay={80}>
              <p className="skills-rotator__copy" style={{ whiteSpace: "normal", maxWidth: "1200px" }}>
               A working model needs a working interface. My expertise lies in bridging that gap—fusing AI orchestration with robust full-stack development so that every project I ship is both intelligent under the hood and striking on the screen.
              </p>
            </Reveal>

            <Reveal delay={110}>
              <div className="skills-rotator__strip-wrap">
                <div className="skills-rotator__strip-fade skills-rotator__strip-fade--left" />
                <div className="skills-rotator__strip-fade skills-rotator__strip-fade--right" />
                <div className="skills-rotator__strip">
                  {strip.map(({ idx, offset, cat }) => (
                    <button
                      key={`${idx}-${offset}`}
                      className={[
                        "skills-rotator__strip-item",
                        offset === 0 ? "skills-rotator__strip-item--active" : "",
                        Math.abs(offset) === 2 ? "skills-rotator__strip-item--far" : "",
                      ].join(" ")}
                      onClick={() => { advance(idx); startTimer(idx); }}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <p className="skills-rotator__eyebrow">What I've worked on</p>
              <div className={`skills-rotator__pills ${animating ? "skills-rotator__pills--exit" : "skills-rotator__pills--enter"}`}>
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