import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllProducts, getProduct, formatPrice } from "@/lib/products";
import { ProductGallery } from "@/components/product/ProductGallery";
import { AddToCartButton } from "@/components/cart/AddToCartButton";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  // Разбиваем "30 шт." на число и единицу
  const [packNum, ...packUnitArr] = product.packSize?.split(" ") ?? [];
  const packUnit = packUnitArr.join(" ");

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <nav className="mb-8 text-sm text-muted">
        <Link
          href="/catalog"
          className="transition-colors hover:text-foreground"
        >
          Каталог
        </Link>
        <span className="mx-2">/</span>
        <span>{product.title}</span>
      </nav>

      <div className="grid gap-12 md:grid-cols-2">
        <ProductGallery images={product.images} alt={product.title} />

        <div className="flex flex-col">
          <h1 className="font-display text-4xl leading-tight">
            {product.title}
          </h1>
          <p className="mt-4 text-muted">{product.description}</p>

            {/* Надпись про упаковку — число жирным, сразу после описания */}
            {product.packSize && (
              <p className="mt-2 font-display text-2xl leading-tight text-foreground">
                В упаковке{" "}
                <strong className="font-bold">{packNum}</strong> {packUnit}
              </p>
            )}

            {/* Цена — большой отступ */}
            <div className="mt-8 flex items-baseline gap-3">
              <span className="text-2xl font-medium">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-lg text-muted line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>

          <AddToCartButton slug={product.slug} />

          <dl className="mt-10 space-y-4 text-sm">
            <div className="flex justify-between border-b border-border pb-3">
              <dt className="text-muted">Размер</dt>
              <dd>{product.size}</dd>
            </div>
            <div className="flex justify-between border-b border-border pb-3">
              <dt className="text-muted">Бумага</dt>
              <dd className="text-right">{product.paper}</dd>
            </div>
            <div className="flex justify-between border-b border-border pb-3">
              <dt className="text-muted">Тираж</dt>
              <dd className="text-right">{product.edition}</dd>
            </div>
          </dl>

          {product.wbUrl && (
            <a
              href={product.wbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex h-12 items-center justify-center rounded-base bg-accent px-6 text-sm font-medium text-accent-foreground transition-transform hover:-translate-y-0.5"
            >
              Купить на Wildberries
            </a>
          )}
        </div>
      </div>
    </div>
  );
}