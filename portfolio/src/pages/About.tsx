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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for fixed nav
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <main className="about-page">
      <PageHeader
        eyebrow="About Me"
        title="Engineering, Strategy & Autonomous Systems."
        sub="Architecting intelligent workflows and modern web platforms to turn complex engineering problems into deployable solutions."
      />

      <div className="container about__container">
        {/* Left Sidebar Menu */}
        <aside className="about__sidebar">
          <div className="about__sticky-nav">
            <span className="eyebrow">Contents</span>
            <ul className="about__nav-list">
              {["overview", "skills", "connect"].map((id, i) => (
                <li key={id}>
                  <button
                    className={`about__nav-btn ${activeSection === id ? "active" : ""}`}
                    onClick={() => scrollToSection(id)}
                  >
                    <span className="about__nav-dot" aria-hidden="true" />
                    <span className="about__nav-index">{String(i + 1).padStart(2, "0")}</span>
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Right Content Area */}
        <div className="about__content" ref={contentRef}>
          
          <section id="overview" className="about__section">
            <Reveal>
              <h2 className="about__h2">Overview</h2>
              <p className="about__text">
                I am Yash Malik. I build intelligent systems and robust full-stack applications.
              </p>
              <p className="about__text">
                By combining technical depth in AI and modern backend architectures with a strong management mindset, I ensure engineering efforts translate into real-world value. Whether developing Agentic AI solutions or structuring complex databases, my goal remains the same: bridge the gap between execution and strategy to build products worth shipping.
              </p>
            </Reveal>
          </section>


          <section id="skills" className="about__section">
            <Reveal>
              <h2 className="about__h2">Technical Arsenal</h2>
              <p className="about__text">
                A robust technical foundation focused on Artificial Intelligence, Cybersecurity, and Web Development.
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
              <h2 className="about__h2">Connect</h2>
              <div className="about__reveal-cards">

                <a href="https://github.com/yash936936" target="_blank" rel="noreferrer" className="reveal-card">
                  <div className="reveal-card__cover">
                    <span className="reveal-card__title">GitHub</span>
                  </div>
                  <div className="reveal-card__content">
                    <p>View Repositories ➔</p>
                  </div>
                </a>

                <a href="https://linkedin.com/in/yashmalik-" target="_blank" rel="noreferrer" className="reveal-card" style={{ "--hover-color": "#0077b5" } as CSSProperties}>
                  <div className="reveal-card__cover">
                    <span className="reveal-card__title">LinkedIn</span>
                  </div>
                  <div className="reveal-card__content">
                    <p>Connect Professionally ➔</p>
                  </div>
                </a>

                <a href="https://drive.google.com/drive/folders/1WbTv2it532uzHZKQUG1vCmQvzvgJxFt8?usp=drive_link" className="reveal-card" style={{ "--hover-color": "var(--color-primary)" } as CSSProperties}>
                  <div className="reveal-card__cover">
                    <span className="reveal-card__title">Certifications</span>
                  </div>
                  <div className="reveal-card__content">
                    <p>View Credentials ➔</p>
                  </div>
                </a>

              </div>
            </Reveal>
          </section>

        </div>
      </div>
    </main>
  );
}