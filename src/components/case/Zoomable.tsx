"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import styles from "./Zoomable.module.css";

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
};

// The portal overlay on its own, open/close fully controlled by the
// caller — used directly by PrototipacaoTestesFigma's carousel, whose
// own pointer handlers already do reliable tap-vs-drag detection (a
// plain nested <button onClick> doesn't work there: the carousel calls
// setPointerCapture on every pointerdown for the drag gesture, which
// swallows the native click that would otherwise open a <Zoomable>'s
// own trigger button). Every other use site renders <Zoomable> below
// instead, which wraps this with its own trigger button.
export function ZoomableLightbox({ src, alt, width, height, open, onClose }: LightboxProps) {
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
};

// Every flattened banner in this case is a 2x export (native pixels =
// 2x the CSS size it's normally shown at) — the same convention
// documented in docs/handoff.md for cache-busting renames. That means
// there's real resolution sitting unused whenever a banner is shown
// smaller than native, which is exactly what a tap-to-zoom can reveal
// (Matheus, 2026-09-22: "seria interessante que as imagens pudessem
// receber zoom ao serem tocadas"). Opens a full-size lightbox at native
// resolution, scrollable if bigger than the viewport, on every device
// (not just touch) — click on desktop, tap on mobile/tablet.
export function Zoomable({ src, alt, width, height, sizes, priority, fill = true, className }: ZoomableProps) {
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
      />
    </>
  );
}
