export const QUERY_TO_COLLECTIONS: Record<string, string[]> = {
  "новый год": ["new-year"],
  "новогод": ["new-year"],
  "с новым годом": ["new-year"],
  "зима": ["new-year", "winter"],
  "снег": ["new-year", "winter"],

  "день рождения": ["birthday"],
  "днюх": ["birthday"],

  "8 марта": ["8-march"],
  "8-мар": ["8-march"],
  "женский день": ["8-march"],

  "весна": ["spring"],
  "лето": ["summer"],
  "летний": ["summer"],
  "осень": ["autumn"],
};

export function collectionsForQuery(rawQuery: string): string[] {
  const q = rawQuery.toLowerCase().trim().replace(/\s+/g, " ");
  if (!q) return [];

  const result = new Set<string>();

  for (const [phrase, collections] of Object.entries(QUERY_TO_COLLECTIONS)) {
    if (q.includes(phrase) || phrase.includes(q)) {
      collections.forEach((c) => result.add(c));
    }
  }

  return [...result];
}