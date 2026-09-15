import styles from "./Placeholder.module.css";

type PlaceholderProps = {
  ratio: string;
  label?: string;
};

// Code equivalent of the Figma "ink 4% + noise" placeholder convention —
// flat tint only, no attempt to replicate the NOISE texture pixel-for-pixel.
export function Placeholder({ ratio, label }: PlaceholderProps) {
  return (
    <div
      className={styles.placeholder}
      style={{ aspectRatio: ratio }}
      role={label ? "img" : undefined}
      aria-label={label}
    />
  );
}
