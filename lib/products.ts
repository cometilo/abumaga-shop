import { z } from "zod";
import productsData from "@/content/products.json";

export const ProductSchema = z.object({
  slug: z.string(),
  title: z.string(),

  // Парсер может вернуть null, если описания нет
  description: z.string().nullable().default(""),

  // Валидный список категорий. .catch("other") страхует от "грязных"
  // значений из Wildberries ("gratitude", "teacher", "мини открытка" и т.п.),
  // чтобы один битый товар не ронял весь каталог.
  collection: z
    .enum([
      "winter",
      "spring",
      "summer",
      "autumn",
      "new-year",
      "8-march",
      "birthday",
      "other",
    ])
    .catch("other")
    .optional(),

  // Исходный тип изделия из характеристик WB — справочно, не для фильтра
  productType: z.string().optional(),

  tags: z.array(z.string()).default([]),

  price: z.number().int().positive(),
  oldPrice: z.number().int().positive().optional(),

  // Могут быть null у парсерных товаров
  size: z.string().nullable().default(""),
  packSize: z.string().nullable().optional(),
  paper: z.string().nullable().default(""),
  edition: z.string().nullable().default(""),

  // Может быть пустым, если фото не скачались — карточка покажет заглушку
  images: z.array(z.string()).default([]),

  wbUrl: z.string().url().optional(),
  ozonUrl: z.string().url().optional(),
  inStock: z.boolean().default(true),
});

export type Product = z.infer<typeof ProductSchema>;

// Валидируем один раз при загрузке модуля
const products: Product[] = z.array(ProductSchema).parse(productsData);

export function getAllProducts(): Product[] {
  return products;
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCollection(collection: string): Product[] {
  return products.filter((p) => p.collection === collection);
}

export function formatPrice(kopecks: number): string {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(kopecks / 100);
}