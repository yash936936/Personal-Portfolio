// Skill taxonomy for the SkillCapsules slider on the home page.
// Each top-level category maps to one draggable capsule; each capsule
// has exactly 4 sub-categories, revealed one by one as the handle is
// dragged upward.

export interface SkillSubcategory {
  /** Short 2-letter tag shown inside the capsule's circular badge */
  short: string;
  /** Full sub-category name shown in the detail panel */
  title: string;
  /** Individual skills/tools under this sub-category */
  skills: string[];
}

export interface SkillCategory {
  /** Full category name, shown as the section heading for this capsule's group */
  title: string;
  /** Short label printed under the capsule, mirrors "SaaS" / "Start-up" in the reference */
  label: string;
  /** CSS color value (var(--color-...)) used to tint this capsule */
  color: string;
  subcategories: SkillSubcategory[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Artificial Intelligence & Machine Learning",
    label: "AI & ML",
    color: "var(--color-accent-teal)",
    subcategories: [
      {
        short: "GA",
        title: "Generative & Agentic AI",
        skills: ["LLM Orchestration", "Agentic System Architecture", "OpenAI & Anthropic Claude APIs", "LangChain", "LangGraph"],
      },
      {
        short: "AM",
        title: "Applied ML & Research",
        skills: ["Computer Vision", "Document AI", "Predictive Modeling", "Applied Research"],
      },
      {
        short: "ML",
        title: "ML Engineering (MLOps)",
        skills: ["Production ML", "Edge Deployment", "Data Pipelines", "Model Lifecycle Management"],
      },
      {
        short: "AT",
        title: "AI Tooling & Integration",
        skills: ["Custom AI Integration", "Agentic Honey-Pots", "Prompt Engineering", "AI Developer Tools"],
      },
    ],
  },
  {
    title: "Software Engineering & Cloud Architecture",
    label: "Software & Cloud",
    color: "var(--color-accent-amber)",
    subcategories: [
      {
        short: "FE",
        title: "Frontend & UI Engineering",
        skills: ["Frontend Architecture", "MERN Stack", "Glassmorphism & Disruptor UI Design", "Amber-accented Aesthetics"],
      },
      {
        short: "BE",
        title: "Backend & API Systems",
        skills: ["Backend System Design", "RESTful API Integration", "Microservices", "Core Business Logic"],
      },
      {
        short: "DB",
        title: "Database & Cloud Infrastructure",
        skills: ["Firebase", "Supabase", "Cloud Infra", "Distributed Data Management"],
      },
      {
        short: "CP",
        title: "Core Programming & Systems",
        skills: ["Python", "C Programming", "Assembly Language", "Open Source Contributions"],
      },
    ],
  },
  {
    title: "Data Extraction, Automation & Security",
    label: "Data & Security",
    color: "var(--color-primary)",
    subcategories: [
      {
        short: "WA",
        title: "Workflow Automation",
        skills: ["n8n Workflows", "Business Process Automation", "System Triggers"],
      },
      {
        short: "WS",
        title: "Web Scraping & Navigation",
        skills: ["Selenium", "Playwright", "Headless Browser Scripting"],
      },
      {
        short: "CS",
        title: "Cybersecurity Systems",
        skills: ["Cybersecurity Foundations", "Network Defense Concepts", "Vulnerability Awareness"],
      },
      {
        short: "DI",
        title: "Data-Driven Intelligence",
        skills: ["Lead Generation Pipelines", "Business Intelligence", "Data Aggregation"],
      },
    ],
  },
  {
    title: "Business, Operations & Leadership",
    label: "Business & Ops",
    color: "var(--color-accent-violet)",
    subcategories: [
      {
        short: "ES",
        title: "Entrepreneurship & Strategy",
        skills: ["Startup Leadership", "Technical Product Strategy", "Founder Operations"],
      },
      {
        short: "TO",
        title: "Technical Outreach & Ecosystem",
        skills: ["Technical Event Coordination", "Campus Ambassadorship", "Sponsorship Outreach"],
      },
      {
        short: "FI",
        title: "Financial & Investor Relations",
        skills: ["Financial Markets Knowledge", "Investor Foundations (SEBI)", "Business Economics"],
      },
      {
        short: "PE",
        title: "Project & Event Coordination",
        skills: ["Task-Board Management", "Hackathon Organization", "Cross-functional Communication"],
      },
    ],
  },
];