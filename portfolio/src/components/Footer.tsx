import { Link } from "react-router-dom";
import "./Footer.css";

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
            <Link to="/services/ai">Agentic Systems &amp; Model Training</Link>
            <Link to="/services/web">Full-Stack Web Apps</Link>
            <Link to="/services/infrastructure">Deployment &amp; Infrastructure</Link>
          </div>
          <div className="footer__col">
            <span className="footer__col-title">Explore</span>
            <Link to="/work">Work</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="footer__col">
            <span className="footer__col-title">Elsewhere</span>
            <a href="https://github.com/yash936936" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/yashmalik-/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
          <div className="footer__col">
            <span className="footer__col-title">Get in touch</span>
            <a href="mailto:yashsunilmalik@gmail.com">yashsunilmalik@gmail.com</a>
            <span className="footer__muted">Delhi NCR, India</span>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Yash. All rights reserved.</span>
          <Link to="/mentions-legales">Legal notice</Link>
        </div>
      </div>
    </footer>
  );
}
