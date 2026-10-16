import { getAllProducts } from "@/lib/products";
import CartClient from "./CartClient";

export default function CartPage() {
  const allProducts = getAllProducts();
  return <CartClient allProducts={allProducts} />;
}