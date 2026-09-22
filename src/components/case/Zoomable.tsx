"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import styles from "./Zoomable.module.css";

type Transform = { scale: number; x: number; y: number };

function clampTransform(t: Transform, fit: { w: number; h: number }): Transform {
  const maxX = Math.max((fit.w * t.scale - fit.w) / 2, 0);
  const maxY = Math.max((fit.h * t.scale - fit.h) / 2, 0);
  return {
    scale: t.scale,
    x: Math.min(Math.max(t.x, -maxX), maxX),
    y: Math.min(Math.max(t.y, -maxY), maxY),
  };
}

// Scroll/pinch to zoom in past the lightbox's usual fit-to-viewport size,
// drag to pan — for the handful of banners dense enough (small multi-row
// tables, a full similarity matrix) that the fit size alone isn't legible
// (Matheus, 2026-09-22: "mais zoom e navegável... sem se tornar uma
// imagem gigante"). Zoom always anchors to center (not cursor position) —
// a deliberate simplification over cursor-anchored zoom math, which is
// fragile to get pixel-perfect; center-anchor plus drag-to-pan covers the
// same ground with far less risk of a subtly-wrong transform.
function ZoomPanImage({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const fitSizeRef = useRef({ w: 0, h: 0 });
  const maxScaleRef = useRef(3);
  const pointersRef = useRef(new Map<number, { x: number; y: number }>());
  const dragRef = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null);
  const pinchRef = useRef<{ dist: number; scale: number } | null>(null);
  const [transform, setTransform] = useState<Transform>({ scale: 1, x: 0, y: 0 });

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    fitSizeRef.current = { w: rect.width, h: rect.height };
    // How far past the fit size native resolution actually allows —
    // clamped so a tiny fit size (e.g. a phone viewport) can't demand an
    // absurd zoom multiple.
    maxScaleRef.current = Math.min(Math.max(width / rect.width, 2), 6);
  }, [width]);

  // Attached imperatively with { passive: false } — React's JSX onWheel
  // is passive by default, so event.preventDefault() inside it silently
  // no-ops and the page scrolls behind the lightbox while zooming.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    function onWheel(event: WheelEvent) {
      event.preventDefault();
      setTransform((t) => {
        const factor = Math.exp(-event.deltaY * 0.0018);
        const scale = Math.min(Math.max(t.scale * factor, 1), maxScaleRef.current);
        return clampTransform({ ...t, scale }, fitSizeRef.current);
      });
    }
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  function handlePointerDown(event: ReactPointerEvent) {
    (event.target as Element).setPointerCapture(event.pointerId);
    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointersRef.current.size === 1) {
      dragRef.current = { startX: event.clientX, startY: event.clientY, origX: transform.x, origY: transform.y };
    } else if (pointersRef.current.size === 2) {
      const [a, b] = [...pointersRef.current.values()];
      pinchRef.current = { dist: Math.hypot(a.x - b.x, a.y - b.y), scale: transform.scale };
      dragRef.current = null;
    }
  }

  function handlePointerMove(event: ReactPointerEvent) {
    if (!pointersRef.current.has(event.pointerId)) return;
    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (pointersRef.current.size === 2 && pinchRef.current) {
      const [a, b] = [...pointersRef.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const scale = Math.min(Math.max((pinchRef.current.scale * dist) / pinchRef.current.dist, 1), maxScaleRef.current);
      setTransform((t) => clampTransform({ ...t, scale }, fitSizeRef.current));
      return;
    }

    if (dragRef.current && transform.scale > 1.01) {
      const dx = event.clientX - dragRef.current.startX;
      const dy = event.clientY - dragRef.current.startY;
      const drag = dragRef.current;
      setTransform((t) => clampTransform({ ...t, x: drag.origX + dx, y: drag.origY + dy }, fitSizeRef.current));
    }
  }

  function handlePointerUp(event: ReactPointerEvent) {
    pointersRef.current.delete(event.pointerId);
    if (pointersRef.current.size < 2) pinchRef.current = null;
    if (pointersRef.current.size === 0) dragRef.current = null;
  }

  function handleDoubleClick() {
    setTransform((t) =>
      t.scale > 1
        ? { scale: 1, x: 0, y: 0 }
        : clampTransform({ scale: maxScaleRef.current, x: 0, y: 0 }, fitSizeRef.current),
    );
  }

  return (
    <div
      ref={containerRef}
      className={styles.zoomPanContainer}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onDoubleClick={handleDoubleClick}
    >
      <div
        ref={innerRef}
        className={styles.zoomPanInner}
        style={{
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
          cursor: transform.scale > 1 ? "grab" : "zoom-in",
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(max-width: 1400px) 100vw, 1400px"
          className={styles.fullImage}
          draggable={false}
        />
      </div>
    </div>
  );
}

type LightboxProps = {
  src: string;
  alt: string;
  /** Native pixel size of the source export — used to preserve aspect
   * ratio and to pick an appropriately-sized request from the image
   * optimizer. The lightbox itself caps the *display* size well below
   * this (see .fullImage) rather than rendering at true native size. */
  width: number;
  height: number;
  open: boolean;
  onClose: () => void;
  /** Scroll/pinch to zoom past the fit size, drag to pan — only for
   * banners dense enough that fit-size alone isn't legible (dense
   * tables, a full matrix). Most banners don't need this: they're
   * legible at the plain fit-to-viewport size, and panning is one more
   * interaction to learn for no benefit. Default false. */
  interactive?: boolean;
};

// The portal overlay on its own, open/close fully controlled by the
// caller — used directly by PrototipacaoTestesFigma's carousel, whose
// own pointer handlers already do reliable tap-vs-drag detection (a
// plain nested <button onClick> doesn't work there: the carousel calls
// setPointerCapture on every pointerdown for the drag gesture, which
// swallows the native click that would otherwise open a <Zoomable>'s
// own trigger button). Every other use site renders <Zoomable> below
// instead, which wraps this with its own trigger button.
export function ZoomableLightbox({ src, alt, width, height, open, onClose, interactive = false }: LightboxProps) {
  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
    >
      <button
        type="button"
        className={styles.close}
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
        aria-label="Fechar"
      >
        ✕
      </button>
      {interactive ? (
        // Clicking anywhere in here must not bubble to the overlay's
        // close-on-click — a drag/pinch gesture routinely starts and
        // ends inside this area, and closing mid-gesture would make
        // panning unusable. Close via the button or Escape instead.
        <div className={styles.scrollPan} onClick={(event) => event.stopPropagation()}>
          <ZoomPanImage src={src} alt={alt} width={width} height={height} />
          <p className={styles.hint}>Arraste para navegar · scroll ou pinça para ampliar</p>
        </div>
      ) : (
        <div className={styles.scroll}>
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes="(max-width: 1400px) 100vw, 1400px"
            className={styles.fullImage}
          />
        </div>
      )}
    </div>,
    document.body,
  );
}

type ZoomableProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  priority?: boolean;
  /** true (default): renders `<Image fill>` and the trigger button
   * absolutely fills its already-positioned/aspect-ratio'd parent — the
   * drop-in replacement for every `fill` banner image in this case.
   * false: renders a normal intrinsic-size `<Image>` (HeroBanner's
   * pattern, no `fill` parent). */
  fill?: boolean;
  className?: string;
  interactive?: boolean;
};

// Every flattened banner in this case is a 2x export (native pixels =
// 2x the CSS size it's normally shown at) — the same convention
// documented in docs/handoff.md for cache-busting renames. That means
// there's real resolution sitting unused whenever a banner is shown
// smaller than native, which is exactly what a tap-to-zoom can reveal
// (Matheus, 2026-09-22: "seria interessante que as imagens pudessem
// receber zoom ao serem tocadas"). Opens a lightbox on every device
// (not just touch) — click on desktop, tap on mobile/tablet.
export function Zoomable({
  src,
  alt,
  width,
  height,
  sizes,
  priority,
  fill = true,
  className,
  interactive = false,
}: ZoomableProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={`${fill ? styles.triggerFill : styles.triggerBlock} ${className ?? ""}`}
        onClick={() => setOpen(true)}
        aria-label={`Ampliar imagem: ${alt}`}
      >
        {fill ? (
          <Image src={src} alt={alt} fill sizes={sizes} priority={priority} draggable={false} />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            draggable={false}
            sizes={sizes}
            className={styles.blockImage}
          />
        )}
      </button>
      <ZoomableLightbox
        src={src}
        alt={alt}
        width={width}
        height={height}
        open={open}
        onClose={() => setOpen(false)}
        interactive={interactive}
      />
    </>
  );
}
