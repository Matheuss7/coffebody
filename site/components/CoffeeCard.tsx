import Link from "next/link";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa6";
import { PiCoffeeBeanFill } from "react-icons/pi";
import {
  PROCESSOS_CURTO,
  TORRAS,
  pesosDisponiveis,
  precoMinimo,
  type Cafe,
} from "@/data/products";
import { formatPrice } from "@/lib/format";
import { publicAsset } from "@/lib/paths";
import { whatsappPedido } from "@/lib/whatsapp";

export function ProductImage({
  cafe,
  className = "",
  priority = false,
}: {
  cafe: Cafe;
  className?: string;
  priority?: boolean;
}) {
  if (!cafe.imagem) {
    return (
      <div
        className={`flex items-center justify-center bg-sand ${className}`}
        role="img"
        aria-label={`Foto de ${cafe.nome} em breve`}
      >
        <PiCoffeeBeanFill aria-hidden className="text-5xl text-brand/30" />
      </div>
    );
  }

  return (
    <Image
      src={publicAsset(cafe.imagem as `/${string}`)}
      alt={`Pacote de café ${cafe.nome}`}
      width={800}
      height={800}
      priority={priority}
      className={`object-cover ${className}`}
    />
  );
}

export default function CoffeeCard({ cafe }: { cafe: Cafe }) {
  const preco = precoMinimo(cafe);
  const menorPeso = pesosDisponiveis(cafe)[0];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-sand bg-white">
      <Link
        href={`/cafes/${cafe.slug}`}
        aria-hidden
        tabIndex={-1}
        className="relative block overflow-hidden"
      >
        <ProductImage
          cafe={cafe}
          className="aspect-4/3 w-full transition-transform duration-700 group-hover:scale-105"
        />
        {!cafe.disponivel && (
          <span className="absolute left-4 top-4 rounded-full bg-forest/90 px-3 py-1 text-xs font-semibold text-bone">
            Esgotado
          </span>
        )}
      </Link>

      {/* Faixa sólida: identifica o lote e fecha o pedido sem sair do catálogo. */}
      <div className="flex flex-1 flex-col gap-4 bg-forest p-6 text-bone">
        <div className="flex flex-col gap-2">
          {cafe.produtor && (
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-brand-light">
              Produzido por {cafe.produtor}
            </span>
          )}
          <h3 className="font-display text-lg uppercase leading-tight tracking-tight">
            <Link
              href={`/cafes/${cafe.slug}`}
              className="transition-colors hover:text-brand-light"
            >
              {cafe.nome}
            </Link>
          </h3>
          <p className="text-[0.7rem] uppercase leading-relaxed tracking-[0.1em] text-bone/60">
            {cafe.notas.join(" · ")}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-2 text-[0.65rem] uppercase tracking-[0.14em] text-bone/50">
          <span>{TORRAS[cafe.torra]}</span>
          <span aria-hidden>·</span>
          <span>{PROCESSOS_CURTO[cafe.processo]}</span>
          <span aria-hidden>·</span>
          <span>{cafe.origem.regiao}</span>
        </div>

        <div className="mt-auto flex flex-col gap-3 border-t border-bone/15 pt-4">
          {preco !== null && menorPeso ? (
            <p className="font-display text-2xl">
              {formatPrice(preco)}
              <span className="ml-2 align-middle text-[0.7rem] font-normal uppercase tracking-[0.14em] text-bone/50">
                {menorPeso}
              </span>
            </p>
          ) : (
            <p className="text-sm text-bone/60">Consulte</p>
          )}

          <div className="grid gap-2 sm:grid-cols-2">
            <Link
              href={`/cafes/${cafe.slug}`}
              className="inline-flex items-center justify-center rounded-full border border-bone/30 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] transition-colors hover:bg-bone/10"
            >
              Saiba mais
            </Link>
            {cafe.disponivel && menorPeso && (
              <a
                href={whatsappPedido({
                  cafe,
                  peso: menorPeso,
                  moagem: cafe.moagens[0],
                  quantidade: 1,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-light px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-forest transition-colors hover:bg-bone"
              >
                <FaWhatsapp aria-hidden />
                Pedir
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
