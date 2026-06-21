import ServicePage from "./ServicePage";

export default function ServiceBranding() {
  return (
    <ServicePage
      eyebrow="Service · 01"
      title="Model design & training"
      sub="For a model that actually solves the problem, not just the benchmark."
      steps={[
        { step: "01", title: "Problem framing", desc: "Defining the task, the data, and what 'good enough' actually means before any training starts." },
        { step: "02", title: "Data & pipeline", desc: "Cleaning, splitting, and structuring data so the model sees what it'll see in production." },
        { step: "03", title: "Training & evaluation", desc: "Iterating on architecture and hyperparameters against metrics that map to the real task." },
        { step: "04", title: "Export & handoff", desc: "ONNX / ready-to-serve artifacts, documented and packaged for the next stage." },
      ]}
      related={[
        { label: "Full-stack web apps", href: "/services/web" },
        { label: "Deployment & infra", href: "/services/campaigns" },
      ]}
    />
  );
}
