import Link from "next/link";
import { LangToggle } from "@/components/lang-toggle";
import { PartIcon } from "@/components/part-icon";
import type { Part } from "@/data/projects";
import { t } from "@/data/i18n";
import type { Lang } from "@/lib/lang";

type HeaderProps = { lang: Lang; parts: Part[]; projectCount: number; profileName: string; tagline: string };

/** 상단 고정 내비게이션: 어느 화면에서든 주제로 바로 가고, 오른쪽에서 언어를 바꿉니다. */
export function SiteHeader({ lang, parts, projectCount }: HeaderProps) {
  const ui = t(lang);
  return (
    <header className="sticky top-0 z-20 border-b-2 border-ink bg-paper">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="text-2xl font-black tracking-tight text-ink">
          MINKYEONG KIM
        </Link>
        <div className="flex items-center gap-4">
          <p className="hidden text-sm font-bold text-muted sm:block">{ui.nav.summary(projectCount)}</p>
          <LangToggle lang={lang} />
        </div>
      </div>
      <nav className="border-t border-line">
        <div className="no-scrollbar mx-auto flex max-w-6xl overflow-x-auto px-2 sm:px-4">
          <Link href="/" className="shrink-0 border-r border-line px-4 py-3 text-base font-extrabold text-ink hover:bg-surface">
            {ui.nav.home}
          </Link>
          {parts.map((part) => (
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
            {ui.nav.timeline}
          </Link>
        </div>
      </nav>
    </header>
  );
}

export function SiteFooter({ lang, profileName, tagline }: { lang: Lang; profileName: string; tagline: string }) {
  const ui = t(lang);
  return (
    <footer className="mt-20 border-t-2 border-ink">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="font-extrabold text-ink">
          {profileName} · {tagline}
        </p>
        <p className="font-semibold">
          © {new Date().getFullYear()} {profileName}. {ui.footer.note}
        </p>
      </div>
    </footer>
  );
}
