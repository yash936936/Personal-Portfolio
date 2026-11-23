import { Link } from "react-router-dom";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__copy">
          <span className="eyebrow hero__eyebrow">AI engineering · research · systems</span>
          <h1 className="hero__headline">AI Systems <span>Engineer</span></h1>
          <p className="hero__sub">
            Building intelligent systems, agentic workflows and AI-powered applications.
          </p>
          <div className="hero__actions">
            <Link to="/work" className="hero__action hero__action--primary">Explore Work <span aria-hidden="true">↗</span></Link>
            <Link to="/research" className="hero__action">Research</Link>
            <Link to="/contact" className="hero__action">Contact</Link>
          </div>
        </div>
        <aside className="hero__aside" aria-label="Current technical focus">
          <span className="hero__aside-label">Current focus</span>
          <ul>
            <li>Large language models and retrieval</li>
            <li>Agentic and multi-agent workflows</li>
            <li>Memory systems and context management</li>
            <li>AI architecture and evaluation</li>
          </ul>
          <p>Research-led prototypes. Clear architecture. Honest evaluation.</p>
        </aside>
      </div>
    </section>
  );
}
