"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "./CartProvider";

type FormData = {
  name: string;
  phone: string;
  email: string;
  address: string;
  comment: string;
};

export function CheckoutForm() {
  const router = useRouter();
  const { items, clear } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    address: "",
    comment: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // Клиентская валидация
    if (!form.name.trim()) return setError("Укажите имя");
    if (!form.phone.trim()) return setError("Укажите телефон");
    if (!/^\+?[\d\s\-()]{10,}$/.test(form.phone))
      return setError("Телефон указан неверно");
    if (!form.email.trim()) return setError("Укажите email");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return setError("Email указан неверно");
    if (!form.address.trim()) return setError("Укажите адрес доставки");

    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form,
          items,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Ошибка при оформлении");
      }

      // Очищаем корзину и редиректим на спасибо
      clear();
      router.push(`/thanks?order=${data.orderId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-4">
      <h2 className="font-display text-2xl">Оформить заказ</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="name"
          placeholder="Имя и фамилия"
          value={form.name}
          onChange={handleChange}
          required
          className="h-12 rounded-base border border-border bg-surface px-4 text-sm"
        />
        <input
          name="phone"
          placeholder="+7 (___) ___-__-__"
          value={form.phone}
          onChange={handleChange}
          required
          className="h-12 rounded-base border border-border bg-surface px-4 text-sm"
        />
      </div>

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="h-12 w-full rounded-base border border-border bg-surface px-4 text-sm"
      />

      <input
        name="address"
        placeholder="Адрес доставки"
        value={form.address}
        onChange={handleChange}
        required
        className="h-12 w-full rounded-base border border-border bg-surface px-4 text-sm"
      />

      <textarea
        name="comment"
        placeholder="Комментарий (необязательно)"
        value={form.comment}
        onChange={handleChange}
        rows={3}
        className="w-full rounded-base border border-border bg-surface px-4 py-3 text-sm"
      />

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading || items.length === 0}
        className="h-14 w-full rounded-base bg-accent px-10 text-base font-medium text-accent-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
      >
        {loading ? "Отправка..." : "Оформить заказ"}
      </button>
    </form>
  );
}