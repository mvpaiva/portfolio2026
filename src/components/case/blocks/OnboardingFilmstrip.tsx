import Image from "next/image";
import { CaseSection } from "../CaseSection";
import styles from "./OnboardingFilmstrip.module.css";
import liftStyles from "../BlockLift.module.css";

// Copy source: Figma node 2252:183 "Onboarding — Filmstrip", read
// verbatim via the Figma API (2026-09-16). All 6 images real, downloaded
// from Figma's live asset URLs. Em dash in the label swapped for a
// colon (authorial copy, not a verbatim quote — same rule applied
// elsewhere in this case).
//
// The onboarding screens themselves are in English ("Welcome to
// Square", "First time?"), unlike the Portuguese checkout flow shown
// elsewhere in the case. Not fixed here (it's pixels in real
// screenshots) — consistent with the handoff note that onboarding was
// deliberately left outside the case's core scope, so it wasn't taken
// through the same localization pass as the checkout flow.
//
// 6 frames at 184px + 5 gaps of 24px ≈ 1226px — fits exactly in one row
// at the standard desktop content width, but overflows on anything
// narrower, so this scrolls horizontally (native scroll-snap, no JS)
// rather than wrapping — a filmstrip, not a grid.
const FRAMES = [
  {
    caption: "1. Bem-vindo ao Square",
    alt: "Tela de boas-vindas do app com opções de login",
    src: "/case/square-self-checkout/onboarding/01-bem-vindo.png",
  },
  {
    caption: "2. Como funciona",
    alt: "Bottom sheet explicando escanear, pesar e pagar pelo app, sobre uma foto real de uso",
    src: "/case/square-self-checkout/onboarding/02-como-funciona.png",
  },
  {
    caption: "3. Escaneado",
    alt: "Foto real de um produto sendo escaneado com o app",
    src: "/case/square-self-checkout/onboarding/03-escaneado.png",
  },
  {
    caption: "4. Pesando um item",
    alt: "Tela de pesagem de item no app",
    src: "/case/square-self-checkout/onboarding/04-pesando.png",
  },
  {
    caption: "5. Revisando e pagando",
    alt: "Tela de checkout com opções de pagamento, Pix em destaque",
    src: "/case/square-self-checkout/onboarding/05-revisando.png",
  },
  {
    caption: "6. Saindo da loja",
    alt: "Tela final com QR code de saída e confirmação de compra",
    src: "/case/square-self-checkout/onboarding/06-saindo.png",
  },
];

export function OnboardingFilmstrip() {
  return (
    <CaseSection id="onboarding-filmstrip" divider>
      <div className={`${styles.column} ${liftStyles.item} lift-trigger`}>
        <p className={styles.label}>Sequência de onboarding: primeiro uso completo</p>

        <div className={styles.filmstrip}>
          {FRAMES.map((frame) => (
            <div key={frame.caption} className={styles.frame}>
              <p className={styles.caption}>{frame.caption}</p>
              <div className={styles.imageWrap}>
                <Image src={frame.src} alt={frame.alt} fill sizes="184px" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </CaseSection>
  );
}
