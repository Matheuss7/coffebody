/*
  Vetoriza o logo oficial separando as três cores da arte.

    node scripts/vetorizar-logo.js "<caminho do jpeg>" <saida.json>

  O JPEG oficial tem fundo verde chapado e três cores de arte: traço branco,
  folhas verde-sage e cerejas bordô. Para cada uma montamos uma máscara em
  preto e branco e passamos no potrace, obtendo um `path` por cor.
*/

const fs = require("fs");
const jpeg = require("jpeg-js");
const { PNG } = require("pngjs");
const potrace = require("potrace");

const [, , origemPath, saidaPath] = process.argv;
if (!origemPath || !saidaPath) {
  console.error("uso: node scripts/vetorizar-logo.js <jpeg> <saida.json>");
  process.exit(1);
}

const img = jpeg.decode(fs.readFileSync(origemPath), { useTArray: true });
const { width, height, data } = img;

function dist(r, g, b, alvo) {
  return Math.sqrt(
    (r - alvo[0]) ** 2 + (g - alvo[1]) ** 2 + (b - alvo[2]) ** 2,
  );
}

const FUNDO = [8, 106, 9];
const BRANCO = [255, 255, 255];
const FOLHA = [102, 164, 85];
const CEREJA = [113, 9, 13];

/** Classifica cada pixel pela cor mais próxima entre as quatro da arte. */
function classificar(r, g, b) {
  const opcoes = [
    ["fundo", dist(r, g, b, FUNDO)],
    ["branco", dist(r, g, b, BRANCO)],
    ["folha", dist(r, g, b, FOLHA)],
    ["cereja", dist(r, g, b, CEREJA)],
  ];
  opcoes.sort((a, b2) => a[1] - b2[1]);
  return opcoes[0][0];
}

/** Máscara preta (área a vetorizar) sobre branco, no recorte pedido. */
function mascara(classes, recorte) {
  const x0 = Math.round(recorte.x0 * width);
  const x1 = Math.round(recorte.x1 * width);
  const y0 = Math.round(recorte.y0 * height);
  const y1 = Math.round(recorte.y1 * height);
  const png = new PNG({ width: x1 - x0, height: y1 - y0 });

  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      const i = (y * width + x) * 4;
      const classe = classificar(data[i], data[i + 1], data[i + 2]);
      const dentro = classes.includes(classe);
      const j = ((y - y0) * png.width + (x - x0)) * 4;
      const v = dentro ? 0 : 255;
      png.data[j] = v;
      png.data[j + 1] = v;
      png.data[j + 2] = v;
      png.data[j + 3] = 255;
    }
  }
  return png;
}

function tracar(png) {
  return new Promise((resolve, reject) => {
    const tracer = new potrace.Potrace({
      threshold: 128,
      turdSize: 8,
      optCurve: true,
      optTolerance: 0.25,
      alphaMax: 1,
    });
    tracer.loadImage(PNG.sync.write(png), (erro) => {
      if (erro) return reject(erro);
      // Extrai só o atributo `d` do path gerado.
      const svg = tracer.getSVG();
      const d = [...svg.matchAll(/ d="([^"]+)"/g)].map((m) => m[1]).join(" ");
      resolve({ d, width: png.width, height: png.height });
    });
  });
}

// Enquadramentos medidos por projeção de pixels no arquivo oficial:
// o símbolo ocupa y 0.086–0.719 e o wordmark (duas linhas) y 0.733–0.892.
// Meio por cento de folga em volta para não raspar o traço.
const SIMBOLO = { x0: 0.277, y0: 0.081, x1: 0.723, y1: 0.724 };
const WORDMARK = { x0: 0.275, y0: 0.728, x1: 0.725, y1: 0.897 };

(async () => {
  const saida = {
    simbolo: {
      traco: await tracar(mascara(["branco"], SIMBOLO)),
      folhas: await tracar(mascara(["folha"], SIMBOLO)),
      cerejas: await tracar(mascara(["cereja"], SIMBOLO)),
      // Silhueta completa, para as versões monocromáticas.
      cheio: await tracar(mascara(["branco", "folha", "cereja"], SIMBOLO)),
    },
    wordmark: await tracar(mascara(["branco"], WORDMARK)),
  };

  fs.writeFileSync(saidaPath, JSON.stringify(saida, null, 2));
  for (const [nome, v] of Object.entries(saida.simbolo)) {
    console.log(`simbolo.${nome.padEnd(8)} ${v.width}x${v.height}  ${v.d.length} chars`);
  }
  console.log(
    `wordmark          ${saida.wordmark.width}x${saida.wordmark.height}  ${saida.wordmark.d.length} chars`,
  );
})();
