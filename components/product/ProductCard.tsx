import Link from "next/link";
import Image from "next/image";
import { formatPrice, type Product } from "@/lib/products";

const collectionLabels: Record<NonNullable<Product["collection"]>, string> = {
  winter: "Зима",
  spring: "Весна",
  summer: "Лето",
  autumn: "Осень",
  "new-year": "Новый год",
  "8-march": "8 марта",
  birthday: "День рождения",
  other: "Прочее",
};

export function ProductCard({ product }: { product: Product }) {
  const collectionLabel = product.collection
    ? collectionLabels[product.collection]
    : null;

  return (
    <article className="group rounded-lg bg-surface p-3 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <Link
        href={`/catalog/${product.slug}`}
        className="block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-border">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          {collectionLabel && (
            <span className="absolute left-3 top-3 rounded-full bg-surface px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-muted shadow-sm">
              {collectionLabel}
            </span>
          )}
        </div>
        <div className="mt-4 space-y-1">
          <h3 className="font-display text-lg leading-tight transition-colors group-hover:text-accent">
            {product.title}
          </h3>
          <p className="text-sm text-muted line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-base font-semibold">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-sm text-muted line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}