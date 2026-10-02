import { HiOutlineClock, HiOutlineMapPin, HiOutlinePhone } from "react-icons/hi2";
import { FaInstagram } from "react-icons/fa6";
import { contact, openingHours, store, storeFullAddress } from "@/lib/site";

export default function StoreInfo() {
  return (
    <dl className="grid gap-6 sm:grid-cols-2">
      <div className="flex gap-3 rounded-2xl border border-sand bg-white/60 p-5">
        <HiOutlineMapPin aria-hidden className="mt-1 shrink-0 text-xl text-brand" />
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            Endereço
          </dt>
          <dd className="mt-1 text-sm leading-relaxed text-forest">
            {storeFullAddress}
            <a
              href={store.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block font-semibold text-brand hover:text-brand-dark"
            >
              Abrir no Google Maps →
            </a>
          </dd>
        </div>
      </div>

      <div className="flex gap-3 rounded-2xl border border-sand bg-white/60 p-5">
        <HiOutlineClock aria-hidden className="mt-1 shrink-0 text-xl text-brand" />
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            Horário
          </dt>
          <dd className="mt-1 text-sm leading-relaxed text-forest">
            <ul>
              {openingHours.map((horario) => (
                <li key={horario.label}>
                  {horario.label}:{" "}
                  {horario.opens && horario.closes
                    ? `${horario.opens} às ${horario.closes}`
                    : "fechado"}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </div>

      <div className="flex gap-3 rounded-2xl border border-sand bg-white/60 p-5">
        <HiOutlinePhone aria-hidden className="mt-1 shrink-0 text-xl text-brand" />
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            Telefone
          </dt>
          <dd className="mt-1 text-sm text-forest">
            <a href={contact.phoneHref} className="hover:text-brand">
              {contact.phone}
            </a>
          </dd>
        </div>
      </div>

      <div className="flex gap-3 rounded-2xl border border-sand bg-white/60 p-5">
        <FaInstagram aria-hidden className="mt-1 shrink-0 text-xl text-brand" />
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            Instagram
          </dt>
          <dd className="mt-1 text-sm text-forest">
            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand"
            >
              {contact.instagramHandle}
            </a>
          </dd>
        </div>
      </div>
    </dl>
  );
}
