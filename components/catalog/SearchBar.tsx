"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);
  const isFirstRender = useRef(true);
  const lastPushed = useRef(initialQuery);

  // Debounce: обновляем URL через 300 мс после последнего ввода
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timer = setTimeout(() => {
      const trimmed = query.trim();
      if (trimmed === lastPushed.current) return;
      lastPushed.current = trimmed;

      const newUrl = trimmed
        ? `/catalog?q=${encodeURIComponent(trimmed)}`
        : "/catalog";
      router.replace(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(timer);
  }, [query, router]);

  // Очищаем поиск и возвращаем фокус в поле — удобнее, чем кликать заново
  function clear() {
    setQuery("");
    inputRef.current?.focus();
  }

  return (
    <div className="relative">
      <Search
        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
        aria-hidden="true"
      />
      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Поиск по каталогу..."
        aria-label="Поиск по каталогу"
        className="h-12 w-full rounded-base border border-border bg-surface pl-11 pr-11 text-base text-foreground placeholder:text-muted transition-colors focus:border-accent focus:outline-none"
      />
      {query && (
        <button
          type="button"
          onClick={clear}
          aria-label="Очистить поиск"
          className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}