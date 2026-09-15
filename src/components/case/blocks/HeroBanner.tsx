import Image from "next/image";
import styles from "./HeroBanner.module.css";

// Copy source: Figma node 2239:179 "div.w-full" — a centered full-bleed
// banner directly below Hero, separate from it.
export function HeroBanner() {
  return (
    <div className={styles.wrap}>
      <Image
        src="/case/square-self-checkout/banners/hero.png"
        alt="Composição do redesign do autoatendimento Square: totem e app lado a lado"
        width={1489}
        height={746}
        priority
        className={styles.image}
        sizes="(max-width: 1489px) 100vw, 1489px"
      />
    </div>
  );
}
