import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/Sections";
import { contact, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de privacidade | Coffee Body",
  description:
    "Como a Coffee Body trata dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD).",
  alternates: { canonical: `${siteConfig.url}/privacidade/` },
  robots: { index: true, follow: true },
};

// TODO: revisar com apoio jurídico antes de publicar. Texto base, não parecer legal.
export default function PrivacidadePage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Política de privacidade" />

      <Container className="flex max-w-3xl flex-col gap-8 py-14 text-sm leading-relaxed text-muted sm:py-20">
        <section className="flex flex-col gap-3">
          <h2 className="font-display text-xl text-forest">
            Quais dados coletamos
          </h2>
          <p>
            Este site é estático e não possui cadastro, carrinho ou formulário que
            armazene dados em servidor próprio. Nenhum dado pessoal é coletado pela
            simples navegação, além de registros técnicos do serviço de hospedagem.
          </p>
          <p>
            Quando você clica em um botão de WhatsApp, a conversa acontece no aplicativo
            WhatsApp e passa a ser regida pela política de privacidade da Meta. Os dados
            que você nos envia nessa conversa — nome, endereço de entrega, CEP e
            telefone — são usados exclusivamente para processar o seu pedido, emitir a
            nota fiscal e combinar a entrega.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-display text-xl text-forest">Pagamento</h2>
          <p>
            Não processamos pagamento neste site e não armazenamos dados de cartão. O
            pagamento é feito por link gerado em plataforma de pagamento parceira, que é
            responsável pelo tratamento desses dados.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-display text-xl text-forest">
            Compartilhamento com terceiros
          </h2>
          <p>
            Compartilhamos dados apenas quando necessário para concluir a venda: com a
            plataforma de pagamento, com a transportadora responsável pela entrega e com
            o sistema de emissão de nota fiscal, nos limites exigidos pela legislação
            fiscal.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-display text-xl text-forest">
            Retenção e seus direitos
          </h2>
          <p>
            Dados de venda são mantidos pelo prazo exigido pela legislação fiscal. Você
            pode solicitar acesso, correção ou exclusão dos seus dados pessoais, nos
            termos da LGPD (Lei 13.709/2018), escrevendo para{" "}
            <a href={`mailto:${contact.email}`} className="text-brand hover:underline">
              {contact.email}
            </a>
            .
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-display text-xl text-forest">Cookies</h2>
          <p>
            Este site não utiliza cookies de marketing nem rastreamento de terceiros. Se
            isso mudar, esta política será atualizada e o consentimento será solicitado
            antes da coleta.
          </p>
        </section>

        <p className="border-t border-sand pt-6 text-xs">
          {siteConfig.legalName} — São José, Santa Catarina.
        </p>
      </Container>
    </>
  );
}
