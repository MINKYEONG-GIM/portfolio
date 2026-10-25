import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid gap-4 py-20 text-center">
      <p className="text-xs font-black tracking-[0.18em] text-accent">404</p>
      <h1 className="text-2xl font-extrabold text-ink">페이지를 찾을 수 없습니다</h1>
      <Link href="/" className="text-sm font-bold text-muted underline">
        홈으로 돌아가기
      </Link>
    </div>
  );
}
