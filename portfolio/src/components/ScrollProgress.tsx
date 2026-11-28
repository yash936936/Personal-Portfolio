import { useEffect, useRef } from "react";
import "./ScrollProgress.css";

/** A lightweight, spring-smoothed reading progress indicator for document pages. */
export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = progressRef.current;
    if (!element) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let target = 0;
    let position = 0;
    let velocity = 0;
    let frame = 0;
    let previousTime = 0;

    const measure = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      target = scrollableHeight > 0
        ? Math.min(1, Math.max(0, window.scrollY / scrollableHeight))
        : 0;
      if (reduceMotion) {
        position = target;
        velocity = 0;
        element.style.transform = `scaleX(${position})`;
        element.setAttribute("aria-valuenow", String(Math.round(position * 100)));
      }
    };

    const animate = (time: number) => {
      const delta = previousTime ? Math.min((time - previousTime) / 1000, 0.032) : 0;
      previousTime = time;

      // Semi-implicit spring integration using the supplied stiffness,
      // damping and mass values. The frame delta is capped for stable motion.
      const stiffness = 280;
      const damping = 18;
      const mass = 0.3;
      const acceleration = (stiffness * (target - position) - damping * velocity) / mass;
      velocity += acceleration * delta;
      position += velocity * delta;

      if (Math.abs(target - position) < 0.0005 && Math.abs(velocity) < 0.001) {
        position = target;
        velocity = 0;
      }

      element.style.transform = `scaleX(${Math.min(1, Math.max(0, position))})`;
      element.setAttribute("aria-valuenow", String(Math.round(position * 100)));

      if (position !== target || velocity !== 0) {
        frame = window.requestAnimationFrame(animate);
      } else {
        frame = 0;
      }
    };

    const schedule = () => {
      measure();
      if (reduceMotion) return;
      if (!frame) frame = window.requestAnimationFrame(animate);
    };

    measure();
    if (!reduceMotion) frame = window.requestAnimationFrame(animate);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(document.documentElement);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="scroll-progress" aria-label="Page reading progress">
      <div
        ref={progressRef}
        className="scroll-progress__bar"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={0}
      />
    </div>
  );
}
