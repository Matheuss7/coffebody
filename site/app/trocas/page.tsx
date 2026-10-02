import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/Sections";
import { contact, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Trocas e devoluções | Coffee Body",
  description:
    "Política de trocas, devoluções e direito de arrependimento nas compras de café da Coffee Body.",
  alternates: { canonical: `${siteConfig.url}/trocas/` },
};

// TODO: revisar com apoio jurídico e alinhar com a operação real de logística reversa.
export default function TrocasPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Trocas e devoluções" />

      <Container className="flex max-w-3xl flex-col gap-8 py-14 text-sm leading-relaxed text-muted sm:py-20">
        <section className="flex flex-col gap-3">
          <h2 className="font-display text-xl text-forest">
            Direito de arrependimento
          </h2>
          <p>
            Em compras feitas a distância, você tem até 7 dias corridos a partir do
            recebimento para desistir da compra, conforme o artigo 49 do Código de
            Defesa do Consumidor. O produto deve estar com a embalagem lacrada. Café com
            o pacote aberto não pode ser revendido e, por ser alimento, não é aceito em
            devolução por desistência.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-display text-xl text-forest">
            Produto com defeito ou avaria
          </h2>
          <p>
            Se o pacote chegar violado, úmido ou com a embalagem comprometida, registre
            uma foto e nos chame no WhatsApp em até 7 dias do recebimento. Enviamos um
            novo pacote ou devolvemos o valor integral, incluindo o frete, sem custo
            para você.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-display text-xl text-forest">Erro no pedido</h2>
          <p>
            Se enviarmos o café, o peso ou a moagem errados, o erro é nosso: corrigimos o
            envio e pagamos a logística reversa. Basta avisar no WhatsApp.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-display text-xl text-forest">
            Não gostou do café que escolheu
          </h2>
          <p>
            Perfil sensorial é gosto pessoal e não configura defeito. Mesmo assim, fale
            com a gente: ajudamos a ajustar a receita de preparo e, na próxima compra,
            recomendamos um lote mais alinhado ao seu paladar.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-display text-xl text-forest">Como solicitar</h2>
          <p>
            Fale com a gente pelo WhatsApp ou por{" "}
            <a href={`mailto:${contact.email}`} className="text-brand hover:underline">
              {contact.email}
            </a>
            , informando o número do pedido, o que aconteceu e, se for o caso, fotos do
            produto. Respondemos em até 2 dias úteis.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-display text-xl text-forest">Prazo de reembolso</h2>
          <p>
            Reembolsos em PIX são feitos em até 5 dias úteis depois do recebimento do
            produto devolvido. Em cartão de crédito, o estorno segue o prazo da
            operadora, normalmente em até duas faturas.
          </p>
        </section>
      </Container>
    </>
  );
}
