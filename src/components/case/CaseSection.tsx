import type { ReactNode } from "react";
import styles from "./CaseSection.module.css";

// Grid note (verified 2026-09-15): the case frame (2173:172/173) carries a
// 12-column layout grid — count 12, gutter 32px, margin 32px, on the
// 1920px canvas — visible as the sage guide overlay in Figma. Measured
// directly: the 1290px content frame (x:315) does NOT snap to that grid's
// column boundaries (315px and 1605px both land mid-column, not on a
// gutter line) — it's an independently centered container, not a
// column-span selection. So CaseSection intentionally stays a simple
// centered 1290px block rather than a 12-col CSS grid; the 12-column
// system is the page's outer alignment reference, not how this frame's
// own width is derived.

type CaseSectionProps = {
  children: ReactNode;
  id?: string;
  divider?: boolean;
  spacing?: "normal" | "tight";
  background?: "bg" | "ink";
};

export function CaseSection({
  children,
  id,
  divider = false,
  spacing = "normal",
  background = "bg",
}: CaseSectionProps) {
  const classNames = [
    styles.section,
    spacing === "tight" ? styles.tight : "",
    divider ? styles.divider : "",
    background === "ink" ? styles.ink : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} className={classNames}>
      {children}
    </section>
  );
}
