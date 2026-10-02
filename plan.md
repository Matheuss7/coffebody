# Coffee Body® — Plano do Site

**Status:** frontend da fase 1 e 2 construído em `site/` — aguardando conteúdo real (ver `site/README.md`)
**Criado:** 2026-10-02
**Owner:** Felipe Oliveira
**Padrão de referência:** `08 - FSO Cloud Consulting/fso-cloud-consulting`

---

## 1. O negócio (levantado de fontes públicas)

| Dado | Valor |
|------|-------|
| Nome | Coffee Body® — Cafeteria e Torrefação de Cafés Especiais |
| Endereço | R. Irmãos Vieira, 967 — loja 02, São José / SC, 88101-290 |
| Telefone | +55 48 3047-1490 |
| Horário | Seg a Sáb, 9h–18h |
| Instagram | [@coffeebody.sc](https://www.instagram.com/coffeebody.sc/) — 8.826 seguidores |
| Posicionamento | "Do grão à xícara, com história pra contar" |
| Produtos / serviços | Café especial torrado na casa · cafeteria · pão de queijo (item assinatura) · cursos |
| Já indexado em | [Tripadvisor](https://www.tripadvisor.com/Restaurant_Review-g2151496-d19370703-Reviews-Coffee_Body_Cafeteria_de_Cafe_Especial-Sao_Jose_State_of_Santa_Catarina.html) · [RestaurantGuru](https://restaurantguru.com/Coffee-Body-Cafeteria-de-Cafe-Especial-Sao-Jose) · [Caferia](https://caferia.com.br/guia/coffee-body-torrefacao-e-cafeteria-de-cafes-especiais-florianopolis-hurjm) |

**Confirmar com você:** se os dados acima estão atualizados (a reforma pode ter mudado endereço ou horário).

### Achado urgente — link da bio está morto
`bento.me/coffeebody` redireciona para a raiz do linktr.ee. Ou seja: 8.826 seguidores clicam e não chegam a lugar nenhum. Isso vaza conversão **hoje**, independente do site. Correção imediata: apontar a bio pro WhatsApp direto (`wa.me/5548...`) até o site existir.

---

## 2. Consequência pro escopo

O briefing inicial era "compra e venda de café" — mas o negócio real é **cafeteria física com torrefação própria**. O site não é só uma loja: é a vitrine de quatro frentes de receita.

| Frente | O que o site precisa fazer |
|--------|----------------------------|
| Cafeteria (balcão) | Levar gente até a loja: cardápio, fotos, mapa, horário, Google Maps |
| Café em grão (varejo online) | Vender saco de café pra todo o Brasil |
| Cursos | Captar inscrição (barista, métodos, torra) |
| Atacado / B2B | Fornecer café torrado para outras cafeterias, restaurantes e escritórios — margem recorrente, canal mais negligenciado |

A frente de atacado é a que mais combina com "compra e venda" e normalmente é a que mais escala numa torrefação. Merece página própria com formulário de orçamento.

---

## 3. Decisões fechadas

| Tema | Decisão |
|------|---------|
| Tipo de site | Estático — Next.js `output: "export"` (mesmo padrão do FSO) |
| Checkout | Botão "Pedir" → WhatsApp com mensagem pré-preenchida + link de pagamento (PIX/cartão) |
| Stack | Next.js 16 · React 19 · Tailwind 4 · TypeScript · react-icons |
| Hospedagem | GitHub Pages na fase 1 → S3 + CloudFront + domínio próprio na fase 3 |
| CI/CD | GitHub Actions (lint + build no PR, deploy na main) |
| Idioma | pt-BR apenas na fase 1 |

---

## 4. Mapa de páginas

```
/                      Home — hero, o que é a Coffee Body, cafés em destaque,
                       pão de queijo, CTA duplo (visite / peça no WhatsApp)
/cafes                 Catálogo de cafés em grão (filtro por torra e processo)
/cafes/[slug]          Produto: atributos, seletor peso + moagem, preço, CTA WhatsApp
/cardapio              Cardápio da cafeteria (bebidas, pão de queijo, comidas)
/cursos                Cursos: ementa, duração, preço, próximas turmas, inscrição
/atacado               B2B: proposta pra cafeteria/restaurante/escritório + formulário
/sobre                 História, torrefação, relação com produtores
/como-preparar         Guias de método (filtro, prensa, espresso, aeropress) — SEO
/visite                Endereço, mapa, horário, telefone, estacionamento, fotos do espaço
/faq                   Frete, prazo, pagamento, frescor, troca
/privacidade  /trocas  Páginas legais
```

Prioridade de construção: `/` → `/cafes` + `/cafes/[slug]` → `/visite` → `/cardapio` → `/atacado` → `/cursos` → resto.

---

## 5. Arquitetura (fase 1)

```
  Visitante (Instagram, Google, Maps)
     │
     ▼
┌─────────────────────┐
│ GitHub Pages / CDN  │  HTML estático gerado no build
│ (Next.js export)    │  zero servidor, zero banco
└──────┬──────────────┘
       │ clique em "Pedir" / "Orçamento" / "Inscrever"
       ▼
┌─────────────────────┐
│ wa.me deep link     │  mensagem pré-montada por contexto
└──────┬──────────────┘
       ▼
   Atendimento → confirma frete → link de pagamento
                                      │
                                      ▼
                          Mercado Pago / Asaas (PIX + cartão)
```

Catálogo, cardápio, cursos e preços vivem em arquivos TypeScript no repo. Mudar preço = commit + deploy automático (~1 min).

---

## 6. Limites honestos deste modelo

| Limite | Consequência | Quando resolver |
|--------|--------------|-----------------|
| Sem carrinho nem checkout no site | Cada pedido passa por conversa manual | Fase 4 (Snipcart ou Medusa) |
| Sem estoque em tempo real | Pode anunciar café esgotado | Campo `disponivel` no catálogo + disciplina de commit |
| Frete não calculado | Informar no WhatsApp depois do CEP | Fase 4 |
| Pagamento por link manual | Não escala acima de ~10–15 pedidos/dia | Fase 4 |
| Cardápio precisa de commit pra mudar | Quem não é dev depende de você | Fase 4: CMS leve (Sanity/Notion) ou JSON editável |

Troca consciente: site no ar em ~1 semana em vez de ~3 meses, e valida demanda online antes de construir commerce de verdade.

---

## 7. Estrutura do repositório

```
coffeebody/                 ← repositório
  README.md                visão geral
  plan.md                  ← este arquivo
  docs/                    identidade visual: logo, ícone, wordmark, favicon e manual
  .github/workflows/       ci.yml e deploy.yml (GitHub Pages)
  site/                    app Next.js
    app/
      layout.tsx           metadata, fontes, OG, JSON-LD de LocalBusiness
      page.tsx  globals.css
      cafes/page.tsx  cafes/[slug]/page.tsx
      cardapio/page.tsx  cursos/page.tsx  atacado/page.tsx
      sobre/page.tsx  visite/page.tsx  como-preparar/page.tsx
      faq/page.tsx  privacidade/page.tsx  trocas/page.tsx
      sitemap.ts  robots.ts  icon.png
    components/
      Header.tsx  Hero.tsx  Footer.tsx
      CoffeeCard.tsx  CoffeeGrid.tsx
      OrderBox.tsx         seletor peso/moagem + CTA WhatsApp
      MenuList.tsx  CourseCard.tsx  WholesaleForm.tsx
      StoreInfo.tsx        endereço, horário, mapa
    data/
      products.ts          cafés em grão
      menu.ts              cardápio da cafeteria
      courses.ts           cursos
      content.ts           textos das seções
    lib/
      site.ts              nome, URL, endereço, horário, WhatsApp
      paths.ts             publicAsset() para basePath do Pages
      whatsapp.ts          monta deep link por contexto (pedido, orçamento, curso)
      format.ts            preço em BRL
      schema.ts            JSON-LD: LocalBusiness, Product, Course
    public/                fotos de produto e do espaço, logo, og-image
    next.config.ts         output: export, basePath condicional
```

Mesmo esqueleto do FSO (`lib/site.ts`, `lib/paths.ts`, `data/*`, workflows) — sem inventar convenção nova.

---

## 8. Modelo de dados

```ts
type Moagem = "graos" | "filtro" | "espresso" | "prensa" | "aeropress";
type Torra = "clara" | "media" | "escura";
type Processo = "natural" | "lavado" | "honey" | "fermentado";

type Cafe = {
  slug: string;
  nome: string;
  resumo: string;              // 1 linha, usada no card
  descricao: string;           // parágrafo da página de produto
  notas: string[];             // ["chocolate", "caramelo", "laranja"]
  origem: { pais: string; regiao: string; fazenda?: string; altitude?: string };
  produtor?: string;
  variedade: string[];
  processo: Processo;
  torra: Torra;
  scaScore?: number;
  safra?: string;
  precos: Partial<Record<"250g" | "500g" | "1kg", number>>;  // centavos
  moagens: Moagem[];
  imagem: string;
  disponivel: boolean;
  destaque?: boolean;
};

type ItemCardapio = {
  categoria: "cafe-quente" | "cafe-gelado" | "pao-de-queijo" | "doces" | "salgados" | "outros";
  nome: string;
  descricao?: string;
  preco?: number;              // centavos; opcional — cardápio pode omitir preço
  destaque?: boolean;
};

type Curso = {
  slug: string;
  nome: string;
  descricao: string;
  topicos: string[];
  duracaoHoras: number;
  preco: number;               // centavos
  vagas?: number;
  proximasTurmas: string[];    // ISO date
};
```

Dinheiro sempre em **centavos inteiros** — nunca float.

---

## 9. Fluxo de contato por WhatsApp

`lib/whatsapp.ts` gera `https://wa.me/5548XXXXXXXXX?text=<encodeURIComponent(msg)>` com mensagem por contexto:

**Pedido de café**
```
Olá! Quero pedir:

• Catuaí Amarelo — 500g — moído para filtro — 2un
Total: R$ 119,80

Meu CEP: ____
```

**Orçamento de atacado**
```
Olá! Quero orçamento de atacado.

Estabelecimento: ____
Cidade: ____
Consumo mensal estimado: ____ kg
```

**Inscrição em curso**
```
Olá! Quero me inscrever no curso: Métodos de Filtro (4h)
Turma: 15/11
```

Detalhes: `encodeURIComponent` na mensagem inteira, `target="_blank"` + `rel="noopener"`, funciona em desktop (WhatsApp Web) e mobile. Preço no texto é informativo — frete entra na conversa.

---

## 10. SEO — aqui tem dinheiro parado

A busca que importa é **local**: "cafeteria São José SC", "café especial Florianópolis", "torrefação SC", "curso de barista Florianópolis". O negócio já aparece em Tripadvisor, RestaurantGuru e Caferia — ou seja, tem presença indexada mas nenhum domínio próprio capturando essa intenção.

Checklist:
- **Google Business Profile** reivindicado e completo (fotos, horário, produtos, posts). Impacto maior que o site inteiro pra busca local — fazer na fase 0
- JSON-LD `LocalBusiness` + `GeoCoordinates` + `openingHoursSpecification` no layout
- JSON-LD `Product` com `offers` em cada café → rich snippet
- JSON-LD `Course` nas páginas de curso
- `sitemap.ts` + `robots.ts` no build (igual FSO)
- Metadata e OG image por página; foto real do café na OG
- `/como-preparar` como conteúdo de cauda longa
- Link da bio do Instagram apontando pro site (hoje: quebrado)

Analytics: Plausible ou GA4, com evento em cada clique de WhatsApp separado por contexto (café, atacado, curso). Na fase 1 essa é a única métrica de conversão existente.

---

## 11. Fiscal e legal

- Confirmar CNPJ, CNAE e regime (torrefação + cafeteria + varejo podem exigir CNAEs distintos) com o contador
- NCM de referência: café torrado em grãos `0901.21.00`; torrado e moído `0901.22.00`. CEST/ICMS-ST variam por UF — validar antes de vender pra fora de SC
- NF-e em toda venda online (manual no painel do emissor na fase 1)
- **Rotulagem obrigatória** no saco: lote, data de torra, validade, peso líquido, origem, CNPJ do responsável
- Licença sanitária municipal (torrefação + manipulação de alimentos)
- CDC: arrependimento em 7 dias → política de troca publicada
- LGPD: página de privacidade, consentimento de cookie se houver analytics, canal pra exclusão de dados
- Uso do símbolo **®** no nome: confirmar se a marca está de fato registrada no INPI. Usar ® sem registro concedido é irregular

---

## 12. Deploy

**Fase 1 — GitHub Pages.** `npm run build:pages` com `basePath`, artifact pro Pages, workflow igual ao do FSO.

**Fase 3 — AWS.** S3 privado + CloudFront + OAC + ACM + Route53, em Terraform. O diagrama `docs/diagrams/frontend-estatico-aws.drawio` do projeto FSO já descreve a topologia — reaproveitar.

Domínio: registrar `coffeebody.com.br` (verificar disponibilidade) — e-mail profissional no mesmo domínio.

---

## 13. Roadmap

| Fase | Entrega | Esforço |
|------|---------|---------|
| **0 — Hoje** | Consertar link da bio (WhatsApp direto) · reivindicar Google Business Profile · registrar domínio · coletar logo, paleta, fotos, cardápio, lista de cafés e preços | 1–3 dias |
| **1 — Site no ar** | Scaffold + Home + `/cafes` + `/cafes/[slug]` + `/visite` + legais, publicado no Pages, link na bio apontando pra ele | ~1 semana |
| **2 — Receita completa** | `/cardapio` · `/atacado` com formulário · `/cursos` · JSON-LD · analytics | ~1 semana |
| **3 — Infra própria** | Domínio + S3/CloudFront/ACM via Terraform, e-mail profissional, OG images finais | ~1 semana |
| **4 — Commerce real** | Carrinho (Snipcart) ou Medusa, frete calculado, cobrança recorrente do clube (a página `/clube` já capta pelo WhatsApp, sem billing automático), CMS leve pro cardápio | avaliar com tração |

---

## 14. O que preciso de você

**Bloqueia o site:**
1. Logo em vetor (SVG/AI) ou PNG em alta — e a paleta de cores oficial
2. Número de WhatsApp comercial
3. 3–6 cafés: nome, origem, variedade, processo, torra, notas sensoriais, preço por peso
4. Fotos dos cafés e do espaço (posso usar placeholder até ter)

**Bloqueia fases 2+:**
5. Cardápio com itens e preços
6. Cursos: nome, ementa, duração, preço, calendário
7. Política de frete (Correios? entrega local em São José/Floripa?)
8. Confirmação de endereço e horário pós-reforma
9. Proposta de atacado: pedido mínimo, faixa de preço por kg, prazo

**Resolvido:** o logo oficial chegou e virou o kit em `docs/` — logo, ícone, wordmark, favicon e manual de marca.

---

## 15. Próximos passos

Feito:
- [x] Scaffold do app `site/` espelhando o padrão do FSO (Next 16 export estático, Tailwind 4, CI + deploy no Pages)
- [x] Todas as páginas das fases 1 e 2: Home, `/cafes`, `/cafes/[slug]`, `/cardapio`, `/cursos`, `/atacado`, `/sobre`, `/visite`, `/como-preparar`, `/faq`, `/privacidade`, `/trocas`, 404
- [x] JSON-LD de `CafeOrCoffeeShop`, `Product`, `Course` e `FAQPage`; sitemap e robots
- [x] Deep links de WhatsApp por contexto (pedido, atacado, curso)
- [x] Direção visual moderna: hero editorial, ticker em marquee, barra de confiança, revelação ao rolar, header inteligente
- [x] Card de café no modelo William & Sons: faixa sólida, produtor em destaque, pedido direto do catálogo
- [x] `/clube` — assinatura com configurador peso × frequência × moagem, captando por WhatsApp

Pendente:
1. Número de WhatsApp comercial em `lib/site.ts` — **sem isso nenhum CTA funciona**
2. ~~Logo e paleta oficiais~~ — feito. Falta confirmar com a Coffee Body os **HEX/Pantone oficiais** e o **arquivo vetorial**, já que o JPEG é CMYK e a cor atual é conversão.
3. Cafés reais em `data/products.ts`, cardápio em `data/menu.ts`, cursos em `data/courses.ts`
4. Fotos dos produtos e do espaço em `public/`, mais `og-image.png` e `icon.png`
5. Criar repositório no GitHub e ligar o Pages
6. Revisão jurídica das páginas de privacidade e trocas
7. Depois, quando fizer sentido: link da bio e Google Business Profile
