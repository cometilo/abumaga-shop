import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { cookies } from "next/headers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { isTheme, DEFAULT_THEME, THEME_COOKIE } from "@/lib/themes";
import { CartProvider } from "@/components/cart/CartProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "A-bumaga",
  description:
    "Акварельные открытки ручной работы. Сезонные и праздничные коллекции. Плотная бумага, ограниченные тиражи.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const cookieStore = await cookies();
  const rawTheme = cookieStore.get(THEME_COOKIE)?.value;
  const theme = isTheme(rawTheme) ? rawTheme : DEFAULT_THEME;

  return (
    <html
      lang="ru"
      data-theme={theme}
      className={`${inter.variable} ${cormorant.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}