import { CaseSection } from "../CaseSection";
import { SolutionBlock } from "../SolutionBlock";
import styles from "./Solucoes.module.css";

// Copy source: Figma "section.max-w-7xl" (2173:440), read verbatim via
// the Figma API (2026-09-16) — the container for all 5 Solution Blocks.
// No top stroke on the container itself (confirmed via API), so no
// divider here despite Testes → Soluções being a real subject change.
//
// Solução 1 (node 2179:209) built first; 2–5 follow in later sessions,
// each as another <SolutionBlock> in this same list with the real
// 256px gap (--space-64) the Figma file uses between them. "Antes" and
// "Depois" images are the same two real photos already used in Design e
// Prototipação/Onboarding (stress-test screen + scan-UI overlay on the
// olive oil bottle) — Matheus reusing the same assets across blocks,
// confirmed by identical image hashes, not a mistake.
//
// The pain-point link(s) reciprocate Field Notes' forward links (e.g.
// #solucao-1) — point back to #field-notes since individual chips there
// don't have their own anchors.
//
// Solução 2's "Antes"/"Depois" are full-width desktop screenshots
// (~706x398 landscape, layout="stacked"), not the portrait phone
// mockups Solução 1 uses — a real structural difference confirmed via
// the Figma API, not a simplification. Both images are real, downloaded
// from Figma's live asset URLs; both happen to show English UI copy
// ("Weigh the item", "$" prices) like several other hi-fi screens
// already seen elsewhere in this case — the underlying prototype reads
// as English-first even though the case narrative around it is
// Portuguese. Em dash in the body (authorial copy, not the verbatim
// quote) swapped for a colon, same rule as elsewhere.
//
// Solução 3 (Totem age-verification, layout="stacked" like #2) had TWO
// em dashes in its body paragraph — both split into separate sentences
// instead (periods, not colons — reads better here since each half is
// already a complete clause). Its "Antes" image reuses the same
// stress-test-data pattern already seen elsewhere (9999 items, R$
// 9999,99); "Depois" is a real Totem modal, English copy again.
//
// Solução 4 is back to side-by-side (default layout, like #1) with
// portrait phone mockups — "Antes" is Portuguese, "Depois" is English,
// an inconsistency in the real prototype itself, not fixed here.
//
// Solução 5 (last one) has a parenthetical em-dash PAIR in its body
// ("duas abas ficam visíveis — Escaneados e Na Lista — e..."), not an
// attribution — swapped for real parentheses. All 5 solutions now
// built.
export function Solucoes() {
  return (
    <CaseSection id="solucoes">
      <div className={styles.list}>
        <SolutionBlock
          id="solucao-1"
          painLinks={[{ label: "01 · Fricção no escaneamento", href: "#field-notes" }]}
          headline="Escaneie sem parar"
          quote="Quero escanear tudo com o celular e ir embora. Sem fila, sem conversa."
          quoteAttribution="Enquete"
          body="A câmera fica ativa enquanto o carrinho fica numa bottom sheet abaixo dela. Um item escaneado confirma com uma animação rápida de mola que nunca interrompe o fluxo: a câmera continua visível (só escurecida) pra deixar claro que você ainda está escaneando."
          antes={{
            label: "Antes: Wireframe mid-fi",
            src: "/case/square-self-checkout/design-prototipacao/02-highfi.png",
            alt: "Wireframe mid-fi do fluxo de escaneamento, tela escura com scanner ativo",
            width: 786,
            height: 1704,
          }}
          depois={{
            label: "Depois: UI Design",
            src: "/case/square-self-checkout/solucoes/01-depois.png",
            alt: "UI final do escaneamento: câmera ativa sobre uma foto real de produto, com bottom sheet do carrinho",
            width: 786,
            height: 1704,
          }}
        />

        <SolutionBlock
          id="solucao-2"
          layout="stacked"
          painLinks={[
            { label: "02 · Seleção de item errado", href: "#field-notes" },
            { label: "03 · Busca de produto solto", href: "#field-notes" },
          ]}
          headline="Categoria primeiro, código nunca"
          quote="A tabela de busca de produto é péssima. Nunca sei o código certo. Desisto no meio do caminho."
          quoteAttribution="Xênia, 54"
          body="Uma tela de categoria agora vem antes da grade de produtos. Escolha uma categoria, depois identifique o item por uma foto de alta qualidade: a balança captura o peso e o preço calcula automaticamente. Sem essa tela, 40% dos participantes do teste escolheram o item errado. Com ela: zero."
          antes={{
            label: "Antes: Wireframe high-fi",
            src: "/case/square-self-checkout/solucoes/02-antes.png",
            alt: "Tela de escolha do produto com opção de pesagem na balança do totem",
            width: 3840,
            height: 2160,
          }}
          depois={{
            label: "Depois: UI Design",
            src: "/case/square-self-checkout/solucoes/02-depois.png",
            alt: "Tela final de pesagem do item, com foto do produto e carrinho lateral",
            width: 3840,
            height: 2160,
          }}
        />

        <SolutionBlock
          id="solucao-3"
          layout="stacked"
          painLinks={[{ label: "04 · Verificação 18+", href: "#field-notes" }]}
          headline="Prove sua idade sem plateia"
          quote="No Extra, um funcionário confere o documento do cliente na frente de todo mundo."
          quoteAttribution="Observação de campo"
          body="Quando o sistema sinaliza um item com restrição de idade, ele oferece três caminhos: confirmar com um CPF já cadastrado, verificar pelo app, ou pedir ajuda. Nenhum caminho exige se destacar. Se o CPF já está cadastrado, a verificação é automática. O participante P5 se recusou a digitar o CPF até ler que ele não seria compartilhado. O aviso de privacidade agora aparece antes do campo, não depois."
          antes={{
            label: "Antes: Wireframe mid-fi",
            src: "/case/square-self-checkout/solucoes/03-antes.png",
            alt: "Tela de verificação de idade no totem, com opções de digitar CPF, verificar pelo app ou chamar atendente",
            width: 3840,
            height: 2160,
          }}
          depois={{
            label: "Depois: UI Design",
            src: "/case/square-self-checkout/solucoes/03-depois.png",
            alt: "Modal final de confirmação de idade no totem, com opções de validar pelo celular ou no próprio totem",
            width: 3840,
            height: 2160,
          }}
        />

        <SolutionBlock
          id="solucao-4"
          painLinks={[{ label: "05 · Ansiedade na saída", href: "#field-notes" }]}
          headline="Um portão travado não é um beco sem saída"
          quote="Se fosse uma loja de verdade, eu teria chamado um funcionário. Eu teria ficado preso ali."
          quoteAttribution="Teste em papel"
          body="O caminho antigo de recuperação era um linkzinho de texto escondido no fim da tela de saída, fácil de perder sob estresse. O novo é uma tela dedicada: duas opções de largura total, impossíveis de não ver, que deixam o cliente se autodeclarar e liberar a saída sem esperar por um funcionário."
          antes={{
            label: "Antes: Wireframe high-fi",
            src: "/case/square-self-checkout/solucoes/04-antes.png",
            alt: "Tela de erro do sensor de saída, com opções de dizer se escaneou tudo ou esqueceu um item",
            width: 786,
            height: 1704,
          }}
          depois={{
            label: "Depois: UI Design",
            src: "/case/square-self-checkout/solucoes/04-depois.png",
            alt: "Tela final de recuperação na saída, com duas opções de largura total para se autodeclarar",
            width: 786,
            height: 1704,
          }}
        />

        <SolutionBlock
          id="solucao-5"
          painLinks={[{ label: "06 · Lista e scanner desconectados", href: "#field-notes" }]}
          headline="A lista te acompanha enquanto você compra"
          quote="O app não me ajuda de verdade enquanto eu compro. Ainda uso papel."
          quoteAttribution="Manuela, 33"
          body="Um hub de lista dedicado deixa a pessoa montar a lista antes de sair de casa. Durante o escaneamento, duas abas ficam visíveis (Escaneados e Na Lista) e uma barra de progresso mostra o quanto falta. Os itens se marcam sozinhos conforme são escaneados."
          antes={{
            label: "Antes: Wireframe high-fi",
            src: "/case/square-self-checkout/solucoes/05-antes.png",
            alt: "Tela da lista de compras da semana com abas de escaneados e na lista, e barra de progresso",
            width: 786,
            height: 1704,
          }}
          depois={{
            label: "Depois: UI Design",
            src: "/case/square-self-checkout/solucoes/05-depois.png",
            alt: "UI final do escaneamento com lista de compras semanal visível, câmera ativa sobre foto real de produto",
            width: 786,
            height: 1704,
          }}
        />
      </div>
    </CaseSection>
  );
}
