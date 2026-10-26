import type { ReactNode } from "react";
import type { NavPart } from "@/components/contents-nav";
import { SideTabs } from "@/components/side-tabs";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import type { TimelineItem } from "@/components/timeline-nav";
import { byPart, getContent, visibleProjects } from "@/data/content";
import { t } from "@/data/i18n";
import { isAdmin } from "@/lib/hub-auth";
import { getLang } from "@/lib/lang";

/** 기간 문구에서 시작 시점만 뽑습니다. "2024.01 ~ 2024.02" → "2024.01", "준비 중" → 그대로 */
function startOf(period: string) {
  const match = period.match(/^\d{4}(\.\d{2})?/);
  return match ? match[0] : period;
}

/** 시작 시점 순 정렬 키. 날짜가 없는 것(준비 중)은 맨 뒤. */
function sortKey(period: string) {
  const match = period.match(/^(\d{4})(?:\.(\d{2}))?/);
  if (!match) return Number.MAX_SAFE_INTEGER;
  return Number(match[1]) * 100 + Number(match[2] ?? "0");
}

/**
 * 공개 포트폴리오 화면의 공통 틀.
 * 상단 고정 헤더 + 왼쪽 사이드바(목차 / 타임라인 탭) + 본문. 좁은 화면에서는 사이드바가 접힌 블록으로 바뀝니다.
 * 기본 방문은 보안 없이 보고, 관리자만 준비 중 항목과 허브 링크를 봅니다.
 */
export default async function PortfolioLayout({ children }: { children: ReactNode }) {
  const [lang, admin] = await Promise.all([getLang(), isAdmin()]);
  const ui = t(lang);
  const { parts, profile, projects } = getContent(lang);
  const visible = visibleProjects(projects, admin);
  const navParts: NavPart[] = parts.map((part) => ({
    no: part.no,
    code: part.code,
    short: part.short,
    projects: byPart(visible, part.no).map((project) => ({ slug: project.slug, title: project.title, draft: project.draft }))
  }));
  const timeline: TimelineItem[] = [...visible]
    .sort((a, b) => sortKey(a.period) - sortKey(b.period))
    .map((project) => ({
      slug: project.slug,
      title: project.title,
      part: project.part,
      partShort: parts[project.part - 1].short,
      start: startOf(project.period),
      draft: project.draft
    }));
  const labels = { contents: ui.nav.contents, timeline: ui.nav.timeline, home: ui.nav.home, planned: ui.status.planned };

  return (
    <>
      <SiteHeader lang={lang} parts={parts} projectCount={visible.length} admin={admin} />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[17rem_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-32 lg:max-h-[calc(100vh-9rem)] lg:self-start lg:overflow-y-auto">
          <details className="border border-line bg-paper lg:hidden">
            <summary className="cursor-pointer px-4 py-3 text-sm font-extrabold text-ink">
              {ui.nav.contents} · {ui.nav.timeline}
            </summary>
            <div className="border-t border-line p-3">
              <SideTabs parts={navParts} timeline={timeline} labels={labels} />
            </div>
          </details>
          <div className="hidden lg:block">
            <SideTabs parts={navParts} timeline={timeline} labels={labels} />
          </div>
        </aside>
        <main className="min-w-0">{children}</main>
      </div>
      <SiteFooter lang={lang} profileName={profile.name} tagline={profile.tagline} />
    </>
  );
}
