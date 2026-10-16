import { NextRequest, NextResponse } from "next/server";
import { isTheme, THEME_COOKIE, THEME_COOKIE_MAX_AGE, type Theme } from "@/lib/themes";

function detectTheme(req: NextRequest): Theme | null {
  const utm = req.nextUrl.searchParams.get("utm_source")?.toLowerCase();
  if (utm === "wb" || utm === "wildberries") return "wb";
  if (utm === "ozon" || utm === "oz") return "ozon";
  if (utm === "lux" || utm === "direct") return "lux";

  const referer = req.headers.get("referer")?.toLowerCase() ?? "";
  if (referer.includes("wildberries")) return "wb";
  if (referer.includes("ozon.ru")) return "ozon";

  return null;
}

export function proxy(req: NextRequest) {
  const res = NextResponse.next();

  const detected = detectTheme(req);
  if (detected) {
    res.cookies.set(THEME_COOKIE, detected, {
      maxAge: THEME_COOKIE_MAX_AGE,
      path: "/",
      sameSite: "lax",
      httpOnly: false, // чтобы можно было читать в devtools, если надо
    });
  }

  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};