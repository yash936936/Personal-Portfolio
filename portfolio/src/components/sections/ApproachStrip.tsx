import { useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import Reveal from "../Reveal";
import "./ApproachStrip.css";

function WorkSwitch() {
  const navigate = useNavigate();
  const trackRef = useRef<HTMLButtonElement>(null);
  const thumbRef = useRef<HTMLSpanElement>(null);
  const dragRef = useRef({ pointerId: -1, startX: 0, startThumb: 0, moved: false });
  const [isOn, setIsOn] = useState(false);
  const maxTravel = 116;

  const onPointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { pointerId: event.pointerId, startX: event.clientX, startThumb: isOn ? maxTravel : 0, moved: false };
    gsap.to(thumbRef.current, { scale: 0.92, duration: 0.16, ease: "power2.out" });
  };
  const onPointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (dragRef.current.pointerId !== event.pointerId || !thumbRef.current) return;
    const delta = event.clientX - dragRef.current.startX;
    if (Math.abs(delta) > 3) dragRef.current.moved = true;
    const x = Math.max(0, Math.min(maxTravel, dragRef.current.startThumb + delta));
    gsap.set(thumbRef.current, { x });
  };
  const finish = (event: PointerEvent<HTMLButtonElement>) => {
    if (dragRef.current.pointerId !== event.pointerId) return;
    const thumbX = gsap.getProperty(thumbRef.current, "x") as number;
    const next = dragRef.current.moved ? thumbX > maxTravel / 2 : !isOn;
    dragRef.current.pointerId = -1;
    setIsOn(next);
    gsap.to(thumbRef.current, {
      x: next ? maxTravel : 0, scale: 1, duration: 0.72, ease: "elastic.out(1, 0.55)",
      onComplete: () => { if (next) navigate("/work"); },
    });
  };
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsOn(true);
      gsap.to(thumbRef.current, { x: maxTravel, scale: 1, duration: 0.72, ease: "elastic.out(1, 0.55)", onComplete: () => navigate("/work") });
    }
  };

  return (
    <button
      ref={trackRef}
      type="button"
      className={`apple-switch ${isOn ? "is-on" : ""}`}
      role="switch"
      aria-checked={isOn}
      aria-label="Browse all work"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={finish}
      onPointerCancel={finish}
      onKeyDown={onKeyDown}
    >
      <span className="apple-switch__thumb" ref={thumbRef} aria-hidden="true"><span /></span>
      <span className="apple-switch__label">Browse all work</span>
    </button>
  );
}

export default function ApproachStrip() {
  return (
    <section className="approach">
      <div className="container">
        <Reveal>
          <div className="approach__card">
            <p className="approach__text">
              Thoughtful architecture, bounded workflows and honest evaluation.
              I build AI systems that are useful, understandable and clear about
              what they can and cannot do.
            </p>
            <div className="approach__row">
              <a href="mailto:yashsunilmalik@gmail.com" className="approach__cta">Let&apos;s discuss an idea</a>
              <WorkSwitch />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
