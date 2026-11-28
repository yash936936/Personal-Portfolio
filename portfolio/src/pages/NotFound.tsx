import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <section className="not-found container">
      <span className="eyebrow">404 · Not found</span>
      <h1>This page doesn't exist.</h1>
      <p>The link may be outdated, or the page may have moved.</p>
      <Link to="/" className="not-found__link">Back to home</Link>
    </section>
  );
}
