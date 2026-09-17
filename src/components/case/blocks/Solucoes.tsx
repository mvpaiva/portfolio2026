import { CaseSection } from "../CaseSection";
import { SolutionBlock } from "../SolutionBlock";
import styles from "./Solucoes.module.css";

// Copy source: Figma "section.max-w-7xl" (2173:440), read verbatim via
// the Figma API (2026-09-16) — the container for all 5 Solution Blocks.
// No top stroke on the container itself (confirmed via API), so no
// divider here despite Testes → Soluções being a real subject change.
//
// The pain-point link(s) reciprocate Field Notes' forward links (e.g.
// #solucao-1) — point back to #field-notes since individual chips there
// don't have their own anchors.
//
// 2026-09-16 (Matheus): each solution's antes+arrow+depois pair (real
// structural differences between side-by-side vs. stacked layouts, and
// the clamp()/vh-height sizing machinery that pairing needed — see git
// history) was replaced with a single flattened banner per solution,
// exported from Figma with both stage labels and the arrow baked in.
// Solução 2/3's banners are taller (stacked ANTES-over-DEPOIS with a ↓,
// matching their real Figma layout); 1/4/5 are the portrait side-by-side
// pairing. Banner dimensions below are the real exported PNGs' native
// width/height (confirmed via `file`), not estimates.
//
// 2026-09-17 (Matheus): added a dedicated `mobileBanner` export per
// solution (see SolutionBlock.tsx) — the desktop banner's baked-in
// labels read too small once shrunk to a phone width. Also replaced
// Solução 5's desktop banner with a corrected export ("-v2"), and
// rewrote every solution's quote/body/headline in a full text pass —
// Solução 2 in particular changed from "categoria antes da grade" to
// "peso e preço em tempo real na balança", matching Field Notes' and
// Pesquisa's updated third pain point (pesagem, not busca de produto).
export function Solucoes() {
  return (
    <CaseSection id="solucoes">
      <div className={styles.list}>
        <SolutionBlock
          id="solucao-1"
          painLinks={[{ label: "01 · Fricção no escaneamento", href: "#field-notes" }]}
          headline="Escaneie sem parar"
          quote="Quero escanear tudo com meu celular e ir embora, sem conversinhas."
          quoteAttribution="Survey"
          body="O wireframe aprovado mantinha “pesar”, “código manual” e “pagar” sempre visíveis, competindo com a câmera. No UI final, eles se concentram em um único botão expansível. A tela de scan fica no essencial: câmera, carrinho e uma ação. Essa lógica de reduzir ao essencial guiou o redesign inteiro."
          banner={{
            src: "/case/square-self-checkout/solucoes/solucao-1-banner-v3.png",
            alt: "Antes: wireframe mid-fi do fluxo de escaneamento. Depois: UI final com câmera ativa sobre uma foto real de produto e bottom sheet do carrinho",
            width: 1412,
            height: 1478,
          }}
          mobileBanner={{
            src: "/case/square-self-checkout/solucoes/solucao-1-banner-mob.png",
            width: 1412,
            height: 1440,
          }}
        />

        <SolutionBlock
          id="solucao-2"
          painLinks={[
            { label: "02 · Seleção de item errado", href: "#field-notes" },
            { label: "03 · Confusão na mecânica da pesagem", href: "#field-notes" },
          ]}
          headline="Peso e preço sem adivinhação"
          quote="Na hora de pesar, eu nunca sei se coloquei o produto do jeito certo. Fico esperando e sem saber se o peso está correto."
          quoteAttribution="Xênia, 54"
          body="A tela mostra o peso em tempo real assim que o item toca a balança, com o preço calculado junto. O status indica quando a leitura está estável, e o botão de confirmar conduz o usuário ao próximo passo. Assim, ele consegue acompanhar o que a máquina está fazendo e validar o valor antes de continuar."
          banner={{
            src: "/case/square-self-checkout/solucoes/solucao-2-banner-v2.png",
            alt: "Antes: wireframe high-fi da tela de escolha do produto com opção de pesagem. Depois: UI final da tela de pesagem do item, com foto do produto e carrinho lateral",
            width: 1412,
            height: 1832,
          }}
          mobileBanner={{
            src: "/case/square-self-checkout/solucoes/solucao-2-banner-mob.png",
            width: 1412,
            height: 1832,
          }}
        />

        <SolutionBlock
          id="solucao-3"
          painLinks={[{ label: "04 · Verificação 18+", href: "#field-notes" }]}
          headline="Prove sua idade sem plateia"
          quote="No Extra, um funcionário confere o documento do cliente na frente de todo mundo."
          quoteAttribution="Observação de campo"
          body="Quando o sistema sinaliza um item com restrição de idade, ele oferece três caminhos: confirmar com um CPF já cadastrado, verificar pelo app, ou pedir ajuda. Nenhum caminho exige se destacar. Se o CPF já está cadastrado, a verificação é automática. O participante P5 se recusou a digitar o CPF até ler que ele não seria compartilhado. O aviso de privacidade agora aparece antes do campo, não depois."
          banner={{
            src: "/case/square-self-checkout/solucoes/solucao-3-banner-v3.png",
            alt: "Antes: wireframe mid-fi da tela de verificação de idade no totem, com opções de digitar CPF, verificar pelo app ou chamar atendente. Depois: modal final de confirmação de idade",
            width: 1412,
            height: 1832,
          }}
          mobileBanner={{
            src: "/case/square-self-checkout/solucoes/solucao-3-banner-mob.png",
            width: 1412,
            height: 1832,
          }}
        />

        <SolutionBlock
          id="solucao-4"
          painLinks={[{ label: "05 · Ansiedade na saída", href: "#field-notes" }]}
          headline="Um portão travado não é um beco sem saída"
          quote="Se fosse uma loja de verdade eu teria chamado um funcionário, senão eu ficaria preso ali."
          quoteAttribution="Teste em papel"
          body="Inicialmente, não existia caminho de recuperação além de chamar um funcionário. Foi criado uma tela dedicada: duas opções de largura total, impossíveis de não ver, que deixam o cliente se autodeclarar e liberar a saída sem esperar por ajuda. A solução mantém a segurança do processo ao registrar a ocorrência e sinalizar a necessidade de verificação, sem transformar o erro em um bloqueio."
          banner={{
            src: "/case/square-self-checkout/solucoes/solucao-4-banner-v2.png",
            alt: "Antes: wireframe high-fi da tela de erro do sensor de saída. Depois: tela final de recuperação na saída, com duas opções de largura total para se autodeclarar",
            width: 1412,
            height: 1478,
          }}
          mobileBanner={{
            src: "/case/square-self-checkout/solucoes/solucao-4-banner-mob.png",
            width: 1412,
            height: 1440,
          }}
        />

        <SolutionBlock
          id="solucao-5"
          painLinks={[{ label: "06 · Lista e scanner desconectados", href: "#field-notes" }]}
          headline="A lista te acompanha enquanto você compra"
          quote="O app não me ajuda de verdade enquanto eu compro, então ainda uso papel."
          quoteAttribution="Manuela, 33"
          body="Um hub de lista dedicado deixa a pessoa montar uma lista genérica antes de sair de casa. Durante o escaneamento, duas abas ficam visíveis (Escaneados e Na Lista) e uma barra de progresso mostra o quanto falta. Os itens se marcam sozinhos conforme são escaneados."
          banner={{
            src: "/case/square-self-checkout/solucoes/solucao-5-banner-v2.png",
            alt: "Antes: wireframe high-fi da lista de compras da semana com abas de escaneados e na lista. Depois: UI final do escaneamento com a lista visível e câmera ativa sobre foto real de produto",
            width: 1412,
            height: 1478,
          }}
          mobileBanner={{
            src: "/case/square-self-checkout/solucoes/solucao-5-banner-mob.png",
            width: 1412,
            height: 1440,
          }}
        />
      </div>
    </CaseSection>
  );
}
