import { useCallback, useEffect, useRef, useState } from "react";
import Reveal from "../Reveal";
import "./SkillsRotator.css";

const CATEGORIES = [
  {
    label: "LLM & Agentic AI",
    skills: [
      "Large Language Models", "LangChain", "LangGraph", "Tool Calling",
      "Agent Orchestration", "Multi-Agent Workflows", "RAG Systems", "Prompt Evaluation",
    ],
  },
  {
    label: "Memory & Retrieval",
    skills: [
      "Hybrid Retrieval", "Vector Search", "BM25", "Reranking",
      "Graph Expansion", "Memory Lifecycle", "Provenance", "Citation Verification",
    ],
  },
  {
    label: "Machine Learning",
    skills: [
      "PyTorch", "TensorFlow", "Scikit-learn", "Computer Vision",
      "Model Fine-Tuning", "LoRA / QLoRA", "Model Evaluation", "MLOps",
    ],
  },
  {
    label: "Software & Infrastructure",
    skills: [
      "Python", "TypeScript", "React", "FastAPI", "Node.js",
      "SQLite / PostgreSQL", "Docker", "Cloud Deployment",
    ],
  },
] as const;

const N = CATEGORIES.length;
const INTERVAL = 2600;

export default function SkillsRotator() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback((next: number) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive(next);
      setAnimating(false);
      return;
    }
    setAnimating(true);
    window.setTimeout(() => {
      setActive(next);
      setAnimating(false);
    }, 220);
  }, []);

  const startTimer = useCallback((from: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    let current = from;
    timerRef.current = setInterval(() => {
      current = (current + 1) % N;
      advance(current);
    }, INTERVAL);
  }, [advance]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    startTimer(0);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

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
            <h2 className="skills-rotator__heading">AI systems, built with clear engineering</h2>
          </Reveal>
          <div className="skills-rotator__right">
            <Reveal delay={80}>
              <p className="skills-rotator__copy">
                My focus is AI engineering: LLM applications, agentic workflows, memory,
                retrieval and model evaluation. Software development and infrastructure
                support the systems around them.
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
                      onClick={() => {
                        advance(idx);
                        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) startTimer(idx);
                      }}
                      aria-pressed={offset === 0}
                    >
                      <span className="skills-rotator__strip-text">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={140}>
              <p className="skills-rotator__eyebrow">Areas I work across</p>
              <div className={`skills-rotator__pills ${animating ? "skills-rotator__pills--exit" : "skills-rotator__pills--enter"}`}>
                {current.skills.map((skill) => <span className="skills-rotator__pill" key={skill}>{skill}</span>)}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
