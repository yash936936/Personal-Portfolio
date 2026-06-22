import { useEffect, useRef, useState } from "react";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import "./About.css";

const SKILLS = [
  { name: "LangChain & RAG", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Agentic Architecture", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "MERN Stack", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "PostgreSQL & Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Cloud Integration", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
  { name: "UI/UX Design", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
];

const EXPERIENCE = [
  {
    role: "MERN Stack Developer Intern",
    company: "Codec Technologies",
    date: "Aug 2025 - Oct 2025",
    desc: "Developed full-stack web solutions utilizing the MERN stack framework throughout an intensive 3-month technical internship. Collaborated with cross-functional teams to design data-driven solutions."
  },
  {
    role: "AI Azure Intern",
    company: "AICTE | Microsoft | Edunet Foundation",
    date: "Jun 2025 - Jul 2025",
    desc: "Built and deployed AI/ML mini-projects using Azure services, focusing on automation, model deployment, and cloud integration."
  },
  {
    role: "President",
    company: "Phoenix Club, Noida International University",
    date: "Aug 2024 - Present",
    desc: "Contributed to real-world technical projects and led execution cycles, steadily taking on larger responsibilities. Managed cross-functional teams to ensure seamless event delivery."
  }
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
        title="Engineering, Management & Deployable Intelligence."
        sub="A technical student skilled in MERN stack development and AI/ML workflows, passionate about leveraging robust backend systems to solve complex engineering problems."
      />

      <div className="container about__container">
        {/* Left Sidebar Menu */}
        <aside className="about__sidebar">
          <div className="about__sticky-nav">
            <span className="eyebrow">Contents</span>
            <ul className="about__nav-list">
              {["overview", "experience", "skills", "certifications", "connect"].map((id) => (
                <li key={id}>
                  <button
                    className={`about__nav-btn ${activeSection === id ? "active" : ""}`}
                    onClick={() => scrollToSection(id)}
                  >
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
                I am Yash Malik, currently pursuing a Bachelor of Computer Applications at Noida International University. My goal is to bring a balanced tech-plus-management mindset that drives results in fast-moving organizations. 
              </p>
              <p className="about__text">
                I have executed projects end-to-end, contributed to research-driven work, and collaborated effectively across teams. I pair strong communication skills with technical depth, enabling me to handle both execution and stakeholder alignment.
              </p>
            </Reveal>
          </section>

          <section id="experience" className="about__section">
            <Reveal>
              <h2 className="about__h2">Experience</h2>
              <div className="about__timeline">
                {EXPERIENCE.map((exp, i) => (
                  <div className="about__timeline-item" key={i}>
                    <div className="about__timeline-meta">
                      <span className="about__timeline-date">{exp.date}</span>
                      <h3 className="about__timeline-role">{exp.role}</h3>
                      <span className="about__timeline-company">{exp.company}</span>
                    </div>
                    <p className="about__timeline-desc">{exp.desc}</p>
                  </div>
                ))}
              </div>
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
                  <div className="about__skill-card" key={skill.name}>
                    <img src={skill.icon} alt={skill.name} className="about__skill-icon" />
                    <span className="about__skill-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>

          <section id="certifications" className="about__section">
            <Reveal>
              <h2 className="about__h2">Certifications & Achievements</h2>
              <ul className="about__list">
                <li><strong>Agentic AI</strong> from GeeksforGeeks</li>
                <li><strong>AI/ML Certificate</strong> from ISRO</li>
                <li><strong>Digital Skills: Digital Marketing</strong> from Accenture</li>
                <li><strong>Student Coordinator</strong> - India AI Impact Summit Buildathon (HCL GUVI)</li>
                <li><strong>Campus Ambassador</strong> for HCL GUVI, InternShala and others</li>
              </ul>
            </Reveal>
          </section>

          <section id="connect" className="about__section">
            <Reveal>
              <h2 className="about__h2">Connect</h2>
              <div className="about__reveal-cards">
                
                <a href="https://github.com" target="_blank" rel="noreferrer" className="reveal-card">
                  <div className="reveal-card__cover">
                    <span className="reveal-card__title">GitHub</span>
                  </div>
                  <div className="reveal-card__content">
                    <p>View Repositories ➔</p>
                  </div>
                </a>

                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="reveal-card" style={{ "--hover-color": "#0077b5" } as any}>
                  <div className="reveal-card__cover">
                    <span className="reveal-card__title">LinkedIn</span>
                  </div>
                  <div className="reveal-card__content">
                    <p>Connect Professionally ➔</p>
                  </div>
                </a>

                <a href="/contact" className="reveal-card" style={{ "--hover-color": "var(--color-primary)" } as any}>
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