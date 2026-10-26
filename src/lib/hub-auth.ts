import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * 관리자 세션. 허브(/entry)와 공개 화면의 관리자 모드가 같은 세션을 씁니다.
 * - 비밀번호는 환경변수 HUB_PASSWORD 에만 둡니다. (로컬: .env.local, Vercel: Project Settings → Environment Variables)
 * - 맞으면 비밀번호의 HMAC 을 httpOnly 쿠키로 7일간 둡니다. 비밀번호를 바꾸면 기존 세션은 전부 무효가 됩니다.
 * - 기본 방문자는 아무 보안 장치 없이 공개 내용을 봅니다. 관리자만 준비 중 항목과 허브를 봅니다.
 */
export const ADMIN_COOKIE = "admin_session";
const SESSION_DAYS = 7;

function configuredPassword(): string | null {
  const value = process.env.HUB_PASSWORD?.trim();
  return value ? value : null;
}

export function hubPasswordConfigured(): boolean {
  return configuredPassword() !== null;
}

function tokenFor(password: string): string {
  return createHmac("sha256", password).update("portfolio-admin-session").digest("hex");
}

function safeEqual(left: string, right: string): boolean {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** 관리자 세션이 있으면 true. */
export async function isAdmin(): Promise<boolean> {
  const password = configuredPassword();
  if (!password) return false;
  const store = await cookies();
  const cookie = store.get(ADMIN_COOKIE)?.value;
  return Boolean(cookie) && safeEqual(cookie!, tokenFor(password));
}

/** 허브도 같은 세션을 씁니다. */
export const isHubAuthenticated = isAdmin;

/** 입력한 비밀번호가 맞으면 세션 쿠키를 심고 true 를 돌려줍니다. */
export async function signInAdmin(input: string): Promise<boolean> {
  const password = configuredPassword();
  if (!password || !safeEqual(input, password)) return false;
  const store = await cookies();
  store.set(ADMIN_COOKIE, tokenFor(password), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60
  });
  return true;
}

export const signInToHub = signInAdmin;

export async function signOutAdmin(): Promise<void> {
  const store = await cookies();
  store.delete({ name: ADMIN_COOKIE, path: "/" });
}

export const signOutOfHub = signOutAdmin;
