export const heroTag = "AI ENGINEERING";

export const heroLines = [
  {
    title: "Awaken your\nthinking\npartner",
    sub: "A practical AI engineering practice focused on agentic systems, applied machine learning and intelligent software.",
  },
  {
    title: "From ideas\nto working\nsystems",
    sub: "I design, build and test AI-powered applications, with attention to architecture, evidence and real-world constraints.",
  },
];

export const logos = [
  "Agentic AI",
  "LLM Applications",
  "Memory Systems",
  "Hybrid Retrieval",
  "RAG Evaluation",
  "Model Fine-Tuning",
  "Applied Machine Learning",
  "AI Architecture",
  "Research Automation",
  "Computer Vision",
  "Python & TypeScript",
  "AI Systems Testing",
];

export const sectors = [
  "Machine Learning", "Computer Vision", "Document AI", "Backend Systems", "Cloud Infra",
  "Developer Tools", "Generative AI", "Data Pipelines", "Frontend Engineering", "API Design",
  "MLOps", "Automation", "Applied Research", "Production ML", "Edge Deployment", "Open Source",
];

export const offers = [
  {
    kicker: "Capability",
    title: "Model Training,\nFine-Tuning & Agentic AI",
    desc: "Orchestrating autonomous agents and fine-tuning models to deliver intelligent systems that solve real-world problems, not just benchmarks.",
    href: "/services/ai",
  },
  {
    kicker: "Capability",
    title: "Software development",
    desc: "Building maintainable applications with clear architecture, thoughtful implementation and dependable delivery.",
    href: "/services/web",
  },
  {
    kicker: "Capability",
    title: "Deployment\n& infra",
    desc: "Cloud architecture, deployment workflows and supporting infrastructure designed around actual reliability and operational needs.",
    href: "/services/infrastructure",
  },
];

export const faqs = [
  {
    q: "What kind of work do you take on?",
    a: "My primary focus is AI: building autonomous agents, multi-agent workflows, model-driven applications and data pipelines. I also develop the software needed to deliver those systems reliably.",
  },
  {
    q: "What makes your approach different?",
    a: "I connect AI system design, data infrastructure and software implementation. Each part is shaped around the needs of the product, making the system easier to maintain and improve.",
  },
  {
    q: "What does your typical tech stack look like?",
    a: "For AI orchestration, I use frameworks like LangChain and LangGraph with LLM APIs. For software development, I work with React, TypeScript and backend APIs to build maintainable applications.",
  },
];

export interface Project {
  slug: string;
  title: string;
  year: string;
  category: string;
  color: string;
  status: string;
  description: string;
  architecture: string;
  evidence: string[];
  stack: string[];
  github: string;
}

export const projects: Project[] = [
  {
    slug: "agm",
    title: "AGM — Adaptive Graph Memory",
    year: "2026",
    category: "Agent memory infrastructure",
    color: "#7aa4a0",
    status: "Local research prototype · v0.7.x",
    description: "A model-agnostic memory layer for AI agents. AGM uses an event-sourced SQLite core, hybrid keyword/vector retrieval and bounded graph expansion, with provenance, trust tiers and memory lifecycle controls.",
    architecture: "The immutable event log is the source of truth. Nodes, edges, FTS5 and vector indexes are rebuildable projections. Retrieval combines lexical and vector seeds, bounded graph expansion, scope and validity filters, ranking and answerability checks. Python, REST, CLI and client interfaces share the same core.",
    evidence: [
      "Event-sourced SQLite storage with rebuildable retrieval projections",
      "Hybrid retrieval, bounded graph expansion, provenance and trust controls",
      "Synthetic evaluation tooling; real-history evaluation remains outstanding",
    ],
    stack: ["Python", "SQLite", "FastAPI", "Pydantic", "FTS5", "Vector retrieval", "Pytest"],
    github: "https://github.com/yash936936/AGM",
  },
  {
    slug: "sysdesign-ai",
    title: "SysDesign AI",
    year: "2026",
    category: "AI-assisted system design",
    color: "#7b9fc6",
    status: "Prototype",
    description: "An AI-assisted system design workspace that classifies HLD and LLD requests, gathers missing requirements and uses retrieved references to generate structured architecture artifacts.",
    architecture: "A Next.js frontend and FastAPI backend manage the HLD/LLD flow. The backend collects requirements through MCQs, retrieves reference material with Gemini embeddings and ChromaDB, and streams generated design sections over SSE. Artifacts include diagrams, capacity estimates, data models, API design and stack choices.",
    evidence: [
      "HLD/LLD classification with a structured requirement clarification flow",
      "Gemini embeddings and ChromaDB-based reference retrieval",
      "Streaming design generation and interactive architecture artifact views",
    ],
    stack: ["Next.js", "React", "FastAPI", "Gemini", "LangChain", "ChromaDB", "PostgreSQL", "Redis"],
    github: "https://github.com/yash936936/AI-System-Design",
  },
  {
    slug: "coding-harness",
    title: "Coding Harness",
    year: "2026",
    category: "Multi-agent developer tooling",
    color: "#8c7ab8",
    status: "Active prototype",
    description: "A profile-governed multi-agent coding harness built on Cordis. Profiles compose models, tools, retrieval, memory, orchestration, policy gates and sandbox providers without enabling unrestricted host execution.",
    architecture: "Profiles define the runtime capability set. Shared SQLite coordination and memory/retrieval storage support sessions and agent context. A backend-neutral workspace runtime targets Vercel Sandbox, while policy gates constrain tools, egress and task scope. End-to-end workspace transfer and result synchronization remain open.",
    evidence: [
      "Profile-based composition for model, tool, retrieval, memory and policy layers",
      "Shared SQLite coordination, episodic records and semantic event storage",
      "Host command execution and local fallback remain disabled pending acceptance",
    ],
    stack: ["TypeScript", "Node.js", "Cordis", "SQLite", "Redis", "Vercel Sandbox", "Vitest"],
    github: "https://github.com/yash936936/Harness",
  },
  {
    slug: "legal-ai",
    title: "Legal AI Assistant",
    year: "2025",
    category: "Legal AI / RAG",
    color: "#7aa4a0",
    status: "Prototype",
    description: "A Streamlit-based legal information assistant with separate legal-advisor and contract-analysis paths, using a LangGraph supervisor and hybrid retrieval over a local corpus.",
    architecture: "The supervisor routes requests to advisor or contract analysis. Retrieval checks a semantic cache before combining Chroma dense search with BM25 lexical results via reciprocal-rank fusion. Gemini generates grounded responses or structured risk summaries; an optional LLM judge scores faithfulness, relevance and helpfulness.",
    evidence: [
      "LangGraph stateful routing and separate legal/contract workflows",
      "Chroma dense search and BM25 retrieval combined using reciprocal-rank fusion",
      "Optional LLM-as-judge evaluation for faithfulness, relevance and helpfulness",
    ],
    stack: ["Python", "Streamlit", "LangGraph", "ChromaDB", "BM25", "Gemini", "RAG"],
    github: "https://github.com/yash936936/LegalAI",
  },
  {
    slug: "fathom",
    title: "Fathom Research Assistant",
    year: "2026",
    category: "Research automation",
    color: "#8c7ab8",
    status: "Research tooling",
    description: "A local research assistant that uses a Qwen GGUF model through llama.cpp, with hybrid retrieval, reranking and citation verification. Its documentation describes a research-focused tool rather than a general-purpose chatbot.",
    architecture: "The documented flow uses LangGraph for planning, retrieval, evidence checks and synthesis. Retrieval combines BM25 and dense search with reciprocal-rank fusion; a separate verification layer checks citations and answerability.",
    evidence: [
      "Source connectors include web search, news, arXiv, GitHub and Reddit",
      "Per-claim citation verification and answerability checks are implemented",
      "Golden-set and citation-accuracy evaluation scripts are included",
    ],
    stack: ["Python", "LangGraph", "llama.cpp", "Qwen GGUF", "BM25", "Hybrid retrieval"],
    github: "https://github.com/yash936936/Fathom",
  },
  {
    slug: "document-analysis",
    title: "AI Document Analysis API",
    year: "2026",
    category: "Document intelligence",
    color: "#e8a55a",
    status: "API prototype",
    description: "A REST API that accepts Base64-encoded PDF, DOCX or image documents and returns structured output with a summary, named entities and sentiment classification.",
    architecture: "The documented pipeline validates the API key and payload, routes the document to the matching extractor, and runs extraction as a Celery task backed by Redis. Extracted text is analysed with Gemini and validated with Pydantic.",
    evidence: [
      "PDF extraction with pdfplumber and DOCX extraction with python-docx",
      "Image OCR uses Tesseract with Pillow preprocessing",
      "Asynchronous extraction runs through Celery with Redis as broker and result backend",
    ],
    stack: ["Python", "FastAPI", "Celery", "Redis", "pdfplumber", "Tesseract", "Gemini"],
    github: "https://github.com/yash936936/AI-Powered_Document_Analysis_And_Extraction",
  },
  {
    slug: "lora-pipeline",
    title: "LoRA Fine-Tuning Pipeline",
    year: "2026",
    category: "Applied machine learning",
    color: "#e8a55a",
    status: "Config-driven pipeline",
    description: "A configuration-driven pipeline for adapting Hugging Face causal language models with LoRA and QLoRA. The repository includes a CPU-friendly GPT-2 smoke-test configuration before moving to larger GPU-backed models.",
    architecture: "The training flow loads a model and tokenizer, attaches adapters, tokenizes instruction data, creates a validation split, trains and evaluates checkpoints. Separate scripts support adapter evaluation, merging and inference serving.",
    evidence: [
      "LoRA and quantized QLoRA configurations are provided",
      "Bundled sample data supports an end-to-end GPT-2 smoke test",
      "Training, evaluation, merge/export and serving scripts are separated",
    ],
    stack: ["Python", "Hugging Face", "PEFT", "LoRA", "QLoRA", "PyTorch"],
    github: "https://github.com/yash936936/LoRA",
  },
];

export const founders = [
  { name: "Yash", role: "Software Engineer", linkedin: "https://linkedin.com/in/yashmalik-/" },
];

export const press = ["GitHub", "LinkedIn", "X", "Reddit"];
