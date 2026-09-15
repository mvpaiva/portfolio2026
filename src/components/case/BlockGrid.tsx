import type { ReactNode } from "react";
import styles from "./BlockGrid.module.css";

type BlockGridProps = {
  label: ReactNode;
  children: ReactNode;
  className?: string;
};

// className (liftStyles.item / spotlightStyles.item) goes on the OUTER
// grid — that's the visual unit that lifts/dims as a whole. The plain
// global "spotlight-item" marker goes on the two INNER columns instead,
// each tightly sized to its own content: a CSS Grid row sizes to its
// tallest track, so if the class lived on the grid itself, the shorter
// column's leftover empty cell space would still count as "inside the
// hoverable element" even though no visible content is there — the same
// phantom-hover-zone bug already fixed once for BlockSpotlight's page-
// level trigger. See BlockLift.module.css/BlockSpotlight.module.css for
// how the two roles (visual target vs. hover trigger) reconnect.
export function BlockGrid({ label, children, className }: BlockGridProps) {
  return (
    <div className={className ? `${styles.grid} ${className}` : styles.grid}>
      <div className="spotlight-item">{label}</div>
      <div className="spotlight-item">{children}</div>
    </div>
  );
}
