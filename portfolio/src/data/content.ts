export const heroLines = [
  {
    title: "Awaken your\nthinking partner",
    sub: "A solo engineering studio of one: machine learning, full-stack web, and the systems that connect them.",
  },
  {
    title: "Activate your\nideas",
    sub: "From a trained model to a production endpoint to a UI someone can actually click on.",
  },
];

export const heroTag = "AI Engineering · Full-stack";

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
    title: "Full-stack\nweb apps",
    desc: "Bold, high-performance product experiences powered by scalable databases, putting complex models seamlessly in front of real users.",
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
    a: "I specialize in building intelligent systems from the ground up—whether that’s orchestrating autonomous AI agents, developing full-stack web platforms, or building complex data extraction and automation pipelines.",
  },
  {
    q: "What makes your approach different?",
    a: "There is no disconnect between the backend AI logic and the frontend user experience. I handle the entire architecture—from integrating robust LLMs and building the database infrastructure to designing bold, intuitive interfaces—ensuring nothing gets lost in translation.",
  },
  {
    q: "What does your typical tech stack look like?",
    a: "For AI orchestration, I rely on frameworks like LangChain and LangGraph integrated with top-tier LLM APIs. For full-stack development, I build highly responsive frontends backed by Firebase and Supabase to guarantee scalable, real-time performance.",
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
  { name: "Yash", role: "Software Engineer", linkedin: "https://www.linkedin.com/in/yashmalik-/" },
];
