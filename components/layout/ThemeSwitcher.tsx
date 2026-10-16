"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const THEMES = [
  { slug: "lux", label: "Lux" },
  { slug: "wb", label: "WB" },
  { slug: "ozon", label: "Ozon" },
] as const;

type Theme = (typeof THEMES)[number]["slug"];

export function ThemeSwitcher({ current }: { current: Theme }) {
  const router = useRouter();
  const [active, setActive] = useState<Theme>(current);

  function setTheme(slug: Theme) {
    if (slug === active) return;
    setActive(slug);
    document.cookie = `theme=${slug}; path=/; max-age=${60 * 60 * 24 * 30}`;
    router.refresh();
  }

  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-surface p-1">
      {THEMES.map((t) => (
        <button
          key={t.slug}
          type="button"
          onClick={() => setTheme(t.slug)}
          aria-pressed={active === t.slug}
          className={
            active === t.slug
              ? "rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground"
              : "rounded-full px-3 py-1 text-xs text-muted transition-colors hover:text-foreground"
          }
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}