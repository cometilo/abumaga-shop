"use client"; // Обязательно для использования хуков (useState, useEffect)

import { useState, useEffect } from "react";
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

  // 👇 Читаем текущую тему, чтобы менять размеры
  const [theme, setTheme] = useState("lux");
  
  useEffect(() => {
    // При монтировании проверяем тему
    const currentTheme = document.documentElement.getAttribute("data-theme") || "lux";
    setTheme(currentTheme);

    // Слушаем изменения темы (если у вас есть переключатель)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-theme") {
          setTheme(document.documentElement.getAttribute("data-theme") || "lux");
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  // Определяем размеры в зависимости от темы
  const isLux = theme === "lux";

  return (
    <article 
      className="group flex flex-col rounded-lg bg-surface p-3 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
      style={{ border: "1px solid var(--card-border, #e5e0d8)" }}
    >
      <Link
        href={`/catalog/${product.slug}`}
        className="flex flex-col h-full rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        {/* Картинка */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-bg">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          {collectionLabel && (
            <span 
              className="absolute left-3 top-3 rounded-full bg-surface px-3 py-1 uppercase tracking-[0.15em] text-muted shadow-sm"
              style={{ fontSize: isLux ? "0.75rem" : "0.625rem" }} // 12px / 10px
            >
              {collectionLabel}
            </span>
          )}
        </div>

        {/* Текстовый блок */}
        <div 
          className="mt-4 flex flex-col flex-1"
          style={{ gap: isLux ? "0.5rem" : "0.25rem" }} // Отступы между строк
        >
          
          {/* Название */}
          <h3 
            className="font-display font-semibold leading-tight transition-colors group-hover:text-accent"
            style={{ 
              fontSize: isLux ? "1.2rem" : "0.9rem", // LUX: 24px, WB/OZON: 12px
              lineHeight: isLux ? "1.2" : "1.2"
            }}
          >
            {product.title}
          </h3>
          
          {/* Описание */}
          <p 
            className="font-medium text-muted line-clamp-2"
            style={{ 
              fontSize: isLux ? "1rem" : "0.7rem", // LUX: 16px, WB/OZON: 10px
              lineHeight: isLux ? "1.5" : "1.35"
            }}
          >
            {product.description}
          </p>
          
          {/* Цена */}
          <div 
            className="flex items-baseline mt-auto"
            style={{ 
              gap: isLux ? "0.5rem" : "0.5rem",
              paddingTop: isLux ? "0.5rem" : "0.3rem"
            }}
          >
            <span 
              className="font-bold"
              style={{ fontSize: isLux ? "1.25rem" : "1rem" }} // LUX: 20px, WB/OZON: 14px
            >
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span 
                className="text-muted line-through"
                style={{ fontSize: isLux ? "0.875rem" : "0.75rem" }} // LUX: 14px, WB/OZON: 12px
              >
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}