import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-16 sm:py-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  const alignment =
    align === "center" ? "text-center mx-auto items-center" : "text-left";

  return (
    <div className={`flex max-w-3xl flex-col gap-4 ${alignment}`}>
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl leading-tight text-forest sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="border-b border-sand bg-sand/40">
      <Container className="py-14 sm:py-20">
        <div className="flex max-w-3xl flex-col gap-4">
          {eyebrow && (
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
              {eyebrow}
            </span>
          )}
          <h1 className="font-display text-4xl leading-tight text-forest sm:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              {description}
            </p>
          )}
        </div>
      </Container>
    </div>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="flex max-w-3xl flex-col gap-5 text-base leading-relaxed text-muted">
      {children}
    </div>
  );
}
