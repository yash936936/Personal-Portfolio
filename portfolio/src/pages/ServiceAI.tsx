import ServicePage from "./ServicePage";

export default function ServiceAI() {
  return (
    <ServicePage
      eyebrow="Service · 01"
      title="Model Training, Fine-Tuning & Agentic AI"
      sub="Orchestrating autonomous agents and fine-tuning models to deliver intelligent systems that solve real-world problems, not just benchmarks."
      steps={[
        { step: "01", title: "Problem framing", desc: "Defining the task, the data, and what 'good enough' actually means before any training starts." },
        { step: "02", title: "Data & pipeline", desc: "Cleaning, splitting, and structuring data so the model sees what it'll see in production." },
        { step: "03", title: "Training & evaluation", desc: "Iterating on architecture and hyperparameters against metrics that map to the real task." },
        { step: "04", title: "Export & handoff", desc: "ONNX / ready-to-serve artifacts, documented and packaged for the next stage." },
      ]}
      related={[
        { label: "Full-stack web apps", href: "/services/web" },
        { label: "Deployment & infra", href: "/services/infrastructure" },
      ]}
      accent="var(--color-primary)"
      onAccent="var(--color-on-primary)"
    />
  );
}