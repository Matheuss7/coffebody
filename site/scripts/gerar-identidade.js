/*
  Monta o kit de identidade visual a partir do logo vetorizado.

    node scripts/vetorizar-logo.js "../docs/origem/<arquivo>.jpeg" scripts/trace.json
    node scripts/gerar-identidade.js

  Gera os SVGs e PNGs em "../docs/" e copia para o site os
  arquivos que ele consome. Os PNGs saem do Chrome em modo headless.
*/

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const CHROME =
  process.env.CHROME ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const KIT = path.resolve(__dirname, "../../docs");
const trace = JSON.parse(fs.readFileSync(path.join(__dirname, "trace.json"), "utf8"));

/*
  Cores em sRGB.

  O JPEG oficial está em CMYK (perfil genérico, arquivo de impressão). Ler os
  bytes como RGB dá valores errados — estes vieram do próprio navegador
  renderizando o arquivo com gestão de cor, que é como todo mundo o vê.
*/
const COR = {
  verde: "#1e5c42",
  folha: "#708768",
  cereja: "#783537",
  branco: "#ffffff",
};

const S = trace.simbolo.traco; // referência de tamanho do símbolo
const W = trace.wordmark;

// Espaçamento entre símbolo e wordmark, e margem interna do selo.
const ESPACO = Math.round(S.height * 0.09);
const MARGEM = Math.round(S.width * 0.17);

function caminho(...partes) {
  const destino = path.join(KIT, ...partes);
  fs.mkdirSync(path.dirname(destino), { recursive: true });
  return destino;
}

function salvar(destino, conteudo) {
  fs.writeFileSync(destino, conteudo);
  console.log(path.relative(KIT, destino));
}

/** Paths do símbolo. `linha` usa só o traço; `cor` traz folhas e cerejas. */
function simboloPaths({ estilo, traco }) {
  const p = trace.simbolo;
  if (estilo === "linha") {
    return `<path fill-rule="evenodd" fill="${traco}" d="${p.traco.d}"/>`;
  }
  return [
    `<path fill-rule="evenodd" fill="${COR.folha}" d="${p.folhas.d}"/>`,
    `<path fill-rule="evenodd" fill="${COR.cereja}" d="${p.cerejas.d}"/>`,
    `<path fill-rule="evenodd" fill="${traco}" d="${p.traco.d}"/>`,
  ].join("\n  ");
}

function wordmarkPath(cor) {
  return `<path fill-rule="evenodd" fill="${cor}" d="${W.d}"/>`;
}

/** Logo completo: símbolo sobre wordmark. */
function logo({ estilo, traco, fundo, arquivo }) {
  const largura = Math.max(S.width, W.width) + MARGEM * 2;
  const altura = S.height + ESPACO + W.height + MARGEM * 2;
  const xSimbolo = (largura - S.width) / 2;
  const xWordmark = (largura - W.width) / 2;
  const yWordmark = MARGEM + S.height + ESPACO;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${largura} ${altura}" width="${largura}" height="${altura}">
  ${fundo ? `<rect width="${largura}" height="${altura}" fill="${fundo}"/>` : ""}
  <g transform="translate(${xSimbolo} ${MARGEM})">
  ${simboloPaths({ estilo, traco })}
  </g>
  <g transform="translate(${xWordmark} ${yWordmark})">
  ${wordmarkPath(traco)}
  </g>
</svg>
`;
  salvar(caminho("logo", arquivo), svg);
  return { largura, altura, caminho: caminho("logo", arquivo) };
}

/** Só o símbolo, em quadrado. */
function icone({ estilo, traco, fundo, arquivo, pasta = "icone" }) {
  const lado = S.height + MARGEM * 2;
  const x = (lado - S.width) / 2;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${lado} ${lado}" width="${lado}" height="${lado}">
  ${fundo ? `<rect width="${lado}" height="${lado}" fill="${fundo}"/>` : ""}
  <g transform="translate(${x} ${MARGEM})">
  ${simboloPaths({ estilo, traco })}
  </g>
</svg>
`;
  salvar(caminho(pasta, arquivo), svg);
  return { lado, caminho: caminho(pasta, arquivo) };
}

/** SVG do wordmark sem margem — usado no lockup do site, onde o respiro
    já vem do espaçamento do layout. */
function svgWordmarkJusto(cor) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W.width} ${W.height}" width="${W.width}" height="${W.height}">
  ${wordmarkPath(cor)}
</svg>
`;
}

/** Só a escrita, com margem de respiro, para uso solto. */
function wordmark({ cor, arquivo }) {
  const margem = Math.round(W.height * 0.25);
  const largura = W.width + margem * 2;
  const altura = W.height + margem * 2;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${largura} ${altura}" width="${largura}" height="${altura}">
  <g transform="translate(${margem} ${margem})">
  ${wordmarkPath(cor)}
  </g>
</svg>
`;
  salvar(caminho("wordmark", arquivo), svg);
  return { largura, altura, caminho: caminho("wordmark", arquivo) };
}

/** Renderiza um SVG (ou HTML) em PNG no tamanho pedido. */
function png(origem, destino, largura, altura, transparente) {
  const args = [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    `--window-size=${largura},${altura}`,
    `--screenshot=${destino}`,
  ];
  if (transparente) args.push("--default-background-color=00000000");
  args.push(`file://${origem}`);
  execFileSync(CHROME, args, { stdio: "ignore" });
  console.log(path.relative(KIT, destino));
}

/** Embrulha um SVG em HTML ocupando a janela inteira — PNG sem borda sobrando. */
function htmlDoSvg(svgPath, fundo) {
  // Tira width/height SÓ da tag <svg> — num replace global isso apagaria
  // também os atributos do <rect> de fundo, e o fundo sumiria.
  const svg = fs
    .readFileSync(svgPath, "utf8")
    .replace(/<svg[^>]*>/, (tag) => tag.replace(/ (width|height)="\d+"/g, ""));
  const html = `<!doctype html><meta charset="utf-8">
<style>
  html,body{margin:0;height:100%;background:${fundo || "transparent"}}
  svg{display:block;width:100%;height:100%}
</style>
${svg}`;
  const destino = svgPath.replace(/\.svg$/, ".tmp.html");
  fs.writeFileSync(destino, html);
  return destino;
}

function exportar(svgPath, largura, altura, { fundo, transparente } = {}) {
  const html = htmlDoSvg(svgPath, fundo);
  png(html, svgPath.replace(/\.svg$/, ".png"), largura, altura, transparente);
  fs.unlinkSync(html);
}

// ---------------------------------------------------------------- 01 · logo
const principal = logo({
  estilo: "cor",
  traco: COR.branco,
  fundo: COR.verde,
  arquivo: "coffee-body-logo-principal.svg",
});
exportar(principal.caminho, 1200, Math.round((1200 * principal.altura) / principal.largura));

const claro = logo({
  estilo: "cor",
  traco: COR.verde,
  fundo: null,
  arquivo: "coffee-body-logo-fundo-claro.svg",
});
exportar(claro.caminho, 1200, Math.round((1200 * claro.altura) / claro.largura), {
  transparente: true,
});

const branco = logo({
  estilo: "linha",
  traco: COR.branco,
  fundo: null,
  arquivo: "coffee-body-logo-branco.svg",
});
exportar(branco.caminho, 1200, Math.round((1200 * branco.altura) / branco.largura), {
  transparente: true,
});

const verdeMono = logo({
  estilo: "linha",
  traco: COR.verde,
  fundo: null,
  arquivo: "coffee-body-logo-monocromatico-verde.svg",
});
exportar(
  verdeMono.caminho,
  1200,
  Math.round((1200 * verdeMono.altura) / verdeMono.largura),
  { transparente: true },
);

// --------------------------------------------------------------- 02 · ícone
const iconeSelo = icone({
  estilo: "cor",
  traco: COR.branco,
  fundo: COR.verde,
  arquivo: "coffee-body-icone-selo-verde.svg",
});
exportar(iconeSelo.caminho, 1024, 1024);

const iconeClaro = icone({
  estilo: "cor",
  traco: COR.verde,
  fundo: null,
  arquivo: "coffee-body-icone-fundo-claro.svg",
});
exportar(iconeClaro.caminho, 1024, 1024, { transparente: true });

const iconeBranco = icone({
  estilo: "linha",
  traco: COR.branco,
  fundo: null,
  arquivo: "coffee-body-icone-branco.svg",
});
exportar(iconeBranco.caminho, 1024, 1024, { transparente: true });

// ------------------------------------------------------------ 03 · wordmark
const wmVerde = wordmark({ cor: COR.verde, arquivo: "coffee-body-wordmark-verde.svg" });
exportar(wmVerde.caminho, 1600, Math.round((1600 * wmVerde.altura) / wmVerde.largura), {
  transparente: true,
});

const wmBranco = wordmark({ cor: COR.branco, arquivo: "coffee-body-wordmark-branco.svg" });
exportar(
  wmBranco.caminho,
  1600,
  Math.round((1600 * wmBranco.altura) / wmBranco.largura),
  { transparente: true },
);

// ----------------------------------------------------------------- 04 · web
/* Favicon: a escrita branca sobre o verde da marca. Em miniatura o wordmark
   é mais reconhecível que o traço fino do símbolo. */
function faviconWordmark(arquivo) {
  const lado = 1000;
  const escala = (lado * 0.84) / W.width;
  const largura = W.width * escala;
  const altura = W.height * escala;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${lado} ${lado}" width="${lado}" height="${lado}">
  <rect width="${lado}" height="${lado}" fill="${COR.verde}"/>
  <g transform="translate(${(lado - largura) / 2} ${(lado - altura) / 2}) scale(${escala})">
  ${wordmarkPath(COR.branco)}
  </g>
</svg>
`;
  salvar(caminho("web", arquivo), svg);
  return caminho("web", arquivo);
}

const favicon = { caminho: faviconWordmark("favicon.svg") };
exportar(favicon.caminho, 512, 512);
const faviconHtml = htmlDoSvg(favicon.caminho, COR.verde);
png(faviconHtml, caminho("web", "apple-touch-icon.png"), 180, 180);
fs.unlinkSync(faviconHtml);

// Open Graph: logo branco centralizado sobre o verde da marca.
const ogHtml = caminho("web", "og-image.tmp.html");
fs.writeFileSync(
  ogHtml,
  `<!doctype html><meta charset="utf-8">
<style>
  html,body{margin:0;height:100%;background:${COR.verde};display:flex;align-items:center;justify-content:center}
  img{height:78%}
</style>
<img src="${path.relative(path.dirname(ogHtml), branco.caminho.replace(/\.svg$/, ".png"))}">`,
);
png(ogHtml, caminho("web", "og-image.png"), 1200, 630);
fs.unlinkSync(ogHtml);

// ------------------------------------------------- arquivos usados pelo site
const site = path.resolve(__dirname, "..");
fs.copyFileSync(iconeSelo.caminho, path.join(site, "public/logo-simbolo.svg"));
fs.copyFileSync(iconeBranco.caminho, path.join(site, "public/logo-simbolo-branco.svg"));
fs.writeFileSync(path.join(site, "public/logo-wordmark-verde.svg"), svgWordmarkJusto(COR.verde));
fs.writeFileSync(path.join(site, "public/logo-wordmark-branco.svg"), svgWordmarkJusto(COR.branco));
fs.copyFileSync(caminho("web", "favicon.png"), path.join(site, "app/icon.png"));
fs.copyFileSync(
  caminho("web", "apple-touch-icon.png"),
  path.join(site, "app/apple-icon.png"),
);
fs.copyFileSync(caminho("web", "og-image.png"), path.join(site, "public/og-image.png"));
console.log("\nsite: logo-simbolo{,-branco}.svg, logo-wordmark-{verde,branco}.svg, app/icon.png, app/apple-icon.png, public/og-image.png");
