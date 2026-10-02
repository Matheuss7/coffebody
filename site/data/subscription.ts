// Clube de assinatura. Nesta fase o site só capta pelo WhatsApp — não há
// cobrança recorrente automática.
// TODO: validar preços, frequências e benefícios com a Coffee Body.

import type { Moagem, Peso } from "@/data/products";

export const FREQUENCIAS = {
  quinzenal: "A cada 15 dias",
  mensal: "Mensal",
  bimestral: "A cada 2 meses",
} as const;
export type Frequencia = keyof typeof FREQUENCIAS;

export type PlanoClube = {
  peso: Peso;
  /** Centavos, por entrega. */
  preco: number;
  descricao: string;
  recomendado?: boolean;
};

export const planos: PlanoClube[] = [
  {
    peso: "250g",
    preco: 4490,
    descricao: "Para quem toma uma xícara por dia.",
  },
  {
    peso: "500g",
    preco: 7990,
    descricao: "O mais pedido. Rende o mês de um casal.",
    recomendado: true,
  },
  {
    peso: "1kg",
    preco: 14900,
    descricao: "Para casa cheia ou escritório pequeno.",
  },
];

export const moagensClube: Moagem[] = [
  "graos",
  "filtro",
  "espresso",
  "prensa",
  "aeropress",
];

export const beneficiosClube = [
  {
    icone: "fogo" as const,
    titulo: "Torrado para a sua entrega",
    texto:
      "Cada remessa é torrada na semana em que sai. Você recebe café com data de torra recente, não de prateleira.",
  },
  {
    icone: "estrela" as const,
    titulo: "Lote diferente toda vez",
    texto:
      "Escolhemos o microlote da vez. Você prova origens, processos e torras sem precisar decidir nada.",
  },
  {
    icone: "moagem" as const,
    titulo: "Você escolhe a moagem",
    texto:
      "Grãos inteiros ou moído no ponto do seu método. Dá para mudar a qualquer momento.",
  },
  {
    icone: "desconto" as const,
    titulo: "10% em tudo",
    texto:
      "Assinante paga menos em qualquer café da loja e no balcão da cafeteria.",
  },
  {
    icone: "entrega" as const,
    titulo: "Entrega ou retirada",
    texto:
      "Enviamos para todo o Brasil ou você retira na loja em São José, sem pagar frete.",
  },
  {
    icone: "pausa" as const,
    titulo: "Pausa quando quiser",
    texto:
      "Viajou, sobrou café, apertou o orçamento? Pausa ou cancela sem multa e sem burocracia.",
  },
];

export const faqClube = [
  {
    pergunta: "Como funciona o clube?",
    resposta:
      "Você escolhe o peso, a frequência e a moagem. A gente confirma tudo pelo WhatsApp, envia o link de pagamento da primeira entrega e, a partir daí, repete na data combinada.",
  },
  {
    pergunta: "Qual café eu vou receber?",
    resposta:
      "O microlote que estiver no auge naquele mês. Avisamos antes do envio qual é o café, com origem, processo e notas sensoriais.",
  },
  {
    pergunta: "Posso pausar ou cancelar?",
    resposta:
      "Pode, a qualquer momento, só avisando pelo WhatsApp antes da próxima remessa. Não cobramos multa nem taxa de cancelamento.",
  },
  {
    pergunta: "Como pago a assinatura?",
    resposta:
      "Por PIX ou cartão, com link de pagamento enviado a cada ciclo. Ainda não temos cobrança automática no site — a renovação é combinada com você.",
  },
  {
    pergunta: "Dá para presentear alguém?",
    resposta:
      "Dá. Você contrata um número fechado de entregas e a gente envia no endereço de quem vai receber, com um bilhete seu na caixa.",
  },
  {
    pergunta: "E se eu não gostar do café do mês?",
    resposta:
      "Fala com a gente. Ajustamos o perfil da próxima entrega para o seu paladar — mais doce, mais frutado, mais encorpado.",
  },
];
