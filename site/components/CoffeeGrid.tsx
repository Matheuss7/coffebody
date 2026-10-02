"use client";

import { useMemo, useState } from "react";
import CoffeeCard from "@/components/CoffeeCard";
import { PROCESSOS, TORRAS, type Cafe, type Processo, type Torra } from "@/data/products";

type FiltroTorra = Torra | "todas";
type FiltroProcesso = Processo | "todos";

const chip =
  "rounded-full border px-4 py-2 text-sm font-medium transition-colors cursor-pointer";
const chipAtivo = "border-forest bg-forest text-bone";
const chipInativo = "border-sand text-muted hover:border-brand hover:text-forest";

export default function CoffeeGrid({ cafes }: { cafes: Cafe[] }) {
  const [torra, setTorra] = useState<FiltroTorra>("todas");
  const [processo, setProcesso] = useState<FiltroProcesso>("todos");

  const torrasDisponiveis = useMemo(
    () => (Object.keys(TORRAS) as Torra[]).filter((t) => cafes.some((c) => c.torra === t)),
    [cafes],
  );

  const processosDisponiveis = useMemo(
    () =>
      (Object.keys(PROCESSOS) as Processo[]).filter((p) =>
        cafes.some((c) => c.processo === p),
      ),
    [cafes],
  );

  const filtrados = useMemo(
    () =>
      cafes.filter(
        (cafe) =>
          (torra === "todas" || cafe.torra === torra) &&
          (processo === "todos" || cafe.processo === processo),
      ),
    [cafes, torra, processo],
  );

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <fieldset className="flex flex-wrap items-center gap-2">
          <legend className="mb-2 w-full text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            Torra
          </legend>
          <button
            type="button"
            onClick={() => setTorra("todas")}
            aria-pressed={torra === "todas"}
            className={`${chip} ${torra === "todas" ? chipAtivo : chipInativo}`}
          >
            Todas
          </button>
          {torrasDisponiveis.map((valor) => (
            <button
              key={valor}
              type="button"
              onClick={() => setTorra(valor)}
              aria-pressed={torra === valor}
              className={`${chip} ${torra === valor ? chipAtivo : chipInativo}`}
            >
              {TORRAS[valor]}
            </button>
          ))}
        </fieldset>

        <fieldset className="flex flex-wrap items-center gap-2">
          <legend className="mb-2 w-full text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            Processo
          </legend>
          <button
            type="button"
            onClick={() => setProcesso("todos")}
            aria-pressed={processo === "todos"}
            className={`${chip} ${processo === "todos" ? chipAtivo : chipInativo}`}
          >
            Todos
          </button>
          {processosDisponiveis.map((valor) => (
            <button
              key={valor}
              type="button"
              onClick={() => setProcesso(valor)}
              aria-pressed={processo === valor}
              className={`${chip} ${processo === valor ? chipAtivo : chipInativo}`}
            >
              {PROCESSOS[valor]}
            </button>
          ))}
        </fieldset>
      </div>

      <p aria-live="polite" className="text-sm text-muted">
        {filtrados.length} {filtrados.length === 1 ? "café" : "cafés"}
      </p>

      {filtrados.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtrados.map((cafe) => (
            <CoffeeCard key={cafe.slug} cafe={cafe} />
          ))}
        </div>
      ) : (
        <p className="rounded-3xl border border-sand bg-sand/30 p-10 text-center text-muted">
          Nenhum café com essa combinação agora. Tente outro filtro.
        </p>
      )}
    </div>
  );
}
