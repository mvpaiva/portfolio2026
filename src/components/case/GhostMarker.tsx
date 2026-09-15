import styles from "./GhostMarker.module.css";

type GhostMarkerProps = {
  children: string;
};

// The ONLY place Fraunces italic is used inside the case page — every
// other block is Instrument Sans, hierarchy by size alone (verified
// against the production reference, 117 text occurrences checked).
export function GhostMarker({ children }: GhostMarkerProps) {
  return (
    <div className={styles.marker}>
      <p className={styles.text}>{children}</p>
    </div>
  );
}
