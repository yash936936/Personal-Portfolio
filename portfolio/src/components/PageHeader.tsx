import "./PageHeader.css";

export default function PageHeader({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <section className="page-header">
      <div className="container">
        <span className="eyebrow page-header__eyebrow">{eyebrow}</span>
        <h1 className="page-header__title">{title}</h1>
        {sub && <p className="page-header__sub">{sub}</p>}
      </div>
    </section>
  );
}
