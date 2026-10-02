import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "whatsapp" | "light";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-forest text-bone hover:bg-ink",
  secondary: "border border-forest/25 bg-transparent text-forest hover:bg-sand",
  ghost: "text-forest hover:text-brand",
  whatsapp: "bg-brand text-bone hover:bg-brand-dark",
  // Para CTA sobre o verde da marca, onde um botão verde sumiria.
  light: "bg-bone text-forest hover:bg-brand-light",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
}) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

export const buttonClasses = (variant: Variant = "primary") =>
  `${base} ${variants[variant]}`;
