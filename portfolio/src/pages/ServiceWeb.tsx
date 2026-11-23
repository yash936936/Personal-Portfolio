import ServicePage from "./ServicePage";

export default function ServiceWeb() {
  return (
    <ServicePage
      eyebrow="Service · 02"
      title="Software development and testing"
      sub="Building dependable applications through clear architecture, careful implementation, automated tests and quality checks."
      steps={[
        { step: "01", title: "Requirements & architecture", desc: "Mapping requirements, user flows and technical boundaries before implementation." },
        { step: "02", title: "Software development", desc: "Building maintainable interfaces and backend services with clear, well-defined APIs." },
        { step: "03", title: "Automated testing", desc: "Writing unit, integration and end-to-end tests to catch issues throughout development." },
        { step: "04", title: "Quality assurance", desc: "Checking usability, accessibility, performance and cross-device behavior before release." },
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