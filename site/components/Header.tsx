"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { nav, siteConfig } from "@/lib/site";
import { whatsappGeral } from "@/lib/whatsapp";
import { Container } from "@/components/Sections";
import Logo from "@/components/Logo";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [escondido, setEscondido] = useState(false);
  const [noTopo, setNoTopo] = useState(true);
  const ultimoY = useRef(0);

  // Esconde ao rolar para baixo, reaparece ao subir. Com o menu aberto, fica fixo.
  useEffect(() => {
    const aoRolar = () => {
      const y = window.scrollY;
      setNoTopo(y < 12);
      setEscondido(y > 140 && y > ultimoY.current && !open);
      ultimoY.current = y;
    };

    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[transform,background-color,box-shadow,border-color] duration-300 ${
        escondido ? "-translate-y-full" : "translate-y-0"
      } ${
        noTopo
          ? "border-transparent bg-bone"
          : "border-sand bg-bone/92 shadow-[0_8px_30px_rgba(22,36,28,0.07)] backdrop-blur"
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-20">
        <Link
          href="/"
          aria-label="Coffee Body — página inicial"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <Logo markClassName="h-11 w-auto" />
          <span className="hidden text-[0.6rem] uppercase leading-tight tracking-[0.18em] text-muted sm:block">
            Torrefação
            <br />
            São José · SC
          </span>
        </Link>

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-forest transition-colors hover:text-brand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappGeral()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-bone transition-colors hover:bg-brand-dark sm:inline-flex"
          >
            <FaWhatsapp aria-hidden className="text-base" />
            WhatsApp
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="rounded-full p-2 text-forest lg:hidden"
          >
            {open ? <HiXMark size={24} /> : <HiBars3 size={24} />}
          </button>
        </div>
      </Container>

      {open && (
        <div id="menu-mobile" className="border-t border-sand bg-bone lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-2 py-3 text-base font-medium text-forest hover:bg-sand"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={whatsappGeral()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-bone"
            >
              <FaWhatsapp aria-hidden />
              Falar com a {siteConfig.name}
            </a>
          </Container>
        </div>
      )}
    </header>
  );
}
