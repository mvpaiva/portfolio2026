import { CaseSection } from "../CaseSection";
import { BlockGrid } from "../BlockGrid";
import { LabelStack } from "../LabelStack";
import styles from "./Pesquisa.module.css";
import liftStyles from "../BlockLift.module.css";

// Copy source: Figma refinamento frame, node 2173:237 "Pesquisa" — read
// verbatim via the Figma API, including the confirmed-real quote (kept
// verbatim, em dash included — it's transcribed research speech, not
// copy we authored).
const OBSERVATIONS = [
  "Cada olhada para longe da câmera para confirmar um item fazia a pessoa perder o fluxo e se reencontrar.",
  "A verificação de idade assistida por funcionário acontecia à vista de toda a fila atrás do cliente.",
  "100% dos respondentes da enquete preferem pagar via Pix — nenhum totem testado aceitava.",
];

export function Pesquisa() {
  return (
    <CaseSection id="pesquisa">
      <BlockGrid
        className={`${liftStyles.item} spotlight-item`}
        label={
          <LabelStack
            eyebrow="A PESQUISA"
            question="18 conversas, 3 redes de varejo, um tema que não parava de se repetir"
          />
        }
      >
        <p className={styles.body}>
          Investigamos o comportamento de compra em horários de pico para
          entender por que usuários experientes ainda cometiam erros
          básicos durante o checkout. A pesquisa revelou que a carga
          cognitiva não vinha da interface em si, mas da ansiedade da
          fila.
        </p>

        <ul className={styles.list}>
          {OBSERVATIONS.map((item) => (
            <li key={item} className={styles.listItem}>
              <span className={styles.bullet}>/</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className={styles.quote}>
          &quot;Busca manual de código pra produtos soltos — as pessoas
          desistiam no meio do escaneamento e pediam ajuda.&quot;
        </p>

        <a className={styles.link} href="#solucao-1">
          Ver soluções: escaneie sem parar
        </a>
      </BlockGrid>
    </CaseSection>
  );
}
