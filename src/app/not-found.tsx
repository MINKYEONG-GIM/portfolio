import Link from "next/link";
import { getLang } from "@/lib/lang";

const TEXT = {
  ko: { title: "페이지를 찾을 수 없음", home: "홈으로 돌아가기" },
  en: { title: "Page not found", home: "Back to home" }
} as const;

export default async function NotFound() {
  const text = TEXT[await getLang()];
  return (
    <div className="grid gap-4 py-20 text-center">
      <p className="text-xs font-black tracking-[0.18em] text-accent">404</p>
      <h1 className="text-2xl font-extrabold text-ink">{text.title}</h1>
      <Link href="/" className="text-sm font-bold text-muted underline">
        {text.home}
      </Link>
    </div>
  );
}
