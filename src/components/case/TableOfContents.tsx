"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./TableOfContents.module.css";

// Matches the 4 ghost-marker anchors sprinkled through the page plus
// Contexto and Resultado as bookends. Replaced "Pesquisa" and
// "Soluções" as of 2026-09-16 (Matheus): those blocks sat immediately
// after two of the markers with nothing else between, so the old label
// set had entries that scrolled to functionally the same spot.
//
// Labels rewritten again the same day: the ids (descoberta/design/
// sintese) are legacy Double Diamond phase names (Discover/Develop/
// Define), but the visible labels now name what's actually on screen
// at each anchor instead — "Pesquisa" (Pesquisa → JTBD), "Testes"
// (moved to sit before DesignPrototipacao, which is genuinely about
// design/prototyping — it used to sit right before Resultado with no
// content of its own between them, causing the same
// scrolls-to-the-same-spot problem this file's first fix addressed),
// "Soluções" (the Solucoes block). Each label matches the real section
// heading a reader sees at that point in the page. Shortened to single
// words the same day (Matheus): "A Pesquisa"/"Protótipos e
// Testes"/"As Soluções" read fine as prose but were needlessly long
// for a nav list sitting next to "Contexto"/"Resultado".
const SECTIONS = [
  { href: "#contexto", label: "Contexto" },
  { href: "#descoberta", label: "Pesquisa" },
  { href: "#design", label: "Testes" },
  { href: "#sintese", label: "Soluções" },
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

// Debounced to scroll-settle rather than re-checked every frame
// (2026-09-16, Matheus caught this): re-evaluating live during scroll
// meant a brief gap between two blocks — or just fast scrolling — could
// flip collapsed/expanded several times in a row, reading as jittery.
// State now holds steady while actively scrolling and only re-evaluates
// once motion has paused, matching the calm pacing used everywhere else
// (and the "reative só no scrollend" idea from the original variant.com
// note on this same conflict).
const SETTLE_DELAY = 150;

export function TableOfContents() {
  const ref = useRef<HTMLElement>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);

  // Active-section highlight (2026-09-16, replaces a separate scroll-
  // progress thumb — decided it'd be a third floating element competing
  // with Voltar/TOC for the same screen edge, against the "reduce
  // chrome" principle we'd just applied to those two). A section counts
  // as active when it crosses the vertical center of the viewport.
  //
  // Recomputed on scroll as "the last anchor whose top sits above the
  // viewport center" (Matheus, 2026-09-24: after clicking a TOC item it
  // stayed active while scrolling into other sections). The previous
  // IntersectionObserver only fired while an anchor was *inside* a thin
  // center band — the ghost-marker anchors are tiny, so once one had
  // scrolled past nothing ever replaced it, and a clicked section stuck.
  useEffect(() => {
    const targets = SECTIONS.map((s) => document.getElementById(s.href.slice(1))).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (targets.length === 0) return;

    let frame = 0;
    function update() {
      frame = 0;
      const center = window.innerHeight / 2;
      let current: string | null = null;
      for (const el of targets) {
        if (el.getBoundingClientRect().top <= center) current = `#${el.id}`;
      }
      setActiveHref(current);
    }
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;

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
      clearTimeout(timeout);
      timeout = setTimeout(checkCollision, SETTLE_DELAY);
    }

    checkCollision();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  return (
    <>
      <nav
        ref={ref}
        className={`${styles.toc} ${collapsed ? styles.collapsed : ""}`}
        aria-label="Sumário do case"
      >
        {SECTIONS.map((section) => (
          <a
            key={section.href}
            className={`${styles.link} ${section.href === activeHref ? styles.active : ""}`}
            href={section.href}
          >
            <span className={styles.linkFull}>{section.label}</span>
            <span className={styles.linkTick} aria-hidden="true" />
          </a>
        ))}
      </nav>

      <button
        type="button"
        className={styles.mobilePill}
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((open) => !open)}
      >
        Índice
      </button>
      <nav
        className={`${styles.mobileList} ${mobileOpen ? styles.open : ""}`}
        aria-label="Sumário do case (mobile)"
      >
        {SECTIONS.map((section) => (
          <a
            key={section.href}
            className={styles.link}
            href={section.href}
            onClick={() => setMobileOpen(false)}
          >
            {section.label}
          </a>
        ))}
      </nav>
    </>
  );
}
