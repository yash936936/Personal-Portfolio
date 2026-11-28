import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Nav.css";
import "./NavAccessibility.css";

const offerLinks = [
  { title: "AI systems and agentic workflows", desc: "LLM applications, retrieval and model integration", href: "/services/ai" },
  { title: "Software development", desc: "Build and ship dependable applications", href: "/services/web" },
  { title: "Deployment and infrastructure", desc: "Backend services and cloud integration", href: "/services/infrastructure" },
];
const primaryLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];
const exploreLinks = [...primaryLinks, { label: "Contact", href: "/contact" }];
const DARK_BG_ROUTES = ["/work", "/contact"];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);
  const closeMenu = useCallback(() => setOpen(false), []);
  const isDarkPage = DARK_BG_ROUTES.includes(location.pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  useEffect(() => {
    if (!open) {
      if (wasOpenRef.current) {
        wasOpenRef.current = false;
        triggerRef.current?.focus();
      }
      return;
    }
    wasOpenRef.current = true;
    const frame = window.requestAnimationFrame(() => overlayRef.current?.querySelector<HTMLElement>("a[href]")?.focus());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); closeMenu(); return; }
      if (event.key !== "Tab") return;
      const focusable = Array.from(overlayRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? []);
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => { window.cancelAnimationFrame(frame); document.removeEventListener("keydown", onKeyDown); };
  }, [open, closeMenu]);

  return <>
    <header className={"nav " + (scrolled ? "nav--scrolled " : "") + (isDarkPage ? "nav--dark-page" : "")}>
      <div className="nav__inner container">
        <Link to="/" className="nav__logo" aria-label="Home" onClick={closeMenu}>
          <span className="nav__logo-mark">Y</span><span className="nav__logo-word">Yash</span>
        </Link>
        <button ref={triggerRef} type="button" className={"nav__trigger " + (open ? "nav__trigger--open" : "")} onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="site-navigation-overlay" aria-label={open ? "Close navigation menu" : "Open navigation menu"}>
          <span className="nav__trigger-label">{open ? "Close" : "Menu"}</span><span className="nav__trigger-icon" aria-hidden="true"><span /><span /></span>
        </button>
        <nav className="nav__primary" aria-label="Primary navigation">
          <div className="nav__track">
            {primaryLinks.map((link) => <Link key={link.href} to={link.href} className="nav__pill" aria-current={location.pathname === link.href ? "page" : undefined}>{link.label}</Link>)}
            <span className="nav__divider" aria-hidden="true" />
            <Link to="/contact" className="nav__pill nav__pill--cta" aria-current={location.pathname === "/contact" ? "page" : undefined}>
              <span className="nav__pill-cta-label">Contact</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
    <div id="site-navigation-overlay" ref={overlayRef} className={"nav-overlay " + (open ? "nav-overlay--open" : "")} role="dialog" aria-modal={open} aria-label="Site navigation" aria-hidden={!open} inert={!open}>
      <div className="nav-overlay__inner container">
        <div className="nav-overlay__col">
          <span className="eyebrow nav-overlay__eyebrow">Engineering capabilities</span>
          <ul className="nav-overlay__offers">
            {offerLinks.map((offer, index) => <li key={offer.href} style={{ transitionDelay: open ? (120 + index * 70) + "ms" : "0ms" }} className="nav-overlay__offer-item">
              <Link to={offer.href} className="nav-overlay__offer" onClick={closeMenu}><span className="nav-overlay__offer-title">{offer.title}</span><span className="nav-overlay__offer-desc">{offer.desc}</span></Link>
            </li>)}
          </ul>
        </div>
        <div className="nav-overlay__col">
          <span className="eyebrow nav-overlay__eyebrow">Explore</span>
          <ul className="nav-overlay__links">
            {exploreLinks.map((link, index) => <li key={link.href} style={{ transitionDelay: open ? (180 + index * 55) + "ms" : "0ms" }} className="nav-overlay__link-item">
              <Link to={link.href} className="nav-overlay__link" onClick={closeMenu} aria-current={location.pathname === link.href ? "page" : undefined}>{link.label}</Link>
            </li>)}
          </ul>
          <div className="nav-overlay__contact"><p className="nav-overlay__contact-label">Say hello</p><a href="mailto:yashsunilmalik@gmail.com" className="nav-overlay__contact-email">yashsunilmalik@gmail.com</a></div>
        </div>
      </div>
    </div>
  </>;
}
