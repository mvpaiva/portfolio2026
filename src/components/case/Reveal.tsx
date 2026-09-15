"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./Reveal.module.css";

type RevealProps = {
  children: ReactNode;
};

function getReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Baseline "Reveal Effect" (§16): opacity + translateY(10-20px) on entrance,
// applied once per block as a whole — never staggered per sub-element,
// which the motion spec explicitly forbids. Fires immediately for
// above-the-fold blocks (IntersectionObserver reports them as already
// intersecting right after mount) and on scroll-into-view for the rest.
export function Reveal({ children }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [reducedMotion] = useState(getReducedMotion);
  const [intersected, setIntersected] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersected(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const visible = reducedMotion || intersected;

  return (
    <div ref={ref} className={`${styles.reveal} ${visible ? styles.visible : ""}`}>
      {children}
    </div>
  );
}
