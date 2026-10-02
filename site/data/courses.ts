// Cursos reais, transcritos do formulário oficial "Agenda de curso Coffee Body"
// (Google Forms) em 02/10/2026.
//
// O formulário informa nome, modalidade e preço — não informa carga horária nem
// ementa. Nada disso foi inventado aqui.
// TODO: pedir à Coffee Body a duração e a ementa de cada curso para preencher
// `duracaoHoras` e `topicos`.

export type Curso = {
  slug: string;
  nome: string;
  resumo: string;
  /** Centavos. */
  precoIndividual: number;
  /** Centavos. */
  precoGrupo: number;
  /** Texto curto de parcelamento, quando oferecido. */
  parcelamento?: string;
  /** Limite de alunos na turma em grupo, quando informado. */
  maxGrupo?: number;
  duracaoHoras?: number;
  topicos?: string[];
};

/** Como as turmas em grupo acontecem, segundo o formulário oficial. */
export const formatoCursos = {
  grupo:
    "As turmas em grupo acontecem, em geral, no último domingo do mês.",
  individual:
    "Prefere aula só para você? Organizamos o curso individual na data combinada.",
};

export const cursos: Curso[] = [
  {
    slug: "introducao-ao-cafe-especial",
    nome: "Introdução ao Café Especial",
    resumo:
      "O ponto de partida: entender o que diferencia um café especial e como provar o que está na xícara.",
    precoIndividual: 30000,
    precoGrupo: 20000,
  },
  {
    slug: "metodos-de-preparo",
    nome: "Métodos de Preparo de Café",
    resumo:
      "Os métodos que servimos no balcão — V60, Kalita, Clever, AeroPress, prensa e Chemex — na prática.",
    precoIndividual: 80000,
    precoGrupo: 55000,
    parcelamento: "2x sem juros",
  },
  {
    slug: "vaporizacao-de-leite",
    nome: "Técnicas de vaporização de leite",
    resumo:
      "Textura de leite para cappuccino e latte, do ponto da espuma ao desenho na xícara.",
    precoIndividual: 60000,
    precoGrupo: 45000,
    parcelamento: "2x sem juros",
  },
  {
    slug: "regulagem-e-extracao-de-espresso",
    nome: "Técnicas de regulagem e extração de espresso",
    resumo:
      "Moedor, dose, tempo e rendimento: como diagnosticar e corrigir um espresso.",
    precoIndividual: 60000,
    precoGrupo: 45000,
    parcelamento: "2x sem juros",
  },
  {
    slug: "curso-de-barista",
    nome: "Curso de Barista",
    resumo:
      "A formação completa de balcão, reunindo extração, leite e rotina de operação.",
    precoIndividual: 120000,
    precoGrupo: 85000,
    parcelamento: "2x sem juros",
    maxGrupo: 3,
  },
];

export function getCurso(slug: string) {
  return cursos.find((curso) => curso.slug === slug);
}
