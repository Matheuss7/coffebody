import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/Sections";
import { ButtonLink } from "@/components/Button";
import { cardapioPorCategoria } from "@/data/menu";
import { formatPrice } from "@/lib/format";
import { contact, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cardápio da cafeteria | Coffee Body",
  description:
    "Cardápio da Coffee Body em São José, SC: espresso, métodos coados, cold brew, pão de queijo assado na hora, doces e salgados.",
  alternates: { canonical: `${siteConfig.url}/cardapio/` },
};

export default function CardapioPage() {
  const grupos = cardapioPorCategoria();

  return (
    <>
      <PageHeader
        eyebrow="Na cafeteria"
        title="Cardápio"
        description="Servido de segunda a sábado, das 9h às 18h. Os preços são os do balcão; no delivery podem variar."
      />

      <Container className="py-14 sm:py-20">
        {/* Colunas CSS em vez de grid: as seções têm alturas muito diferentes e
            o grid deixaria um buraco ao lado da categoria mais longa. */}
        <div className="lg:columns-2 lg:gap-16">
          {grupos.map((grupo) => (
            <section
              key={grupo.categoria}
              className="mb-12 flex break-inside-avoid flex-col gap-5"
            >
              <h2 className="font-display text-2xl text-forest">{grupo.titulo}</h2>
              <ul className="flex flex-col divide-y divide-sand border-t border-sand">
                {grupo.itens.map((item) => (
                  <li key={item.nome} className="flex items-start justify-between gap-6 py-4">
                    <div>
                      <h3 className="text-base font-semibold text-forest">
                        {item.nome}
                      </h3>
                      {item.descricao && (
                        <p className="mt-1 text-sm leading-relaxed text-muted">
                          {item.descricao}
                        </p>
                      )}
                    </div>
                    {typeof item.preco === "number" && (
                      <span className="shrink-0 text-sm font-semibold text-forest">
                        {formatPrice(item.preco)}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-5 rounded-3xl border border-sand bg-sand/40 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-xl text-forest">
              Peça sem sair de casa
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted">
              O cardápio da cafeteria sai para delivery e retirada pelo nosso canal de
              pedidos. Café em grão para todo o Brasil fica na loja online.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <ButtonLink href={contact.delivery} external>
              Pedir delivery
            </ButtonLink>
            <ButtonLink href="/cafes" variant="secondary">
              Café em grão
            </ButtonLink>
          </div>
        </div>
      </Container>
    </>
  );
}
