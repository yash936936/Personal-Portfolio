import { useEffect, useRef } from "react";
import { createRenderer } from "./black-hole-utils/renderer";

export function BlackHole() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = createRenderer({ canvas });
    void renderer.ready;

    return () => renderer.dispose();
  }, []);

  return (
    <div className="not-found__visual" aria-hidden="true">
      <canvas ref={canvasRef} className="not-found__canvas" />
    </div>
  );
}

export default BlackHole;
