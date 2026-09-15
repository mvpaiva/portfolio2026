import { CaseSection } from "../CaseSection";
import { BlockGrid } from "../BlockGrid";
import { LabelStack } from "../LabelStack";
import styles from "./Contexto.module.css";

// Copy source: docs/visual-language-specification.md §14, block 02 ·
// Contexto (v6, final, 2026-09-13).
export function Contexto() {
  return (
    <CaseSection divider id="contexto">
      <BlockGrid
        label={
          <LabelStack
            eyebrow="O CONTEXTO"
            question="O que o projeto precisa resolver?"
          />
        }
      >
        <p className={styles.body}>
          O briefing: transformar o Register em autoatendimento de verdade,
          lançar um app complementar que apoie a jornada inteira (não só o
          pagamento), manter o fluxo utilizável por qualquer idade ou perfil
          sem exigir assistência, e manter todo item rastreável. Este case
          acompanha a fase entre pegar o primeiro item e sair pela porta.
          Projeto solo, sem afiliação oficial com a Square.
        </p>
      </BlockGrid>
    </CaseSection>
  );
}
