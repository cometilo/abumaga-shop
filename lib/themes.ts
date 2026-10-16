export const THEMES = ["lux", "wb", "ozon"] as const;
export type Theme = (typeof THEMES)[number];

export const DEFAULT_THEME: Theme = "lux";

export function isTheme(value: string | undefined | null): value is Theme {
  return !!value && (THEMES as readonly string[]).includes(value);
}

export const THEME_COOKIE = "theme";
export const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 дней