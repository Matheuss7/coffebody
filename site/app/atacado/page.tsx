import type { Metadata } from "next";
import { FaWhatsapp } from "react-icons/fa6";
import { Container, PageHeader } from "@/components/Sections";
import { atacado } from "@/data/content";
import { siteConfig } from "@/lib/site";
import { whatsappAtacado } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Café especial no atacado para cafeterias e restaurantes | Coffee Body",
  description:
    "Fornecimento de café especial torrado para cafeterias, restaurantes, padarias, hotéis e escritórios em Santa Catarina e no Brasil. Perfil de torra sob medida, entrega programada e treinamento de equipe.",
  alternates: { canonical: `${siteConfig.url}/atacado/` },
};

export default function AtacadoPage() {
  return (
    <>
      <PageHeader eyebrow="Atacado / B2B" title={atacado.title} description={atacado.subtitle} />

      <Container className="py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div className="flex flex-col gap-10">
            <div className="grid gap-6 sm:grid-cols-2">
              {atacado.beneficios.map((beneficio) => (
                <div
                  key={beneficio.titulo}
                  className="flex flex-col gap-3 rounded-3xl border border-sand bg-white/60 p-6"
                >
                  <h2 className="font-display text-lg text-forest">
                    {beneficio.titulo}
                  </h2>
                  <p className="text-sm leading-relaxed text-muted">
                    {beneficio.texto}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="font-display text-2xl text-forest">
                Como funciona na prática
              </h2>
              <ol className="flex flex-col gap-4">
                {[
                  "Conversamos sobre o seu volume, o seu método e o perfil de sabor que o seu público gosta.",
                  "Enviamos amostras dos lotes candidatos para você provar na sua máquina.",
                  "Fechamos volume, frequência e preço por kg. A primeira entrega sai em 3 a 5 dias úteis.",
                  "Treinamos a sua equipe e acompanhamos a extração conforme a safra muda.",
                ].map((passo, indice) => (
                  <li key={passo} className="flex gap-4">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-forest text-sm font-semibold text-bone">
                      {indice + 1}
                    </span>
                    <p className="pt-1 text-sm leading-relaxed text-muted">{passo}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <aside className="flex h-fit flex-col gap-6 rounded-3xl border border-sand bg-sand/40 p-7 lg:sticky lg:top-28">
            <div>
              <h2 className="font-display text-xl text-forest">Condições</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {atacado.condicoes.map((condicao) => (
                  <li key={condicao} className="flex gap-3 text-sm leading-relaxed text-forest">
                    <span aria-hidden className="text-brand">
                      —
                    </span>
                    {condicao}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={whatsappAtacado()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-sm font-semibold text-bone transition-colors hover:bg-brand-dark"
            >
              <FaWhatsapp aria-hidden className="text-lg" />
              Pedir orçamento
            </a>

            <p className="text-xs leading-relaxed text-muted">
              O WhatsApp abre com o formulário de orçamento já preenchido. Responda as
              três linhas e devolvemos uma proposta.
            </p>
          </aside>
        </div>
      </Container>
    </>
  );
}
