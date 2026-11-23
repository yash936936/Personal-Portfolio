import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import "./About.css";
import "./AboutResearch.css";

const SKILLS = [
  { name: "LangChain & RAG", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", accent: "var(--color-primary)" },
  { name: "Agentic Architecture", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", accent: "var(--color-accent-teal)" },
  { name: "MERN Stack", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", accent: "#4f6f8a" },
  { name: "Data Analysis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg", accent: "var(--color-accent-violet)" },
  { name: "Cloud Integration", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg", accent: "var(--color-accent-amber)" },
  { name: "UI/UX Design", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", accent: "var(--color-primary)" },
];
const INTERESTS = [
  "Large language models, tool use and model behaviour",
  "Agentic workflows and multi-agent coordination",
  "Memory, retrieval and context management",
  "AI systems architecture, evaluation and reliability",
];
const PROJECTS = [
  { name: "AGM", summary: "Adaptive Graph Memory for AI agents.", to: "/work#project-agm" },
  { name: "SysDesign AI", summary: "AI-assisted system design and architecture generation.", to: "/work#project-sysdesign-ai" },
  { name: "Coding Harness", summary: "Profile-based multi-agent developer tooling.", to: "/work#project-coding-harness" },
  { name: "Fathom", summary: "Local research assistant with evidence-based retrieval.", to: "/work#project-fathom" },
];

export default function About() {
  const [activeSection, setActiveSection] = useState("overview");
  const sections = ["overview", "interests", "projects", "skills", "connect"];

  useEffect(() => {
    const handleScroll = () => {
      let current = "overview";
      document.querySelectorAll(".about__section").forEach((section) => {
        if (section.getBoundingClientRect().top <= 150) current = section.getAttribute("id") || current;
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
      <PageHeader eyebrow="About" title="AI engineering, research and project work." sub="I design and explore intelligent systems through research-driven prototypes and practical engineering." />
      <div className="container about__container">
        <aside className="about__sidebar" aria-label="About page sections">
          <div className="about__sticky-nav">
            <span className="eyebrow">Contents</span>
            <ul className="about__nav-list">
              {sections.map((id, index) => <li key={id}>
                <button type="button" className={"about__nav-btn " + (activeSection === id ? "active" : "")} onClick={() => scrollToSection(id)} aria-current={activeSection === id ? "location" : undefined}>
                  <span className="about__nav-dot" aria-hidden="true" />
                  <span className="about__nav-index">{String(index + 1).padStart(2, "0")}</span>
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </button>
              </li>)}
            </ul>
          </div>
        </aside>
        <div className="about__content">
          <section id="overview" className="about__section">
            <Reveal>
              <h2 className="about__h2">About Me</h2>
              <p className="about__text">
                I&apos;m an AI-focused technical builder interested in designing and developing intelligent systems. My work revolves around agentic AI, large language models, retrieval systems, applied machine learning and the architectures that connect them.
              </p>
              <p className="about__text">
                I&apos;m particularly interested in how AI systems manage context, use tools, coordinate multiple agents, retrieve information and make reliable decisions. I explore these problems through research-driven prototypes and practical engineering projects.
              </p>
              <p className="about__text">
                Beyond implementation, I enjoy working on system architecture, technical planning, experimentation and product development. I approach projects by understanding the problem first, designing the system around it, and evaluating the result rather than assuming that a working prototype is automatically a reliable solution.
              </p>
            </Reveal>
          </section>
          <section id="interests" className="about__section">
            <Reveal>
              <h2 className="about__h2">Research Interests</h2>
              <p className="about__text">The questions I return to most often sit at the boundary between model behaviour, system architecture and reliable application design.</p>
              <div className="about__interest-grid">
                {INTERESTS.map((interest, index) => <div className="about__interest" key={interest}><span>{String(index + 1).padStart(2, "0")}</span><p>{interest}</p></div>)}
              </div>
              <Link className="about__inline-link" to="/research">Explore research notes ↗</Link>
            </Reveal>
          </section>
          <section id="projects" className="about__section">
            <Reveal>
              <h2 className="about__h2">Project Work</h2>
              <div className="about__ongoing-list">
                {PROJECTS.map((project) => <Link className="about__ongoing-item" to={project.to} key={project.name}>
                  <span><strong>{project.name}</strong><span>{project.summary}</span></span><span aria-hidden="true">↗</span>
                </Link>)}
              </div>
              <Link className="about__inline-link" to="/work">View all case studies and projects ↗</Link>
            </Reveal>
          </section>
          <section id="skills" className="about__section">
            <Reveal>
              <h2 className="about__h2">Engineering Capabilities</h2>
              <p className="about__text">A practical foundation across AI systems, software development, data analysis and cloud integration.</p>
              <div className="about__skills-grid">
                {SKILLS.map((skill) => <div className="about__skill-card" key={skill.name} style={{ "--skill-accent": skill.accent } as CSSProperties}>
                  <span className="about__skill-badge"><img src={skill.icon} alt="" className="about__skill-icon" /></span>
                  <span className="about__skill-name">{skill.name}</span>
                </div>)}
              </div>
            </Reveal>
          </section>
          <section id="connect" className="about__section">
            <Reveal>
              <h2 className="about__h2">Connect</h2>
              <div className="about__reveal-cards">
                <a href="https://github.com/yash936936" target="_blank" rel="noreferrer" className="reveal-card">
                  <div className="reveal-card__cover"><span className="reveal-card__title">GitHub</span></div><div className="reveal-card__content"><p>View repositories ↗</p></div>
                </a>
                <a href="https://linkedin.com/in/yashmalik-/" target="_blank" rel="noreferrer" className="reveal-card" style={{ "--hover-color": "#0077b5" } as CSSProperties}>
                  <div className="reveal-card__cover"><span className="reveal-card__title">LinkedIn</span></div><div className="reveal-card__content"><p>Connect professionally ↗</p></div>
                </a>
              </div>
            </Reveal>
          </section>
        </div>
      </div>
    </div>
  );
}
