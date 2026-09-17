"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import { CaseSection } from "../CaseSection";
import styles from "./PrototipacaoTestesFigma.module.css";

// Copy source: Figma node 2367:884 "Prototipação & Testes (Figma)", read
// verbatim via the Figma API (2026-09-16). Em dash in the caption
// swapped for a colon (authorial copy, not a verbatim quote — same rule
// applied elsewhere in this case).
//
// Redesigned 2026-09-16 (Matheus, after real use): the Figma export only
// shows a static index-0 frame with fixed overlay arrows at the
// viewport's own edges. Built as literal overlay buttons first, but that
// broke on real interaction — arrows sat on top of diagram content at
// some widths, there was no drag/swipe, and on wide viewports the
// carousel's edge-hugging arrows visually collided with the page's
// persistent BackLink/TOC chrome (both live near the actual viewport
// edges, not the content column's). Dropped the fixed arrows entirely
// rather than shrink a "safe corridor" for them — matches this case's
// established minimal-chrome bias (same reasoning that removed a
// decorative "→" earlier). Real drag/swipe replaces them as the primary
// gesture; the dots (already inset, never near a screen edge) stay as
// the explicit control. Arrow keys work when the carousel is focused,
// so removing the buttons doesn't remove keyboard access.
//
// Also dropped the edge fades (Matheus 2026-09-16): they existed to
// blend a peeking sliver of the next slide, but each slide here takes
// exactly 100% of the viewport with no peek at rest — the fade was
// just darkening real diagram content at the edges with nothing to
// reveal in exchange.
const SLIDES = [
  {
    label: "App",
    src: "/case/square-self-checkout/banners/proto-app.png",
    alt: "Fluxo completo do app mapeado no Figma: onboarding, scan, balança, pagamento via Pix e listas",
  },
  {
    label: "Totem",
    src: "/case/square-self-checkout/banners/proto-totem.png",
    alt: "Fluxo completo do totem mapeado no Figma: onboarding, scan, balança, pagamento, verificação de idade e saída",
  },
];

// Fraction of the viewport's own width a drag has to cross before it
// counts as a swipe instead of snapping back.
const DRAG_THRESHOLD = 0.15;

export function PrototipacaoTestesFigma() {
  const [index, setIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);

  function goTo(next: number) {
    setIndex((next + SLIDES.length) % SLIDES.length);
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    dragStartX.current = event.clientX;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!isDragging) return;
    setDragX(event.clientX - dragStartX.current);
  }

  function endDrag() {
    if (!isDragging) return;
    const viewportWidth = viewportRef.current?.offsetWidth ?? 1;
    if (Math.abs(dragX) > viewportWidth * DRAG_THRESHOLD) {
      goTo(dragX < 0 ? index + 1 : index - 1);
    }
    setIsDragging(false);
    setDragX(0);
  }

  function handleKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") goTo(index + 1);
    if (event.key === "ArrowLeft") goTo(index - 1);
  }

  const dragPercent = viewportRef.current ? (dragX / viewportRef.current.offsetWidth) * 100 : 0;

  return (
    <CaseSection id="prototipacao-testes-figma" divider>
      <div className={styles.column}>
        <div className={styles.labelStack}>
          <p className={styles.label}>PROTOTIPAÇÃO &amp; TESTES (FIGMA)</p>
          <p className={styles.caption}>
            A própria página de prototipação e testes no Figma, com o fluxo
            mapeado ponta a ponta para os dois dispositivos: do onboarding aos
            edge cases (erro, produto sem código, item +18).
          </p>
        </div>

        <div className={styles.carousel}>
          <p className={styles.slideCaption}>
            {SLIDES[index].label} · {index + 1} de {SLIDES.length}
          </p>

          <div
            ref={viewportRef}
            className={styles.viewport}
            role="region"
            aria-roledescription="carrossel"
            aria-label="Fluxos prototipados no Figma"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            <div
              className={`${styles.track} ${isDragging ? styles.dragging : ""}`}
              style={{ transform: `translateX(calc(-${index * 100}% + ${dragPercent}%))` }}
            >
              {SLIDES.map((slide) => (
                <div key={slide.label} className={styles.slide}>
                  <Image src={slide.src} alt={slide.alt} fill sizes="1226px" draggable={false} />
                </div>
              ))}
            </div>

          </div>

          <div className={styles.dots}>
            {SLIDES.map((slide, i) => (
              <button
                key={slide.label}
                type="button"
                className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Ver ${slide.label}`}
                aria-current={i === index}
              />
            ))}
          </div>
        </div>
      </div>
    </CaseSection>
  );
}
