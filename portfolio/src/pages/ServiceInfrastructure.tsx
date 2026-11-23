import ServicePage from "./ServicePage";

export default function ServiceInfrastructure() {
  return (
    <ServicePage
      eyebrow="Service · 03"
      title="Deployment & infra"
      sub="The right cloud setup for the people who'll actually use it."
      steps={[
        { step: "01", title: "Infra plan", desc: "Choosing the simplest stack that meets the actual load and budget, not the trendiest one." },
        { step: "02", title: "CI/CD setup", desc: "Automated builds and deploys to Vercel / Railway / your cloud of choice." },
        { step: "03", title: "Monitoring", desc: "Logging, alerts, and health checks so problems surface before users notice." },
        { step: "04", title: "Handover docs", desc: "Clear runbooks so the system stays maintainable without me in the room." },
      ]}
      related={[
        { label: "Model design & training", href: "/services/ai" },
        { label: "Software development and testing", href: "/services/web" },
      ]}
      accent="var(--color-accent-teal)"
      onAccent="var(--color-ink)"
    />
  );
}