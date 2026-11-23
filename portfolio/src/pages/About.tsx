import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import "./About.css";

const SKILLS = [
  { name: "LangChain & RAG", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", accent: "var(--color-primary)" },
  { name: "Agentic Architecture", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", accent: "var(--color-accent-teal)" },
  { name: "MERN Stack", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", accent: "#4f6f8a" },
  { name: "Data Analysis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg", accent: "var(--color-accent-violet)" },
  { name: "Cloud Integration", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg", accent: "var(--color-accent-amber)" },
  { name: "UI/UX Design", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", accent: "var(--color-primary)" },
];

export default function About() {
  const [activeSection, setActiveSection] = useState("overview");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".about__section");
      let current = "overview";

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 150) {
          current = section.getAttribute("id") || current;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    const offset = 100;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: offsetPosition,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <div className="about-page">
      <PageHeader
        eyebrow="About Me"
        title="Engineering, Strategy & Autonomous Systems."
        sub="Designing agentic AI systems, intelligent workflows and dependable software for real-world use."
      />

      <div className="container about__container">
        <aside className="about__sidebar" aria-label="About page sections">
          <div className="about__sticky-nav">
            <span className="eyebrow">Contents</span>
            <ul className="about__nav-list">
              {["overview", "skills", "connect"].map((id, index) => (
                <li key={id}>
                  <button
                    type="button"
                    className={`about__nav-btn ${activeSection === id ? "active" : ""}`}
                    onClick={() => scrollToSection(id)}
                    aria-current={activeSection === id ? "location" : undefined}
                  >
                    <span className="about__nav-dot" aria-hidden="true" />
                    <span className="about__nav-index">{String(index + 1).padStart(2, "0")}</span>
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="about__content" ref={contentRef}>
          <section id="overview" className="about__section">
            <Reveal>
              <h2 className="about__h2">Overview</h2>
              <p className="about__text">
                I’m Yash Malik, an AI-focused technical builder working across agentic AI,
                intelligent systems, and scalable application architecture. I use AI as a
                core part of my daily workflow to design AI agents, multi-agent systems,
                intelligent workflows, and AI-driven applications.
              </p>
              <p className="about__text">
                Rather than focusing on traditional manual coding, I specialize in system
                architecture, AI orchestration, scalable workflows, and turning complex
                ideas into working products. I combine technical thinking with a management
                mindset to bridge AI, engineering, and real-world product development.
              </p>
            </Reveal>
          </section>

          <section id="skills" className="about__section">
            <Reveal>
              <h2 className="about__h2">Technical Arsenal</h2>
              <p className="about__text">
                A technical foundation spanning artificial intelligence, cybersecurity,
                data analysis and modern web development.
              </p>
              <div className="about__skills-grid">
                {SKILLS.map((skill) => (
                  <div className="about__skill-card" key={skill.name} style={{ "--skill-accent": skill.accent } as CSSProperties}>
                    <span className="about__skill-badge">
                      <img src={skill.icon} alt="" className="about__skill-icon" />
                    </span>
                    <span className="about__skill-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>

          <section id="connect" className="about__section">
            <Reveal>
              <h2 className="about__h2">Connect</h2>
              <div className="about__reveal-cards">
                <a href="https://github.com/yash936936" target="_blank" rel="noreferrer" className="reveal-card">
                  <div className="reveal-card__cover">
                    <span className="reveal-card__title">GitHub</span>
                  </div>
                  <div className="reveal-card__content"><p>View Repositories ➔</p></div>
                </a>
                <a href="https://linkedin.com/in/yashmalik-/" target="_blank" rel="noreferrer" className="reveal-card" style={{ "--hover-color": "#0077b5" } as CSSProperties}>
                  <div className="reveal-card__cover">
                    <span className="reveal-card__title">LinkedIn</span>
                  </div>
                  <div className="reveal-card__content"><p>Connect Professionally ➔</p></div>
                </a>
                <a href="https://drive.google.com/drive/folders/1as0o0p7JRGXrWlpTwC9ZlgsXRN7WeX2F?usp=sharing" className="reveal-card" style={{ "--hover-color": "var(--color-primary)" } as CSSProperties}>
                  <div className="reveal-card__cover">
                    <span className="reveal-card__title">Certifications</span>
                  </div>
                  <div className="reveal-card__content"><p>View Credentials ➔</p></div>
                </a>
              </div>
            </Reveal>
          </section>
        </div>
      </div>
    </div>
  );
}
