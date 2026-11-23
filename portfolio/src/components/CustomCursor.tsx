import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const [ready, setReady] = useState(false);
  const readyRef = useRef(false);

  useEffect(() => {
    const noHover = window.matchMedia("(hover: none)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (noHover.matches || reducedMotion.matches) return;

    const move = (event: MouseEvent) => {
      target.current.x = event.clientX;
      target.current.y = event.clientY;
      if (!readyRef.current) {
        readyRef.current = true;
        pos.current.x = event.clientX;
        pos.current.y = event.clientY;
        setReady(true);
      }
    };

    window.addEventListener("mousemove", move);

    let raf = 0;
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.2;
      pos.current.y += (target.current.y - pos.current.y) * 0.2;
      if (dotRef.current) {
        dotRef.current.style.transform =
          "translate(" + pos.current.x + "px, " + pos.current.y + "px) translate(-50%, -50%)";
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
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
