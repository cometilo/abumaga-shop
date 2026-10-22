import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "О бренде — a·bumaga",
  description: "Акварельные открытки и карточки на плотных материалах.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20 md:py-32">
      {/* Заголовок */}
        <div className="max-w-2xl">
        <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-accent" />
            <p className="text-xs uppercase tracking-[0.25em] text-muted">
            О бренде
            </p>
        </div>
        <h1 className="mt-4 font-display text-4xl md:text-5xl leading-[1.1]">
            С первого
            <br />
            прикосновения
        </h1>
        </div>

      {/* Текст + фото */}
      <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
        <div className="space-y-6 text-lg text-muted leading-relaxed">
          <p>
            <span className="text-foreground font-medium">a·bumaga</span> — это
            авторские акварельные открытки и карточки, созданные с вниманием
            к материалу и с уважением к человеку, который их получит.
          </p>
          <p>
            Мы не экономим на качестве. В ассортименте — карточки на плотной
            бумаге и на картоне. Все материалы — 300 г/м² — это в четыре
            раза плотнее обычной офисной бумаги. Карточка не просвечивает,
            не мнётся и приятно лежит в руке.
          </p>
          <p>
            Мы продумали всё, чтобы яркие иллюстрации пришли к вам в идеальном
            виде: плотная упаковка, защита от влаги и деформации, аккуратная
            транспортировка. Даже если посылка едет через всю страну — она
            приедет такой же, какой была в мастерской.
          </p>
        </div>

        {/* Фото */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-base bg-accent/10 lg:sticky lg:top-24">
          <Image
            src="/images/about-photo.png"
            alt="a·bumaga — карточки и материалы"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Принципы */}
      <div className="mt-24">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-accent" />
          <p className="text-xs uppercase tracking-[0.25em] text-muted">
            Принципы
          </p>
        </div>

        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Principle
            title="Плотные материалы 300 г/м²"
            text="Бумага и картон — в четыре раза плотнее обычной офисной бумаги. Не просвечивают, не мнутся, приятны на ощупь."
          />
          <Principle
            title="Продуманная упаковка"
            text="Защита от влаги, деформации и повреждений при транспортировке. Карточка приходит в идеальном виде."
          />
          <Principle
            title="Коллекции по сезонам"
            text="Зима, весна, лето, осень — у каждой коллекции свой набор иллюстраций и настроение."
          />
        </div>
      </div>

      {/* CTA */}
      <div className="mt-24 border-t border-border pt-16">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl md:text-4xl leading-tight">
            Посмотрите каталог
          </h2>
          <p className="mt-4 text-lg text-muted">
            Более сотни авторских карточек — на плотной бумаге и картоне,
            для праздников и тёплых слов.
          </p>
          <Link
            href="/catalog"
            className="mt-8 inline-flex h-14 items-center rounded-base bg-accent px-10 text-base font-medium text-accent-foreground transition-transform hover:-translate-y-0.5"
          >
            Смотреть каталог
          </Link>
        </div>
      </div>
    </div>
  );
}

function Principle({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-base border border-border bg-surface p-6">
      <h3 className="font-display text-xl">{title}</h3>
      <p className="mt-3 text-sm text-muted leading-relaxed">{text}</p>
    </div>
  );
}