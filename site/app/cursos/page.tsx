import type { Metadata } from "next";
import { FaWhatsapp } from "react-icons/fa6";
import { HiOutlineCalendarDays, HiOutlineUser, HiOutlineUserGroup } from "react-icons/hi2";
import Reveal from "@/components/Reveal";
import { Container, PageHeader } from "@/components/Sections";
import { ButtonLink } from "@/components/Button";
import { cursos, formatoCursos } from "@/data/courses";
import { formatPrice } from "@/lib/format";
import { contact, siteConfig } from "@/lib/site";
import { whatsappCurso } from "@/lib/whatsapp";
import { courseSchema, jsonLdProps } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Cursos de café e barista em São José — SC | Coffee Body",
  description:
    "Cursos de café especial, métodos de preparo, vaporização de leite, espresso e barista na torrefação da Coffee Body, em São José. Em grupo ou individual.",
  alternates: { canonical: `${siteConfig.url}/cursos/` },
};

export default function CursosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Escola"
        title="Cursos na torrefação"
        description="Cinco formações, do primeiro contato com café especial à rotina completa de barista. Todas acontecem na nossa loja em São José."
      />

      <Container className="py-14 sm:py-20">
        <Reveal className="mb-12 grid gap-5 sm:grid-cols-2">
          <div className="flex gap-4 rounded-3xl border border-sand bg-white/60 p-6">
            <HiOutlineUserGroup aria-hidden className="mt-0.5 shrink-0 text-2xl text-brand" />
            <div>
              <h2 className="font-display text-base text-forest">Em grupo</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {formatoCursos.grupo}
              </p>
            </div>
          </div>
          <div className="flex gap-4 rounded-3xl border border-sand bg-white/60 p-6">
            <HiOutlineUser aria-hidden className="mt-0.5 shrink-0 text-2xl text-brand" />
            <div>
              <h2 className="font-display text-base text-forest">Individual</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {formatoCursos.individual}
              </p>
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col gap-6">
          {cursos.map((curso, indice) => (
            <Reveal
              key={curso.slug}
              as="article"
              delay={indice * 70}
              className="grid gap-8 rounded-3xl border border-sand bg-white/60 p-7 sm:p-9 lg:grid-cols-[1.5fr_1fr]"
            >
              <div className="flex flex-col gap-4">
                <h2 className="font-display text-2xl text-forest sm:text-3xl">
                  {curso.nome}
                </h2>
                <p className="text-base leading-relaxed text-muted">{curso.resumo}</p>

                {curso.topicos && curso.topicos.length > 0 && (
                  <ul className="mt-1 flex flex-col gap-2">
                    {curso.topicos.map((topico) => (
                      <li
                        key={topico}
                        className="flex gap-3 text-sm leading-relaxed text-forest"
                      >
                        <span aria-hidden className="text-brand">
                          —
                        </span>
                        {topico}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-xs uppercase tracking-[0.14em] text-muted">
                  {curso.maxGrupo && <span>Turma de até {curso.maxGrupo} pessoas</span>}
                  {curso.parcelamento && <span>{curso.parcelamento}</span>}
                  {curso.duracaoHoras && <span>{curso.duracaoHoras}h</span>}
                </div>
              </div>

              <div className="flex flex-col gap-5 rounded-2xl border border-sand bg-bone p-6">
                <div className="flex flex-col gap-4">
                  <div>
                    <span className="block text-xs uppercase tracking-[0.14em] text-muted">
                      Em grupo
                    </span>
                    <span className="font-display text-3xl text-forest">
                      {formatPrice(curso.precoGrupo)}
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-[0.14em] text-muted">
                      Individual
                    </span>
                    <span className="font-display text-xl text-forest">
                      {formatPrice(curso.precoIndividual)}
                    </span>
                  </div>
                </div>

                <div className="mt-auto flex flex-col gap-2">
                  <a
                    href={contact.formularioCursos}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-bone transition-colors hover:bg-brand-dark"
                  >
                    <HiOutlineCalendarDays aria-hidden className="text-base" />
                    Entrar na agenda
                  </a>
                  <a
                    href={whatsappCurso(curso)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-forest/25 px-6 py-3 text-sm font-semibold text-forest transition-colors hover:bg-sand"
                  >
                    <FaWhatsapp aria-hidden className="text-base" />
                    Tirar dúvida
                  </a>
                </div>
              </div>

              <script {...jsonLdProps(courseSchema(curso))} />
            </Reveal>
          ))}
        </div>

        <Reveal
          delay={120}
          className="mt-14 flex flex-col gap-5 rounded-3xl border border-sand bg-sand/40 p-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h2 className="font-display text-xl text-forest">
              Como funciona a inscrição
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
              Preencha a agenda com o curso que você quer e a modalidade. Avisamos você
              quando a próxima turma fechar data — ou combinamos a aula individual.
            </p>
          </div>
          <ButtonLink href={contact.formularioCursos} external>
            Abrir a agenda
          </ButtonLink>
        </Reveal>
      </Container>
    </>
  );
}
