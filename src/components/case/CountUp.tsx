"use client";

import { useEffect, useRef } from "react";
import styles from "./CountUp.module.css";

type CountUpProps = {
  // Final value as authored ("18", "05", "247"). Leading zeros are kept
  // while counting so "05" reads 00 → 05, not 0 → 5.
  value: string;
};

// Ease-out cubic over 1.2s: still decelerates into the final value, but
// reaches 90% at ~0.54s instead of ~0.33s (expo-out over 0.8s), so the count
// stays legible as counting rather than reading as a jump. No overshoot.
const DURATION_MS = 1200;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

// One-shot number count-up, fired when the number is actually on screen.
// Writes straight to the DOM node instead of React state so a 60fps count
// doesn't re-render. Layout can't jump: an invisible copy of the final
// value sizes the cell, and screen readers get the final value only.
export function CountUp({ value }: CountUpProps) {
  const liveRef = useRef<HTMLSpanElement>(null);
  const target = Number(value);
  const width = value.length;

  useEffect(() => {
    const pad = (n: number) => String(n).padStart(width, "0");
    const el = liveRef.current;
    if (!el || Number.isNaN(target)) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = value;
      return;
    }

    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / DURATION_MS, 1);
          el.textContent = pad(Math.round(target * easeOutCubic(t)));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      // Higher than Reveal's 0.1 so counting starts once the block has
      // faded in, not while it's still invisible.
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, value, width]);

  return (
    <span className={styles.count}>
      <span className={styles.sizer} aria-hidden="true">
        {value}
      </span>
      <span ref={liveRef} className={styles.live} aria-hidden="true">
        {"0".repeat(width)}
      </span>
      <span className={styles.srOnly}>{value}</span>
    </span>
  );
}
