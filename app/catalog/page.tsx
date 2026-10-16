import { Suspense } from "react";
import { getAllProducts } from "@/lib/products";
import { ProductCard } from "@/components/product/ProductCard";
import { SearchBar } from "@/components/catalog/SearchBar";

export const metadata = {
  title: "Каталог — a·bumaga",
  description: "Все бумажные карточки с авторскими акварельными иллюстрациями.",
};

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.toLowerCase().trim() ?? "";
  const allProducts = getAllProducts();

  const products = query
    ? allProducts.filter((p) => {
        const haystack = `${p.title} ${p.description} ${p.tags.join(" ")}`.toLowerCase();
        return haystack.includes(query);
      })
    : allProducts;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.25em] text-muted">Каталог</p>
        <h1 className="mt-3 font-display text-4xl leading-tight">
          Все карточки
        </h1>
        <p className="mt-3 max-w-xl text-muted">
          {allProducts.length} авторских иллюстраций на плотной бумаге 300 г/м².
        </p>
      </header>

      <div className="mb-10">
        <Suspense fallback={<div className="h-12" />}>
          <SearchBar />
        </Suspense>
      </div>

      {query && (
        <p className="mb-8 text-sm text-muted">
          {products.length > 0 ? (
            <>Найдено: <span className="text-foreground">{products.length}</span></>
          ) : (
            <>Ничего не найдено по запросу «<span className="text-foreground">{query}</span>»</>
          )}
        </p>
      )}

      {products.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-muted">
            Попробуйте изменить запрос — например, «снегирь», «зима» или «цветы».
          </p>
        </div>
      )}
    </div>
  );
}