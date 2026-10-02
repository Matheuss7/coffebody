import Image from "next/image";
import { publicAsset } from "@/lib/paths";

/*
  Marca da Coffee Body.

  Tudo vem do kit em `identidade visual/`, gerado por `scripts/vetorizar-logo.js`
  + `scripts/gerar-identidade.js` a partir do logo oficial. São SVGs — nada aqui
  é redesenho, nem o wordmark.

  O wordmark é imagem, e não texto, de propósito: no logo original "COFFEE" e
  "BODY" têm a mesma largura (as letras de BODY são maiores para fechar o
  bloco). Com texto em fonte comum as duas linhas sairiam desalinhadas.
*/

export function LogoMark({
  className = "",
  variante = "selo",
  alt = "",
}: {
  className?: string;
  variante?: "selo" | "branco";
  /** Vazio quando o símbolo é decorativo e o nome aparece ao lado. */
  alt?: string;
}) {
  const arquivo =
    variante === "selo" ? "/logo-simbolo.svg" : "/logo-simbolo-branco.svg";

  return (
    <Image
      src={publicAsset(arquivo)}
      alt={alt}
      width={512}
      height={512}
      priority={variante === "selo"}
      className={className}
    />
  );
}

export function LogoWordmark({
  className = "",
  tone = "dark",
  alt = "",
}: {
  className?: string;
  tone?: "dark" | "light";
  alt?: string;
}) {
  const arquivo =
    tone === "light" ? "/logo-wordmark-branco.svg" : "/logo-wordmark-verde.svg";

  return (
    <Image
      src={publicAsset(arquivo)}
      alt={alt}
      width={670}
      height={356}
      className={className}
    />
  );
}

export default function Logo({
  className = "",
  markClassName = "h-11 w-auto",
  wordmarkClassName = "h-7 w-auto sm:h-8",
  tone = "dark",
}: {
  className?: string;
  /** Classe do símbolo — controla o tamanho. */
  markClassName?: string;
  /** Classe da escrita. */
  wordmarkClassName?: string;
  /** `dark` para fundo claro, `light` para fundo escuro. */
  tone?: "dark" | "light";
}) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark
        variante={tone === "light" ? "branco" : "selo"}
        className={`${markClassName} ${tone === "dark" ? "rounded-xl" : ""}`}
      />
      <LogoWordmark tone={tone} className={wordmarkClassName} alt="Coffee Body" />
    </span>
  );
}
