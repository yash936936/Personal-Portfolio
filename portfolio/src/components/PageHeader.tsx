import { Link, useLocation } from "react-router-dom";
import "./PageHeader.css";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  sub?: string;
}

export default function PageHeader({ eyebrow, title, sub }: PageHeaderProps) {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);
  const parent = segments[0] === "work" || segments[0] === "blog"
    ? { label: segments[0] === "work" ? "Work" : "Blog", href: "/" + segments[0] }
    : null;

  return (
    <section className="page-header">
      <div className="container">
        {pathname !== "/" && (
          <nav className="page-header__breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            {parent && parent.href !== pathname && (
              <>
                <span aria-hidden="true">/</span>
                {segments.length > 1 ? <Link to={parent.href}>{parent.label}</Link> : <span aria-current="page">{parent.label}</span>}
              </>
            )}
            {segments.length > 1 && (
              <>
                <span aria-hidden="true">/</span>
                <span aria-current="page">{title.replace(/\n/g, " ")}</span>
              </>
            )}
            {!parent && segments.length === 1 && (
              <>
                <span aria-hidden="true">/</span>
                <span aria-current="page">{title.replace(/\n/g, " ")}</span>
              </>
            )}
          </nav>
        )}
        <span className="eyebrow page-header__eyebrow">{eyebrow}</span>
        <h1 className="page-header__title">{title}</h1>
        {sub && <p className="page-header__sub">{sub}</p>}
      </div>
    </section>
  );
}
