import { PiCoffeeBeanFill } from "react-icons/pi";

/**
 * Faixa em movimento contínuo. A lista é duplicada para o loop não ter emenda;
 * a cópia fica com `aria-hidden` para o leitor de tela não ler duas vezes.
 */
export default function Marquee({
  itens,
  tone = "dark",
}: {
  itens: readonly string[];
  tone?: "dark" | "light";
}) {
  const cores =
    tone === "dark"
      ? "bg-forest text-bone/80 border-forest"
      : "bg-sand/60 text-muted border-sand";

  const faixa = (escondida: boolean) => (
    <ul
      aria-hidden={escondida || undefined}
      className="flex shrink-0 items-center gap-10 pr-10 motion-safe:animate-[marquee_38s_linear_infinite]"
    >
      {itens.map((item) => (
        <li
          key={item}
          className="flex shrink-0 items-center gap-3 text-xs font-medium uppercase tracking-[0.18em]"
        >
          <PiCoffeeBeanFill aria-hidden className="text-brand-light" />
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`overflow-hidden border-y py-3 ${cores}`}>
      <div className="flex w-max">
        {faixa(false)}
        {faixa(true)}
      </div>
    </div>
  );
}
