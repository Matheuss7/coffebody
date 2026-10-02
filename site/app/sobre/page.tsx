import type { Metadata } from "next";
import { Container, PageHeader, Prose } from "@/components/Sections";
import { ButtonLink } from "@/components/Button";
import { sobre } from "@/data/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre a Coffee Body | Torrefação de cafés especiais em São José",
  description:
    "A Coffee Body é uma torrefação com cafeteria em São José, SC. Compramos microlotes de produtores brasileiros e torramos na própria loja.",
  alternates: { canonical: `${siteConfig.url}/sobre/` },
};

export default function SobrePage() {
  return (
    <>
      <PageHeader eyebrow="Sobre" title={sobre.title} />

      <Container className="py-14 sm:py-20">
        <Prose>
          {sobre.paragrafos.map((paragrafo) => (
            <p key={paragrafo}>{paragrafo}</p>
          ))}
        </Prose>

        <dl className="mt-14 grid gap-6 sm:grid-cols-3">
          {sobre.numeros.map((numero) => (
            <div
              key={numero.label}
              className="rounded-3xl border border-sand bg-white/60 p-7"
            >
              <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                {numero.label}
              </dt>
              <dd className="mt-2 font-display text-3xl text-forest">
                {numero.valor}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-14 flex flex-wrap gap-3">
          <ButtonLink href="/cafes">Conhecer os cafés</ButtonLink>
          <ButtonLink href="/visite" variant="secondary">
            Visitar a cafeteria
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
