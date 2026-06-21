import { useCallback, useRef, useState } from "react";
import { skillCategories, type SkillCategory } from "../../data/skills";
import "./SkillCapsules.css";

interface ActiveSelection {
  categoryIndex: number;
  subIndex: number;
}

export default function SkillCapsules() {
  const [active, setActive] = useState<ActiveSelection>({ categoryIndex: 0, subIndex: 0 });
  const activeCategory = skillCategories[active.categoryIndex];
  const activeSub = activeCategory.subcategories[active.subIndex];

  return (
    <div className="skill-capsules">
      <div className="skill-capsules__row">
        {skillCategories.map((category, categoryIndex) => (
          <Capsule
            key={category.title}
            category={category}
            isActiveCategory={active.categoryIndex === categoryIndex}
            activeSubIndex={active.categoryIndex === categoryIndex ? active.subIndex : null}
            onSelect={(subIndex) => setActive({ categoryIndex, subIndex })}
          />
        ))}
      </div>

      <div className="skill-capsules__panel">
        <span className="skill-capsules__panel-eyebrow" style={{ color: activeCategory.color }}>
          {activeCategory.title}
        </span>
        <h3 className="skill-capsules__panel-title">{activeSub.title}</h3>
        <div className="skill-capsules__panel-skills">
          {activeSub.skills.map((skill) => (
            <span className="skill-capsules__chip" key={skill}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Capsule({
  category,
  isActiveCategory,
  activeSubIndex,
  onSelect,
}: {
  category: SkillCategory;
  isActiveCategory: boolean;
  activeSubIndex: number | null;
  onSelect: (subIndex: number) => void;
}) {
  const n = category.subcategories.length;
  const [stop, setStop] = useState(0); // 0 = collapsed/rest, n = fully revealed
  const trackRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);

  const stopFromClientY = useCallback(
    (clientY: number) => {
      const track = trackRef.current;
      if (!track) return 0;
      const rect = track.getBoundingClientRect();
      const handleRadius = 24;
      const usable = Math.max(rect.height - handleRadius * 2, 1);
      const rawY = clientY - rect.top - handleRadius;
      const clampedY = Math.min(Math.max(rawY, 0), usable);
      const fraction = 1 - clampedY / usable; // 0 at bottom, 1 at top
      return Math.min(n, Math.max(0, Math.round(fraction * n)));
    },
    [n]
  );

  const commit = useCallback(
    (nextStop: number) => {
      setStop(nextStop);
      if (nextStop > 0) onSelect(nextStop - 1);
    },
    [onSelect]
  );

  function onPointerDown(e: React.PointerEvent) {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    commit(stopFromClientY(e.clientY));
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!draggingRef.current) return;
    commit(stopFromClientY(e.clientY));
  }

  function onPointerUp(e: React.PointerEvent) {
    draggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // pointer capture may already be released
    }
  }

  function onTrackClick(e: React.MouseEvent) {
    commit(stopFromClientY(e.clientY));
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowUp" || e.key === "ArrowRight") {
      e.preventDefault();
      commit(Math.min(n, stop + 1));
    } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
      e.preventDefault();
      commit(Math.max(0, stop - 1));
    } else if (e.key === "Home") {
      e.preventDefault();
      commit(0);
    } else if (e.key === "End") {
      e.preventDefault();
      commit(n);
    }
  }

  const fillPercent = (stop / n) * 100;
  const capsuleStyle = { "--capsule-color": category.color } as React.CSSProperties;

  return (
    <div className={`skill-capsule ${isActiveCategory ? "skill-capsule--active" : ""}`} style={capsuleStyle}>
      <div className="skill-capsule__track" ref={trackRef} onClick={onTrackClick}>
        <div className="skill-capsule__tint" aria-hidden="true" />
        <div className="skill-capsule__fill" style={{ height: `${100 - fillPercent}%` }} aria-hidden="true" />

        {category.subcategories.map((sub, i) => (
          <button
            type="button"
            key={sub.short}
            className={`skill-capsule__badge ${i < stop ? "skill-capsule__badge--visible" : ""} ${
              isActiveCategory && activeSubIndex === i ? "skill-capsule__badge--active" : ""
            }`}
            style={{ bottom: `${((i + 1) / n) * 100}%` }}
            onClick={(e) => {
              e.stopPropagation();
              commit(i + 1);
            }}
            tabIndex={-1}
            aria-hidden={i >= stop}
            title={sub.title}
          >
            {sub.short}
          </button>
        ))}

        <div
          className="skill-capsule__handle"
          role="slider"
          tabIndex={0}
          aria-orientation="vertical"
          aria-label={`${category.title} — sub-categories`}
          aria-valuemin={0}
          aria-valuemax={n}
          aria-valuenow={stop}
          aria-valuetext={stop === 0 ? "Collapsed" : category.subcategories[stop - 1].title}
          style={{ bottom: `${fillPercent}%` }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onKeyDown={onKeyDown}
        >
          <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
            <path d="M10 16V5M5 9l5-5 5 5" />
          </svg>
        </div>
      </div>

      <p className="skill-capsule__label">{category.label}</p>
    </div>
  );
}