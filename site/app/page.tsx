import Link from "next/link";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import TrustBar from "@/components/TrustBar";
import Reveal from "@/components/Reveal";
import CoffeeCard from "@/components/CoffeeCard";
import { LogoMark } from "@/components/Logo";
import { Container, Section, SectionHeader } from "@/components/Sections";
import { ButtonLink } from "@/components/Button";
import { cafesDestaque } from "@/data/products";
import { cardapioDestaque } from "@/data/menu";
import { cursos } from "@/data/courses";
import { pilares, sobre, ticker } from "@/data/content";
import { planos } from "@/data/subscription";
import { formatPrice } from "@/lib/format";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee itens={ticker} tone="light" />
      <TrustBar />

      <Section id="destaques">
        <Reveal>
          <SectionHeader
            eyebrow="Por que a Coffee Body"
            title="Café torrado por quem serve o café"
            description="Não revendemos café de terceiros. O torrador fica na loja, e quem atende no balcão sabe de onde veio cada grão."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pilares.map((pilar, indice) => (
            <Reveal
              key={pilar.titulo}
              as="article"
              delay={indice * 90}
              className="flex flex-col gap-3 rounded-3xl border border-sand bg-white/60 p-6 transition-colors hover:border-brand/40"
            >
              <h3 className="font-display text-lg text-forest">{pilar.titulo}</h3>
              <p className="text-sm leading-relaxed text-muted">{pilar.texto}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-y border-sand bg-sand/30">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader
              eyebrow="Loja online"
              title="Cafés em destaque"
              description="Microlotes torrados em pequena escala e despachados em até 48 horas depois da torra."
            />
            <ButtonLink href="/cafes" variant="secondary">
              Ver catálogo completo
            </ButtonLink>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cafesDestaque.map((cafe, indice) => (
            <Reveal key={cafe.slug} delay={indice * 110}>
              <CoffeeCard cafe={cafe} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Bloco editorial: texto de um lado, prova de torra do outro. */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal className="flex flex-col gap-6">
            <SectionHeader
              eyebrow="Nossa torrefação"
              title={sobre.title}
              description={sobre.paragrafos[0]}
            />
            <dl className="grid grid-cols-3 gap-4 border-t border-sand pt-6">
              {sobre.numeros.map((numero) => (
                <div key={numero.label}>
                  <dt className="text-[0.7rem] uppercase tracking-[0.16em] text-muted">
                    {numero.label}
                  </dt>
                  <dd className="mt-1 font-display text-2xl text-forest">
                    {numero.valor}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-wrap gap-3 pt-1">
              <ButtonLink href="/sobre">Nossa história</ButtonLink>
              <ButtonLink href="/como-preparar" variant="secondary">
                Guias de preparo
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal
            delay={120}
            className="grain relative flex aspect-4/3 items-center justify-center overflow-hidden rounded-3xl bg-forest"
          >
            {/* TODO: trocar pelo retrato do torrador em ação. */}
            <LogoMark variante="branco" className="h-3/5 w-auto opacity-25" />
            <span className="absolute bottom-6 left-6 text-xs uppercase tracking-[0.2em] text-bone/60">
              Foto da torrefação em breve
            </span>
          </Reveal>
        </div>
      </Section>

      <Section className="border-y border-sand bg-sand/30">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal className="flex flex-col gap-6">
            <SectionHeader
              eyebrow="Na cafeteria"
              title="O pão de queijo que todo mundo fala"
              description="Massa feita na casa, assado na hora e servido com o café que acabou de sair do torrador. Venha sentar com a gente em São José."
            />
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/cardapio">Ver cardápio</ButtonLink>
              <ButtonLink href="/visite" variant="secondary">
                Como chegar
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <ul className="flex flex-col divide-y divide-sand rounded-3xl border border-sand bg-white/70">
              {cardapioDestaque.map((item) => (
                <li key={item.nome} className="flex items-start justify-between gap-4 p-5">
                  <div>
                    <h3 className="font-display text-base text-forest">{item.nome}</h3>
                    {item.descricao && (
                      <p className="mt-1 text-sm text-muted">{item.descricao}</p>
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
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
          <Reveal className="flex flex-col gap-6">
            <SectionHeader
              eyebrow="Clube do café"
              title="Café fresco chegando sem você precisar lembrar"
              description="Você escolhe o peso, a frequência e a moagem. A gente torra na semana da entrega e manda um microlote diferente a cada remessa."
            />
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/clube">Montar minha assinatura</ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <ul className="grid gap-3 sm:grid-cols-3">
              {planos.map((plano) => (
                <li
                  key={plano.peso}
                  className={`flex flex-col gap-1 rounded-2xl border p-5 ${
                    plano.recomendado
                      ? "border-brand bg-brand/5"
                      : "border-sand bg-white/60"
                  }`}
                >
                  <span className="font-display text-xl text-forest">{plano.peso}</span>
                  <span className="text-sm font-semibold text-brand-dark">
                    {formatPrice(plano.preco)}
                  </span>
                  <span className="text-xs leading-relaxed text-muted">
                    por entrega
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-muted">
              Sem fidelidade. Pausa ou cancela quando quiser, só avisando no WhatsApp.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section className="grain border-y border-forest/20 bg-forest text-bone">
        <Reveal className="flex max-w-3xl flex-col gap-5">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-light">
            Atacado
          </span>
          <h2 className="font-display text-3xl leading-tight sm:text-4xl">
            Seu café é o cartão de visita do seu negócio
          </h2>
          <p className="text-base leading-relaxed text-bone/75">
            Fornecemos café torrado com perfil desenhado para a sua máquina, entrega
            programada e treinamento da sua equipe. Cafeterias, restaurantes, padarias,
            hotéis e escritórios.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <ButtonLink href="/atacado" variant="light">
              Condições de atacado
            </ButtonLink>
          </div>
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader
              eyebrow="Cursos"
              title="Aprenda dentro da torrefação"
              description="Turmas pequenas, equipamento profissional e prática do começo ao fim."
            />
            <ButtonLink href="/cursos" variant="secondary">
              Ver todos os cursos
            </ButtonLink>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cursos.slice(0, 3).map((curso, indice) => (
            <Reveal key={curso.slug} delay={indice * 110}>
              <Link
                href="/cursos"
                className="group flex h-full flex-col gap-3 rounded-3xl border border-sand bg-white/60 p-6 transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg hover:shadow-forest/5"
              >
  <span className="text-xs font-semibold uppercase tracking-wider text-brand">
                  Em grupo ou individual
                </span>
                <h3 className="font-display text-lg text-forest">{curso.nome}</h3>
                <p className="text-sm leading-relaxed text-muted">{curso.resumo}</p>
                <span className="mt-auto flex items-center justify-between pt-3 font-display text-base text-forest">
                  {formatPrice(curso.precoGrupo)}
                  <span
                    aria-hidden
                    className="text-sm text-brand transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Marquee itens={ticker} />

      <Section className="py-14 sm:py-16">
        <Container className="px-0">
          <Reveal className="flex flex-col items-start gap-5 rounded-3xl border border-sand bg-sand/40 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div>
              <h2 className="font-display text-2xl text-forest">
                Não sabe qual café escolher?
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                Conta como você prepara em casa e qual sabor você gosta. A gente indica o
                lote certo pelo WhatsApp.
              </p>
            </div>
            <ButtonLink href="/cafes">Ver os cafés</ButtonLink>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
