import { Link } from "react-router-dom";
import "./Footer.css";
import { prefetchRoute } from "../utils/prefetchRoute";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <h2 className="footer__line">
          Creative minds <br /> for creative builds
        </h2>

        <div className="footer__grid">
          <div className="footer__col">
            <span className="footer__col-title">Services</span>
            <Link to="/services/ai" onMouseEnter={() => prefetchRoute("/services/ai")} onFocus={() => prefetchRoute("/services/ai")}>Agentic Systems &amp; Model Training</Link>
            <Link to="/services/web" onMouseEnter={() => prefetchRoute("/services/web")} onFocus={() => prefetchRoute("/services/web")}>Full-Stack Web Apps</Link>
            <Link to="/services/infrastructure" onMouseEnter={() => prefetchRoute("/services/infrastructure")} onFocus={() => prefetchRoute("/services/infrastructure")}>Deployment &amp; Infrastructure</Link>
          </div>
          <div className="footer__col">
            <span className="footer__col-title">Studio</span>
            <Link to="/work" onMouseEnter={() => prefetchRoute("/work")} onFocus={() => prefetchRoute("/work")}>Work</Link>
            <Link to="/about" onMouseEnter={() => prefetchRoute("/about")} onFocus={() => prefetchRoute("/about")}>About</Link>
            <Link to="/contact" onMouseEnter={() => prefetchRoute("/contact")} onFocus={() => prefetchRoute("/contact")}>Contact</Link>
          </div>
          <div className="footer__col">
            <span className="footer__col-title">Elsewhere</span>
            <a href="https://github.com/yash936936" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/yashmalik-" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://x.com/yashm15082005" target="_blank" rel="noreferrer">X</a>
          </div>
          <div className="footer__col">
            <span className="footer__col-title">Get in touch</span>
            <a href="mailto:yashsunilmalik@gmail.com">yashsunilmalik@gmail.com</a>
            <span className="footer__muted">Delhi NCR, India</span>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Yash. All rights reserved.</span>
          <Link to="/mentions-legales" onMouseEnter={() => prefetchRoute("/mentions-legales")} onFocus={() => prefetchRoute("/mentions-legales")}>Legal notice</Link>
        </div>
      </div>
    </footer>
  );
}
