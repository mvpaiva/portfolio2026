import Image from "next/image";
import { CaseSection } from "../CaseSection";
import styles from "./BlueprintCrop.module.css";
import liftStyles from "../BlockLift.module.css";

// Copy source: Figma node 2173:267 "Blueprint Crop", read verbatim via the
// Figma API (2026-09-16).
//
// The Figma source has a connecting "timeline" line under the 3 stage
// numbers (node 2227:641) — dropped per Matheus 2026-09-16 ("não
// precisa"). Considered an arrow instead, but skipped it: an arrow
// glyph ("→") was already flagged and removed elsewhere in this case as
// an AI-slop pattern (see benji-taylor-reference.md), so not
// reintroducing it here.
//
// Descriptions for stages 01 and 02 came from the Figma source as two
// disconnected sentence fragments (lowercase second line, no connector —
// e.g. "...pelos corredores.\ndecide usar o self-checkout."), unlike
// stage 03's single clean sentence. Flagged to Matheus 2026-09-16 —
// confirmed as a grammar fix, not new content: joined with "e" into one
// sentence, no facts added.
const STAGES = [
  {
    number: "01",
    title: "Escaneamento",
    description:
      "O cliente escaneia os itens conforme anda pelos corredores e decide usar o self-checkout.",
    pain: "Dor: fricção no escaneamento",
  },
  {
    number: "02",
    title: "Verificação",
    description:
      "Itens soltos e produtos 18+ pedem confirmação extra e dificultam identificar produtos sem código.",
    pain: "Dor: busca de produto solto",
  },
  {
    number: "03",
    title: "Saída",
    description: "Cliente finaliza a compra e passa pelo portão.",
    pain: "Dor: ansiedade no portão de saída",
  },
];

export function BlueprintCrop() {
  return (
    <CaseSection id="blueprint-crop" spacing="tight">
      <div className={`${styles.block} ${liftStyles.item} lift-trigger`}>
        <p className={styles.label}>Recorte do service blueprint</p>

        <div className={styles.blueprintImage}>
          <Image
            src="/case/square-self-checkout/blueprint-crop/recorte-service-blueprint.png"
            alt="Recorte do service blueprint do fluxo de autoatendimento"
            fill
            sizes="(max-width: 768px) 100vw, 1226px"
          />
          <a
            className={styles.miroLink}
            href="https://miro.com/app/board/uXjVHJ5Co14=/?moveToWidgets=AQC1Atap1LywhICAMNWgO6isFJ4BRnurATpWM7qkLv_ID7CNFQGTAwHCggwBAQEBAdCvDJP1LCIBVwGMAqkB3c0Ov-4K75QJAeICJwsVERQt3NQWr6QLiY0GrskD4gPa7gqkyAi1AcIBo-8L3sllAQEBAQEBAQEBAQEBAQEBAQEBAbTKNQEBAQEBAQEBAQEBAQEBAQEBAQFyAQEBAQEBAQEBAQEBAQEBAQEBATIBAQEBAQEBAQEBAQEBAgEDhAEBAQEBAQEBAQEBAQECBA8BAQEBAQEBAQEBAQECEwEBAQEBAQEBAQEBAQIDnQIBAQEBAQEBAQEBAQEBAQEBAQEBq-iRAdyYCJTlAtuXCOnKCo_8CpwE8vUKkgLksgr5A97oCdoBqLcJoQKnAqqACxDQxgqPAqECvQL75giLAoS2CIXQWQEBAQEBAQEBAQEBAQEBAQEB3-Y80e4JubwHiAGaAlVcuwLolBKNAbf_DFBE0gEBAdf_B_8GJgy-jwgnpwRfGB-lAa-4BecEJhAIDVzrkQbbAVhhGyU2Je_wB5QCNjQaDjcT5gEoDQ8ZLvWbCSSWiyLU4AvmBgG43QQBnwIB9asHAZ_8BgGSkwcBlLIEAQ"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visualizar service blueprint completo
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className={styles.stages}>
          {STAGES.map((stage, index) => (
            <div
              key={stage.number}
              className={styles.stage}
              data-position={
                index === 0 ? "first" : index === STAGES.length - 1 ? "last" : "middle"
              }
            >
              <span className={styles.number}>{stage.number}</span>
              <h3 className={styles.title}>{stage.title}</h3>
              <p className={styles.description}>{stage.description}</p>
              <p className={styles.pain}>{stage.pain}</p>
            </div>
          ))}
        </div>
      </div>
    </CaseSection>
  );
}
