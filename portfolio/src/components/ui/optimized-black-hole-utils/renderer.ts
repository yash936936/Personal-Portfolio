type RendererOptions = { canvas: HTMLCanvasElement };

type Star = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  phase: number;
};

export function createRenderer({ canvas }: RendererOptions) {
  const context = canvas.getContext("2d", { alpha: false, desynchronized: true });
  if (!context) {
    return { ready: Promise.resolve(), dispose: () => undefined };
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const stars: Star[] = [];
  let width = 1;
  let height = 1;
  let lastDraw = 0;
  let elapsed = 0;
  let disposed = false;
  let visible = true;
  let raf = 0;
  let resizeObserver: ResizeObserver | undefined;

  let seed = 731;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  for (let i = 0; i < 125; i += 1) {
    stars.push({
      x: random(),
      y: random(),
      radius: 0.35 + random() * 1.15,
      alpha: 0.18 + random() * 0.62,
      phase: random() * Math.PI * 2,
    });
  }

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    width = Math.max(1, Math.floor(rect.width));
    height = Math.max(1, Math.floor(rect.height));
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw(elapsed);
  };

  const draw = (time: number) => {
    if (disposed) return;
    context.fillStyle = "#05070d";
    context.fillRect(0, 0, width, height);

    const centerX = width * 0.5;
    const centerY = height * 0.48;
    const scale = Math.min(width, height);
    const radius = Math.max(34, Math.min(scale * 0.105, 104));

    for (const star of stars) {
      const twinkle = reducedMotion ? 1 : 0.72 + Math.sin(time * 0.001 + star.phase) * 0.22;
      context.globalAlpha = star.alpha * twinkle;
      context.fillStyle = "#d9e7ff";
      context.beginPath();
      context.arc(star.x * width, star.y * height, star.radius, 0, Math.PI * 2);
      context.fill();
    }
    context.globalAlpha = 1;

    context.save();
    context.translate(centerX, centerY);
    context.rotate(reducedMotion ? -0.16 : time * 0.000035);
    context.scale(1, 0.34);

    const disk = context.createRadialGradient(0, 0, radius * 0.8, 0, 0, radius * 3.5);
    disk.addColorStop(0, "rgba(0,0,0,0)");
    disk.addColorStop(0.28, "rgba(55,105,190,0.08)");
    disk.addColorStop(0.48, "rgba(106,160,255,0.72)");
    disk.addColorStop(0.57, "rgba(255,205,145,0.95)");
    disk.addColorStop(0.66, "rgba(112,150,255,0.45)");
    disk.addColorStop(1, "rgba(30,55,105,0)");
    context.fillStyle = disk;
    context.beginPath();
    context.arc(0, 0, radius * 3.5, 0, Math.PI * 2);
    context.fill();

    context.strokeStyle = "rgba(255,220,180,0.82)";
    context.lineWidth = Math.max(1.2, radius * 0.045);
    context.shadowColor = "rgba(115,165,255,0.9)";
    context.shadowBlur = radius * 0.65;
    context.beginPath();
    context.ellipse(0, 0, radius * 2.45, radius * 0.78, 0, Math.PI * 1.03, Math.PI * 1.97);
    context.stroke();
    context.restore();

    const halo = context.createRadialGradient(centerX, centerY, radius * 0.8, centerX, centerY, radius * 2.1);
    halo.addColorStop(0, "rgba(0,0,0,1)");
    halo.addColorStop(0.48, "rgba(0,0,0,1)");
    halo.addColorStop(0.58, "rgba(5,7,13,0.92)");
    halo.addColorStop(1, "rgba(5,7,13,0)");
    context.fillStyle = halo;
    context.beginPath();
    context.arc(centerX, centerY, radius * 2.1, 0, Math.PI * 2);
    context.fill();

    context.fillStyle = "#000";
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, Math.PI * 2);
    context.fill();
    context.strokeStyle = "rgba(225,236,255,0.2)";
    context.lineWidth = 1;
    context.stroke();
  };

  const tick = (now: number) => {
    if (disposed || !visible || document.hidden) return;
    if (now - lastDraw >= (reducedMotion ? 1000 : 33)) {
      elapsed = now;
      draw(elapsed);
      lastDraw = now;
    }
    raf = window.requestAnimationFrame(tick);
  };

  const start = () => {
    if (disposed || !visible || document.hidden || raf) return;
    raf = window.requestAnimationFrame(tick);
  };

  const stop = () => {
    if (raf) window.cancelAnimationFrame(raf);
    raf = 0;
  };

  const visibilityObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) start();
    else stop();
  });
  visibilityObserver.observe(canvas);

  const onVisibilityChange = () => {
    if (document.hidden) stop();
    else start();
  };
  document.addEventListener("visibilitychange", onVisibilityChange);

  if (typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
  } else {
    window.addEventListener("resize", resize, { passive: true });
  }

  resize();
  start();

  return {
    ready: Promise.resolve(),
    dispose: () => {
      if (disposed) return;
      disposed = true;
      stop();
      visibilityObserver.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      context.clearRect(0, 0, width, height);
    },
  };
}
