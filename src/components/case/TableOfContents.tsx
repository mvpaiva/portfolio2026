"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./TableOfContents.module.css";

const SECTIONS = [
  { href: "#contexto", label: "Contexto" },
  { href: "#descoberta", label: "Descoberta" },
  { href: "#pesquisa", label: "Pesquisa" },
  { href: "#solucoes", label: "Soluções" },
  { href: "#resultado", label: "Resultado" },
];

// How far left of the TOC's own right-aligned edge real content is
// allowed to reach before we consider it a collision. Matches the
// 60px offset + ~140px expanded label width + a comfortable gap —
// see TableOfContents.module.css for the full rationale.
const DANGER_ZONE = 224;

// Only checked against actual content elements (text/images), never
// generic layout wrappers (Reveal, BlockLift/BlockSpotlight's item
// divs, <main> itself) — those default to full block width regardless
// of how narrow their visible content is, so hit-testing against them
// directly gives false positives everywhere, the same bug already
// fixed once for the block-spotlight hover zone.
const CONTENT_SELECTOR = "main :is(p, h1, h2, h3, h4, li, img, a, span):not(nav *)";

export function TableOfContents() {
  const ref = useRef<HTMLElement>(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    let raf = 0;

    function checkCollision() {
      const el = ref.current;
      if (!el) return;

      const dangerX = window.innerWidth - DANGER_ZONE;
      const tocRect = el.getBoundingClientRect();
      const candidates = document.querySelectorAll(CONTENT_SELECTOR);

      let hit = false;
      for (const candidate of candidates) {
        const rect = candidate.getBoundingClientRect();
        if (rect.width === 0 && rect.height === 0) continue;
        const verticalOverlap = rect.bottom > tocRect.top && rect.top < tocRect.bottom;
        if (verticalOverlap && rect.right > dangerX) {
          hit = true;
          break;
        }
      }

      setCollapsed(hit);
    }

    function onScrollOrResize() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(checkCollision);
    }

    checkCollision();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  return (
    <nav
      ref={ref}
      className={`${styles.toc} ${collapsed ? styles.collapsed : ""}`}
      aria-label="Sumário do case"
    >
      {SECTIONS.map((section) => (
        <a key={section.href} className={styles.link} href={section.href}>
          {section.label}
        </a>
      ))}
    </nav>
  );
}
