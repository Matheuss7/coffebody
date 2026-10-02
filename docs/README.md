# Identidade visual — Coffee Body®

Kit gerado a partir do logo oficial. Tudo em SVG (vetor, escala sem perder qualidade) com PNG ao lado para quem precisa de bitmap.

```
docs/
  origem/     arquivo enviado pela Coffee Body
  logo/       logo completo: símbolo + escrita
  icone/      só o símbolo
  wordmark/   só a escrita
  web/        favicon, ícone de iOS e imagem de compartilhamento
```

## Logo completo

| Arquivo | Quando usar |
|---------|-------------|
| `coffee-body-logo-principal` | **Versão oficial.** Arte colorida sobre o verde da marca. Padrão para fachada, embalagem, post e papelaria. |
| `coffee-body-logo-fundo-claro` | Fundo branco, creme ou claro. Traço verde, folhas e cerejas coloridas, fundo transparente. |
| `coffee-body-logo-branco` | Fundo escuro ou foto. Só o traço, tudo branco. |
| `coffee-body-logo-monocromatico-verde` | Uma cor só, em verde. Carimbo, serigrafia de uma cor, gravação. |

## Ícone

Só o símbolo — arco, mão e ramo. Para avatar de rede social, selo em embalagem, adesivo, aplicativo.

| Arquivo | Quando usar |
|---------|-------------|
| `coffee-body-icone-selo-verde` | Quadrado, arte branca sobre verde. **É o avatar correto para Instagram e WhatsApp.** |
| `coffee-body-icone-fundo-claro` | Sobre fundo claro, traço verde, fundo transparente. |
| `coffee-body-icone-branco` | Sobre fundo escuro ou foto. |

## Wordmark

Só a escrita `COFFEE BODY`, em duas linhas. Use quando o símbolo já aparece em outro ponto da peça, ou quando o espaço é largo e baixo.

| Arquivo | Quando usar |
|---------|-------------|
| `coffee-body-wordmark-verde` | Fundo claro. |
| `coffee-body-wordmark-branco` | Fundo escuro ou foto. |

## Web

| Arquivo | Onde entra |
|---------|-----------|
| `favicon.svg` / `favicon.png` (512×512) | Ícone da aba do navegador — a **escrita branca sobre o verde**, que em miniatura lê melhor que o traço fino do símbolo |
| `apple-touch-icon.png` (180×180) | Atalho na tela do iPhone — mesma arte do favicon |
| `og-image.png` (1200×630) | Miniatura ao compartilhar o site no WhatsApp, Instagram e Google |

## Cores

> **O arquivo oficial está em CMYK**, com perfil genérico — foi preparado para impressão, não para tela. Ler os bytes direto dá cor errada. Os valores abaixo são o que o navegador mostra ao abrir o JPEG com gestão de cor, ou seja, o verde que a marca tem na tela.

| Cor | Hex (sRGB) | RGB | Onde |
|-----|------------|-----|------|
| Verde da marca | `#1e5c42` | 30, 92, 66 | Fundo do logo, traço na versão clara |
| Verde folha | `#708768` | 112, 135, 104 | Folhas do ramo |
| Bordô cereja | `#783537` | 120, 53, 55 | Cacho de cerejas |
| Branco | `#ffffff` | 255, 255, 255 | Traço sobre o verde |

Tons derivados, criados para o site e **não** parte do logo:

| Token | Hex | Uso |
|-------|-----|-----|
| `brand-dark` | `#164535` | Hover de botão |
| `brand-light` | `#9ad3b4` | Texto pequeno e botão sobre o verde — a folha não passa em contraste nesse tamanho |

Branco sobre `#1e5c42` dá 7,9:1, bem acima do mínimo AA. Os blocos verdes do site usam o verde oficial sem alteração.

**Pendente:** pedir à Coffee Body os valores oficiais de cor (Pantone e HEX). Converter CMYK genérico para RGB é sempre aproximação — dois programas chegam a tons levemente diferentes do mesmo arquivo.

## Regras de uso

- **Área de respiro:** deixe em volta do logo, no mínimo, a altura da letra `C` do wordmark.
- **Tamanho mínimo:** logo completo a partir de 24 mm de largura no impresso, 120 px em tela. Abaixo disso use só o ícone.
- **Não faça:** esticar ou achatar, trocar as cores, aplicar sombra ou contorno, girar, colocar a versão branca sobre fundo claro ou a verde sobre fundo escuro.
- **Sobre foto:** use a versão branca e garanta que a foto esteja escura o bastante atrás da arte.

## Como regerar o kit

Se o arquivo oficial mudar, rode de dentro de `site/`:

```bash
node scripts/vetorizar-logo.js "../docs/origem/logo-coffee-body-vertical-fundo-verde.jpeg" scripts/trace.json
node scripts/gerar-identidade.js
```

O primeiro comando vetoriza (separa traço, folhas e cerejas e converte cada um em curvas). O segundo monta todas as versões, exporta os PNGs e copia para o site o que ele consome: `public/logo-simbolo{,-branco}.svg`, `public/logo-wordmark-{verde,branco}.svg` (sem margem, para o lockup do cabeçalho), `app/icon.png`, `app/apple-icon.png` e `public/og-image.png`.

## Pendências com a Coffee Body

1. **Arquivo vetorial original** (AI, EPS ou SVG) **e os valores oficiais de cor** (Pantone/HEX). Este kit foi vetorizado de um JPEG em CMYK: o traço ficou fiel, mas a cor é conversão, não o valor que o designer definiu.
2. **Qual é a fonte do wordmark.** O site usa a escrita **vetorizada do logo**, então o alinhamento está correto — mas sem a fonte original não dá para compor novas peças com o mesmo tipo (um banner, uma embalagem com texto de apoio).
3. **Versão horizontal** (símbolo à esquerda, escrita à direita), útil para cabeçalho de site, assinatura de e-mail e banner.
