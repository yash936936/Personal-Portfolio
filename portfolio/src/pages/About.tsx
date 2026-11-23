import { useEffect, useState } from "react";
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
  const sections = ["overview", "skills", "connect"];

  useEffect(() => {
    const handleScroll = () => {
      let current = "overview";
      document.querySelectorAll(".about__section").forEach((section) => {
        if (section.getBoundingClientRect().top <= 150) {
          current = section.getAttribute("id") || current;
        }
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    const top = element.getBoundingClientRect().top + window.scrollY - 100;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top, behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <div className="about-page">
      <PageHeader
        eyebrow="About Me"
        title="AI engineering, research and project work."
        sub="Designing intelligent systems, exploring their architecture and testing ideas through practical engineering."
      />
      <div className="container about__container">
        <aside className="about__sidebar" aria-label="About page sections">
          <div className="about__sticky-nav">
            <span className="eyebrow">Contents</span>
            <ul className="about__nav-list">
              {sections.map((id, index) => (
                <li key={id}>
                  <button
                    type="button"
                    className={"about__nav-btn " + (activeSection === id ? "active" : "")}
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

        <div className="about__content">
          <section id="overview" className="about__section">
            <Reveal>
              <h2 className="about__h2">Overview</h2>
              <p className="about__text">
                I&apos;m an AI-focused technical builder interested in agentic AI, large language
                models, retrieval systems and applied machine learning. I enjoy shaping system
                architecture, building practical prototypes and testing whether the result works
                as intended.
              </p>
              <p className="about__text">
                My work explores how intelligent systems manage context, use tools, coordinate
                agents and turn retrieved information into useful outputs. Software development,
                testing and infrastructure support that work from prototype to application.
              </p>
            </Reveal>
          </section>

          <section id="skills" className="about__section">
            <Reveal>
              <h2 className="about__h2">Technical Arsenal</h2>
              <p className="about__text">
                A practical foundation spanning AI engineering, software development, data
                analysis and cloud integration.
              </p>
              <div className="about__skills-grid">
                {SKILLS.map((skill) => (
                  <div className="about__skill-card" key={skill.name} style={{ "--skill-accent": skill.accent } as CSSProperties}>
                    <span className="about__skill-badge">
                      <img src={skill.icon} alt={skill.name} className="about__skill-icon" />
                    </span>
                    <span className="about__skill-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>

          <section id="connect" className="about__section">
            <Reveal>
              <h2 className="about__h2">Connect &amp; Credentials</h2>
              <div className="about__reveal-cards">
                <a href="https://github.com/yash936936" target="_blank" rel="noopener noreferrer" className="reveal-card">
                  <div className="reveal-card__cover">
                    <span className="reveal-card__title">GitHub</span>
                  </div>
                  <div className="reveal-card__content"><p>View repositories ↗</p></div>
                </a>
                <a href="https://linkedin.com/in/yashmalik-/" target="_blank" rel="noopener noreferrer" className="reveal-card" style={{ "--hover-color": "#0077b5" } as CSSProperties}>
                  <div className="reveal-card__cover">
                    <span className="reveal-card__title">LinkedIn</span>
                  </div>
                  <div className="reveal-card__content"><p>Connect professionally ↗</p></div>
                </a>
                <a href="https://drive.google.com/drive/folders/1as0o0p7JRGXrWlpTwC9ZlgsXRN7WeX2F?usp=sharing" target="_blank" rel="noopener noreferrer" className="reveal-card" style={{ "--hover-color": "var(--color-primary)" } as CSSProperties}>
                  <div className="reveal-card__cover">
                    <span className="reveal-card__title">Certifications</span>
                  </div>
                  <div className="reveal-card__content"><p>View credentials ↗</p></div>
                </a>
              </div>
            </Reveal>
          </section>
        </div>
      </div>
    </div>
  );
}
