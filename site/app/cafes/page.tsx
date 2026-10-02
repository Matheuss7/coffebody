import type { Metadata } from "next";
import CoffeeGrid from "@/components/CoffeeGrid";
import { Container, PageHeader } from "@/components/Sections";
import { cafes } from "@/data/products";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cafés especiais em grão | Coffee Body",
  description:
    "Microlotes de café especial torrados na nossa torrefação em São José, SC. Grãos inteiros ou moídos no ponto do seu método, com entrega para todo o Brasil.",
  alternates: { canonical: `${siteConfig.url}/cafes/` },
};

export default function CafesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Loja online"
        title="Nossos cafés"
        description="Cada lote é torrado em pequena escala e despachado em até 48 horas. A data de torra vem impressa no saco."
      />
      <Container className="py-14 sm:py-20">
        <CoffeeGrid cafes={cafes} />
      </Container>
    </>
  );
}
