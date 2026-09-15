import styles from "./LabelStack.module.css";

type LabelStackProps = {
  eyebrow: string;
  question?: string;
};

export function LabelStack({ eyebrow, question }: LabelStackProps) {
  return (
    <div>
      <p className={styles.eyebrow}>{eyebrow}</p>
      {question ? <p className={styles.question}>{question}</p> : null}
    </div>
  );
}
