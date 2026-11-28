import { useEffect, useRef } from "react";
import Reveal from "../Reveal";
import "./CtaBand.css";

export default function CtaBand() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches || typeof IntersectionObserver === "undefined") return;

    let startTimer: ReturnType<typeof setTimeout> | null = null;

    const clearStartTimer = () => {
      if (startTimer !== null) {
        clearTimeout(startTimer);
        startTimer = null;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          clearStartTimer();
          startTimer = setTimeout(() => {
            video.play().catch(() => {
              // Autoplay may be blocked; the poster remains visible.
            });
          }, 2000);
        } else {
          clearStartTimer();
          video.pause();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(video);

    return () => {
      clearStartTimer();
      observer.disconnect();
      video.pause();
    };
  }, []);

  return (
    <section className="cta-band" aria-label="Portfolio showcase">
      <div className="container">
        <Reveal>
          <div className="cta-band__card">
            <video
              ref={videoRef}
              className="cta-band__video"
              src="/videos/portfolio-showcase.mp4"
              poster="/poster-showcase.jpg"
              loop
              muted
              playsInline
              preload="metadata"
              aria-label="A short visual showcase of selected portfolio work"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
