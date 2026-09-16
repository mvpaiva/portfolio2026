import Image from "next/image";
import styles from "./SolutionBlock.module.css";
import liftStyles from "./BlockLift.module.css";

type PainLink = { label: string; href: string };

type Banner = { src: string; alt: string; width: number; height: number };

export type SolutionBlockProps = {
  id: string;
  /** One entry for most solutions; Solução 2 addresses two pain points
   * at once ("02 · X / 03 · Y"), each linking back to its own Field
   * Notes chip — real Figma data (verified via the API), not a UI
   * pattern invented here. */
  painLinks: PainLink[];
  headline: string;
  quote: string;
  quoteAttribution: string;
  body: string;
  /** A single flattened "Antes/Depois" image (Matheus, 2026-09-16) —
   * replaces the old antes+arrow+depois autolayout pair. Both stage
   * labels and the arrow between them are baked into the image itself
   * now; its own aspect ratio (portrait side-by-side for Soluções
   * 1/4/5, wider stacked-with-↓ for 2/3) drives the layout directly,
   * so there's no separate `layout` prop anymore. */
  banner: Banner;
};

export function SolutionBlock({
  id,
  painLinks,
  headline,
  quote,
  quoteAttribution,
  body,
  banner,
}: SolutionBlockProps) {
  return (
    <div id={id} className={`${styles.block} ${liftStyles.item} lift-trigger`}>
      <div className={styles.labelColumn}>
        <p className={styles.painLinkRow}>
          {painLinks.map((pain, i) => (
            <span key={pain.href}>
              {i > 0 ? <span className={styles.painSeparator}> / </span> : null}
              <a className={styles.painLink} href={pain.href}>
                {pain.label}
              </a>
            </span>
          ))}
        </p>
        <h3 className={styles.headline}>{headline}</h3>
        <blockquote className={styles.quote}>
          &quot;{quote}&quot; — {quoteAttribution}
        </blockquote>
        <p className={styles.body}>{body}</p>
      </div>

      <div className={styles.contentColumn}>
        <div className={styles.banner} style={{ aspectRatio: `${banner.width} / ${banner.height}` }}>
          <Image src={banner.src} alt={banner.alt} fill sizes="(max-width: 900px) 100vw, 706px" />
        </div>
      </div>
    </div>
  );
}
