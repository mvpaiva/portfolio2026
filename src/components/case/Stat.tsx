import { CountUp } from "./CountUp";
import styles from "./Stat.module.css";

type StatProps = {
  number: string;
  label: string;
  // Only for plain integers; values like "85,1%" render static.
  countUp?: boolean;
};

export function Stat({ number, label, countUp }: StatProps) {
  return (
    <div className={styles.stat}>
      <p className={styles.number}>{countUp ? <CountUp value={number} /> : number}</p>
      <p className={styles.label}>{label}</p>
    </div>
  );
}
