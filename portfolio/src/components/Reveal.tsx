import type { CSSProperties, ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "span";
  y?: number;
}

export default function Reveal({ children, delay = 0, className = "", as = "div", y = 28 }: RevealProps) {
  const { ref, visible } = useReveal();
  const Tag = as;

  const style: CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : `translateY(${y}px)`,
    transition: `opacity 0.9s var(--ease-out-expo) ${delay}ms, transform 0.9s var(--ease-out-expo) ${delay}ms`,
  };

  return (
    <Tag ref={ref as never} className={className} style={style}>
      {children}
    </Tag>
  );
}
