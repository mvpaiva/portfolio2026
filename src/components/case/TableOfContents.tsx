import styles from "./TableOfContents.module.css";

const SECTIONS = [
  { href: "#contexto", label: "Contexto" },
  { href: "#descoberta", label: "Descoberta" },
  { href: "#pesquisa", label: "Pesquisa" },
  { href: "#solucoes", label: "Soluções" },
  { href: "#resultado", label: "Resultado" },
];

export function TableOfContents() {
  return (
    <nav className={styles.toc} aria-label="Sumário do case">
      {SECTIONS.map((section) => (
        <a key={section.href} className={styles.link} href={section.href}>
          {section.label}
        </a>
      ))}
    </nav>
  );
}
