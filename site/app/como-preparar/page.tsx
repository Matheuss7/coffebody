import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/Sections";
import { ButtonLink } from "@/components/Button";
import { guias } from "@/data/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Como preparar café em casa: V60, prensa, espresso e AeroPress | Coffee Body",
  description:
    "Receitas base para preparar café especial em casa: Hario V60, prensa francesa, espresso e AeroPress. Proporção, moagem, temperatura e tempo de extração.",
  alternates: { canonical: `${siteConfig.url}/como-preparar/` },
};

export default function ComoPrepararPage() {
  return (
    <>
      <PageHeader
        eyebrow="Guias"
        title="Como preparar em casa"
        description="Receitas base que funcionam. Use como ponto de partida e ajuste ao seu paladar: se estiver amargo, moa mais grosso; se estiver ácido e aguado, moa mais fino."
      />

      <Container className="py-14 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-2">
          {guias.map((guia) => (
            <article
              key={guia.slug}
              id={guia.slug}
              className="flex flex-col gap-5 rounded-3xl border border-sand bg-white/60 p-7"
            >
              <div className="flex flex-col gap-2">
                <h2 className="font-display text-2xl text-forest">{guia.nome}</h2>
                <p className="text-sm leading-relaxed text-muted">{guia.resumo}</p>
              </div>
              <ol className="flex flex-col gap-2 border-t border-sand pt-5">
                {guia.receita.map((passo) => (
                  <li key={passo} className="flex gap-3 text-sm leading-relaxed text-forest">
                    <span aria-hidden className="text-brand">
                      —
                    </span>
                    {passo}
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-5 rounded-3xl border border-sand bg-sand/40 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-xl text-forest">
              Quer aprender com a gente ao vivo?
            </h2>
            <p className="mt-2 text-sm text-muted">
              Nossos cursos de métodos e barista acontecem dentro da torrefação, com
              prática em todos os equipamentos.
            </p>
          </div>
          <ButtonLink href="/cursos">Ver cursos</ButtonLink>
        </div>
      </Container>
    </>
  );
}
