export const siteConfig = {
  name: "Coffee Body",
  legalName: "Coffee Body® — Cafeteria e Torrefação de Cafés Especiais",
  tagline: "Do grão à xícara, com história pra contar",
  title: "Coffee Body | Cafeteria e Torrefação de Cafés Especiais em São José — SC",
  description:
    "Cafeteria e torrefação de cafés especiais em São José, SC. Café torrado por nós, pão de queijo artesanal, cursos de café e venda de grãos para todo o Brasil.",
  // TODO: trocar pela URL final quando o domínio for registrado.
  url: "https://matheuss7.github.io/coffeebody",
  locale: "pt_BR",
} as const;

/**
 * Foto de fundo do hero. TODO: apontar para uma foto da loja em `public/`
 * (ex.: "/hero.jpg", 2000px de largura). Enquanto for null, o hero usa o
 * gradiente da marca.
 */
export const heroImage: `/${string}` | null = null;

export const contact = {
  // TODO: confirmar número de WhatsApp comercial (apenas dígitos, com 55 + DDD).
  whatsapp: "5548000000000",
  phone: "+55 48 3047-1490",
  phoneHref: "tel:+554830471490",
  email: "contato@coffeebody.com.br", // TODO: confirmar
  instagram: "https://www.instagram.com/coffeebody.sc/",
  /** Cardápio e pedido online já existentes da cafeteria. */
  delivery: "https://coffee-body.goomer.app/menu",
  /** Formulário oficial de interesse nos cursos. */
  formularioCursos:
    "https://docs.google.com/forms/d/1IkKiAP9aHgLd3oi2FRozgoTI-af5LgqO3o_Vw0F0azs/viewform",
  instagramHandle: "@coffeebody.sc",
} as const;

export const store = {
  street: "R. Irmãos Vieira, 967 — loja 02",
  district: "Campinas",
  city: "São José",
  state: "SC",
  postalCode: "88101-290",
  country: "BR",
  // TODO: confirmar coordenadas exatas da loja.
  latitude: -27.5969,
  longitude: -48.6117,
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=R.+Irm%C3%A3os+Vieira%2C+967+-+S%C3%A3o+Jos%C3%A9+-+SC",
} as const;

export const storeFullAddress = `${store.street}, ${store.district}, ${store.city} — ${store.state}, ${store.postalCode}`;

export type OpeningHours = {
  label: string;
  days: ("Mo" | "Tu" | "We" | "Th" | "Fr" | "Sa" | "Su")[];
  opens: string | null;
  closes: string | null;
};

// TODO: confirmar horário após a reforma.
export const openingHours: OpeningHours[] = [
  {
    label: "Segunda a sábado",
    days: ["Mo", "Tu", "We", "Th", "Fr", "Sa"],
    opens: "09:00",
    closes: "18:00",
  },
  { label: "Domingo", days: ["Su"], opens: null, closes: null },
];

export const nav = [
  { href: "/cafes", label: "Cafés" },
  { href: "/clube", label: "Clube" },
  { href: "/cardapio", label: "Cardápio" },
  { href: "/cursos", label: "Cursos" },
  { href: "/atacado", label: "Atacado" },
  { href: "/sobre", label: "Sobre" },
  { href: "/visite", label: "Visite" },
] as const;

export const footerNav = [
  { href: "/como-preparar", label: "Como preparar" },
  { href: "/faq", label: "Perguntas frequentes" },
  { href: "/trocas", label: "Trocas e devoluções" },
  { href: "/privacidade", label: "Privacidade" },
] as const;

export const siteImage = `${siteConfig.url}/og-image.png`;
