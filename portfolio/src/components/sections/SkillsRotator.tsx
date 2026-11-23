import { useCallback, useEffect, useRef, useState } from "react";
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
const INTERVAL = 2200;

export default function SkillsRotator() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
¶»§q«^