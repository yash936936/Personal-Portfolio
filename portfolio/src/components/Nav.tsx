import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Nav.css";

const offerLinks = [
  { title: "Model design & training", desc: "For a model that actually solves the problem", href: "/services/ai" },
  { title: "Full-stack web apps", desc: "A product experience worth shipping", href: "/services/web" },
  { title: "Deployment & infra", desc: "The right cloud setup, end to end", href: "/services/infrastructure" },
];

const primaryLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
];

// Pages with dark backgrounds where nav trigger needs to be light
const DARK_BG_ROUTES = ["/work", "/contact"];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const closeMenu = () => setOpen(false);

  const isDarkPage = DARK_BG_ROUTES.includes(location.pathname);

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

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className={`nav ${scrolled ? "nav--scrolled" : ""} ${isDarkPage ? "nav--dark-page" : ""}`}>
        <div className="nav__inner container">
          <Link to="/" className="nav__logo" aria-label="Home" onClick={closeMenu}>
            <span className="nav__logo-mark">Y</span>
            <span className="nav__logo-word">Yash</span>
          </Link>

          <button
            className={`nav__trigger ${open ? "nav__trigger--open" : ""}`}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="nav-overlay"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          >
            <span className="nav__trigger-label">{open ? "Close" : "Menu"}</span>
            <span className="nav__trigger-icon">
              <span />
              <span />
            </span>
          </button>

          <nav className="nav__primary" aria-label="Primary">
            <div className="nav__track">
              {primaryLinks.map((l) => (
                <Link key={l.href} to={l.href} className="nav__pill" aria-current={location.pathname === l.href ? "page" : undefined}>
                  {l.label}
                </Link>
              ))}
              <span className="nav__divider" aria-hidden="true" />
              <Link to="/contact" className="nav__pill nav__pill--cta">
                <span className="nav__pill-cta-label">Contact</span>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <div id="nav-overlay" className={`nav-overlay ${open ? "nav-overlay--open" : ""}`} aria-hidden={!open}>
        <div className="nav-overlay__inner container">
          <div className="nav-overlay__col">
            <Link to="/services" className="eyebrow nav-overlay__eyebrow" onClick={closeMenu} aria-current={location.pathname.startsWith("/services") ? "page" : undefined}>Services</Link>
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
                { label: "Home", href: "/" },
                { label: "Work", href: "/work" },
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((l, i) => (
                <li
                  key={l.href}
                  style={{ transitionDelay: open ? `${180 + i * 70}ms` : "0ms" }}
                  className="nav-overlay__link-item"
                >
                  <Link to={l.href} className="nav-overlay__link" onClick={closeMenu} aria-current={location.pathname === l.href ? "page" : undefined}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="nav-overlay__contact">
              <p className="nav-overlay__contact-label">Say hello</p>
              <a href="mailto:yashsunilmalik@gmail.com" className="nav-overlay__contact-email">
                yashsunilmalik@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}