import Image from "next/image";
import styles from "./HeroBanner.module.css";
import liftStyles from "../BlockLift.module.css";

// Copy source: Figma node 2239:179 "div.w-full" — a centered banner
// directly below Hero, separate from it, now displayed at the same
// 1226px content width as every other block (was 1489px).
export function HeroBanner() {
  return (
    <div className={styles.wrap}>
      <Image
        src="/case/square-self-checkout/banners/hero.png"
        alt="Composição do redesign do autoatendimento Square: totem e app lado a lado"
        width={1489}
        height={746}
        priority
        className={`${styles.image} ${liftStyles.item}`}
        sizes="(max-width: 1489px) 100vw, 1489px"
      />
    </div>
  );
}
