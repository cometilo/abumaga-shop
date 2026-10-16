"use client";

import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { useCart } from "./CartProvider";

export function AddToCartButton({
  slug,
  packSize,
}: {
  slug: string;
  packSize?: string;
}) {
  const { add } = useCart();
  const [addedQty, setAddedQty] = useState<number | null>(null);

  function handleAdd(quantity: number) {
    add(slug, quantity);
    setAddedQty(quantity);
    setTimeout(() => setAddedQty(null), 1500);
  }

  return (
    <div className="mt-6">
      {/* Надпись про упаковку */}
      {packSize && (
        <p className="mb-3 text-sm text-muted">
          В упаковке <span className="font-medium text-foreground">{packSize}</span>
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        {/* Быстрые кнопки +1 / +5 / +10 упаковок */}
        <div className="flex items-center gap-2">
          {[1, 5, 10].map((qty) => (
            <button
              key={qty}
              type="button"
              onClick={() => handleAdd(qty)}
              aria-label={`Добавить ${qty} упаковок`}
              className="flex h-12 min-w-12 items-center justify-center rounded-base border border-border bg-surface px-4 text-sm font-medium transition-colors hover:border-accent hover:bg-surface-hover"
            >
              +{qty}
            </button>
          ))}
        </div>

        {/* Основная кнопка — добавляет 1 упаковку */}
        <button
          type="button"
          onClick={() => handleAdd(1)}
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-base border border-border bg-surface px-6 text-sm font-medium transition-colors hover:border-accent hover:bg-surface-hover"
        >
          {addedQty !== null ? (
            <>
              <Check className="h-4 w-4 text-accent" />
              Добавлено {addedQty > 1 ? `+${addedQty}` : ""}
            </>
          ) : (
            <>
              <ShoppingBag className="h-4 w-4" />
              Добавить в корзину
            </>
          )}
        </button>
      </div>
    </div>
  );
}