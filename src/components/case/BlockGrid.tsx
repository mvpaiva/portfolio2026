import type { ReactNode } from "react";
import styles from "./BlockGrid.module.css";

type BlockGridProps = {
  label: ReactNode;
  children: ReactNode;
  className?: string;
};

export function BlockGrid({ label, children, className }: BlockGridProps) {
  return (
    <div className={className ? `${styles.grid} ${className}` : styles.grid}>
      <div>{label}</div>
      <div>{children}</div>
    </div>
  );
}
