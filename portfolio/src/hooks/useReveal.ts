import { useEffect, useRef, useState } from "react";

export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(
    () => typeof IntersectionObserver === "undefined" ||
      (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches),
  );

  useEffect(() => {
    const node = ref.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!node || typeof IntersectionObserver === "undefined" || preference.matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);

    const onPreferenceChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setVisible(true);
        observer.disconnect();
      }
    };

    preference.addEventListener("change", onPreferenceChange);
    return () => {
      preference.removeEventListener("change", onPreferenceChange);
      observer.disconnect();
    };
  }, [threshold]);

  return { ref, visible };
}
