import Link from "next/link";
import { PARTS, PROFILE, PROJECTS } from "@/data/projects";

const NAV = [
  { href: "/", label: "전체 프로젝트" },
  ...PARTS.map((part) => ({ href: `/#part-${part.no}`, label: part.title })),
  { href: "/#timeline", label: "타임라인" }
];

export function SiteHeader() {
  return (
    <header className="border-b-2 border-ink bg-paper">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-end gap-3 border-b border-line py-2 text-xs font-semibold text-muted">
          <span>서비스기획</span>
          <span className="text-line">|</span>
          <span>프로젝트 {PROJECTS.length}개</span>
        </div>
        <div className="flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="text-3xl font-black tracking-tight text-ink">
            MINKYEONG KIM
          </Link>
          <p className="ko-keep text-sm font-bold text-ink">{PROFILE.tagline}</p>
        </div>
      </div>
      <nav className="border-t border-line">
        <div className="mx-auto flex max-w-6xl overflow-x-auto px-2 sm:px-4">
          {NAV.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`ko-keep shrink-0 px-4 py-4 text-base font-extrabold text-ink transition hover:text-[color:var(--part-2)] sm:px-6 sm:text-lg ${index === 0 ? "border-r border-line" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t-2 border-ink">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="font-extrabold text-ink">
          {PROFILE.name} · {PROFILE.tagline}
        </p>
        <p className="font-semibold">© {new Date().getFullYear()} {PROFILE.name}. 각 프로젝트의 수치는 당시 기준입니다.</p>
      </div>
    </footer>
  );
}
