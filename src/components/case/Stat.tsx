import styles from "./Stat.module.css";

type StatProps = {
  number: string;
  label: string;
};

export function Stat({ number, label }: StatProps) {
  return (
    <div className={styles.stat}>
      <p className={styles.number}>{number}</p>
      <p className={styles.label}>{label}</p>
    </div>
  );
}
