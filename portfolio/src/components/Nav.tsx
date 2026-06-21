import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const offerLinks = [
  { title: "Model design & training", desc: "For a model that actually solves the problem", href: "/services/branding" },
  { title: "Full-stack web apps", desc: "A product experience worth shipping", href: "/services/web" },
  { title: "Deployment & infra", desc: "The right cloud setup, end to end", href: "/services/campaigns" },
];

const primaryLinks = [
  { label: "Work", href: "/work" },
  { label: "Notes", href: "/blog" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <div className="nav__inner container">
          <Link to="/" className="nav__logo" aria-label="Home" onClick={closeMenu}>
            <span className="nav__logo-mark">Y</span>
            <span className="nav__logo-word">Yash</span>
          </Link>

          <button
            className={`nav__trigger ${open ? "nav__trigger--open" : ""}`}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            <span className="nav__trigger-label">{open ? "Close" : "Menu"}</span>
            <span className="nav__trigger-icon">
              <span />
              <span />
            </span>
          </button>

          <nav className="nav__primary" aria-label="Primary">
            {primaryLinks.map((l) => (
              <Link key={l.href} to={l.href} className="nav__primary-link">
                {l.label.toUpperCase()}
              </Link>
            ))}
            <Link to="/contact" className="nav__cta">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <div className={`nav-overlay ${open ? "nav-overlay--open" : ""}`}>
        <div className="nav-overlay__inner container">
          <div className="nav-overlay__col">
            <span className="eyebrow nav-overlay__eyebrow">Services</span>
            <ul className="nav-overlay__offers">
              {offerLinks.map((o, i) => (
                <li
                  key={o.href}
                  style={{ transitionDelay: open ? `${120 + i * 70}ms` : "0ms" }}
                  className="nav-overlay__offer-item"
                >
                  <Link to={o.href} className="nav-overlay__offer" onClick={closeMenu}>
                    <span className="nav-overlay__offer-title">{o.title}</span>
                    <span className="nav-overlay__offer-desc">{o.desc}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="nav-overlay__col">
            <span className="eyebrow nav-overlay__eyebrow">Explore</span>
            <ul className="nav-overlay__links">
              {[
                { label: "Work", href: "/work" },
                { label: "Notes", href: "/blog" },
                { label: "Contact", href: "/contact" },
              ].map((l, i) => (
                <li
                  key={l.href}
                  style={{ transitionDelay: open ? `${180 + i * 70}ms` : "0ms" }}
                  className="nav-overlay__link-item"
                >
                  <Link to={l.href} className="nav-overlay__link" onClick={closeMenu}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="nav-overlay__contact">
              <p className="nav-overlay__contact-label">Say hello</p>
              <a href="mailto:hello@example.com" className="nav-overlay__contact-email">
                hello@example.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
