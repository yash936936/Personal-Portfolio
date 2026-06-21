import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./ProjectRow.css";

interface ProjectRowProps {
  title: string;
  year: string;
  category: string;
  color: string;
  href: string;
}

export default function ProjectRow({ title, year, category, color, href }: ProjectRowProps) {
  const [hovering, setHovering] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const rowRef = useRef<HTMLAnchorElement | null>(null);

  function handleMove(e: React.MouseEvent) {
    const rect = rowRef.current?.getBoundingClientRect();
    if (!rect) return;
    const previewHalfWidth = 110; // half of 220px preview width
    const rawX = e.clientX - rect.left;
    const clampedX = Math.min(Math.max(rawX, previewHalfWidth), rect.width - previewHalfWidth);
    setPos({ x: clampedX, y: e.clientY - rect.top });
  }

  return (
    <Link
      to={href}
      ref={rowRef}
      className="project-row"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onMouseMove={handleMove}
      data-cursor="link"
    >
      <span className="project-row__title">{title}</span>
      <span className="project-row__meta">
        <span className="project-row__category">{category}</span>
        <span className="project-row__year">{year}</span>
      </span>

      <span
        className={`project-row__preview ${hovering ? "project-row__preview--visible" : ""}`}
        style={{
          left: pos.x,
          top: pos.y,
          background: `linear-gradient(150deg, ${color}, var(--color-surface-dark))`,
        }}
        aria-hidden="true"
      />
    </Link>
  );
}
