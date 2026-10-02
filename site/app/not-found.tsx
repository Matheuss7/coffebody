import { Container } from "@/components/Sections";
import { ButtonLink } from "@/components/Button";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-start gap-6 py-24 sm:py-32">
      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
        Erro 404
      </span>
      <h1 className="font-display text-4xl text-forest sm:text-5xl">
        Essa página saiu do ar como café velho
      </h1>
      <p className="max-w-xl text-base leading-relaxed text-muted">
        O endereço que você abriu não existe mais ou nunca existiu. Volte para o
        catálogo e escolha um lote fresco.
      </p>
      <div className="flex flex-wrap gap-3">
        <ButtonLink href="/cafes">Ver os cafés</ButtonLink>
        <ButtonLink href="/" variant="secondary">
          Voltar ao início
        </ButtonLink>
      </div>
    </Container>
  );
}
