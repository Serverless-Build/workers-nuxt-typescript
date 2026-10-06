export type Quote = { quantity: number; unit_price_cents: number; total_cents: number; currency: 'USD' };
export type QuoteResult = Quote | { error: string };

export function calculateQuote(input: URLSearchParams): QuoteResult {
  const fields = ['quantity', 'unit_price_cents'] as const;
  const values = { quantity: 0, unit_price_cents: 0 };
  for (const field of fields) {
    const entries = input.getAll(field);
    if (entries.length !== 1) return { error: `Provide exactly one ${field}.` };
    const value = entries[0];
    if (typeof value !== 'string' || !/^\d+$/.test(value)) return { error: `${field} must be an integer.` };
    const number = Number(value);
    const maximum = field === 'quantity' ? 100 : 1_000_000;
    if (!Number.isSafeInteger(number) || number < 1 || number > maximum) return { error: `${field} must be between 1 and ${maximum}.` };
    values[field] = number;
  }
  const { quantity, unit_price_cents } = values;
  return { quantity, unit_price_cents, total_cents: quantity * unit_price_cents, currency: 'USD' };
}
