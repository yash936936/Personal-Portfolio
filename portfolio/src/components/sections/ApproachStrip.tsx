import { useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import Reveal from "../Reveal";
import "./ApproachStrip.css";

type SwitchSize = "sm" | "md" | "lg";
type SwitchTone = "light" | "dark" | "aqua";

interface AppleSwitchProps {
  size?: SwitchSize;
  tone?: SwitchTone;
}

function AppleSwitch({ size = "md", tone = "light" }: AppleSwitchProps) {
  const navigate = useNavigate();
  const trackRef = useRef<HTMLButtonElement>(null);
  const thumbRef = useRef<HTMLSpanElement>(null);
  const dragRef = useRef({ pointerId: -1, startX: 0, startThumb: 0, moved: false });
  const [isOn, setIsOn] = useState(false);

  const getTravel = () => {
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!track || !thumb) return 0;
    return Math.max(0, track.clientWidth - thumb.offsetWidth - 10);
  };

  const settle = (next: boolean) => {
    setIsOn(next);
    gsap.to(thumbRef.current, {
      x: next ? getTravel() : 0,
      scaleX: 1,
      scaleY: 1,
      duration: 0.78,
      ease: "elastic.out(1, 0.48)",
      onComplete: () => { if (next) navigate("/work"); },
    });
  };

  const onPointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startThumb: isOn ? getTravel() : 0,
      moved: false,
    };
    gsap.to(thumbRef.current, {
      scaleX: 1.12,
      scaleY: 0.88,
      duration: 0.16,
      ease: "power2.out",
    });
  };

  const onPointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (dragRef.current.pointerId !== event.pointerId || !thumbRef.current) return;
    const delta = event.clientX - dragRef.current.startX;
    if (Math.abs(delta) > 4) dragRef.current.moved = true;
    gsap.set(thumbRef.current, {
      x: Math.max(0, Math.min(getTravel(), dragRef.current.startThumb + delta)),
    });
  };

  const finish = (event: PointerEvent<HTMLButtonElement>) => {
    if (dragRef.current.pointerId !== event.pointerId) return;
    const currentX = (gsap.getProperty(thumbRef.current, "x") as number) || 0;
    const next = dragRef.current.moved ? currentX > getTravel() / 2 : !isOn;
    dragRef.current.pointerId = -1;
    settle(next);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!isOn) settle(true);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      if (!isOn) settle(true);
    } else if (event.key === "ArrowLeft" && isOn) {
      event.preventDefault();
      setIsOn(false);
      gsap.to(thumbRef.current, { x: 0, scaleX: 1, scaleY: 1, duration: 0.55, ease: "elastic.out(1, 0.55)" });
    }
  };

  return (
    <button
      ref={trackRef}
      type="button"
      className={`apple-switch apple-switch--${size} apple-switch--${tone} ${isOn ? "is-on" : ""}`}
      role="switch"
      aria-checked={isOn}
      aria-label="Explore the work"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={finish}
      onPointerCancel={finish}
      onKeyDown={onKeyDown}
    >
      <span className="apple-switch__thumb" ref={thumbRef} aria-hidden="true"><span /></span>
      <span className="apple-switch__label">Explore the work</span>
    </button>
  );
}

export default function ApproachStrip() {
  return (
    <section className="approach">
      <div className="container">
        <Reveal>
          <div className="approach__card">
            <div className="approach__copy">
              <span className="approach__eyebrow">The way I work</span>
              <p className="approach__text">
                Thoughtful architecture, bounded workflows and honest evaluation.
                I build AI systems that are useful, understandable and clear about
                what they can and cannot do.
              </p>
            </div>
            <div className="approach__actions">
              <a href="mailto:yashsunilmalik@gmail.com" className="approach__cta">Let&apos;s discuss an idea</a>
              <AppleSwitch size="lg" tone="aqua" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
