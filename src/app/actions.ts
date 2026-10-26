"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LANG_COOKIE, parseLang } from "@/lib/lang";
import { signInAdmin, signOutAdmin } from "@/lib/hub-auth";

/** 언어 쿠키를 1년간 저장합니다. 화면은 호출한 쪽에서 router.refresh() 로 다시 그립니다. */
export async function setLang(value: string) {
  const store = await cookies();
  store.set(LANG_COOKIE, parseLang(value), {
    path: "/",
    sameSite: "lax",
    maxAge: 365 * 24 * 60 * 60
  });
}

/** 공개 화면의 "관리자로 로그인하기". 맞으면 원래 보던 화면으로, 틀리면 안내와 함께 로그인 화면으로 돌아갑니다. */
export async function adminLogin(formData: FormData) {
  const back = safeBack(String(formData.get("back") ?? "/"));
  const ok = await signInAdmin(String(formData.get("password") ?? ""));
  redirect(ok ? back : `/admin-login?e=1&back=${encodeURIComponent(back)}`);
}

export async function adminLogout(formData: FormData) {
  await signOutAdmin();
  redirect(safeBack(String(formData.get("back") ?? "/")));
}

/** 같은 사이트 안의 경로만 돌아갈 곳으로 허용합니다. */
function safeBack(value: string): string {
  return value.startsWith("/") && !value.startsWith("//") ? value : "/";
}
