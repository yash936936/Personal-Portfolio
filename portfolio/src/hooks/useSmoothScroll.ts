import { useEffect } from "react";
import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function getLenis() {
  return lenisInstance;
}

export function useSmoothScroll() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let instance: Lenis | null = null;
    let frameId = 0;

    const stop = () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      frameId = 0;
      instance?.destroy();
      instance = null;
      lenisInstance = null;
    };

    const start = () => {
      stop();
      if (preference.matches) return;

      instance = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.2,
      });
      lenisInstance = instance;

      const raf = (time: number) => {
        if (!instance) return;
        instance.raf(time);
        frameId = window.requestAnimationFrame(raf);
      };
      frameId = window.requestAnimationFrame(raf);
    };

    start();
    preference.addEventListener("change", start);

    return () => {
      preference.removeEventListener("change", start);
      stop();
    };
  }, []);
}
