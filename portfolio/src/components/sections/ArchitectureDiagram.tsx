import "./ArchitectureDiagram.css";

export type ArchitectureVariant = "agm" | "sysdesign-ai" | "harness";

type DiagramNode = { label: string; title: string; detail?: string };
type DiagramTrack = { label: string; nodes: DiagramNode[] };

const DIAGRAMS: Record<ArchitectureVariant, { title: string; tracks: DiagramTrack[]; note?: string }> = {
  agm: {
    title: "Event-sourced memory and hybrid retrieval",
    tracks: [
      { label: "Write and storage path", nodes: [
        { label: "Interfaces", title: "Python · REST · CLI", detail: "Adapters call the shared core" },
        { label: "Core", title: "MemoryStore", detail: "Context, trust and guard checks" },
        { label: "Source of truth", title: "Immutable event log", detail: "Append, supersede and delete events" },
        { label: "Rebuildable views", title: "Nodes · edges · FTS5 · vectors", detail: "Derived by replay" },
      ] },
      { label: "Retrieval path", nodes: [
        { label: "Query", title: "Keyword + vector seeds", detail: "Filtered candidate set" },
        { label: "Graph step", title: "Bounded 1-hop expansion", detail: "Related context, limited scope" },
        { label: "Validation", title: "Scope + validity filters", detail: "Then rank and check sufficiency" },
        { label: "Result", title: "Return or abstain", detail: "Insufficient evidence stays unresolved" },
      ] },
    ],
    note: "The caller supplies structured memories. AGM itself does not call an LLM.",
  },
  "sysdesign-ai": {
    title: "From design brief to structured architecture artifacts",
    tracks: [
      { label: "Design workflow", nodes: [
        { label: "Input", title: "Design prompt", detail: "Product needs and constraints" },
        { label: "Classify", title: "HLD / LLD", detail: "Route to a design workflow" },
        { label: "Clarify", title: "Requirement MCQs", detail: "Functional and non-functional needs" },
        { label: "Retrieve", title: "RAG reference search", detail: "GitHub material and curated systems" },
        { label: "Generate", title: "Gemini via FastAPI SSE", detail: "Stream the generated sections" },
      ] },
      { label: "Artifact workspace", nodes: [
        { label: "Frontend", title: "Next.js chat + artifacts", detail: "Progressive output rendering" },
        { label: "Architecture", title: "React Flow / Mermaid", detail: "Interactive design diagrams" },
        { label: "Design package", title: "Capacity · data · API · stack", detail: "Export paths for PDF and Markdown" },
      ] },
    ],
    note: "Supporting services documented in the repository include PostgreSQL/Supabase, Redis and Cloudflare R2.",
  },
  harness: {
    title: "Profile-based multi-agent coding workflow",
    tracks: [{ label: "Profile composition", nodes: [
      { label: "Configuration", title: "Agent profile", detail: "Choose capabilities and policy" },
      { label: "Model access", title: "Model providers", detail: "Profile-scoped access" },
      { label: "Context", title: "Retrieval + memory", detail: "Shared SQLite storage work" },
      { label: "Control", title: "Orchestration + policy", detail: "Governed workflow boundaries" },
      { label: "Execution", title: "Sandbox + evaluation", detail: "Provider acceptance remains open" },
    ] }],
    note: "Host command execution and local fallback remain disabled. Vercel Sandbox is selected but not accepted end to end.",
  },
};

function DiagramTrack({ track }: { track: DiagramTrack }) {
  return (
    <div className="architecture__track-group">
      <p className="architecture__track-label">{track.label}</p>
      <div className="architecture__track" role="list">
        {track.nodes.map((node, index) => (
          <div className="architecture__step" role="listitem" key={node.title}>
            <span className="architecture__step-label">{node.label}</span>
            <strong>{node.title}</strong>
            {node.detail && <small>{node.detail}</small>}
            {index < track.nodes.length - 1 && <span className="architecture__arrow" aria-hidden="true">→</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ArchitectureDiagram({ variant, compact = false }: { variant: ArchitectureVariant; compact?: boolean }) {
  const diagram = DIAGRAMS[variant];
  return (
    <figure className={"architecture architecture--" + variant + (compact ? " architecture--compact" : "")}>
      <figcaption className="architecture__caption">
        <span>Architecture preview</span>
        <strong>{diagram.title}</strong>
      </figcaption>
      {diagram.tracks.map((track) => <DiagramTrack key={track.label} track={track} />)}
      {diagram.note && <p className="architecture__note">{diagram.note}</p>}
      <p className="architecture__source">Documentation-derived diagram · not a product screenshot</p>
    </figure>
  );
}
