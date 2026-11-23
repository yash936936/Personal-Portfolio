import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Nav.css";
import "./NavAccessibility.css";

const offerLinks = [
  { title: "Model design & training", desc: "For a model that actually solves the problem", href: "/services/ai" },
  { title: "Full-stack web apps", desc: "A product experience worth shipping", href: "/services/web" },
  { title: "Deployment & infra", desc: "The right cloud setup, end to end", href: "/services/infrastructure" },
];

const primaryLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

const exploreLinks = [
  ...primaryLinks,
  { label: "Contact", href: "/contact" },
];

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
  }, [])¶»§q«^