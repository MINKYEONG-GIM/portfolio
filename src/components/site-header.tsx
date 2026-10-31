import Link from "next/link";
import { FileDown, LockKeyhole, LogOut, ShieldCheck } from "lucide-react";
import { LangToggle } from "@/components/lang-toggle";
import { PartIcon } from "@/components/part-icon";
import { adminLogout } from "@/app/actions";
import type { Part } from "@/data/projects";
import { t } from "@/data/i18n";
import type { Lang } from "@/lib/lang";

type HeaderProps = { lang: Lang; parts: Part[]; projectCount: number; admin: boolean };

/** 상단 고정 내비게이션: 주제로 바로 가고, 오른쪽에서 언어를 바꾸거나 관리자로 로그인합니다. */
export function SiteHeader({ lang, parts, projectCount, admin }: HeaderProps) {
  const ui = t(lang);
  return (
    <header className="sticky top-0 z-20 border-b-2 border-ink bg-paper">
      {admin ? (
        <div className="bg-ink text-paper">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-1.5 text-xs font-bold sm:px-6">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" />
              {ui.admin.mode} · {ui.admin.modeHint}
            </span>
            <span className="flex items-center gap-3">
              <Link href="/entry" className="underline-offset-2 hover:underline">
                {ui.admin.hub}
              </Link>
              <form action={adminLogout}>
                <input type="hidden" name="back" value="/" />
                <button type="submit" className="inline-flex items-center gap-1 underline-offset-2 hover:underline">
                  <LogOut className="h-3.5 w-3.5" /> {ui.admin.logout}
                </button>
              </form>
            </span>
          </div>
        </div>
      ) : null}
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="text-2xl font-black tracking-tight text-ink">
          MINKYEONG KIM
        </Link>
        <div className="flex items-center gap-3">
          <p className="hidden text-sm font-bold text-muted md:block">{ui.nav.summary(projectCount)}</p>
          <Link href="/print" className="inline-flex items-center gap-1 text-xs font-bold text-muted hover:text-ink">
            <FileDown className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{ui.nav.pdf}</span>
          </Link>
          {!admin ? (
            <Link href="/admin-login" className="inline-flex items-center gap-1 text-xs font-bold text-muted hover:text-ink">
              <LockKeyhole className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{ui.admin.login}</span>
            </Link>
          ) : null}
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
