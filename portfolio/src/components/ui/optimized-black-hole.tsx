import { useEffect, useRef, useState } from "react";
import { createRenderer } from "./optimized-black-hole-utils/renderer";

/** Standalone host for the optimized black-hole renderer. */
export function Example() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = createRenderer({ canvas });
    void renderer.ready.then(() => {
      if (!cancelled) setIsReady(true);
    });

    return () => {
      cancelled = true;
      renderer.dispose();
    };
  }, []);

  return (
    <div className="not-found__visual" aria-hidden="true">
      <canvas
        ref={canvasRef}
        className={`not-found__canvas transition-opacity duration-500 ${isReady ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

export default Example;
