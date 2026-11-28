import { Link } from "react-router-dom";
import BlackHole from "../components/ui/optimized-black-hole";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="not-found-page">
      <BlackHole />
      <div className="not-found__content container">
        <span className="not-found__eyebrow">ERROR 404 · LOST IN SPACE</span>
        <p className="not-found__code">404</p>
        <h1>This page has crossed the event horizon.</h1>
        <p className="not-found__message">
          The page you’re looking for may have moved, disappeared, or never existed.
          Let’s get you back to familiar ground.
        </p>
        <nav className="not-found__actions" aria-label="Suggested destinations">
          <Link to="/" className="not-found__link not-found__link--primary">Back to home <span aria-hidden="true">↗</span></Link>
          <Link to="/work" className="not-found__link">Selected work</Link>
          <Link to="/blog" className="not-found__link">Blog</Link>
          <Link to="/contact" className="not-found__link">Contact</Link>
        </nav>
      </div>
      <span className="not-found__coordinates" aria-hidden="true">SIGNAL LOST / ROUTE 000</span>
    </div>
  );
}
