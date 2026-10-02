"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { MOAGENS } from "@/data/products";
import type { Moagem } from "@/data/products";
import {
  FREQUENCIAS,
  moagensClube,
  planos,
  type Frequencia,
} from "@/data/subscription";
import { formatPrice } from "@/lib/format";
import { whatsappAssinatura } from "@/lib/whatsapp";

const opcao =
  "rounded-xl border px-4 py-3 text-sm font-medium transition-colors cursor-pointer text-left";
const ativa = "border-brand bg-brand text-bone";
const inativa = "border-sand bg-white text-forest hover:border-brand";

export default function SubscriptionBox() {
  const [pesoIndice, setPesoIndice] = useState(
    Math.max(0, planos.findIndex((plano) => plano.recomendado)),
  );
  const [frequencia, setFrequencia] = useState<Frequencia>("mensal");
  const [moagem, setMoagem] = useState<Moagem>("graos");

  const plano = planos[pesoIndice];

  return (
    <div className="flex flex-col gap-7 rounded-3xl border border-sand bg-white/80 p-6 sm:p-8">
      <fieldset className="flex flex-col gap-3">
        <legend className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          Quanto café por entrega
        </legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          {planos.map((item, indice) => (
            <button
              key={item.peso}
              type="button"
              onClick={() => setPesoIndice(indice)}
              aria-pressed={pesoIndice === indice}
              className={`${opcao} ${pesoIndice === indice ? ativa : inativa} relative flex flex-col gap-1`}
            >
              {item.recomendado && (
                <span
                  className={`absolute -top-2 right-3 rounded-full px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.12em] ${
                    pesoIndice === indice
                      ? "bg-bone text-brand"
                      : "bg-brand text-bone"
                  }`}
                >
                  Mais pedido
                </span>
              )}
              <span className="font-display text-base">{item.peso}</span>
              <span className="text-xs opacity-75">{formatPrice(item.preco)}</span>
            </button>
          ))}
        </div>
        <p className="text-xs leading-relaxed text-muted">{plano.descricao}</p>
      </fieldset>

      <fieldset className="flex flex-col gap-3">
        <legend className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          Com que frequência
        </legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(FREQUENCIAS) as Frequencia[]).map((valor) => (
            <button
              key={valor}
              type="button"
              onClick={() => setFrequencia(valor)}
              aria-pressed={frequencia === valor}
              className={`${opcao} ${frequencia === valor ? ativa : inativa} text-center`}
            >
              {FREQUENCIAS[valor]}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-3">
        <legend className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          Moagem
        </legend>
        <div className="flex flex-wrap gap-2">
          {moagensClube.map((valor) => (
            <button
              key={valor}
              type="button"
              onClick={() => setMoagem(valor)}
              aria-pressed={moagem === valor}
              className={`${opcao} ${moagem === valor ? ativa : inativa}`}
            >
              {MOAGENS[valor]}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted">
          Dá para trocar a moagem a qualquer momento, sem mexer na assinatura.
        </p>
      </fieldset>

      <div className="flex flex-wrap items-end justify-between gap-4 border-t border-sand pt-6">
        <div>
          <span className="block text-xs uppercase tracking-[0.14em] text-muted">
            {FREQUENCIAS[frequencia]} · {plano.peso}
          </span>
          <span className="font-display text-3xl text-forest">
            {formatPrice(plano.preco)}
          </span>
          <span className="ml-2 text-xs text-muted">por entrega, sem frete</span>
        </div>
      </div>

      <a
        href={whatsappAssinatura({
          peso: plano.peso,
          frequencia: FREQUENCIAS[frequencia],
          moagem,
          preco: plano.preco,
        })}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-sm font-semibold text-bone transition-colors hover:bg-brand-dark"
      >
        <FaWhatsapp aria-hidden className="text-lg" />
        Assinar pelo WhatsApp
      </a>

      <p className="text-xs leading-relaxed text-muted">
        A assinatura é combinada no atendimento: confirmamos o endereço, o frete e a
        data da primeira entrega, e enviamos o link de pagamento. Sem fidelidade e sem
        taxa de cancelamento.
      </p>
    </div>
  );
}
