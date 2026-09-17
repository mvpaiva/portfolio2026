import Image from "next/image";
import styles from "./HeroBanner.module.css";

// Copy source: Figma node 2239:179 "div.w-full" — a centered banner
// directly below Hero, separate from it, now displayed at the same
// 1226px content width as every other block (was 1489px).
//
// Image replaced 2026-09-16 (Matheus) with the pt-BR wireframe version
// — native 2998x1492, not an exact 2x of the old 1489x746 export
// (~0.7% aspect difference), so width/height were updated to the new
// file's real dimensions rather than reused, to avoid distorting it.
export function HeroBanner() {
  return (
    <div className={styles.wrap}>
      <Image
        src="/case/square-self-checkout/banners/hero-ptbr.png"
        alt="Composição do redesign do autoatendimento Square: totem e app lado a lado"
        width={2998}
        height={1492}
        priority
        className={`${styles.image}`}
        sizes="(max-width: 1489px) 100vw, 1489px"
      />
    </div>
  );
}
