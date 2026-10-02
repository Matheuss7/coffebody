import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa6";
import { HiArrowDown, HiOutlineClock, HiOutlineMapPin } from "react-icons/hi2";
import { Container } from "@/components/Sections";
import { ButtonLink } from "@/components/Button";
import { LogoMark } from "@/components/Logo";
import { hero } from "@/data/content";
import { heroImage, openingHours, store, storeFullAddress } from "@/lib/site";
import { publicAsset } from "@/lib/paths";
import { whatsappGeral } from "@/lib/whatsapp";

export default function Hero() {
  const horarioPrincipal = openingHours[0];

  return (
    <section className="relative isolate overflow-hidden bg-forest text-bone">
      {/* Fundo: foto da loja quando existir; enquanto não, gradiente da marca. */}
      {heroImage ? (
        <Image
          src={publicAsset(heroImage)}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
      ) : (
        <div
          aria-hidden
          className="grain absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_15%_0%,var(--color-brand)_0%,var(--color-forest)_55%,#032f05_100%)]"
        >
          <LogoMark
            variante="branco"
            className="absolute -right-20 top-1/2 h-[118%] w-auto -translate-y-1/2 opacity-[0.07]"
          />
        </div>
      )}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-forest/95 via-forest/70 to-transparent"
      />

      {/* O teto em px evita um hero gigante em monitores muito altos. */}
      <Container className="flex min-h-[min(72vh,600px)] flex-col justify-center gap-12 pb-12 pt-24 sm:min-h-[min(78vh,760px)] sm:pb-14 sm:pt-28">
        <div className="flex max-w-3xl flex-col gap-6">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-light">
            {hero.eyebrow}
          </span>
          <h1 className="font-display text-[2.6rem] leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            {hero.title}
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-bone/75 sm:text-lg">
            {hero.subtitle}
          </p>

          <div className="flex flex-wrap gap-3 pt-3">
            <ButtonLink href={hero.ctaPrimary.href} variant="light">
              {hero.ctaPrimary.label}
            </ButtonLink>
            <a
              href={whatsappGeral()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-bone/30 px-6 py-3 text-sm font-semibold text-bone transition-colors hover:bg-bone/10"
            >
              <FaWhatsapp aria-hidden className="text-base" />
              Pedir no WhatsApp
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4 border-t border-bone/15 pt-8 text-sm text-bone/70">
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <a
              href={store.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-bone"
            >
              <HiOutlineMapPin aria-hidden className="text-brand-light" />
              {storeFullAddress}
            </a>
            <span className="flex items-center gap-2">
              <HiOutlineClock aria-hidden className="text-brand-light" />
              {horarioPrincipal.label}, {horarioPrincipal.opens} às{" "}
              {horarioPrincipal.closes}
            </span>
          </div>

          <a
            href="#destaques"
            className="hidden items-center gap-2 text-xs uppercase tracking-[0.2em] transition-colors hover:text-bone lg:flex"
          >
            Role
            <HiArrowDown
              aria-hidden
              className="motion-safe:animate-[scroll-cue_1.8s_ease-in-out_infinite]"
            />
          </a>
        </div>
      </Container>
    </section>
  );
}
