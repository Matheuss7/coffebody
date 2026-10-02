// Textos editoriais do site. TODO: revisar com a Coffee Body — a voz da marca
// foi inferida do Instagram (@coffeebody.sc), não validada.

export const hero = {
  eyebrow: "São José · Santa Catarina",
  title: "Do grão à xícara, com história pra contar",
  subtitle:
    "Cafeteria e torrefação de cafés especiais. Torramos aqui, servimos aqui e mandamos para a sua casa.",
  ctaPrimary: { label: "Ver nossos cafés", href: "/cafes" },
  ctaSecondary: { label: "Visite a cafeteria", href: "/visite" },
};

/** Faixa em movimento abaixo do hero. Frases curtas, sem ponto final. */
export const ticker = [
  "Torrado na própria loja",
  "Despacho em até 48h depois da torra",
  "Café especial acima de 84 pontos",
  "Retirada na loja em São José · SC",
  "Entrega para todo o Brasil",
  "Pão de queijo assado na hora",
] as const;

// TODO: confirmar as condições reais (valor do frete grátis, parcelamento do gateway).
export const confianca = [
  {
    icone: "frete" as const,
    titulo: "Frete grátis acima de R$ 150",
    texto: "Para todo o Brasil, calculado no atendimento pelo seu CEP.",
  },
  {
    icone: "parcelamento" as const,
    titulo: "Até 3x sem juros",
    texto: "No cartão, ou à vista no PIX com link de pagamento seguro.",
  },
  {
    icone: "torra" as const,
    titulo: "Torra fresca",
    texto: "A data de torra vem impressa no saco. Nada de café parado.",
  },
  {
    icone: "retirada" as const,
    titulo: "Retirada na loja",
    texto: "Peça pelo WhatsApp e busque em São José, sem pagar frete.",
  },
];

export const pilares = [
  {
    titulo: "Torra própria",
    texto:
      "Nosso torrador fica na loja. Cada lote é torrado em pequena escala, com perfil desenhado para o café e não para a máquina.",
  },
  {
    titulo: "Café com origem",
    texto:
      "Compramos de produtor com nome e endereço. Você sabe de onde veio o grão, quem plantou e em que altitude.",
  },
  {
    titulo: "Fresco de verdade",
    texto:
      "A data de torra está no saco. Despachamos em até 48 horas depois de torrar — frescor não é slogan, é logística.",
  },
  {
    titulo: "O pão de queijo",
    texto:
      "Assado na hora, massa feita na casa. É o motivo pelo qual metade dos nossos clientes volta na semana seguinte.",
  },
];

export const sobre = {
  title: "Uma torrefação com cafeteria na frente",
  paragrafos: [
    "A Coffee Body nasceu da vontade de encurtar a distância entre quem planta e quem bebe. Em vez de comprar café torrado de terceiros, trouxemos o torrador para dentro da loja — e com ele a responsabilidade de acertar cada lote.",
    "Trabalhamos com microlotes de produtores brasileiros, comprados direto ou por cooperativas que pagam preço justo pela qualidade. Cada café que entra passa por cupping antes de ir para o balcão.",
    "No salão, a ideia é simples: café bem extraído, pão de queijo saindo do forno e tempo para conversar sobre o que está na xícara. Quem quiser ir mais fundo, oferecemos cursos na própria torrefação.",
  ],
  // TODO: substituir pelos números reais.
  numeros: [
    { valor: "2019", label: "Ano de fundação" },
    { valor: "+30", label: "Microlotes torrados por ano" },
    { valor: "100%", label: "Café torrado na casa" },
  ],
};

export const atacado = {
  title: "Café especial para o seu negócio",
  subtitle:
    "Fornecemos café torrado para cafeterias, restaurantes, padarias, hotéis e escritórios em Santa Catarina e no resto do Brasil.",
  beneficios: [
    {
      titulo: "Perfil sob medida",
      texto:
        "Desenhamos o perfil de torra para o seu método e a sua máquina, não um café genérico de prateleira.",
    },
    {
      titulo: "Entrega programada",
      texto:
        "Volume e frequência definidos por contrato. Você nunca fica sem café e nunca estoca café velho.",
    },
    {
      titulo: "Treinamento da equipe",
      texto:
        "Regulagem de moedor, extração e vaporização de leite com o seu time, no seu equipamento.",
    },
    {
      titulo: "Suporte contínuo",
      texto:
        "Acompanhamos a qualidade da extração e ajustamos moagem e perfil conforme a safra muda.",
    },
  ],
  // TODO: confirmar condições comerciais reais.
  condicoes: [
    "Pedido mínimo: 5 kg por entrega",
    "Faixa de preço por kg conforme volume e lote escolhido",
    "Prazo de entrega: 3 a 5 dias úteis após confirmação",
    "Grande Florianópolis: entrega própria sem custo acima do mínimo",
  ],
};

export const guias = [
  {
    slug: "v60",
    nome: "Hario V60",
    resumo: "Café limpo, aromático, de corpo leve. O método que mais revela o grão.",
    receita: [
      "Proporção: 15 g de café para 250 ml de água",
      "Moagem: média, textura de areia grossa",
      "Água a 93 °C",
      "Pré-infusão: 50 ml e espere 30 s",
      "Despeje o resto em círculos, em 3 etapas",
      "Tempo total: 2min30 a 3min",
    ],
  },
  {
    slug: "prensa-francesa",
    nome: "Prensa francesa",
    resumo: "Corpo alto e textura densa. Perdoa imprecisão — bom para começar.",
    receita: [
      "Proporção: 30 g de café para 500 ml de água",
      "Moagem: grossa, textura de sal grosso",
      "Água a 94 °C",
      "Mexa uma vez e tampe sem pressionar",
      "Espere 4 min e pressione devagar",
      "Sirva imediatamente — não deixe em contato com o pó",
    ],
  },
  {
    slug: "espresso",
    nome: "Espresso",
    resumo: "Concentrado, doce e com crema. Base de cappuccino e latte.",
    receita: [
      "Dose: 18 g no cesto duplo",
      "Rendimento: 36 g de bebida (proporção 1:2)",
      "Tempo: 25 a 30 s de extração",
      "Água a 93 °C, pressão de 9 bar",
      "Moagem: fina — ajuste até cair no tempo certo",
      "Distribua e compacte nivelado antes de extrair",
    ],
  },
  {
    slug: "aeropress",
    nome: "AeroPress",
    resumo: "Versátil e viajante. Entre o filtro e o espresso.",
    receita: [
      "Proporção: 15 g de café para 220 ml de água",
      "Moagem: média-fina",
      "Água a 85 °C para torra clara",
      "Mexa 10 s após adicionar a água",
      "Espere 1min30 e pressione por 30 s",
      "Pare quando ouvir o sibilo do ar",
    ],
  },
];

export const faq = [
  {
    pergunta: "Vocês entregam em todo o Brasil?",
    resposta:
      "Sim. Enviamos café em grão para todo o país pelos Correios e transportadoras. O frete é calculado no atendimento pelo WhatsApp, a partir do seu CEP.",
  },
  {
    pergunta: "Qual o prazo de entrega?",
    resposta:
      "Despachamos em até 48 horas depois da torra. O prazo de transporte varia por região: 2 a 4 dias úteis no Sul e Sudeste, 5 a 10 dias no resto do Brasil.",
  },
  {
    pergunta: "Como funciona o pagamento?",
    resposta:
      "Fechamos o pedido pelo WhatsApp e enviamos um link de pagamento com PIX ou cartão de crédito. Não armazenamos nenhum dado de pagamento neste site.",
  },
  {
    pergunta: "Posso pedir o café já moído?",
    resposta:
      "Pode. Moemos no momento do envio, no ponto do seu método. Se puder, prefira grãos inteiros e moa em casa: café moído perde aroma em poucos dias.",
  },
  {
    pergunta: "Quanto tempo o café dura?",
    resposta:
      "O saco tem validade impressa, mas o melhor período é de 7 a 45 dias depois da torra. Guarde em recipiente fechado, ao abrigo de luz e calor — nunca na geladeira.",
  },
  {
    pergunta: "Vocês vendem para cafeterias e restaurantes?",
    resposta:
      "Sim, esse é um dos nossos canais principais. Veja a página de atacado para condições, pedido mínimo e treinamento de equipe.",
  },
  {
    pergunta: "Os cursos têm certificado?",
    resposta:
      "Emitimos certificado de participação da Coffee Body ao final de cada curso. Não é certificação SCA.",
  },
];
