import type { CSSProperties } from "react";
import Image from "next/image";
import styles from "./SolutionBlock.module.css";
import liftStyles from "./BlockLift.module.css";

type Stage = {
  label: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

type PainLink = { label: string; href: string };

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
  antes: Stage;
  depois: Stage;
  /** Side-by-side (default, Soluções 1/4/5) or stacked with a "↓" arrow
   * between full-width frames (Soluções 2/3) — matches each solution's
   * real Figma layout, not a single reusable default. */
  layout?: "side-by-side" | "stacked";
};

// `sizes` is a fixed px hint, not a vw-based media-query string, on
// purpose: these images sit in a flex-shrinking box (see
// SolutionBlock.module.css), so a vw-tied sizes value fed back into a
// layout that itself depends on the image's rendered size — the two
// kept nudging each other, causing next/image to swap srcset
// candidates on every micro-adjustment (hundreds of requests observed,
// some aborted mid-flight). A fixed hint breaks that feedback loop.

// Height cap (in vh) so a short/wide window doesn't force a scroll just
// to see one image, translated into an equivalent WIDTH via each
// stage's own aspect ratio and fed to CSS as a custom property on the
// *.stage wrapper* (see .stage's `width: clamp(280px,
// var(--stage-max-h-width), 345px)`) rather than on the <img> itself.
// It has to live on .stage: .stage doesn't grow (flex-grow:0, so the
// antes/depois pair stays content-sized instead of stretching), and a
// flex item's own "auto" basis is computed from its content's
// max-content size — for a child whose width is a clamp() with a `%`
// upper bound, percentages don't contribute to max-content sizing, so
// the browser fell back to just the clamp's px minimum (280px) as
// .stage's basis, permanently capping it there regardless of viewport
// height (confirmed in-browser, 2026-09-16). Giving .stage itself a
// definite (non-%) clamp() width fixes that — the <img> then just
// fills 100% of it.
//
// An inline style beats every stylesheet rule including media queries,
// which would have made the mobile single-image override in
// SolutionBlock.module.css unable to take over at that breakpoint —
// that's why this is a custom property consumed by a CSS `width:
// clamp(...)` rule, not a `width` set directly inline.
//
// Doing the height-to-width conversion at all (rather than setting
// max-height directly) is what lets a min-width floor for legibility
// coexist with the height cap without distorting the image: min-width
// and max-height are independent axes, so a browser satisfies both
// literally (280px wide AND capped-tall) rather than reconciling them
// through the aspect ratio, stretching the bitmap. Deriving everything
// from width + an explicit aspect-ratio on the <img> keeps a single
// dimension in control.
const MAX_HEIGHT_VH = 60;

function stageWrapperStyle(stage: Stage): CSSProperties {
  const widthAtMaxHeight = (stage.width / stage.height) * MAX_HEIGHT_VH;
  return {
    ["--stage-max-h-width" as string]: `${widthAtMaxHeight}vh`,
  };
}

function stageImageStyle(stage: Stage): CSSProperties {
  return { aspectRatio: `${stage.width} / ${stage.height}` };
}

export function SolutionBlock({
  id,
  painLinks,
  headline,
  quote,
  quoteAttribution,
  body,
  antes,
  depois,
  layout = "side-by-side",
}: SolutionBlockProps) {
  const stacked = layout === "stacked";
  const stageSizes = stacked ? "706px" : "345px";

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
        <div className={`${styles.stages} ${stacked ? styles.stagesStacked : ""}`}>
          <div
            className={`${styles.stage} ${styles.stageAntes}`}
            style={stageWrapperStyle(antes)}
          >
            <p className={styles.stageLabel}>{antes.label}</p>
            <Image
              src={antes.src}
              alt={antes.alt}
              width={antes.width}
              height={antes.height}
              className={styles.stageImage}
              style={stageImageStyle(antes)}
              sizes={stageSizes}
            />
          </div>

          <span
            className={`${styles.arrow} ${stacked ? styles.arrowStacked : ""}`}
            aria-hidden="true"
          >
            {stacked ? "↓" : "→"}
          </span>

          <div className={styles.stage} style={stageWrapperStyle(depois)}>
            <p className={styles.stageLabel}>{depois.label}</p>
            <Image
              src={depois.src}
              alt={depois.alt}
              width={depois.width}
              height={depois.height}
              className={styles.stageImage}
              style={stageImageStyle(depois)}
              sizes={stageSizes}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
