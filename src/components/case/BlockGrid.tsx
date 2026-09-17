import type { ReactNode } from "react";
import styles from "./BlockGrid.module.css";

type BlockGridProps = {
  label: ReactNode;
  children: ReactNode;
  className?: string;
};

// className (liftStyles.item) goes on the OUTER grid — that's the visual
// unit that lifts/dims as a whole. The plain global "lift-trigger" marker
// goes on the two INNER columns instead, each tightly sized to its own
// content: a CSS Grid row sizes to its tallest track, so if the class
// lived on the grid itself, the shorter column's leftover empty cell
// space would still count as "inside the hoverable element" even though
// no visible content is there — the same phantom-hover-zone bug already
// fixed once for BlockSpotlight's page-level trigger. Only lift-type
// blocks (Contexto, Pesquisa) use BlockGrid today, hence "lift-trigger"
// specifically — see BlockLift.module.css for how it reconnects. Desktop
// only (2026-09-17): the hover rules themselves are gated behind
// `hover: hover` in BlockLift.module.css, so these markers are inert on
// touch — kept as plain global classes rather than conditionally applied
// so there's one code path for both.
export function BlockGrid({ label, children, className }: BlockGridProps) {
  return (
    <div className={className ? `${styles.grid} ${className}` : styles.grid}>
      <div className="lift-trigger">{label}</div>
      <div className="lift-trigger">{children}</div>
    </div>
  );
}
