import type { ReactNode } from "react";
import styles from "./BlockSpotlight.module.css";

type BlockSpotlightProps = {
  children: ReactNode;
};

export function BlockSpotlight({ children }: BlockSpotlightProps) {
  return <div className={styles.item}>{children}</div>;
}
