"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import { CaseSection } from "../CaseSection";
import { ZoomableLightbox } from "../Zoomable";
import styles from "./PrototipacaoTestesFigma.module.css";
import liftStyles from "../BlockLift.module.css";

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
    width: 1868,
    height: 777,
  },
  {
    label: "Totem",
    src: "/case/square-self-checkout/banners/proto-totem.png",
    alt: "Fluxo completo do totem mapeado no Figma: onboarding, scan, balança, pagamento, verificação de idade e saída",
    width: 1868,
    height: 777,
  },
];

// Fraction of the viewport's own width a drag has to cross before it
// counts as a swipe instead of snapping back.
const DRAG_THRESHOLD = 0.15;

export function PrototipacaoTestesFigma() {
  const [index, setIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  // Measured on pointerdown (from the event target, not a ref read during
  // render) — React's rules-of-hooks lint flags reading ref.current while
  // rendering since it isn't guaranteed to reflect the latest DOM state;
  // this only ever needs the width while a drag is in progress anyway.
  const [viewportWidth, setViewportWidth] = useState(1);
  const [zoomOpen, setZoomOpen] = useState(false);
  const dragStartX = useRef(0);
  // Whether the pointer moved past a small threshold during this
  // gesture — distinguishes a tap (open the lightbox) from a drag
  // (swipe), since `.viewport` calls setPointerCapture on every
  // pointerdown for the swipe gesture, which silently swallows any
  // native `click` a nested trigger button would otherwise get. Tap
  // detection happens here, in the same pointerup handler that already
  // reliably fires, instead of relying on that click.
  const dragMovedRef = useRef(false);

  function goTo(next: number) {
    setIndex((next + SLIDES.length) % SLIDES.length);
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    dragStartX.current = event.clientX;
    dragMovedRef.current = false;
    setViewportWidth(event.currentTarget.offsetWidth || 1);
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!isDragging) return;
    const delta = event.clientX - dragStartX.current;
    if (Math.abs(delta) > 5) dragMovedRef.current = true;
    setDragX(delta);
  }

  function endDrag() {
    if (!isDragging) return;
    if (Math.abs(dragX) > viewportWidth * DRAG_THRESHOLD) {
      goTo(dragX < 0 ? index + 1 : index - 1);
    } else if (!dragMovedRef.current) {
      setZoomOpen(true);
    }
    setIsDragging(false);
    setDragX(0);
  }

  function handleKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") goTo(index + 1);
    if (event.key === "ArrowLeft") goTo(index - 1);
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setZoomOpen(true);
    }
  }

  const dragPercent = (dragX / viewportWidth) * 100;

  return (
    <CaseSection id="prototipacao-testes-figma" divider>
      <div className={`${styles.column} ${liftStyles.item} lift-trigger`}>
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
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="1226px"
                    draggable={false}
                  />
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

      <ZoomableLightbox
        src={SLIDES[index].src}
        alt={SLIDES[index].alt}
        width={SLIDES[index].width}
        height={SLIDES[index].height}
        open={zoomOpen}
        onClose={() => setZoomOpen(false)}
      />
    </CaseSection>
  );
}
