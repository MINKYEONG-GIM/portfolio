import { cookies } from "next/headers";

/** 화면 언어. 쿠키 `lang` 에 저장하고, 없으면 한국어입니다. */
export type Lang = "ko" | "en";
export const LANG_COOKIE = "lang";

export function parseLang(value: string | undefined | null): Lang {
  return value === "en" ? "en" : "ko";
}

export async function getLang(): Promise<Lang> {
  const store = await cookies();
  return parseLang(store.get(LANG_COOKIE)?.value);
}
