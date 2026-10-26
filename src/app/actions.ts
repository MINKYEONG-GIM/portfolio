"use server";

import { cookies } from "next/headers";
import { LANG_COOKIE, parseLang } from "@/lib/lang";

/** 언어 쿠키를 1년간 저장합니다. 화면은 호출한 쪽에서 router.refresh() 로 다시 그립니다. */
export async function setLang(value: string) {
  const store = await cookies();
  store.set(LANG_COOKIE, parseLang(value), {
    path: "/",
    sameSite: "lax",
    maxAge: 365 * 24 * 60 * 60
  });
}
