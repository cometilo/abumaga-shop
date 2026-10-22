"use client";

import { useState } from "react";
import { Check, ShoppingBag, Minus } from "lucide-react";
import { useCart } from "./CartProvider";

export function AddToCartButton({ slug }: { slug: string }) {
  const { add, remove, setQty, items } = useCart();
  const [addedQty, setAddedQty] = useState<number | null>(null);

  const inCart = items.find((i) => i.slug === slug)?.quantity ?? 0;

  function handleAdd(quantity: number) {
    add(slug, quantity);
    setAddedQty(quantity);
    setTimeout(() => setAddedQty(null), 1500);
  }

  function handleRemoveOne() {
    if (inCart <= 1) {
      remove(slug);
    } else {
      setQty(slug, inCart - 1);
    }
  }

  return (
    <div className="mt-6 space-y-4">
      {/* Статус в корзине */}
      {inCart > 0 && (
        <div className="flex items-center justify-between gap-3 rounded-base border border-accent/30 bg-accent/5 px-4 py-3">
          <p className="text-sm">
            В корзине: <strong className="font-medium">{inCart} шт.</strong>
          </p>
          <button
            type="button"
            onClick={handleRemoveOne}
            className="flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
            aria-label="Убрать одну штуку"
          >
            <Minus className="h-3.5 w-3.5" />
            Убрать
          </button>
        </div>
      )}

      {/* Кнопки добавления */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          {[1, 5, 10].map((qty) => (
            <button
              key={qty}
              type="button"
              onClick={() => handleAdd(qty)}
              aria-label={`Добавить ${qty} шт.`}
              className="flex h-12 min-w-12 items-center justify-center rounded-base border border-border bg-surface px-4 text-sm font-medium transition-colors hover:border-accent hover:bg-surface-hover"
            >
              +{qty}
            </button>
          ))}
        </div>

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