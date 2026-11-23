import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import "./Research.css";

const THREADS = [
  { n: "01", title: "Persistent memory and agent context", question: "How can an agent remember information across sessions while preserving provenance, handling corrections and refusing unsupported answers?", project: "AGM — Adaptive Graph Memory", href: "/work#project-agm", source: "https://github.com/yash936936/AGM/blob/main/docs/architecture.md", note: "Current work: event-sourced SQLite memory, rebuildable indexes, hybrid retrieval, bounded graph expansion and lifecycle operations.", status: "Local research prototype" },
  { n: "02", title: "Bounded agent workflows and execution safety", question: "How should models, tools, memory, retrieval, policies and sandbox providers be composed without granting broader permissions than a task needs?", project: "Coding Harness", href: "/work#project-coding-harness", source: "https://github.com/yash936936/Harness/blob/main/docs/STATE.md", note: "Current work: profile-based composition, policy gates and shared storage. Host command execution and local fallback remain disabled.", status: "Active prototype" },
  { n: "03", title: "Evidence and citation verification", question: "How can a research assistant connect answer claims to retrieved sources and make answerability limits visible?", project: "Fathom Research Assistant", href: "/work#project-fathom", source: "https://github.com/yash936936/Fathom/blob/main/docs/eval_log.md", note: "Current work: hybrid BM25 and dense retrieval, citation checks, answerability behaviour and golden-set evaluation scripts.", status: "Research tooling" },
  { n: "04", title: "Grounded system design generation", question: "Can an AI design workflow turn incomplete briefs into explicit requirements and structured architecture artifacts grounded in reference systems?", project: "SysDesign AI", href: "/work#project-sysdesign-ai", source: "https://github.com/yash936936/AI-System-Design#readme", note: "Current work: HLD/LLD classification, requirement clarification, retrieval over design references and streamed architecture artifacts.", status: "Prototype" },
];
const EVIDENCE = [
  { title: "AGM · Retrieval acceptance", metric: "50.7%", label: "Last available paired synthetic unanswerable-correctness result", text: "Below the roadmap target of at least 80%. The recorded result is from commit c6e9eb7, not the latest retrieval head. Batch 1 remains NOT ACCEPTED and held-out real-history evaluation is NOT RUN.", href: "https://github.com/yash936936/AGM/blob/main/docs/STATE.md", link: "Read state and acceptance notes" },
  { title: "Coding Harness · CI", metric: "Passed", label: "Mandatory main CI checks reported on 21 November 2026", text: "The repository state records successful mandatory Ubuntu and Windows checks. Live Vercel provider acceptance, complete workspace transfer and result synchronization remain open, so CI is not presented as provider acceptance.", href: "https://github.com/yash936936/Harness/blob/main/docs/STATE.md", link: "Read current project state" },
  { title: "SysDesign AI · Output quality", metric: "Prototype", label: "No published held-out quality score in project materials reviewed", text: "The repository documents classification, clarification, RAG retrieval and generated design artifacts. Generated capacity estimates and architecture choices still need engineering review.", href: "https://github.com/yash936936/AI-System-Design#readme", link: "Read repository documentation" },
];

export default function Research() {
  return <div className="research-page">
    <PageHeader eyebrow="Research and experiments" title="Questions, prototypes and evidence." sub="An engineering research log around agent memory, tool-using systems, retrieval, system design and evaluation." />
    <section className="container research-intro"><p>This section records the questions behind ongoing projects and the evidence available so far. Implemented code, passing tests and validated system quality are different things, so each project keeps those claims separate.</p></section>
    <section className="container research-threads">
      <div className="research-section-heading"><span>01 · Research threads</span><h2>Open questions under active exploration</h2></div>
      <div className="research-thread-list">
        {THREADS.map((item) => <article className="research-thread" key={item.n}>
          <span className="research-thread__number">{item.n}</span>
          <div className="research-thread__content">
            <div className="research-thread__meta"><span>{item.status}</span><span>{item.project}</span></div>
            <h3>{item.title}</h3><p className="research-thread__question">{item.question}</p><p>{item.note}</p>
            <div className="research-thread__links"><Link to={item.href}>Open project case study ↗</Link><a href={item.source} target="_blank" rel="noopener noreferrer">Project notes ↗</a></div>
          </div>
        </article>)}
      </div>
    </section>
    <section className="research-evidence"><div className="container">
      <div className="research-section-heading"><span>02 · Evaluation and evidence</span><h2>What has been checked, and what has not</h2></div>
      <div className="research-evidence__grid">
        {EVIDENCE.map((item) => <article className="research-evidence-card" key={item.title}>
          <span className="research-evidence-card__title">{item.title}</span><strong>{item.metric}</strong><span className="research-evidence-card__label">{item.label}</span><p>{item.text}</p>
          <a href={item.href} target="_blank" rel="noopener noreferrer">{item.link} ↗</a>
        </article>)}
      </div>
      <p className="research-evidence__footnote">Evaluation numbers are tied to their recorded commit and protocol. Historical synthetic results are diagnostic evidence, not production-quality claims.</p>
    </div></section>
    <section className="container research-writing">
      <div className="research-section-heading"><span>03 · Related writing</span><h2>Engineering notes behind the research</h2></div>
      <div className="research-writing__links">
        <Link to="/blog/designing-bounded-agent-workflows">Designing agent workflows with explicit boundaries ↗</Link>
        <Link to="/blog/evaluating-rag-beyond-retrieval">Evaluating RAG beyond retrieval ↗</Link>
        <Link to="/blog/building-a-local-research-assistant">Building a local research assistant that shows its work ↗</Link>
      </div>
    </section>
  </div>;
}
