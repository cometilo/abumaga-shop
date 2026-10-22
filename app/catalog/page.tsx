import { Suspense } from "react";
import { getAllProducts } from "@/lib/products";
import { ProductCard } from "@/components/product/ProductCard";
import { SearchBar } from "@/components/catalog/SearchBar";
import { collectionsForQuery } from "@/lib/search";

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
  const rawQuery = (q ?? "").trim();
  const allProducts = getAllProducts();

  // 1) пробуем найти через коллекции (new-year, birthday, 8-march, ...)
  const collections = collectionsForQuery(rawQuery);

  let products;
  if (collections.length > 0) {
    // если запрос матчится с категорией — фильтруем только по collection
    products = allProducts.filter((p) =>
      collections.includes(p.collection ?? "")
    );
  } else if (rawQuery) {
    // 2) иначе — обычный поиск по полям (включая темы: учитель, благодарность, мама)
    const needle = rawQuery.toLowerCase();
    products = allProducts.filter((p) => {
      const haystack = [
        p.title,
        p.description ?? "",
        p.productType ?? "",
        (p.tags ?? []).join(" "),
        p.collection ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });
  } else {
    products = allProducts;
  }

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

      {rawQuery && (
        <p className="mb-8 text-sm text-muted">
          {products.length > 0 ? (
            <>
              Найдено: <span className="text-foreground">{products.length}</span>
              {collections.length > 0 && (
                <span className="ml-2 text-xs">
                  (категория: {collections.join(", ")})
                </span>
              )}
            </>
          ) : (
            <>Ничего не найдено по запросу «<span className="text-foreground">{rawQuery}</span>»</>
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
            Попробуйте изменить запрос — например, «новый год», «день рождения» или «учителю».
          </p>
        </div>
      )}
    </div>
  );
}