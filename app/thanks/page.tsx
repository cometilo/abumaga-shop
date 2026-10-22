import Link from "next/link";

export default function ThanksPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="font-display text-4xl">Спасибо!</h1>
      <p className="mt-4 text-muted">
        Ваш заказ принят. Мы свяжемся с вами в ближайшее время.
      </p>
      <p className="mt-2 text-sm text-muted">
        Мы отправим подтверждение на email.
      </p>
      <Link
        href="/catalog"
        className="mt-8 inline-flex h-14 items-center rounded-base bg-accent px-10 text-base font-medium text-accent-foreground"
      >
        Вернуться в каталог
      </Link>
    </div>
  );
}