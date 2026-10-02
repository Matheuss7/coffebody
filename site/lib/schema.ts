import { siteConfig, store, storeFullAddress, contact, openingHours } from "@/lib/site";
import { precoMinimo, type Cafe } from "@/data/products";
import type { Curso } from "@/data/courses";

/** JSON-LD da cafeteria — alimenta busca local e painel do Google. */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: contact.phone,
    email: contact.email,
    image: `${siteConfig.url}/og-image.png`,
    priceRange: "R$",
    servesCuisine: "Café especial",
    sameAs: [contact.instagram],
    address: {
      "@type": "PostalAddress",
      streetAddress: store.street,
      addressLocality: store.city,
      addressRegion: store.state,
      postalCode: store.postalCode,
      addressCountry: store.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: store.latitude,
      longitude: store.longitude,
    },
    openingHoursSpecification: openingHours
      .filter((horario) => horario.opens && horario.closes)
      .map((horario) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: horario.days,
        opens: horario.opens,
        closes: horario.closes,
      })),
  };
}

export function productSchema(cafe: Cafe) {
  const preco = precoMinimo(cafe);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${cafe.nome} — Coffee Body`,
    description: cafe.resumo,
    category: "Café em grão",
    brand: { "@type": "Brand", name: siteConfig.name },
    url: `${siteConfig.url}/cafes/${cafe.slug}/`,
    ...(preco !== null && {
      offers: {
        "@type": "Offer",
        price: (preco / 100).toFixed(2),
        priceCurrency: "BRL",
        availability: cafe.disponivel
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
        url: `${siteConfig.url}/cafes/${cafe.slug}/`,
      },
    }),
  };
}

export function courseSchema(curso: Curso) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: curso.nome,
    description: curso.resumo,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      sameAs: siteConfig.url,
    },
    offers: [
      {
        "@type": "Offer",
        name: "Em grupo",
        price: (curso.precoGrupo / 100).toFixed(2),
        priceCurrency: "BRL",
        category: "Paid",
      },
      {
        "@type": "Offer",
        name: "Individual",
        price: (curso.precoIndividual / 100).toFixed(2),
        priceCurrency: "BRL",
        category: "Paid",
      },
    ],
    hasCourseInstance: [
      {
        "@type": "CourseInstance",
        courseMode: "Onsite",
        location: {
          "@type": "Place",
          name: siteConfig.name,
          address: storeFullAddress,
        },
      },
    ],
  };
}

/** Renderiza JSON-LD como script. Usado dentro de Server Components. */
export function jsonLdProps(schema: object) {
  return {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(schema) },
  } as const;
}
