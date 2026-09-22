import { Zoomable } from "../Zoomable";
import styles from "./HeroBanner.module.css";
import liftStyles from "../BlockLift.module.css";

// Copy source: Figma node 2239:179 "div.w-full" — a centered banner
// directly below Hero, separate from it, now displayed at the same
// 1226px content width as every other block (was 1489px).
//
// Image replaced 2026-09-16 (Matheus) with the pt-BR wireframe version
// — native 2998x1492, not an exact 2x of the old 1489x746 export
// (~0.7% aspect difference), so width/height were updated to the new
// file's real dimensions rather than reused, to avoid distorting it.
//
// Dedicated mobile export added 2026-09-22 (Matheus) — the desktop
// composition (totem + app side by side) reads too small once shrunk
// to a phone width, same reasoning as Solucoes' per-solution
// mobileBanner. Native 2372x1882, "-r1" is a cache-busting rename
// (Next's /_next/image can serve stale bytes indefinitely when a
// same-named public/ file is overwritten, documented in handoff.md).
//
// Tap-to-zoom added same day (Matheus) — both exports are 2x, so a
// zoomed-in native-size view is genuinely sharper than the shrunk
// thumbnail. See ../Zoomable.
export function HeroBanner() {
  return (
    <div className={styles.wrap}>
      <Zoomable
        src="/case/square-self-checkout/banners/hero-r3.png"
        alt="Composição do redesign do autoatendimento Square: totem e app lado a lado"
        width={2998}
        height={1492}
        priority
        fill={false}
        className={`${styles.image} ${styles.desktopImage} ${liftStyles.item} lift-trigger`}
        sizes="(max-width: 1489px) 100vw, 1489px"
      />
      <Zoomable
        src="/case/square-self-checkout/banners/hero-mob-r1.png"
        alt="Composição do redesign do autoatendimento Square: totem e app lado a lado"
        width={2372}
        height={1882}
        priority
        fill={false}
        className={`${styles.image} ${styles.mobileImage} ${liftStyles.item} lift-trigger`}
        sizes="100vw"
      />
    </div>
  );
}
