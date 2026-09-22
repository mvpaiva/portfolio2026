import { Zoomable } from "./Zoomable";
import liftStyles from "./BlockLift.module.css";
import styles from "./SolutionBlock.module.css";

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
  /** Mobile-specific composition (Matheus, 2026-09-17) — the desktop
   * banner's baked-in labels read too small once shrunk to a phone
   * width, so each solution now has its own mobile export instead of
   * reusing the same asset at every breakpoint. Both <Image>s render
   * (only one is ever visible via CSS, see .desktopBanner/.mobileBanner
   * in SolutionBlock.module.css) rather than swapping `src` in JS, so
   * there's no layout-shift/flash on resize. */
  mobileBanner: Omit<Banner, "alt">;
};

export function SolutionBlock({
  id,
  painLinks,
  headline,
  quote,
  quoteAttribution,
  body,
  banner,
  mobileBanner,
}: SolutionBlockProps) {
  return (
    <div id={id} className={`${styles.block} ${liftStyles.item} lift-trigger`}>
      <div className={styles.labelColumn}>
        <p className={styles.painLinkRow}>
          {painLinks.map((pain, i) => (
            <span key={pain.label}>
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
        <div
          className={`${styles.banner} ${styles.desktopBanner}`}
          style={{ aspectRatio: `${banner.width} / ${banner.height}` }}
        >
          <Zoomable
            src={banner.src}
            alt={banner.alt}
            width={banner.width}
            height={banner.height}
            sizes="706px"
          />
        </div>
        <div
          className={`${styles.banner} ${styles.mobileBanner}`}
          style={{ aspectRatio: `${mobileBanner.width} / ${mobileBanner.height}` }}
        >
          <Zoomable
            src={mobileBanner.src}
            alt={banner.alt}
            width={mobileBanner.width}
            height={mobileBanner.height}
            sizes="100vw"
          />
        </div>
      </div>
    </div>
  );
}
