# Coffee Body — site

Parte do repositório [coffeebody](../README.md). A identidade visual fica em [`../docs/`](../docs/).

Site institucional e loja-vitrine da **Coffee Body®**, cafeteria e torrefação de cafés especiais em São José (SC).

Site estático (`next build` com `output: "export"`), sem backend. Pedido, orçamento de atacado e inscrição em curso saem por deep link de WhatsApp pré-preenchido; o pagamento é fechado fora do site por link (PIX/cartão).

## Stack

- Next.js 16 (App Router, export estático)
- React 19 · TypeScript
- Tailwind CSS 4 (tokens em `app/globals.css`)
- react-icons
- Deploy: GitHub Pages via GitHub Actions

## Rodar

```bash
npm install
npm run dev          # http://localhost:3000
npm run lint
npm run build        # export em ./out
npm run build:pages  # export com basePath /coffeebody (GitHub Pages)
```

## Estrutura

| Caminho | Papel |
|---------|-------|
| `app/` | Rotas (App Router). Uma pasta por página. |
| `components/` | UI reutilizável. `OrderBox`, `CoffeeGrid`, `Header` e `Reveal` são client components. |
| `components/Reveal.tsx` | Revela conteúdo ao entrar na viewport (IntersectionObserver). |
| `components/Marquee.tsx` | Faixa em movimento contínuo, CSS puro. |
| `components/TrustBar.tsx` | Frete, parcelamento, torra fresca, retirada na loja. |
| `data/products.ts` | **Catálogo de cafés** — fonte única de verdade. Preços em centavos. |
| `data/menu.ts` | Cardápio real da cafeteria (fonte: Goomer). 48 itens em 5 categorias. |
| `data/courses.ts` | Cursos reais, com preço em grupo e individual (fonte: formulário oficial). |
| `data/subscription.ts` | Planos, frequências, benefícios e FAQ do clube de assinatura. |
| `components/SubscriptionBox.tsx` | Configurador do clube: peso × frequência × moagem. |
| `data/content.ts` | Textos editoriais (hero, sobre, atacado, guias, FAQ). |
| `lib/site.ts` | Nome, URL, contato, endereço, horário, navegação. |
| `lib/whatsapp.ts` | Monta os deep links por contexto (pedido, atacado, curso). |
| `lib/schema.ts` | JSON-LD: `CafeOrCoffeeShop`, `Product`, `Course`. |
| `lib/paths.ts` | `publicAsset()` — prefixa assets com o basePath do Pages. |
| `scripts/gerar-assets-marca.js` | Gera favicon, ícone iOS, OG image e os dois selos a partir do logo oficial. |
| `app/globals.css` | **Paleta e tipografia.** Único arquivo a mudar para reskin. `--font-display` (Fraunces, títulos) e `--font-sans` (Inter, corpo). |

## Tarefas de conteúdo pendentes

Tudo marcado com `TODO` no código. As que bloqueiam a publicação:

1. `lib/site.ts` → `contact.whatsapp` está com placeholder `5548000000000`. **Sem isso nenhum CTA funciona.**
2. `lib/site.ts` → `siteConfig.url`, e-mail, coordenadas da loja e horário pós-reforma.
3. `data/products.ts` → catálogo inteiro é placeholder. Substituir por cafés, atributos e preços reais.
4. Cardápio (`data/menu.ts`) e cursos (`data/courses.ts`) **já são os reais** — fontes: [Goomer](https://coffee-body.goomer.app/menu) e o formulário "Agenda de curso Coffee Body", lidos em 02/10/2026. Falta só a **carga horária e a ementa de cada curso**, que o formulário não informa; reconferir preços de tempos em tempos, porque mudam na origem sem aviso.
5. `components/Logo.tsx` → símbolo e escrita são **SVGs vetorizados do logo oficial**, gerados pelo kit em `docs/`. A escrita é imagem, não texto: no logo original "COFFEE" e "BODY" têm a mesma largura, e com fonte comum as linhas sairiam desalinhadas. Quando chegar o vetor original da Coffee Body, regerar o kit.
6. `app/globals.css` → a paleta vem do **logo oficial**: verde `#1e5c42`, folha `#708768`, cereja `#783537`. O arquivo é CMYK (impressão), então esses valores são a conversão que o navegador faz — vale confirmar os HEX oficiais com a Coffee Body. Detalhes em `docs/README.md`.
7. `public/` → faltam só as **fotos dos cafés** (apontar em `Cafe.imagem`) e uma foto da loja para o hero (`heroImage` em `lib/site.ts`). Favicon, ícone iOS e imagem de compartilhamento já são gerados do logo por `scripts/gerar-assets-marca.js`.
8. `app/privacidade/page.tsx` e `app/trocas/page.tsx` → revisão jurídica.

## Interações

Referências de direção: [SEY](https://www.seycoffee.com) (editorial claro), [Onyx Coffee Lab](https://onyxcoffeelab.com) (ticker e hero cinematográfico), [Coffee Lab](https://www.coffeelab.com.br) (barra de confiança do varejo brasileiro), [William & Sons](https://www.williamsonscoffee.com) (card de café com faixa sólida e produtor em destaque) e [Moka Clube](https://www.mokaclube.com.br) (configurador de assinatura).

| Interação | Como funciona |
|-----------|---------------|
| Revelação ao rolar | `Reveal` usa IntersectionObserver e marca `data-visible`. O CSS só esconde sob `html.js`, então **sem JavaScript nada some**. `prefers-reduced-motion` desliga a animação. |
| Header inteligente | Esconde ao rolar para baixo depois de 140px, reaparece ao subir, ganha sombra e fundo translúcido fora do topo. Fica fixo com o menu aberto. |
| Ticker em marquee | Lista duplicada com a cópia em `aria-hidden`; animação só sob `motion-safe`. |
| Hover dos cards | Elevação e seta deslizante nos cards de curso; borda que acende nos cards de café. |

Nenhuma biblioteca de animação — tudo CSS + IntersectionObserver.

## Tipografia

O ramo de café especial usa quase sempre **serif editorial no título + grotesca no corpo** — SEY (GT Super + GT America), Moka Clube (Recoleta + Barlow), Williamsons (serif de alto contraste). Seguimos o mesmo princípio com fontes livres:

| Papel | Fonte | Onde |
|-------|-------|------|
| Títulos | **Fraunces** (serif macia, variável) | `font-display` |
| Corpo | **Inter** | padrão do `body` |
| Wordmark do logo | **vetor do próprio logo** | `public/logo-wordmark-*.svg` |

O wordmark fica fora da troca de propósito: é a letra do próprio logo, vetorizada, e não muda quando a tipografia do site muda.


Para conferir visualmente sem rolar a página:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new \
  --force-prefers-reduced-motion --hide-scrollbars --window-size=1300,4300 \
  --screenshot=home.png http://localhost:3000/
```

`--force-prefers-reduced-motion` é necessário: na captura o tempo é congelado e os blocos com `Reveal` sairiam invisíveis.

## Convenções

- Dinheiro sempre em **centavos inteiros**; formatar com `formatPrice()`.
- Links externos: `target="_blank"` + `rel="noopener noreferrer"`.
- Novo café: adicionar em `data/products.ts` — a página, o sitemap e o JSON-LD saem de graça.
- Café esgotado: `disponivel: false` (mantém a página e o SEO, desliga o botão de pedido).
