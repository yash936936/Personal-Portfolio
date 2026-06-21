import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const [ready, setReady] = useState(false);
  const readyRef = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    const move = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!readyRef.current) {
        readyRef.current = true;
        pos.current.x = e.clientX;
        pos.current.y = e.clientY;
        setReady(true);
      }
    };
    window.addEventListener("mousemove", move);

    let raf: number;
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.2;
      pos.current.y += (target.current.y - pos.current.y) * 0.2;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onEnter = (e: Event) => {
      const el = e.target as HTMLElement;
      if (el.closest("a, button, [data-cursor='link']")) {
        dotRef.current?.classList.add("cursor-dot--active");
      }
    };
    const onLeave = (e: Event) => {
      const el = e.target as HTMLElement;
      if (el.closest("a, button, [data-cursor='link']")) {
        dotRef.current?.classList.remove("cursor-dot--active");
      }
    };
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
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
