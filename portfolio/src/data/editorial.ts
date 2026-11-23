export interface BlogSection {
  heading: string;
  paragraphs: string[];
  points?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  readingTime: string;
  excerpt: string;
  introduction: string;
  sections: BlogSection[];
  takeaways: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "designing-bounded-agent-workflows",
    title: "Designing agent workflows with explicit boundaries",
    category: "Agentic systems",
    readingTime: "6 min read",
    excerpt: "An agent is easier to reason about when its tools, state, permissions and failure paths are visible in the architecture.",
    introduction: "A multi-agent system is not reliable merely because several agents can hand work to one another. The useful engineering question is what each component is allowed to do, what state it can change, and how the system behaves when a step fails.",
    sections: [
      {
        heading: "Give every step a narrow job",
        paragraphs: [
          "Separate planning, retrieval, execution and verification when those stages have different responsibilities. A planner should produce a bounded plan. A retrieval step should return evidence with provenance. A tool runner should only receive the permissions needed for its operation.",
          "This makes the workflow easier to test. Each stage can be given a known input and checked for a defined output, instead of evaluating one long prompt as a single black box.",
        ],
      },
      {
        heading: "Treat tools as permission boundaries",
        paragraphs: [
          "A tool call is an action, not just another piece of generated text. Read-only search, project file edits, command execution and remote deployment carry different risks. Keep them separate and require explicit policy checks before a tool with side effects can run.",
          "The default should be the smallest useful permission set. A workflow that cannot safely complete a task should stop with a clear reason rather than silently falling back to a broader capability.",
        ],
      },
      {
        heading: "Make state and failure visible",
        paragraphs: [
          "Agent handoffs need typed inputs, explicit outputs and durable state where recovery matters. Retries should be limited to operations that are safe to repeat. Side effects need idempotency or a way to detect whether the previous attempt already succeeded.",
          "Logs should identify the stage, decision and tool result without exposing secrets or private user data. This gives a developer enough evidence to understand why a run stopped.",
        ],
      },
    ],
    takeaways: [
      "Keep stages small and testable.",
      "Separate read-only capabilities from actions with side effects.",
      "Define retry, timeout and recovery behavior before adding more agents.",
      "Measure completed tasks and policy failures, not just successful model responses.",
    ],
  },
  {
    slug: "evaluating-rag-beyond-retrieval",
    title: "Evaluating RAG beyond retrieval",
    category: "Retrieval and evaluation",
    readingTime: "7 min read",
    excerpt: "A retriever can return useful passages while the final answer still adds unsupported claims. Evaluation needs to cover the entire path.",
    introduction: "Retrieval-augmented generation is often described as a search problem followed by a generation problem. In practice, quality depends on the full chain: query interpretation, retrieval, ranking, evidence selection, synthesis and the final relationship between claims and sources.",
    sections: [
      {
        heading: "Measure more than whether a document was found",
        paragraphs: [
          "Recall and ranking metrics help answer whether relevant material reached the context window. They do not show whether the model used that material correctly. A system can retrieve the right statute, paper or support document and still misstate what it says.",
          "Keep retrieval evaluation separate from answer evaluation. That makes it easier to identify whether a failure came from missing evidence, irrelevant context or unsupported synthesis.",
        ],
      },
      {
        heading: "Check claims against their sources",
        paragraphs: [
          "Break an answer into factual claims and check whether the cited source supports each one. A citation existing beside a sentence is not enough; the source should entail the claim at the level of detail being asserted.",
          "Also evaluate answerability. When the available material does not support a confident answer, the system should state the gap, ask for more context or decline to guess.",
        ],
      },
      {
        heading: "Keep evaluation sets controlled",
        paragraphs: [
          "Use a held-out set with clear expected behaviors: answerable questions, missing-evidence cases, false premises and questions outside the system's domain. Keep the dataset stable when comparing prompt or retrieval changes.",
          "Log the model, retrieval configuration, run date and scoring method. Automated judges can help scale review, but they are themselves fallible and should not replace inspecting difficult examples.",
        ],
      },
    ],
    takeaways: [
      "Evaluate retrieval and answer faithfulness as separate stages.",
      "Check source support at the claim level.",
      "Include unanswerable and false-premise cases in held-out evaluation.",
      "Record evaluation method and version alongside every score.",
    ],
  },
  {
    slug: "building-a-local-research-assistant",
    title: "Building a local research assistant that shows its work",
    category: "AI research",
    readingTime: "6 min read",
    excerpt: "Local inference changes where computation happens, but source quality, citations and answer limits still need deliberate design.",
    introduction: "Running a language model locally can reduce dependence on hosted inference for some workloads. It does not automatically make the research process private, accurate or self-contained. Retrieval tools may still access external services, and the answer still needs a clear path back to its sources.",
    sections: [
      {
        heading: "Separate inference from retrieval",
        paragraphs: [
          "A local model can draft and reason over collected material while retrieval tools gather current information from external sources. Make that network boundary explicit in the product and documentation so users know which operations leave their machine.",
          "A small local model also changes the engineering trade-offs. Context size, response time, memory use and quantization all affect what the system can handle. A useful application should state its hardware and platform limits.",
        ],
      },
      {
        heading: "Treat citations as testable output",
        paragraphs: [
          "A numbered reference should resolve to a source that was actually retrieved. The system can go further by checking whether the source supports the associated claim and flagging citations that cannot be verified.",
          "Those checks are not infallible. Important facts still deserve a direct source review, especially when the retrieval source is incomplete or the question depends on recent events.",
        ],
      },
      {
        heading: "Prefer an honest refusal to a confident guess",
        paragraphs: [
          "A research tool needs a defined domain and an answerability threshold. It should recognise questions outside that domain, challenge false premises and explain when it could not gather enough evidence.",
          "This behavior is part of the product contract. A refusal with a clear reason is more useful than an answer that hides uncertainty behind fluent language.",
        ],
      },
    ],
    takeaways: [
      "Document which operations run locally and which use the network.",
      "Expose hardware and platform requirements.",
      "Verify citations and make the remaining uncertainty visible.",
      "Define the questions the application is designed not to answer.",
    ],
  },
];
