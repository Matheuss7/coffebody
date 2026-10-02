const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

/** Formata um valor em centavos como moeda brasileira. */
export function formatPrice(cents: number) {
  return brl.format(cents / 100);
}

export function formatDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
  }).format(new Date(year, month - 1, day));
}
