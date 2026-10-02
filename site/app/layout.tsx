import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig, siteImage } from "@/lib/site";
import { localBusinessSchema, jsonLdProps } from "@/lib/schema";
import "./globals.css";

// Serif macia dos títulos — o contraste editorial que define o ramo de café especial.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: [
    "cafeteria São José SC",
    "café especial Florianópolis",
    "torrefação de café Santa Catarina",
    "comprar café especial online",
    "curso de barista Florianópolis",
    "café em grão",
    "pão de queijo São José",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  alternates: { canonical: `${siteConfig.url}/` },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: `${siteConfig.url}/`,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: siteImage,
        width: 1200,
        height: 630,
        alt: siteConfig.legalName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      // O script inline abaixo acrescenta a classe `js` antes da hidratação.
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/*
          Marca que o JS está ativo antes de o conteúdo ser pintado. Só sob
          `html.js` o CSS esconde os blocos de revelação — sem isso, conteúdo
          sumiria para quem está sem JavaScript.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js")`,
          }}
        />
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <Footer />
        <script {...jsonLdProps(localBusinessSchema())} />
      </body>
    </html>
  );
}
