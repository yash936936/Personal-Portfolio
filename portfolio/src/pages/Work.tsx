import PageHeader from "../components/PageHeader";
import ContactBand from "../components/sections/ContactBand";
import Reveal from "../components/Reveal";
import ArchitectureDiagram from "../components/sections/ArchitectureDiagram";
import type { ArchitectureVariant } from "../components/sections/ArchitectureDiagram";
import { projects } from "../data/content";
import "./Work.css";

type CaseStudyContent = {
  problem: string;
  decisions: string[];
  implementation: string[];
  evidence: string[];
  limitations: string;
  docs: Array<{ label: string; href: string }>;
};
const CASE_STUDIES: Record<string, CaseStudyContent> = {
  agm: {
    problem: "Agent memory needs to do more than append conversation text. A useful memory layer must preserve the history behind a fact, handle corrections, scope what can be retrieved, support deletion and recognise when the available evidence is not enough to answer.",
    decisions: [
      "Keep one shared MemoryStore core. The Python library, REST API and CLI act as interfaces rather than separate memory implementations.",
      "Use an immutable event log as the source of truth. Nodes, edges, FTS5 and embedding records are derived views that can be rebuilt by replay.",
      "Separate retrieval into keyword and vector seeding, bounded one-hop graph expansion, scope and validity filtering, ranking, and a final sufficiency check.",
      "Keep trust and safety checks in the core path: trust tiers, provenance, secret redaction and quarantine for instruction-like text.",
      "Keep the memory layer model-agnostic. Callers provide structured memories; AGM does not invoke an LLM.",
    ],
    implementation: [
      "Python package with a SQLite event store and rebuildable retrieval indexes.",
      "FastAPI REST adapter with API-key authentication and an OpenAPI surface.",
      "Standard-library Python client and CLI commands for memory operations and task handoff.",
      "Lifecycle operations for superseding, hard deletion, expiry and writer revocation.",
    ],
    evidence: [
      "Exact-head GitHub Actions run #781 on commit d7816d9 passed eight Ubuntu and Windows jobs across Python 3.11–3.14, including pytest, repository hygiene, REST smoke and package inspection.",
      "The last available paired synthetic result recorded 50.7% unanswerable correctness, below the roadmap target of at least 80%. That result was on c6e9eb7, not the final retrieval head.",
      "The latest state record marks Batch 1 acceptance NOT ACCEPTED. The paired benchmark was skipped on the newer push runs.",
    ],
    limitations: "AGM remains a v0.7.x, local-only, loopback research prototype. Held-out real-history evaluation is NOT RUN; independent security and privacy review is NOT PERFORMED; third-party host validation is NOT VERIFIED. The passing CI run is implementation evidence, not proof that retrieval is accurate or production-ready.",
    docs: [
      { label: "Repository README", href: "https://github.com/yash936936/AGM#how-it-works" },
      { label: "Architecture notes", href: "https://github.com/yash936936/AGM/blob/main/docs/architecture.md" },
      { label: "Current evaluation and release state", href: "https://github.com/yash936936/AGM/blob/main/docs/STATE.md" },
    ],
  },
  "sysdesign-ai": {
    problem: "System design prompts often arrive as incomplete briefs. The goal of SysDesign AI is to turn those prompts into a structured design process: identify the type of design, collect missing constraints, retrieve reference material and assemble the result into reviewable artifacts.",
    decisions: [
      "Classify the request as high-level design (HLD) or low-level design (LLD) before selecting the workflow.",
      "Ask structured multiple-choice questions to collect functional requirements, non-functional requirements and constraints before generation.",
      "Use retrieval over ingested GitHub material and curated reference architectures to ground the design process.",
      "Stream generated sections over server-sent events so the interface can render artifacts as they arrive.",
      "Separate the conversation from the artifact workspace, with React Flow and Mermaid used for architecture diagrams.",
    ],
    implementation: [
      "Next.js 14 frontend with chat, session state and progressive artifact rendering.",
      "FastAPI backend with Gemini for classification and generation, plus Gemini embeddings for reference retrieval.",
      "LangChain and ChromaDB for the documented RAG path; PostgreSQL through Supabase for application data.",
      "Redis for caching and rate limits, and Cloudflare R2 for staging and exported design packages.",
      "Documented output paths include architecture diagrams, capacity estimates, data models, API schemas and technology choices.",
    ],
    evidence: [
      "The repository README documents HLD/LLD intent detection and a structured clarification flow.",
      "The README describes RAG ingestion of system-design repositories and canonical reference architectures.",
      "The documented API includes session creation, retrieval, streamed generation, follow-up chat and export routes.",
      "The frontend architecture includes an artifact panel with React Flow and Mermaid diagram rendering.",
    ],
    limitations: "SysDesign AI is a prototype. The repository materials reviewed do not provide a published held-out quality score for generated designs. Capacity estimates, technology choices and diagrams should be treated as draft recommendations and reviewed against real requirements before implementation.",
    docs: [
      { label: "Repository README", href: "https://github.com/yash936936/AI-System-Design#readme" },
      { label: "API specification", href: "https://github.com/yash936936/AI-System-Design/blob/main/api-spec.md" },
      { label: "Technical requirements", href: "https://github.com/yash936936/AI-System-Design/blob/main/trd.md" },
    ],
  },
};
const FEATURED = ["agm", "sysdesign-ai"];
const SUPPORTING = ["coding-harness", "fathom", "legal-ai", "document-analysis", "lora-pipeline"];

function CaseStudy({ slug, index }: { slug: string; index: number }) {
  const project = projects.find((item) => item.slug === slug);
  const content = CASE_STUDIES[slug];
  if (!project || !content) return null;
  return <Reveal delay={index * 70}>
    <article className="case-study" id={"project-" + project.slug}>
      <header className="case-study__header">
        <div className="case-study__meta"><span>{String(index + 1).padStart(2, "0")} · {project.category}</span><span className="case-study__status">{project.status}</span></div>
        <h2>{project.title}</h2><p>{project.description}</p>
      </header>
      <ArchitectureDiagram variant={project.slug as ArchitectureVariant} />
      <div className="case-study__details">
        <section className="case-study__block"><h3>Problem</h3><p>{content.problem}</p></section>
        <section className="case-study__block"><h3>Design decisions</h3><ul>{content.decisions.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section className="case-study__block">
          <h3>Implementation</h3><ul>{content.implementation.map((item) => <li key={item}>{item}</li>)}</ul>
          <div className="case-study__stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
        </section>
        <section className="case-study__block"><h3>Evidence</h3><ul>{content.evidence.map((item) => <li key={item}>{item}</li>)}</ul></section>
      </div>
      <aside className="case-study__limits"><span>Limitations and validation status</span><p>{content.limitations}</p></aside>
      <div className="case-study__links">
        <a href={project.github} target="_blank" rel="noopener noreferrer">Source repository ↗</a>
        {content.docs.map((doc) => <a href={doc.href} target="_blank" rel="noopener noreferrer" key={doc.href}>{doc.label} ↗</a>)}
      </div>
    </article>
  </Reveal>;
}

export default function Work() {
  const supporting = projects.filter((project) => SUPPORTING.includes(project.slug));
  return <div className="work-page">
    <PageHeader eyebrow="Selected work" title="AI systems, architecture and engineering." sub="Two detailed case studies, followed by other projects across agentic tooling, research, retrieval and applied machine learning." />
    <section className="container work-intro"><p>Each case study separates the problem, design choices, implementation and available evidence. Prototype status and unresolved validation are stated rather than hidden.</p></section>
    <section className="container work-case-studies" aria-label="Featured project case studies">
      {FEATURED.map((slug, index) => <CaseStudy key={slug} slug={slug} index={index} />)}
    </section>
    <section className="container work-supporting">
      <div className="work-supporting__heading"><span>Supporting projects</span><h2>More work and experiments</h2><p>Coding Harness and Fathom lead this group, followed by domain-specific AI and model-training projects.</p></div>
      <div className="work-supporting__grid">
        {supporting.map((project) => <article className="work-support-card" id={"project-" + project.slug} key={project.slug}>
          <div className="work-support-card__meta"><span>{project.category}</span><span>{project.status}</span></div>
          <h3>{project.title}</h3><p>{project.description}</p>
          <ul>{project.evidence.slice(0, 3).map((item) => <li key={item}>{item}</li>)}</ul>
          <div className="work-support-card__stack">{project.stack.slice(0, 5).map((item) => <span key={item}>{item}</span>)}</div>
          <a href={project.github} target="_blank" rel="noopener noreferrer">View repository ↗</a>
        </article>)}
      </div>
    </section>
    <ContactBand />
  </div>;
}
