import { Link, useLocation } from "react-router-dom";
import "./PageHeader.css";

const LABELS: Record<string, string> = {
  work: "Work",
  services: "Engineering Capabilities",
  ai: "AI & Agentic Systems",
  web: "Full-stack Development",
  infrastructure: "Deployment & Infrastructure",
  about: "About",
  contact: "Contact",
  blog: "Blog",
  "mentions-legales": "Legal Notice",
};

export default function PageHeader({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);
  const crumbs = segments.map((segment, index) => ({
    label: LABELS[segment] ?? segment.replace(/-/g, " "),
    href: "/" + segments.slice(0, index + 1).join("/"),
    current: index === segments.length - 1,
  }));

  return (
    <section className="page-header">
      <div className="container">
        {crumbs.length > 0 && (
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li><Link to="/">Home</Link></li>
              {crumbs.map((crumb) => (
                <li key={crumb.href}>
                  {crumb.current ? (
                    <span aria-current="page">{crumb.label}</span>
                  ) : (
                    <Link to={crumb.href}>{crumb.label}</Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <span className="eyebrow page-header__eyebrow">{eyebrow}</span>
        <h1 className="page-header__title">{title}</h1>
        {sub && <p className="page-header__sub">{sub}</p>}
      </div>
    </section>
  );
}
