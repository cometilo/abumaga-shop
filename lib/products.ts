import { z } from "zod";
import productsData from "@/content/products.json";

export const ProductSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
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
    .optional(),
  tags: z.array(z.string()).default([]),
  price: z.number().int().positive(),
  oldPrice: z.number().int().positive().optional(),
  size: z.string(),
  packSize: z.string().optional(),
  paper: z.string(),
  edition: z.string(),
  images: z.array(z.string()).min(1),
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