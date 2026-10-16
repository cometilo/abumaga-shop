"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/products";
import type { Product } from "@/lib/products";

export default function CartClient({ allProducts }: { allProducts: Product[] }) {
  const { items, remove, setQty, clear, totalCount } = useCart();

  // Собираем полные данные о товарах из переданного массива
  const cartProducts = items
    .map((item) => {
      const product = allProducts.find((p) => p.slug === item.slug);
      return product ? { ...item, product } : null;
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const total = cartProducts.reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0
  );

  if (cartProducts.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-24 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-muted">
          Корзина
        </p>
        <h1 className="mt-3 font-display text-4xl leading-tight">
          Пока пусто
        </h1>
        <p className="mt-4 text-muted">
          Добавьте что-нибудь из каталога — и вернитесь сюда.
        </p>
        <Link
          href="/catalog"
          className="mt-8 inline-flex h-14 items-center rounded-base bg-accent px-10 text-base font-medium text-accent-foreground transition-transform hover:-translate-y-0.5"
        >
          Смотреть каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <header className="mb-10 flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-muted">
            Корзина
          </p>
          <h1 className="mt-3 font-display text-4xl leading-tight">
            Ваш заказ
          </h1>
          <p className="mt-3 text-muted">
            {totalCount}{" "}
            {totalCount === 1 ? "товар" : totalCount < 5 ? "товара" : "товаров"}
          </p>
        </div>
        <button
          type="button"
          onClick={clear}
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          Очистить всё
        </button>
      </header>

      <div className="space-y-6">
        {cartProducts.map(({ product, quantity }) => (
          <div
            key={product.slug}
            className="flex gap-6 rounded-base border border-border bg-surface p-4"
          >
            <Link
              href={`/catalog/${product.slug}`}
              className="relative aspect-[4/5] w-24 shrink-0 overflow-hidden rounded-base bg-border"
            >
              <Image
                src={product.images[0]}
                alt={product.title}
                fill
                sizes="96px"
                className="object-cover"
              />
            </Link>

            <div className="flex flex-1 flex-col justify-between">
              <div>
                <Link
                  href={`/catalog/${product.slug}`}
                  className="font-display text-lg leading-tight transition-colors hover:text-accent"
                >
                  {product.title}
                </Link>
                <p className="mt-1 text-sm text-muted">
                  {formatPrice(product.price)} за шт.
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQty(product.slug, quantity - 1)}
                    aria-label="Уменьшить количество"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border transition-colors hover:bg-surface-hover"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="min-w-6 text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty(product.slug, quantity + 1)}
                    aria-label="Увеличить количество"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border transition-colors hover:bg-surface-hover"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-6">
                  <span className="font-medium">
                    {formatPrice(product.price * quantity)}
                  </span>
                  <button
                    type="button"
                    onClick={() => remove(product.slug)}
                    aria-label="Удалить из корзины"
                    className="text-muted transition-colors hover:text-foreground"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 border-t border-border pt-8">
        <div className="flex items-center justify-between">
          <span className="text-muted">Итого</span>
          <span className="font-display text-3xl">
            {formatPrice(total)}
          </span>
        </div>
        <button
          type="button"
          className="mt-8 inline-flex h-14 w-full items-center justify-center rounded-base bg-accent px-10 text-base font-medium text-accent-foreground transition-transform hover:-translate-y-0.5 sm:w-auto"
        >
          Оформить заказ
        </button>
        <p className="mt-4 text-sm text-muted">
          Оформление заказа — на следующем этапе.
        </p>
      </div>
    </div>
  );
}