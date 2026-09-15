import type { ReactNode } from "react";
import styles from "./CaseSection.module.css";

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
