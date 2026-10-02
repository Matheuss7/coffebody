import Link from "next/link";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { HiOutlineClock, HiOutlineMapPin, HiOutlinePhone } from "react-icons/hi2";
import {
  contact,
  footerNav,
  nav,
  openingHours,
  siteConfig,
  store,
  storeFullAddress,
} from "@/lib/site";
import { whatsappGeral } from "@/lib/whatsapp";
import { Container } from "@/components/Sections";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="grain mt-auto bg-forest text-bone/80">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Logo tone="light" markClassName="h-12 w-auto" />
          <p className="text-sm leading-relaxed">{siteConfig.tagline}</p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da Coffee Body"
              className="rounded-full border border-bone/20 p-2.5 transition-colors hover:bg-bone/10"
            >
              <FaInstagram />
            </a>
            <a
              href={whatsappGeral()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp da Coffee Body"
              className="rounded-full border border-bone/20 p-2.5 transition-colors hover:bg-bone/10"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>

        <nav aria-label="Navegação do rodapé" className="flex flex-col gap-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-light">
            Navegue
          </h2>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm transition-colors hover:text-bone"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <nav aria-label="Informações" className="flex flex-col gap-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-light">
            Informações
          </h2>
          {footerNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm transition-colors hover:text-bone"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-light">
            Onde estamos
          </h2>
          <a
            href={store.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-2 text-sm transition-colors hover:text-bone"
          >
            <HiOutlineMapPin aria-hidden className="mt-0.5 shrink-0" />
            <span>{storeFullAddress}</span>
          </a>
          <a
            href={contact.phoneHref}
            className="flex items-center gap-2 text-sm transition-colors hover:text-bone"
          >
            <HiOutlinePhone aria-hidden className="shrink-0" />
            {contact.phone}
          </a>
          <div className="flex gap-2 text-sm">
            <HiOutlineClock aria-hidden className="mt-0.5 shrink-0" />
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
          </div>
        </div>
      </Container>

      <div className="border-t border-bone/10">
        <Container className="flex flex-col gap-2 py-6 text-xs text-bone/60 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {siteConfig.legalName}
          </span>
          <span>Torrado em São José, Santa Catarina.</span>
        </Container>
      </div>
    </footer>
  );
}
