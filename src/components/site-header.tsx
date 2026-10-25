import Link from "next/link";
import { PARTS, PROFILE } from "@/data/projects";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-sm font-extrabold tracking-tight text-ink">
          {PROFILE.name} <span className="font-semibold text-muted">· Portfolio</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm font-semibold text-muted">
          {PARTS.map((part) => (
            <Link key={part.no} href={`/#part-${part.no}`} className="rounded-full px-3 py-1.5 transition hover:bg-surface hover:text-ink">
              <span className="hidden sm:inline">{part.title}</span>
              <span className="sm:hidden">{part.code.replace("Part ", "P")}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="font-semibold text-ink">
          {PROFILE.name} · {PROFILE.tagline}
        </p>
        <p>© {new Date().getFullYear()} {PROFILE.name}. 각 프로젝트의 수치는 당시 기준입니다.</p>
      </div>
    </footer>
  );
}
