import ServicePage from "./ServicePage";

export default function ServiceWeb() {
  return (
    <ServicePage
      eyebrow="Software Development"
      title="Software development"
      sub="Building maintainable applications through clear architecture, thoughtful implementation and dependable delivery."
      steps={[
        { step: "01", title: "Requirements & architecture", desc: "Mapping requirements, user flows and technical boundaries before implementation." },
        { step: "02", title: "Application development", desc: "Building maintainable interfaces and backend services with clear, well-defined APIs." },
        { step: "03", title: "Integration", desc: "Connecting frontend, backend, data and external services into a coherent application." },
        { step: "04", title: "Delivery & handoff", desc: "Preparing the application for deployment with clear configuration and handoff notes." },
      ]}
      related={[
        { label: "Model design & training", href: "/services/ai" },
        { label: "Deployment & infra", href: "/services/infrastructure" },
      ]}
      accent="#4f6f8a"
      onAccent="#fdfaf5"
    />
  );
}
