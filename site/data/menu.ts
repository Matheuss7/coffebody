// Cardápio real da cafeteria, transcrito do cardápio oficial no Goomer
// (https://coffee-body.goomer.app/menu) em 02/10/2026.
// As descrições longas aparecem truncadas lá; aqui ficaram resumidas.
// TODO: conferir periodicamente — preço e itens mudam sem aviso no Goomer.

export const CATEGORIAS = {
  cafe: "Café",
  salgadas: "Comidas salgadas",
  doces: "Comidas doces",
  gelados: "Cafés gelados",
  bebidas: "Outras bebidas",
} as const;
export type Categoria = keyof typeof CATEGORIAS;

export type ItemCardapio = {
  categoria: Categoria;
  nome: string;
  descricao?: string;
  /** Centavos. Opcional — item pode ficar sem preço exposto. */
  preco?: number;
  destaque?: boolean;
};

export const cardapio: ItemCardapio[] = [
  // Café
  { categoria: "cafe", nome: "Espresso", preco: 1000 },
  {
    categoria: "cafe",
    nome: "Long Black (carioquinha)",
    descricao: "Café espresso 40ml com adição de água 40ml",
    preco: 1000,
  },
  {
    categoria: "cafe",
    nome: "Americano",
    descricao: "Café espresso 40ml e água 90ml",
    preco: 1200,
  },
  {
    categoria: "cafe",
    nome: "Piccolo Latte",
    descricao: "Café com leite pequeno, 150ml: espresso, leite vaporizado e espuma",
    preco: 1400,
  },
  {
    categoria: "cafe",
    nome: "Cappuccino clássico",
    descricao: "200ml. Uma dose de espresso, leite vaporizado e cacau polvilhado",
    preco: 1700,
    destaque: true,
  },
  {
    categoria: "cafe",
    nome: "Cappuccino avelã",
    descricao: "200ml. Espresso, leite vaporizado, xarope de avelã e espuma",
    preco: 2000,
  },
  {
    categoria: "cafe",
    nome: "Cappuccino vanilla",
    descricao: "200ml. Espresso, leite vaporizado, xarope de vanilla e espuma",
    preco: 2000,
  },
  {
    categoria: "cafe",
    nome: "Cappuccino caramelo",
    descricao: "200ml. Espresso, leite vaporizado, xarope de caramelo e espuma",
    preco: 2000,
  },
  {
    categoria: "cafe",
    nome: "Mocha",
    descricao:
      "Chocolate nobre meio amargo derretido, espresso, leite e cacau em pó",
    preco: 2000,
  },
  {
    categoria: "cafe",
    nome: "Café convidado",
    descricao: "Degustação de cafés selecionados — um mundo de sabores na xícara",
    preco: 3000,
  },
  {
    categoria: "cafe",
    nome: "Uma xícara de coado",
    descricao: "Passado na Moccamaster, com temperatura constante",
    preco: 900,
  },
  {
    categoria: "cafe",
    nome: "V60",
    descricao: "300ml. As linhas espirais do cone definem o corpo e a limpeza da bebida",
    preco: 2000,
    destaque: true,
  },
  {
    categoria: "cafe",
    nome: "Kalita",
    descricao: "Método japonês de fundo plano, extração mais equilibrada",
    preco: 1900,
  },
  {
    categoria: "cafe",
    nome: "Clever",
    descricao: "300ml. Imersão e filtragem no mesmo porta-filtro",
    preco: 2200,
  },
  {
    categoria: "cafe",
    nome: "AeroPress",
    descricao: "200ml. Método americano de 2005, extração por pressão",
    preco: 2000,
  },
  {
    categoria: "cafe",
    nome: "French Press",
    descricao: "200ml. Método francês de 1958, corpo alto por imersão",
    preco: 1800,
  },
  {
    categoria: "cafe",
    nome: "Chemex",
    descricao: "Criado em 1941. Filtro de papel grosso, bebida muito limpa",
    preco: 2500,
  },

  // Comidas salgadas
  {
    categoria: "salgadas",
    nome: "Torrada da vovó",
    descricao: "Homenagem ao 20 de setembro: uma torrada que traz as raízes à mesa",
    preco: 2000,
  },
  {
    categoria: "salgadas",
    nome: "Pão de queijo",
    descricao: "O inconfundível pão de queijo da casa",
    preco: 1200,
    destaque: true,
  },
  {
    categoria: "salgadas",
    nome: "Ciabatta",
    descricao: "Sanduíche de ciabatta artesanal",
    preco: 2500,
  },
  {
    categoria: "salgadas",
    nome: "Avocado toast",
    descricao:
      "Pão de fermentação natural selado na manteiga, 50g de abacate temperado",
    preco: 3000,
  },
  {
    categoria: "salgadas",
    nome: "Avocado família",
    descricao: "Nosso avocado toast em versão para dividir, em pão ciabatta",
    preco: 4000,
  },
  {
    categoria: "salgadas",
    nome: "Ovo mexido",
    descricao: "2 ovos mexidos cremosos, temperados com sal e pimenta",
    preco: 1400,
  },
  {
    categoria: "salgadas",
    nome: "Focaccia",
    descricao: "Farinha 00, longa fermentação e azeite de oliva",
    preco: 1700,
  },

  // Comidas doces
  {
    categoria: "doces",
    nome: "Torta banoffee",
    descricao: "Bolacha amanteigada, banana, doce de leite e creme à base de nata",
    preco: 2000,
  },
  {
    categoria: "doces",
    nome: "Torta de limão",
    descricao: "A torta queridinha da Flórida, agora na Coffee Body",
    preco: 2000,
  },
  { categoria: "doces", nome: "Muffin de mirtilo", preco: 1200 },
  {
    categoria: "doces",
    nome: "Banana bread",
    descricao: "Bolo de banana assado em forma de pão, leve e aromático",
    preco: 1100,
  },
  {
    categoria: "doces",
    nome: "Bolo de cenoura",
    descricao: "Receita caseira tradicional",
    preco: 1500,
  },
  { categoria: "doces", nome: "Bolo de milho", preco: 1500 },
  {
    categoria: "doces",
    nome: "Brownie",
    descricao: "100g de brownie cremoso com chocolate meio amargo",
    preco: 1600,
  },
  {
    categoria: "doces",
    nome: "Blondie com avelãs",
    descricao: "Chocolate branco, macio por dentro e com casquinha brilhante",
    preco: 1500,
  },
  {
    categoria: "doces",
    nome: "Fudge de cranberry e limão siciliano",
    descricao: "Textura macia, tamanho perfeito para adoçar o dia",
    preco: 500,
  },
  {
    categoria: "doces",
    nome: "Cookies",
    descricao: "Receita da casa, crocantes por fora e macios por dentro",
    preco: 1200,
  },

  // Cafés gelados
  {
    categoria: "gelados",
    nome: "Café gelado do barista",
    descricao: "Gelo, espresso, leite cremoso, creme de leite, doce de leite e espuma",
    preco: 2200,
    destaque: true,
  },
  {
    categoria: "gelados",
    nome: "Honey americano",
    descricao: "Mel, água, gelo e uma dose de café",
    preco: 2200,
  },
  {
    categoria: "gelados",
    nome: "Café com limonada",
    descricao: "Gelo, suco de limão, água com gás e dose de espresso",
    preco: 2200,
  },
  {
    categoria: "gelados",
    nome: "Cana coffee",
    descricao: "Gelo, caldo de cana com limão e uma dose de café",
    preco: 2200,
  },
  {
    categoria: "gelados",
    nome: "Espresso tônica limão",
    descricao: "Água tônica, espresso, suco de limão e gelo",
    preco: 2400,
  },
  {
    categoria: "gelados",
    nome: "Cappuccino gelado",
    descricao: "Gelo, espresso e leite vaporizado",
    preco: 2000,
  },
  {
    categoria: "gelados",
    nome: "Cappuccino avelã gelado",
    descricao: "Gelo, espresso, xarope de avelã e leite vaporizado",
    preco: 2400,
  },
  {
    categoria: "gelados",
    nome: "Cappuccino vanella gelado",
    descricao: "Gelo, espresso, xarope de vanilla e leite vaporizado",
    preco: 2400,
  },
  {
    categoria: "gelados",
    nome: "Cappuccino caramelo gelado",
    descricao: "Gelo, espresso, xarope de caramelo e leite vaporizado",
    preco: 2400,
  },

  // Outras bebidas
  { categoria: "bebidas", nome: "Coca-Cola", preco: 900 },
  { categoria: "bebidas", nome: "Água", preco: 800 },
  {
    categoria: "bebidas",
    nome: "Chá",
    descricao: "Diversos tipos de chá de infusão",
    preco: 1200,
  },
  {
    categoria: "bebidas",
    nome: "Chocolate quente",
    descricao: "Chocolate meio amargo derretido, leite vaporizado e cacau em pó",
    preco: 1800,
  },
];

export const cardapioDestaque = cardapio.filter((item) => item.destaque);

export function cardapioPorCategoria() {
  return (Object.keys(CATEGORIAS) as Categoria[])
    .map((categoria) => ({
      categoria,
      titulo: CATEGORIAS[categoria],
      itens: cardapio.filter((item) => item.categoria === categoria),
    }))
    .filter((grupo) => grupo.itens.length > 0);
}
