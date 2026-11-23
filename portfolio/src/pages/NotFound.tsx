import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="not-found-page">
      <PageHeader
        eyebrow="404 · Page not found"
        title="This page doesn't exist."
        sub="The link may be outdated, or the page may have moved. Use one of the routes below to continue."
      />
      <section className="container not-found__actions" aria-label="Suggested destinations">
        <Link to="/" className="not-found__link">Home</Link>
        <Link to="/work" className="not-found__link">Selected work</Link>
        <Link to="/blog" className="not-found__link">Blog</Link>
        <Link to="/contact" className="not-found__link">Contact</Link>
      </section>
    </div>
  );
}
