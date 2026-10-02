# Coffee Body®

Site e identidade visual da **Coffee Body** — cafeteria e torrefação de cafés especiais em São José, Santa Catarina.

🌐 **Site:** https://matheuss7.github.io/coffebody
📍 R. Irmãos Vieira, 967 — loja 02, São José/SC · Seg a Sáb, 9h às 18h
📸 [@coffeebody.sc](https://www.instagram.com/coffeebody.sc/)

---

## O que tem aqui

| Pasta | Conteúdo |
|-------|----------|
| [`site/`](site/) | O site. Next.js 16 com export estático — sem servidor e sem banco. |
| [`docs/`](docs/) | Identidade visual: logo em todas as versões, ícone, wordmark, favicon e manual de marca. |
| [`plan.md`](plan.md) | Plano do projeto: escopo, arquitetura, roadmap, pendências fiscais e de conteúdo. |

## O site em uma frase

Vitrine das quatro frentes do negócio — cafeteria, café em grão, cursos e atacado — com pedido fechado por WhatsApp e pagamento por link. Sem carrinho, sem checkout, sem backend.

```bash
cd site
npm install
npm run dev          # http://localhost:3000
npm run lint
npm run build:pages  # export estático em site/out
```

Detalhes de arquitetura, convenções e pendências de conteúdo: [`site/README.md`](site/README.md).

## Identidade visual

O logo oficial foi vetorizado e desdobrado em todas as versões de uso (fundo verde, fundo claro, branco, monocromático, só ícone, só escrita). Paleta, regras de aplicação e como regerar o kit: [`docs/README.md`](docs/README.md).

```bash
cd site
node scripts/vetorizar-logo.js "../docs/origem/logo-coffee-body-vertical-fundo-verde.jpeg" scripts/trace.json
node scripts/gerar-identidade.js
```

## Publicação

O deploy é automático: todo push na `main` dispara [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), que roda lint, gera o export estático e publica no GitHub Pages. Pull request roda só lint e build ([`ci.yml`](.github/workflows/ci.yml)).

Para o deploy funcionar, em **Settings → Pages** a origem precisa estar como **GitHub Actions**.

## Stack

Next.js 16 (App Router, `output: "export"`) · React 19 · TypeScript · Tailwind CSS 4 · GitHub Actions · GitHub Pages
