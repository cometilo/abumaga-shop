"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "./CartProvider";

export function CartIcon() {
  const { totalCount } = useCart();

  return (
    <Link
      href="/cart"
      aria-label={`Корзина — ${totalCount} товаров`}
      className="relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-surface-hover"
    >
      <ShoppingBag className="h-5 w-5 text-foreground" aria-hidden="true" />
      {totalCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-medium text-accent-foreground">
          {totalCount}
        </span>
      )}
    </Link>
  );
}