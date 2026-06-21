import { useEffect, useRef, useState } from "react";
import { stats } from "../../data/content";
import { useReveal } from "../../hooks/useReveal";
import "./Stats.css";

function useCountUp(target: number, start: boolean, duration = 1400) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!start || startedRef.current) return;
    startedRef.current = true;
    const t0 = performance.now();

    function tick(now: number) {
      const progress = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [start, target, duration]);

  return value;
}

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, visible } = useReveal(0.4);
  const count = useCountUp(value, visible);

  return (
    <div ref={ref} className="stat-item">
      <p className="stat-item__value">
        {count}
        {suffix}
      </p>
      <p className="stat-item__label">{label}</p>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="stats">
      <div className="container stats__grid">
        {stats.map((s) => (
          <StatItem key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
        ))}
      </div>
    </section>
  );
}
