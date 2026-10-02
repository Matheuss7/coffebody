import type { MetadataRoute } from "next";
import { cafes } from "@/data/products";
import { siteConfig } from "@/lib/site";

// Exigido pelo `output: "export"`.
export const dynamic = "force-static";

const paginas = [
  { path: "/", priority: 1 },
  { path: "/cafes/", priority: 0.9 },
  { path: "/clube/", priority: 0.9 },
  { path: "/cardapio/", priority: 0.8 },
  { path: "/atacado/", priority: 0.8 },
  { path: "/cursos/", priority: 0.8 },
  { path: "/visite/", priority: 0.7 },
  { path: "/sobre/", priority: 0.6 },
  { path: "/como-preparar/", priority: 0.6 },
  { path: "/faq/", priority: 0.5 },
  { path: "/trocas/", priority: 0.3 },
  { path: "/privacidade/", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...paginas.map((pagina) => ({
      url: `${siteConfig.url}${pagina.path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: pagina.priority,
    })),
    ...cafes.map((cafe) => ({
      url: `${siteConfig.url}/cafes/${cafe.slug}/`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
