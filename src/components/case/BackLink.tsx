import styles from "./BackLink.module.css";

export function BackLink() {
  // Plain <a>, not next/link — a client-side route transition would skip
  // the cross-document View Transitions crossfade (globals.css) that the
  // home → case navigation already relies on for the same reason.
  return (
    // eslint-disable-next-line @next/next/no-html-link-for-pages
    <a className={styles.link} href="/">
      Voltar
    </a>
  );
}
