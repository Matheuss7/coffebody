import type { Metadata } from "next";
import {
  HiOutlineArrowPath,
  HiOutlineFire,
  HiOutlinePauseCircle,
  HiOutlineSparkles,
  HiOutlineTag,
  HiOutlineTruck,
} from "react-icons/hi2";
import SubscriptionBox from "@/components/SubscriptionBox";
import Reveal from "@/components/Reveal";
import { Container, PageHeader, Section, SectionHeader } from "@/components/Sections";
import { beneficiosClube, faqClube } from "@/data/subscription";
import { siteConfig } from "@/lib/site";
import { jsonLdProps } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Clube de assinatura de café especial | Coffee Body",
  description:
    "Receba microlotes da Coffee Body em casa. Você escolhe o peso, a frequência e a moagem; a gente torra na semana da entrega. Sem fidelidade, pausa quando quiser.",
  alternates: { canonical: `${siteConfig.url}/clube/` },
};

const icones = {
  fogo: HiOutlineFire,
  estrela: HiOutlineSparkles,
  moagem: HiOutlineArrowPath,
  desconto: HiOutlineTag,
  entrega: HiOutlineTruck,
  pausa: HiOutlinePauseCircle,
} as const;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqClube.map((item) => ({
    "@type": "Question",
    name: item.pergunta,
    acceptedAnswer: { "@type": "Answer", text: item.resposta },
  })),
};

export default function ClubePage() {
  return (
    <>
      <PageHeader
        eyebrow="Clube do café"
        title="Café fresco chegando sem você precisar lembrar"
        description="Você monta o plano, a gente torra na semana da entrega. Microlote diferente a cada remessa, moagem do seu jeito e 10% de desconto em tudo."
      />

      <Container className="py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <Reveal className="flex flex-col gap-8">
            <SectionHeader
              eyebrow="Como funciona"
              title="Três escolhas e pronto"
              description="Sem cadastro, sem cartão guardado no site. A primeira entrega é combinada pelo WhatsApp e a renovação segue a data que você escolher."
            />

            <ol className="flex flex-col gap-5">
              {[
                "Escolha quanto café, com que frequência e em que moagem.",
                "A gente confirma endereço, frete e data da primeira entrega.",
                "Você paga por PIX ou cartão e o café sai torrado na mesma semana.",
                "Pausa, troca ou cancela quando quiser, só avisando.",
              ].map((passo, indice) => (
                <li key={passo} className="flex gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-forest text-sm font-semibold text-bone">
                    {indice + 1}
                  </span>
                  <p className="pt-1 text-sm leading-relaxed text-muted">{passo}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={120} className="lg:sticky lg:top-28 lg:h-fit">
            <SubscriptionBox />
          </Reveal>
        </div>
      </Container>

      <Section className="border-y border-sand bg-sand/30">
        <Reveal>
          <SectionHeader
            eyebrow="O que vem junto"
            title="Assinar sai melhor que comprar avulso"
          />
        </Reveal>

        <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {beneficiosClube.map((beneficio, indice) => {
            const Icone = icones[beneficio.icone];
            return (
              <Reveal
                key={beneficio.titulo}
                as="article"
                delay={indice * 80}
                className="flex gap-4"
              >
                <Icone aria-hidden className="mt-0.5 shrink-0 text-2xl text-brand" />
                <div>
                  <h3 className="font-display text-base text-forest">
                    {beneficio.titulo}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {beneficio.texto}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section>
        <Reveal>
          <SectionHeader eyebrow="Dúvidas" title="Antes de assinar" />
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 flex max-w-3xl flex-col divide-y divide-sand border-y border-sand">
            {faqClube.map((item) => (
              <details key={item.pergunta} className="group py-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-forest marker:content-none">
                  {item.pergunta}
                  <span
                    aria-hidden
                    className="shrink-0 text-xl text-brand transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                  {item.resposta}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </Section>

      <script {...jsonLdProps(faqSchema)} />
    </>
  );
}
