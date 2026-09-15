import styles from "./GhostMarker.module.css";

type GhostMarkerProps = {
  children: string;
};

// The ONLY place Fraunces is used inside the case page (Light 300,
// non-italic — corrected 2026-09-16, checked directly against node
// 2173:235) — every other block is Instrument Sans, hierarchy by size
// alone (verified against the production reference, 117 text
// occurrences checked).
export function GhostMarker({ children }: GhostMarkerProps) {
  return (
    <div className={styles.marker}>
      <p className={styles.text}>{children}</p>
    </div>
  );
}
