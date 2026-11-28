import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const [ready, setReady] = useState(false);
  const readyRef = useRef(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const noHover = window.matchMedia("(hover: none)");
    if (reducedMotion.matches || noHover.matches) return;

    let frameId: number | null = null;

    const tick = () => {
      const dx = target.current.x - pos.current.x;
      const dy = target.current.y - pos.current.y;

      pos.current.x += dx * 0.22;
      pos.current.y += dy * 0.22;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }

      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        frameId = window.requestAnimationFrame(tick);
      } else {
        pos.current.x = target.current.x;
        pos.current.y = target.current.y;
        frameId = null;
      }
    };

    const move = (event: MouseEvent) => {
      target.current.x = event.clientX;
      target.current.y = event.clientY;

      if (!readyRef.current) {
        readyRef.current = true;
        pos.current.x = event.clientX;
        pos.current.y = event.clientY;
        setReady(true);
      }

      if (frameId === null) frameId = window.requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", move, { passive: true });

    return () => {
      window.removeEventListener("mousemove", move);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="cursor-dot"
      style={{ opacity: ready ? 1 : 0 }}
      aria-hidden="true"
    />
  );
}
