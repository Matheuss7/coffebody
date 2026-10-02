import { contact } from "@/lib/site";
import { formatPrice } from "@/lib/format";
import { MOAGENS, type Cafe, type Moagem, type Peso } from "@/data/products";
import type { Curso } from "@/data/courses";

function link(message: string) {
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Link genérico, usado no header e no footer. */
export function whatsappGeral(message = "Olá! Vim pelo site da Coffee Body.") {
  return link(message);
}

export function whatsappPedido(input: {
  cafe: Cafe;
  peso: Peso;
  moagem: Moagem;
  quantidade: number;
}) {
  const { cafe, peso, moagem, quantidade } = input;
  const unitario = cafe.precos[peso];
  const total = typeof unitario === "number" ? unitario * quantidade : null;

  const linhas = [
    "Olá! Quero pedir:",
    "",
    `• ${cafe.nome} — ${peso} — ${MOAGENS[moagem]} — ${quantidade}un`,
  ];

  if (total !== null) {
    linhas.push(`Total dos cafés: ${formatPrice(total)} (sem frete)`);
  }

  linhas.push("", "Meu CEP: ");

  return link(linhas.join("\n"));
}

export function whatsappAssinatura(input: {
  peso: Peso;
  frequencia: string;
  moagem: Moagem;
  preco: number;
}) {
  const { peso, frequencia, moagem, preco } = input;

  return link(
    [
      "Olá! Quero assinar o clube de café:",
      "",
      `• ${peso} — ${frequencia} — ${MOAGENS[moagem]}`,
      `${formatPrice(preco)} por entrega (sem frete)`,
      "",
      "Entrega ou retirada na loja: ",
      "Meu CEP: ",
    ].join("\n"),
  );
}

export function whatsappAtacado() {
  return link(
    [
      "Olá! Quero orçamento de atacado.",
      "",
      "Estabelecimento: ",
      "Cidade: ",
      "Consumo mensal estimado (kg): ",
      "Método que usam (espresso / filtro / os dois): ",
    ].join("\n"),
  );
}

export function whatsappCurso(curso: Curso, modalidade?: "grupo" | "individual") {
  const preco =
    modalidade === "individual" ? curso.precoIndividual : curso.precoGrupo;

  const linhas = [
    "Olá! Tenho interesse no curso:",
    "",
    `• ${curso.nome}`,
    `${modalidade === "individual" ? "Individual" : "Em grupo"} — ${formatPrice(preco)}`,
    "",
    "Minha dúvida: ",
  ];

  return link(linhas.join("\n"));
}

export function whatsappReserva() {
  return link(
    ["Olá! Quero falar sobre a cafeteria.", "", "Assunto: "].join("\n"),
  );
}
