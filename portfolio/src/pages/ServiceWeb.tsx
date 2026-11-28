import ServicePage from "./ServicePage";

export default function ServiceWeb() {
  return (
    <ServicePage
      eyebrow="Full-stack development"
      title="Full-stack web apps"
      sub="A product experience that puts the model in front of real users."
      steps={[
        { title: "UX & architecture", desc: "Mapping the user flow and the system architecture before a line of UI code is written." },
        { title: "Frontend build", desc: "React / Next.js interfaces that stay fast, accessible, and easy to extend." },
        { title: "API & backend", desc: "Node.js / FastAPI services that connect the model to the product cleanly." },
        { title: "QA & polish", desc: "Cross-device testing, performance passes, and the small details that make it feel finished." },
      ]}
      related={[
        { label: "Model design & training", href: "/services/ai" },
        { label: "Deployment & infra", href: "/services/infrastructure" },
      ]}
    />
  );
}