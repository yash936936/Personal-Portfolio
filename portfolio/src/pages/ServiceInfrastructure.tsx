import ServicePage from "./ServicePage";

export default function ServiceInfrastructure() {
  return (
    <ServicePage
      eyebrow="Deployment & infrastructure"
      title="Deployment & infra"
      sub="The right cloud setup for the people who'll actually use it."
      steps={[
        { title: "Infra plan", desc: "Choosing the simplest stack that meets the actual load and budget, not the trendiest one." },
        { title: "CI/CD setup", desc: "Automated builds and deploys to Vercel / Railway / your cloud of choice." },
        { title: "Monitoring", desc: "Logging, alerts, and health checks so problems surface before users notice." },
        { title: "Handover docs", desc: "Clear runbooks so the system stays maintainable without me in the room." },
      ]}
      related={[
        { label: "Model design & training", href: "/services/ai" },
        { label: "Full-stack web apps", href: "/services/web" },
      ]}
    />
  );
}