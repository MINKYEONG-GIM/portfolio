import Link from "next/link";
import { PartIcon } from "@/components/part-icon";
import { PARTS, PROFILE, PROJECTS } from "@/data/projects";

/** 상단 고정 내비게이션: 어느 화면에서든 5개 주제로 바로 갑니다. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b-2 border-ink bg-paper">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="text-2xl font-black tracking-tight text-ink">
          MINKYEONG KIM
        </Link>
        <p className="hidden text-sm font-bold text-muted sm:block">
          서비스기획 · 프로젝트 {PROJECTS.length}개
        </p>
      </div>
      <nav className="border-t border-line">
        <div className="no-scrollbar mx-auto flex max-w-6xl overflow-x-auto px-2 sm:px-4">
          <Link href="/" className="shrink-0 border-r border-line px-4 py-3 text-base font-extrabold text-ink hover:bg-surface">
            홈
          </Link>
          {PARTS.map((part) => (
            <Link
              key={part.no}
              href={`/#part-${part.no}`}
              className={`part-${part.no} ko-keep flex shrink-0 items-center gap-2 px-4 py-3 text-base font-extrabold text-ink hover:bg-surface`}
            >
              <PartIcon no={part.no} className="tone-text h-4 w-4" />
              {part.short}
            </Link>
          ))}
          <Link href="/#timeline" className="shrink-0 px-4 py-3 text-base font-extrabold text-ink hover:bg-surface">
            타임라인
          </Link>
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
