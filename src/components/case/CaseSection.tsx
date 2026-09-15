import type { ReactNode } from "react";
import styles from "./CaseSection.module.css";

// Grid note (2026-09-15, superseded in part): the 1290px frame width used
// here is the OLD system — confirmed obsolete for the real desktop/tablet
// breakpoints (966px / 770px content box, validated against Figma node
// 2408:13375 "Hero" in the "square - novo grid" frame). Not yet rolled
// out to CaseSection/BlockGrid pending validation on the remaining
// blocks — see C:\Users\Ma\.claude\plans\functional-yawning-pie.md.
// BlockGrid's 440px label column is confirmed correct as-is (Matheus:
// widened deliberately for storytelling headlines) — do not "fix" it to
// a literal 12-col span.
//
// Vertical spacing variants (confirmed 2026-09-15 against the original
// reference's Tailwind tokens): xl=160px (footer/XL sections),
// normal=128px (standard section padding), compact=96px (ghost
// markers/small dividers), tight=64px (stats-row-style bands).

type CaseSectionProps = {
  children: ReactNode;
  id?: string;
  divider?: boolean;
  spacing?: "xl" | "normal" | "compact" | "tight";
  background?: "bg" | "ink";
};

export function CaseSection({
  children,
  id,
  divider = false,
  spacing = "normal",
  background = "bg",
}: CaseSectionProps) {
  const spacingClass = {
    xl: styles.xl,
    normal: styles.normal,
    compact: styles.compact,
    tight: styles.tight,
  }[spacing];

  const classNames = [
    styles.section,
    spacingClass,
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
