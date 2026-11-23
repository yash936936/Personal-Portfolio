export const heroLines = [
  {
    title: "Awaken your\nthinking partner",
    sub: "An independent AI engineering practice focused on agentic systems, applied machine learning, and intelligent software.",
  },
  {
    title: "Activate your\nideas",
    sub: "From a trained model to a production endpoint to a UI someone can actually click on.",
  },
];

export const heroTag = "AI Engineering";

export const logos = [
  "Agentic AI", "LLM Orchestration", "MongoDB", "Express.js", "RAG Systems", "Machine Learning", "Microservices", "Computer Vision", "Headless Scraping", "Data Pipelines", "Cybersecurity", "RESTful APIs", "MERN Stack", "Workflow Automation"
];

export const sectors = [
  "Machine Learning", "Computer Vision", "Document AI", "Backend Systems", "Cloud Infra",
  "Developer Tools", "Generative AI", "Data Pipelines", "Frontend Engineering", "API Design",
  "MLOps", "Automation", "Applied Research", "Production ML", "Edge Deployment", "Open Source",
];

export const offers = [
  {
    kicker: "Service",
    title: "Model Training,\nFine-Tuning & Agentic AI",
    desc: "Orchestrating autonomous agents and fine-tuning models to deliver intelligent systems that solve real-world problems, not just benchmarks.",
    href: "/services/ai",
  },
  {
    kicker: "Service",
    title: "Software development\nand testing",
    desc: "Software development, test automation and quality checks that make applications dependable, maintainable and ready for real users.",
    href: "/services/web",
  },
  {
    kicker: "Service",
    title: "Deployment\n& infra",
    desc: "Robust cloud architecture and secure data pipelines built for speed, reliability, and the people who will actually rely on them.",
    href: "/services/infrastructure",
  },
];

export const faqs = [
  {
    q: "What kind of projects do you take on?",
    a: "My primary focus is AI: building autonomous agents, multi-agent workflows, model-driven applications and data pipelines. I also develop and test the software needed to deliver those systems reliably.",
  },
  {
    q: "What makes your approach different?",
    a: "I connect AI system design, data infrastructure, software implementation and testing. Each part is evaluated against the needs of the product, making the system easier to maintain and improve.",
  },
  {
    q: "What does your typical tech stack look like?",
    a: "For AI orchestration, I use frameworks like LangChain and LangGraph with LLM APIs. For software development and testing, I work with React, TypeScript, backend APIs and automated tests to keep applications reliable.",
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
    color: "#5db8a6",
    status: "Local research prototype · v0.7.x",
    description: "A model-agnostic Python memory layer for AI agents. AGM stores structured memories in an event-sourced SQLite core and supports keyword, vector and bounded graph retrieval, provenance, trust tiers, memory lifecycle operations and task handoff.",
    architecture: "The immutable event log is the source of truth; node, edge, FTS5 and embedding tables are rebuildable views. Retrieval combines keyword and vector seeds, bounded graph expansion, scope and validity filters, ranking, and an abstention path when evidence is insufficient. The library, REST API, standard-library client and CLI share the same core.",
    evidence: [
      "Event-sourced SQLite storage with replayable derived views",
      "Trust tiers, provenance, secret redaction and instruction-like-text quarantine in the core",
      "Memory lifecycle support for supersede, hard delete, expiry and writer revocation",
      "Python library, FastAPI REST adapter, standard-library client and CLI",
      "Synthetic retrieval benchmarks and regression tests are present; real-history evaluation remains NOT RUN"
    ],
    stack: ["Python", "SQLite", "FastAPI", "Pydantic", "FTS5", "Vector retrieval", "Pytest"],
    github: "https://github.com/yash936936/AGM",
  },
  {
    slug: "sysdesign-ai",
    title: "SysDesign AI",
    year: "2026",
    category: "AI-assisted system design",
    color: "#8a7fc7",
    status: "Prototype",
    description: "An AI-powered system design workspace that guides a prompt through HLD or LLD classification, requirement clarification and reference retrieval, then builds a structured system design in a chat-based interface.",
    architecture: "The Next.js frontend communicates with a FastAPI backend. The flow classifies the design request, collects requirements through interactive multiple-choice questions, retrieves reference material using Gemini embeddings and ChromaDB, and streams generated sections over server-sent events. The artifact workspace is designed to display architecture diagrams, capacity estimates, data models, API design and technology choices.",
    evidence: [
      "HLD/LLD intent classification with a heuristic fallback when Gemini classification is unavailable",
      "Interactive clarification flow for functional requirements, non-functional requirements and constraints",
      "RAG retrieval over ingested system-design references and a curated famous-systems collection",
      "SSE generation pipeline for architecture, capacity, data model, API and stack sections",
      "Interactive React Flow architecture diagrams and PDF/Markdown export paths"
    ],
    stack: ["Next.js", "React", "FastAPI", "Gemini", "LangChain", "ChromaDB", "PostgreSQL", "Supabase", "Redis", "React Flow"],
    github: "https://github.com/yash936936/AI-System-Design",
  },
  {
    slug: "coding-harness",
    title: "Coding Harness",
    year: "2026",
    category: "Agentic developer tooling",
    color: "#5db8a6",
    status: "Active prototype",
    description: "A TypeScript multi-agent coding harness built on Cordis. Profiles combine model access, tools, retrieval, memory, orchestration, policy gates, sandbox providers and evaluation.",
    architecture: "The repository records a shared SQLite implementation and memory/retrieval storage slices. Execution boundaries are explicit: host command execution and local fallback remain disabled, and the Vercel Sandbox integration is not presented as end-to-end accepted.",
    evidence: [
      "Profile-based composition for models, tools, retrieval, memory and policy",
      "Shared SQLite storage and memory/retrieval work documented in the repository",
      "Ubuntu and Windows CI matrix documented in the project README",
    ],
    stack: ["TypeScript", "Cordis", "SQLite", "Agent orchestration", "Policy gates"],
    github: "https://github.com/yash936936/Harness",
  },
  {
    slug: "legal-ai",
    title: "Legal AI Assistant",
    year: "2026",
    category: "Domain-specific RAG",
    color: "#cc785c",
    status: "Working prototype",
    description: "A Streamlit application for Indian-law questions and contract review. It separates legal-advisor and contract-analyzer workflows and keeps the legal-source context visible in the interaction.",
    architecture: "A LangGraph workflow uses Gemini for generation and a hybrid retrieval layer built around Chroma vector search and BM25. The repository also includes an optional LLM-as-judge evaluation for faithfulness, relevance and helpfulness.",
    evidence: [
      "Two workflows: Legal Advisor and Contract Analyzer",
      "PDF law sources are loaded, chunked and indexed for retrieval",
      "Optional RAG quality evaluation exposes three separate scoring dimensions",
    ],
    stack: ["Python", "Streamlit", "LangGraph", "ChromaDB", "BM25", "Gemini"],
    github: "https://github.com/yash936936/LegalAI",
  },
  {
    slug: "fathom",
    title: "Fathom Research Assistant",
    year: "2026",
    category: "Local research agent",
    color: "#8a7fc7",
    status: "Windows-targeted project",
    description: "A local CLI research assistant that plans a research question, searches external sources and returns an answer with references that can be checked. Its documentation describes a research-focused tool rather than a general-purpose chatbot.",
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
