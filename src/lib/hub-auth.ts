import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * 허브(메인 화면) 비밀번호 보호.
 * - 비밀번호는 환경변수 HUB_PASSWORD 에만 둡니다. (로컬: .env.local, Vercel: Project Settings → Environment Variables)
 * - 맞으면 비밀번호의 HMAC 을 httpOnly 쿠키로 7일간 둡니다. 비밀번호를 바꾸면 기존 쿠키는 전부 무효가 됩니다.
 */
export const HUB_COOKIE = "hub_session";
const SESSION_DAYS = 7;

function configuredPassword(): string | null {
  const value = process.env.HUB_PASSWORD?.trim();
  return value ? value : null;
}

export function hubPasswordConfigured(): boolean {
  return configuredPassword() !== null;
}

function tokenFor(password: string): string {
  return createHmac("sha256", password).update("portfolio-hub-session").digest("hex");
}

function safeEqual(left: string, right: string): boolean {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function isHubAuthenticated(): Promise<boolean> {
  const password = configuredPassword();
  if (!password) return false;
  const store = await cookies();
  const cookie = store.get(HUB_COOKIE)?.value;
  return Boolean(cookie) && safeEqual(cookie!, tokenFor(password));
}

/** 입력한 비밀번호가 맞으면 세션 쿠키를 심고 true 를 돌려줍니다. */
export async function signInToHub(input: string): Promise<boolean> {
  const password = configuredPassword();
  if (!password || !safeEqual(input, password)) return false;
  const store = await cookies();
  store.set(HUB_COOKIE, tokenFor(password), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/entry",
    maxAge: SESSION_DAYS * 24 * 60 * 60
  });
  return true;
}

export async function signOutOfHub(): Promise<void> {
  const store = await cookies();
  store.delete({ name: HUB_COOKIE, path: "/entry" });
}
