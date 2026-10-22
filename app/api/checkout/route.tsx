import { NextResponse } from "next/server";
import { z } from "zod";

const CheckoutSchema = z.object({
  customer: z.object({
    name: z.string().min(2),
    phone: z.string().min(10),
    email: z.string().email(),
    address: z.string().min(5),
    comment: z.string().optional(),
  }),
  items: z.array(
    z.object({
      slug: z.string(),
      quantity: z.number().int().positive(),
    })
  ).min(1),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = CheckoutSchema.parse(body);

    const orderId = `ORD-${Date.now()}`;

    // TODO: сохранить в Redis / БД
    console.log("Новый заказ:", orderId, parsed);

    return NextResponse.json({ orderId });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Неверные данные", details: err.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Внутренняя ошибка" },
      { status: 500 }
    );
  }
}