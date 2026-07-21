import { useEffect, useRef } from "react";
import Reveal from "../Reveal";
import "./CtaBand.css";

export default function CtaBand() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let startTimer: ReturnType<typeof setTimeout> | null = null;

    const clearStartTimer = () => {
      if (startTimer) {
        clearTimeout(startTimer);
        startTimer = null;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          // Wait 2s after the section becomes visible before playing
          startTimer = setTimeout(() => {
            video.play().catch(() => {});
          }, 2000);
        } else {
          // Left the viewport: cancel any pending start and stop playback
          clearStartTimer();
          video.pause();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(video);

    return () => {
      clearStartTimer();
      observer.disconnect();
    };
  }, []);

  return (
    <section className="cta-band">
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
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
