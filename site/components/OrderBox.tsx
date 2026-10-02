"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { HiMinus, HiPlus } from "react-icons/hi2";
import {
  MOAGENS,
  pesosDisponiveis,
  type Cafe,
  type Moagem,
  type Peso,
} from "@/data/products";
import { formatPrice } from "@/lib/format";
import { whatsappPedido } from "@/lib/whatsapp";

const opcao =
  "rounded-xl border px-4 py-3 text-sm font-medium transition-colors cursor-pointer";
const opcaoAtiva = "border-forest bg-forest text-bone";
const opcaoInativa = "border-sand bg-white/60 text-forest hover:border-brand";

export default function OrderBox({ cafe }: { cafe: Cafe }) {
  const pesos = pesosDisponiveis(cafe);
  const [peso, setPeso] = useState<Peso>(pesos[0]);
  const [moagem, setMoagem] = useState<Moagem>(cafe.moagens[0]);
  const [quantidade, setQuantidade] = useState(1);

  const unitario = cafe.precos[peso];
  const total = typeof unitario === "number" ? unitario * quantidade : null;

  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-sand bg-white/70 p-6 sm:p-8">
      <fieldset className="flex flex-col gap-3">
        <legend className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          Peso
        </legend>
        <div className="flex flex-wrap gap-2">
          {pesos.map((valor) => (
            <button
              key={valor}
              type="button"
              onClick={() => setPeso(valor)}
              aria-pressed={peso === valor}
              className={`${opcao} ${peso === valor ? opcaoAtiva : opcaoInativa}`}
            >
              {valor}
              <span className="ml-2 text-xs opacity-70">
                {formatPrice(cafe.precos[valor] as number)}
              </span>
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-3">
        <legend className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          Moagem
        </legend>
        <div className="flex flex-wrap gap-2">
          {cafe.moagens.map((valor) => (
            <button
              key={valor}
              type="button"
              onClick={() => setMoagem(valor)}
              aria-pressed={moagem === valor}
              className={`${opcao} ${moagem === valor ? opcaoAtiva : opcaoInativa}`}
            >
              {MOAGENS[valor]}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted">
          Moemos no momento do envio. Grãos inteiros preservam mais aroma.
        </p>
      </fieldset>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-sand pt-6">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            Qtd
          </span>
          <div className="flex items-center gap-1 rounded-full border border-sand bg-white/80">
            <button
              type="button"
              onClick={() => setQuantidade((valor) => Math.max(1, valor - 1))}
              disabled={quantidade <= 1}
              aria-label="Diminuir quantidade"
              className="rounded-full p-2.5 text-forest disabled:opacity-30"
            >
              <HiMinus />
            </button>
            <span aria-live="polite" className="w-8 text-center text-sm font-semibold">
              {quantidade}
            </span>
            <button
              type="button"
              onClick={() => setQuantidade((valor) => Math.min(20, valor + 1))}
              disabled={quantidade >= 20}
              aria-label="Aumentar quantidade"
              className="rounded-full p-2.5 text-forest disabled:opacity-30"
            >
              <HiPlus />
            </button>
          </div>
        </div>

        {total !== null && (
          <div className="text-right">
            <span className="block text-xs text-muted">Total sem frete</span>
            <span className="font-display text-2xl text-forest">
              {formatPrice(total)}
            </span>
          </div>
        )}
      </div>

      {cafe.disponivel ? (
        <>
          <a
            href={whatsappPedido({ cafe, peso, moagem, quantidade })}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-sm font-semibold text-bone transition-colors hover:bg-brand-dark"
          >
            <FaWhatsapp aria-hidden className="text-lg" />
            Pedir no WhatsApp
          </a>
          <p className="text-xs leading-relaxed text-muted">
            O pedido abre no WhatsApp já preenchido. Confirmamos o frete pelo seu CEP e
            enviamos o link de pagamento com PIX ou cartão.
          </p>
        </>
      ) : (
        <div className="rounded-2xl border border-sand bg-sand/40 p-5 text-sm text-muted">
          Esse lote esgotou. Fale com a gente no WhatsApp para avisarmos quando a
          próxima safra chegar.
        </div>
      )}
    </div>
  );
}
