// FONTE ÚNICA DE VERDADE DO CATÁLOGO.
// Preços sempre em CENTAVOS (inteiros) — nunca float.
// TODO: todo o conteúdo abaixo é PLACEHOLDER até a Coffee Body passar
// os cafés reais (nome, origem, variedade, processo, torra, notas, preços).

export const PESOS = ["250g", "500g", "1kg"] as const;
export type Peso = (typeof PESOS)[number];

export const MOAGENS = {
  graos: "Grãos inteiros",
  filtro: "Moído para filtro",
  espresso: "Moído para espresso",
  prensa: "Moído para prensa francesa",
  aeropress: "Moído para AeroPress",
} as const;
export type Moagem = keyof typeof MOAGENS;

export const TORRAS = {
  clara: "Torra clara",
  media: "Torra média",
  escura: "Torra escura",
} as const;
export type Torra = keyof typeof TORRAS;

export const PROCESSOS = {
  natural: "Natural",
  lavado: "Lavado",
  honey: "Honey / cereja descascado",
  fermentado: "Fermentação induzida",
} as const;
export type Processo = keyof typeof PROCESSOS;

/** Rótulos curtos — usados no card, onde o nome completo quebra a linha. */
export const PROCESSOS_CURTO: Record<Processo, string> = {
  natural: "Natural",
  lavado: "Lavado",
  honey: "Honey",
  fermentado: "Fermentado",
};

export type Cafe = {
  slug: string;
  nome: string;
  resumo: string;
  descricao: string;
  notas: string[];
  origem: { pais: string; regiao: string; fazenda?: string; altitude?: string };
  produtor?: string;
  variedade: string[];
  processo: Processo;
  torra: Torra;
  scaScore?: number;
  safra?: string;
  precos: Partial<Record<Peso, number>>;
  moagens: Moagem[];
  imagem: string | null;
  disponivel: boolean;
  destaque?: boolean;
};

export const cafes: Cafe[] = [
  {
    slug: "catuai-amarelo-mantiqueira",
    nome: "Catuaí Amarelo",
    resumo: "Doce e redondo. O café de todo dia que agrada qualquer paladar.",
    descricao:
      "Colhido na Mantiqueira de Minas e secado em terreiro suspenso, esse Catuaí Amarelo tem a doçura que define o café brasileiro bem feito. Corpo médio, acidez baixa e final persistente de chocolate. Funciona em qualquer método e perdoa erro de dose — é o nosso recomendado para quem está começando a moer em casa.",
    notas: ["chocolate ao leite", "caramelo", "amendoim"],
    origem: {
      pais: "Brasil",
      regiao: "Mantiqueira de Minas, MG",
      fazenda: "Sítio Santa Luzia",
      altitude: "1.100 m",
    },
    produtor: "Família Ribeiro",
    variedade: ["Catuaí Amarelo"],
    processo: "natural",
    torra: "media",
    scaScore: 84,
    safra: "2026",
    precos: { "250g": 3890, "500g": 6990, "1kg": 12900 },
    moagens: ["graos", "filtro", "espresso", "prensa", "aeropress"],
    imagem: null,
    disponivel: true,
    destaque: true,
  },
  {
    slug: "bourbon-amarelo-cerrado",
    nome: "Bourbon Amarelo",
    resumo: "Honey do Cerrado. Doçura de mel com acidez cítrica elegante.",
    descricao:
      "Processado em honey, com a mucilagem preservada durante a secagem, esse Bourbon ganha corpo sedoso e doçura de melaço. A acidez aparece como casca de laranja no meio do gole. Torra clara para preservar a camada aromática — brilha em métodos de filtro.",
    notas: ["mel", "laranja", "caramelo"],
    origem: {
      pais: "Brasil",
      regiao: "Cerrado Mineiro, MG",
      fazenda: "Fazenda Boa Vista",
      altitude: "1.050 m",
    },
    variedade: ["Bourbon Amarelo"],
    processo: "honey",
    torra: "clara",
    scaScore: 86,
    safra: "2026",
    precos: { "250g": 4790, "500g": 8790 },
    moagens: ["graos", "filtro", "prensa", "aeropress"],
    imagem: null,
    disponivel: true,
    destaque: true,
  },
  {
    slug: "arara-fermentado",
    nome: "Arara Fermentado",
    resumo: "Fermentação induzida. Fruta vermelha intensa, quase vinho.",
    descricao:
      "Fermentação anaeróbica controlada por 72 horas antes da secagem. O resultado é um café de perfil fruta vermelha madura, com lembrança de vinho e final de cacau. Não é café de agradar todo mundo — é café de parar e prestar atenção. Lote pequeno, acaba rápido.",
    notas: ["morango", "vinho tinto", "cacau"],
    origem: {
      pais: "Brasil",
      regiao: "Sul de Minas, MG",
      altitude: "1.200 m",
    },
    variedade: ["Arara"],
    processo: "fermentado",
    torra: "media",
    scaScore: 87,
    safra: "2026",
    precos: { "250g": 5990, "500g": 10900 },
    moagens: ["graos", "filtro", "aeropress"],
    imagem: null,
    disponivel: true,
    destaque: true,
  },
  {
    slug: "geisha-alta-mogiana",
    nome: "Geisha",
    resumo: "Microlote. Floral de jasmim, delicado e aromático.",
    descricao:
      "A variedade mais famosa do café especial, cultivada na Alta Mogiana e processada via lavado para deixar o terroir falar sozinho. Corpo leve, acidez de ácido málico e um aroma floral que ocupa a sala inteira. Microlote limitado — quando acaba, só na próxima safra.",
    notas: ["jasmim", "bergamota", "pêssego"],
    origem: {
      pais: "Brasil",
      regiao: "Alta Mogiana, SP",
      altitude: "1.250 m",
    },
    variedade: ["Geisha"],
    processo: "lavado",
    torra: "clara",
    scaScore: 89,
    safra: "2026",
    precos: { "250g": 9900 },
    moagens: ["graos", "filtro", "aeropress"],
    imagem: null,
    disponivel: false,
  },
  {
    slug: "blend-coffee-body",
    nome: "Blend Coffee Body",
    resumo: "Nosso blend de espresso. Chocolate, corpo e crema densa.",
    descricao:
      "O blend que serve no nosso balcão todos os dias. Construído para espresso: corpo alto, doçura de doce de leite e crema persistente que segura o leite sem desaparecer. Também vai bem na prensa francesa para quem gosta de café encorpado.",
    notas: ["chocolate meio amargo", "doce de leite", "castanha"],
    origem: {
      pais: "Brasil",
      regiao: "Sul de Minas e Cerrado Mineiro",
    },
    variedade: ["Catuaí Vermelho", "Mundo Novo"],
    processo: "natural",
    torra: "escura",
    safra: "2026",
    precos: { "250g": 3490, "500g": 6290, "1kg": 11500 },
    moagens: ["graos", "espresso", "prensa"],
    imagem: null,
    disponivel: true,
  },
  {
    slug: "descafeinado",
    nome: "Descafeinado",
    resumo: "Sem cafeína, com sabor. Descafeinação a água.",
    descricao:
      "Descafeinado pelo processo a água, sem solvente químico, preservando a doçura do grão. Para quem quer tomar café à noite sem negociar com o sono. Perfil limpo de cacau e castanha, corpo médio.",
    notas: ["cacau", "castanha-do-pará", "melaço"],
    origem: {
      pais: "Brasil",
      regiao: "Sul de Minas, MG",
    },
    variedade: ["Catuaí Vermelho"],
    processo: "lavado",
    torra: "media",
    precos: { "250g": 4290, "500g": 7890 },
    moagens: ["graos", "filtro", "espresso", "prensa"],
    imagem: null,
    disponivel: true,
  },
];

export function getCafe(slug: string) {
  return cafes.find((cafe) => cafe.slug === slug);
}

export const cafesDestaque = cafes.filter((cafe) => cafe.destaque && cafe.disponivel);

/** Menor preço disponível do café, usado no card do catálogo. */
export function precoMinimo(cafe: Cafe) {
  const valores = Object.values(cafe.precos).filter(
    (valor): valor is number => typeof valor === "number",
  );
  return valores.length ? Math.min(...valores) : null;
}

/** Pesos oferecidos por um café, na ordem canônica. */
export function pesosDisponiveis(cafe: Cafe): Peso[] {
  return PESOS.filter((peso) => typeof cafe.precos[peso] === "number");
}
