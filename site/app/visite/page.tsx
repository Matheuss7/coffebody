import type { Metadata } from "next";
import StoreInfo from "@/components/StoreInfo";
import { Container, PageHeader } from "@/components/Sections";
import { ButtonLink } from "@/components/Button";
import { store, storeFullAddress, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Visite a Coffee Body em São José — SC | Endereço e horário",
  description: `Coffee Body — cafeteria e torrefação de cafés especiais. ${storeFullAddress}. Aberto de segunda a sábado, das 9h às 18h.`,
  alternates: { canonical: `${siteConfig.url}/visite/` },
};

export default function VisitePage() {
  return (
    <>
      <PageHeader
        eyebrow="Visite"
        title="Venha tomar um café com a gente"
        description="Estamos em São José, na Grande Florianópolis. Café extraído na hora, pão de queijo saindo do forno e o torrador trabalhando ao lado."
      />

      <Container className="py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-8">
            <StoreInfo />
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={store.mapsUrl} external>
                Abrir rota no Google Maps
              </ButtonLink>
              <ButtonLink href="/cardapio" variant="secondary">
                Ver cardápio
              </ButtonLink>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-sand">
            <iframe
              title="Mapa da Coffee Body em São José, SC"
              src={`https://www.google.com/maps?q=${encodeURIComponent(storeFullAddress)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-80 w-full border-0 lg:h-full lg:min-h-96"
            />
          </div>
        </div>
      </Container>
    </>
  );
}
