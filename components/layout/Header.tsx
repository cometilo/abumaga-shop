import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { CartIcon } from "@/components/cart/CartIcon";

const nav = [
  { href: "/catalog", label: "Каталог" },
  { href: "/about", label: "О нас" },
];

export async function Header() {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("theme")?.value;

  // Валидация: только известные темы, иначе дефолт "lux"
  const current =
    themeCookie === "wb" || themeCookie === "ozon" || themeCookie === "lux"
      ? themeCookie
      : "lux";

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 gap-6">
        <Link
          href="/"
          className="flex items-center gap-3 transition-opacity hover:opacity-70"
        >
          <Image
            src="/images/logo.png"
            alt="A·bumaga"
            width={2560}
            height={828}
            priority
            className="h-9 w-auto"
          />
          <span className="hidden text-sm text-muted md:inline translate-y-[1px]">
            Бумажные карточки и открытки с живописными иллюстрациями
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <CartIcon />
          <ThemeSwitcher current={current} />
        </div>
      </div>
    </header>
  );
}