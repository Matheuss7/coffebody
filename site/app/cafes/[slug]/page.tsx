import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import OrderBox from "@/components/OrderBox";
import CoffeeCard from "@/components/CoffeeCard";
import { ProductImage } from "@/components/CoffeeCard";
import { Container, SectionHeader } from "@/components/Sections";
import { cafes, getCafe, PROCESSOS, TORRAS } from "@/data/products";
import { siteConfig } from "@/lib/site";
import { jsonLdProps, productSchema } from "@/lib/schema";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return cafes.map((cafe) => ({ slug: cafe.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cafe = getCafe(slug);

  if (!cafe) return { title: "Café não encontrado | Coffee Body" };

  return {
    title: `${cafe.nome} | Coffee Body`,
    description: `${cafe.resumo} ${cafe.origem.regiao}. ${TORRAS[cafe.torra]}, ${PROCESSOS[cafe.processo]}. Notas de ${cafe.notas.join(", ")}.`,
    alternates: { canonical: `${siteConfig.url}/cafes/${cafe.slug}/` },
    openGraph: {
      title: `${cafe.nome} — Coffee Body`,
      description: cafe.resumo,
      url: `${siteConfig.url}/cafes/${cafe.slug}/`,
    },
  };
}

export default async function CafePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const cafe = getCafe(slug);

  if (!cafe) notFound();

  const fichaTecnica = [
    { label: "Origem", valor: `${cafe.origem.regiao}, ${cafe.origem.pais}` },
    cafe.origem.fazenda && { label: "Fazenda", valor: cafe.origem.fazenda },
    cafe.produtor && { label: "Produtor", valor: cafe.produtor },
    cafe.origem.altitude && { label: "Altitude", valor: cafe.origem.altitude },
    { label: "Variedade", valor: cafe.variedade.join(", ") },
    { label: "Processo", valor: PROCESSOS[cafe.processo] },
    { label: "Torra", valor: TORRAS[cafe.torra] },
    cafe.scaScore && { label: "Pontuação SCA", valor: `${cafe.scaScore} pontos` },
    cafe.safra && { label: "Safra", valor: cafe.safra },
  ].filter((item): item is { label: string; valor: string } => Boolean(item));

  const relacionados = cafes
    .filter((outro) => outro.slug !== cafe.slug && outro.disponivel)
    .slice(0, 3);

  return (
    <>
      <Container className="py-10 sm:py-14">
        <nav aria-label="Você está em" className="mb-8 text-sm text-muted">
          <Link href="/cafes" className="hover:text-brand">
            Cafés
          </Link>
          <span aria-hidden className="mx-2">
            /
          </span>
          <span className="text-forest">{cafe.nome}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6">
            <ProductImage
              cafe={cafe}
              priority
              className="aspect-square w-full rounded-3xl border border-sand"
            />

            <div className="rounded-3xl border border-sand bg-white/60 p-6">
              <h2 className="font-display text-lg text-forest">Ficha técnica</h2>
              <dl className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {fichaTecnica.map((item) => (
                  <div key={item.label}>
                    <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                      {item.label}
                    </dt>
                    <dd className="mt-0.5 text-sm text-forest">{item.valor}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand">
                <span>{TORRAS[cafe.torra]}</span>
                <span aria-hidden className="text-sand">
                  ·
                </span>
                <span>{PROCESSOS[cafe.processo]}</span>
              </div>
              <h1 className="font-display text-4xl leading-tight text-forest sm:text-5xl">
                {cafe.nome}
              </h1>
              <p className="text-lg leading-relaxed text-muted">{cafe.resumo}</p>

              <ul className="flex flex-wrap gap-2 pt-1">
                {cafe.notas.map((nota) => (
                  <li
                    key={nota}
                    className="rounded-full border border-sand bg-white/60 px-3 py-1.5 text-xs text-muted"
                  >
                    {nota}
                  </li>
                ))}
              </ul>
            </div>

            <OrderBox cafe={cafe} />

            <div className="flex flex-col gap-4">
              <h2 className="font-display text-xl text-forest">Sobre esse lote</h2>
              <p className="text-base leading-relaxed text-muted">{cafe.descricao}</p>
            </div>
          </div>
        </div>
      </Container>

      {relacionados.length > 0 && (
        <section className="border-t border-sand bg-sand/30 py-16">
          <Container>
            <SectionHeader eyebrow="Continue explorando" title="Outros cafés" />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relacionados.map((outro) => (
                <CoffeeCard key={outro.slug} cafe={outro} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <script {...jsonLdProps(productSchema(cafe))} />
    </>
  );
}
