import { HiOutlineCreditCard, HiOutlineFire, HiOutlineShoppingBag, HiOutlineTruck } from "react-icons/hi2";
import { Container } from "@/components/Sections";
import { confianca } from "@/data/content";

const icones = {
  frete: HiOutlineTruck,
  parcelamento: HiOutlineCreditCard,
  torra: HiOutlineFire,
  retirada: HiOutlineShoppingBag,
} as const;

export default function TrustBar() {
  return (
    <div className="border-b border-sand bg-bone">
      <Container>
        <ul className="grid gap-x-8 gap-y-6 py-7 sm:grid-cols-2 lg:grid-cols-4">
          {confianca.map((item) => {
            const Icone = icones[item.icone];
            return (
              <li key={item.titulo} className="flex items-start gap-3">
                <Icone aria-hidden className="mt-0.5 shrink-0 text-xl text-brand" />
                <div>
                  <p className="text-sm font-semibold text-forest">{item.titulo}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted">
                    {item.texto}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </div>
  );
}
