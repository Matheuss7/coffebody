import type { Metadata } from "next";
import { FaWhatsapp } from "react-icons/fa6";
import { Container, PageHeader } from "@/components/Sections";
import { faq } from "@/data/content";
import { siteConfig } from "@/lib/site";
import { whatsappGeral } from "@/lib/whatsapp";
import { jsonLdProps } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Perguntas frequentes | Coffee Body",
  description:
    "Frete, prazo de entrega, pagamento, moagem, validade do café e atacado — as dúvidas mais comuns sobre comprar café especial na Coffee Body.",
  alternates: { canonical: `${siteConfig.url}/faq/` },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.pergunta,
    acceptedAnswer: { "@type": "Answer", text: item.resposta },
  })),
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="Ajuda"
        title="Perguntas frequentes"
        description="Se a sua dúvida não estiver aqui, chama no WhatsApp — respondemos no horário da loja."
      />

      <Container className="py-14 sm:py-20">
        <div className="flex max-w-3xl flex-col divide-y divide-sand border-y border-sand">
          {faq.map((item) => (
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

        <a
          href={whatsappGeral("Olá! Tenho uma dúvida sobre os cafés da Coffee Body.")}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-bone transition-colors hover:bg-brand-dark"
        >
          <FaWhatsapp aria-hidden className="text-base" />
          Falar com a gente
        </a>
      </Container>

      <script {...jsonLdProps(faqSchema)} />
    </>
  );
}
