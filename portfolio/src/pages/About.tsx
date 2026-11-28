import { useEffect, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import "./About.css";

const SECTION_LABELS: Record<string, string> = {
  overview: "Overview",
  research: "Research interests",
  arsenal: "Tech arsenal",
  connect: "Connect",
};


const RESEARCH_INTERESTS = [
  {
    title: "Agent memory and context",
    detail: "Persistent memory, provenance, temporal updates, retrieval boundaries and safe context sharing.",
  },
  {
    title: "LLM and agent systems",
    detail: "Tool use, multi-agent coordination, planning, orchestration and system-level reliability.",
  },
  {
    title: "Retrieval and grounded generation",
    detail: "Hybrid search, reranking, answerability, citation verification and evaluation beyond retrieval recall.",
  },
  {
    title: "AI architecture and evaluation",
    detail: "How to design, test and measure AI applications under real constraints rather than relying on demos alone.",
  },
];

const TECH_ARSENAL = [
  {
    title: "LLM and agentic systems",
    items: ["Python", "LangChain", "LangGraph", "RAG", "Tool calling", "LLM APIs"],
  },
  {
    title: "Machine learning",
    items: ["PyTorch", "TensorFlow", "Scikit-learn", "NumPy", "Pandas", "Computer vision"],
  },
  {
    title: "Software and APIs",
    items: ["TypeScript", "React", "Node.js", "FastAPI", "Flask", "REST APIs"],
  },
  {
    title: "Data and delivery",
    items: ["SQLite", "PostgreSQL", "MongoDB", "Git & GitHub", "Azure", "Vercel"],
  },
];

export default function About() {
  const [activeSection, setActiveSection] = useState("overview");
  const sections = Object.keys(SECTION_LABELS);

  useEffect(() => {
    const handleScroll = () => {
      let current = "overview";
      document.querySelectorAll(".about__section").forEach((section) => {
        if (section.getBoundingClientRect().top <= 150) {
          current = section.getAttribute("id") || current;
        }
      });
      setActiveSection((previous) => previous === current ? previous : current);
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
        title="AI engineering and research."
        sub="I design and explore intelligent systems through research-led prototypes, practical software engineering and careful evaluation."
      />
      <div className="container about__container">
        <aside className="about__sidebar" aria-label="About page sections">
          <div className="about__sticky-nav">
            <span className="eyebrow">Contents</span>
            <ul className="about__nav-list">
              {sections.map((id) => (
                <li key={id}>
                  <button
                    type="button"
                    className={"about__nav-btn " + (activeSection === id ? "active" : "")}
                    onClick={() => scrollToSection(id)}
                    aria-current={activeSection === id ? "location" : undefined}
                  >
                    <span className="about__nav-dot" aria-hidden="true" />
                    {SECTION_LABELS[id]}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="about__content">
          <section id="overview" className="about__section">
            <Reveal>
              <h2 className="about__h2">About Me</h2>
              <p className="about__text">
                I&apos;m an AI-focused technical builder interested in agentic AI, large language
                models, memory systems, retrieval and applied machine learning. I enjoy shaping
                system architecture, building practical prototypes and testing whether the
                result works as intended.
              </p>
              <p className="about__text">
                My current work explores how intelligent systems manage context, use tools,
                coordinate agents and turn retrieved information into useful outputs. Software
                development, testing and infrastructure support that work from prototype to
                usable application.
              </p>
            </Reveal>
          </section>


          <section id="research" className="about__section">
            <Reveal>
              <h2 className="about__h2">Research interests</h2>
              <div className="about__research-list">
                {RESEARCH_INTERESTS.map((item) => (
                  <article className="about__research-item" key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                  </article>
                ))}
              </div>
            </Reveal>
          </section>

          <section id="arsenal" className="about__section">
            <Reveal>
              <h2 className="about__h2">Focused tech arsenal</h2>
              <p className="about__text">
                A focused set of tools I use across AI systems, machine learning, software
                engineering and deployment.
              </p>
              <div className="about__arsenal-grid">
                {TECH_ARSENAL.map((group) => (
                  <article className="about__arsenal-card" key={group.title}>
                    <h3>{group.title}</h3>
                    <div className="about__arsenal-tags">
                      {group.items.map((item) => <span key={item}>{item}</span>)}
                    </div>
                  </article>
                ))}
              </div>
            </Reveal>
          </section>

          <section id="connect" className="about__section">
            <Reveal>
              <h2 className="about__h2">Connect &amp; Credentials</h2>
              <div className="about__reveal-cards">
                <a href="https://github.com/yash936936" target="_blank" rel="noopener noreferrer" className="reveal-card">
                  <div className="reveal-card__cover"><span className="reveal-card__title">GitHub</span></div>
                  <div className="reveal-card__content"><p>Browse source code</p></div>
                </a>
                <a href="https://linkedin.com/in/yashmalik-/" target="_blank" rel="noopener noreferrer" className="reveal-card" style={{ "--hover-color": "#0077b5" } as CSSProperties}>
                  <div className="reveal-card__cover"><span className="reveal-card__title">LinkedIn</span></div>
                  <div className="reveal-card__content"><p>Connect professionally</p></div>
                </a>
                <a href="https://drive.google.com/drive/folders/1as0o0p7JRGXrWlpTwC9ZlgsXRN7WeX2F?usp=sharing" target="_blank" rel="noopener noreferrer" className="reveal-card" style={{ "--hover-color": "var(--color-primary)" } as CSSProperties}>
                  <div className="reveal-card__cover"><span className="reveal-card__title">Certifications</span></div>
                  <div className="reveal-card__content"><p>View credentials</p></div>
                </a>
              </div>
            </Reveal>
          </section>
        </div>
      </div>
    </div>
  );
}
