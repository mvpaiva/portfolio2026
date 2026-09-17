import type { ReactNode } from "react";
import styles from "./BlockGrid.module.css";

type BlockGridProps = {
  label: ReactNode;
  children: ReactNode;
};

export function BlockGrid({ label, children }: BlockGridProps) {
  return (
    <div className={styles.grid}>
      <div>{label}</div>
      <div>{children}</div>
    </div>
  );
}
