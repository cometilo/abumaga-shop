import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import { ProductCard } from "@/components/product/ProductCard";

export default function Home() {
  const featured = getAllProducts().slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-6">
      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-12">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-muted">
            Авторские открытки и карточки
          </p>
          <h1 className="mt-5 font-display text-5xl leading-[1.05] sm:text-6xl">
            Бумага, на которой хочется писать
          </h1>
          <p className="mt-6 text-lg text-muted">
            Теплые акварельные иллюстрации на высококачественных материалах.
            Сезонные и праздничные коллекции.
          </p>
        </div>
      </section>

      {/* Секция 1: Ближайший праздник */}
      <section className="py-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-accent" />
            <p className="text-xs uppercase tracking-[0.25em] text-muted">
              Ближайшее событие
            </p>
          </div>
        </div>

        <Link
          href="/catalog?q=2027&label=Новый год"
          className="group block relative overflow-hidden rounded-base border border-border"
        >
          <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
            {/* Баннер */}
            <Image
              src="/events/new-year-2027-banner.jpg"
              alt="Новый год"
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              priority
            />

            {/* Затемнение слева для читаемости текста */}
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/30 to-transparent" />

            {/* Текст поверх */}
            <div className="absolute inset-0 flex items-end">
              <div className="w-full p-8 md:p-12">
                <p className="text-xs uppercase tracking-[0.25em] text-muted">
                  до 15 января
                </p>
                <h2 className="mt-3 font-display text-4xl md:text-6xl leading-tight">
                  Новый год
                </h2>
                <p className="mt-4 max-w-md text-muted">
                  Ёлки, зимние сюжеты, тепло близких — то, что согревает в холодные вечера.
                </p>
                <span className="mt-6 inline-flex h-11 items-center rounded-base bg-accent px-6 text-sm font-medium text-accent-foreground transition-transform group-hover:-translate-y-0.5">
                  Смотреть подборку
                </span>
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* Поздравления */}
      <section className="py-20 border-t border-border">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-accent" />
              <p className="text-xs uppercase tracking-[0.25em] text-muted">
                Поздравления
              </p>
            </div>
            <h2 className="mt-4 font-display text-3xl md:text-4xl">
              Повод для тёплых слов
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
          {[
            { slug: "birthday",       name: "С днём рождения",         search: "день рождения", image: "birthday_card" },
            { slug: "caregiver-gift", name: "Подарок учителю",         search: "учитель",       image: "teacher_card" },
            { slug: "mom-gift",       name: "Подарок маме",            search: "мама",          image: "mommy_card" },
            { slug: "wishes",         name: "Пожелания и поздравления", search: "пожелания",    image: "greetings_card" },
            { slug: "love",           name: "Любовь",                  search: "любовь",        image: "love_card" },
            { slug: "march-8",        name: "8 марта",                 search: "8 марта",       image: "8_march_card" },
          ].map((gift) => (
            <Link
              key={gift.slug}
              href={`/catalog?q=${encodeURIComponent(gift.search)}`}
              className="group block rounded-base border border-border bg-surface p-4 transition-colors hover:border-accent"
            >
              <div className="relative aspect-square overflow-hidden rounded-base bg-accent/10 mb-4">
                <Image
                  src={`/gifts/${gift.image}.jpg`}
                  alt={gift.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <h3 className="font-display text-lg leading-tight transition-colors group-hover:text-accent">
                {gift.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>
      {/* Секция 3: Весь каталог */}
      <section className="py-16 border-t border-border">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-accent" />
            <p className="text-xs uppercase tracking-[0.25em] text-muted">
              Каталог
            </p>
          </div>

          <h2 className="mt-4 font-display text-4xl md:text-5xl leading-tight">
            Найдите то, что вам по душе
          </h2>

          <p className="mt-4 text-lg text-muted">
            Более сотни иллюстраций на плотной бумаге.
            Фильтры помогут найти идеальную карточку.
          </p>

          <Link
            href="/catalog"
            className="mt-8 inline-flex h-14 items-center justify-center rounded-base bg-accent px-10 text-base font-medium text-accent-foreground shadow-sm transition-all hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.98]"
          >
            Смотреть каталог
          </Link>
        </div>
      </section>
    </div>
  );
}