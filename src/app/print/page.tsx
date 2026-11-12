import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { PartIcon } from "@/components/part-icon";
import { Figure } from "@/components/figure";
import { PdfFit } from "@/components/pdf-fit";
import { PrintButton } from "@/components/print-button";
import { ProjectFigures, ProjectInfoTable, ProjectSections, ProjectSummary, withAdminRoles } from "@/components/project-body";
import { summaryOf } from "@/data/summaries";
import { byPart, getContent, statusOf, visibleProjects } from "@/data/content";
import { t } from "@/data/i18n";
import { isAdmin } from "@/lib/hub-auth";
import { getLang, parseLang } from "@/lib/lang";

/** 언어·관리자 쿠키를 읽으므로 요청마다 그립니다. */
export const dynamic = "force-dynamic";

const SITE_URL = "kim-minkyeong.vercel.app";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return { title: t(lang).pdf.title, robots: { index: false, follow: false } };
}

/**
 * PDF 용 한 장짜리 문서: 표지 → 목차 → 전체 요약 → 프로젝트별 상세.
 * 화면에서는 위에 "PDF로 저장" 버튼이 보이고, 인쇄할 때는 버튼이 빠지고 섹션마다 새 페이지에서 시작합니다.
 */
export default async function PrintPage({ searchParams }: { searchParams: Promise<{ lang?: string; pdf?: string }> }) {
  // PDF 파일을 만들 때는 ?lang=en 처럼 주소로 언어를 지정합니다 (scripts/make-pdf.mjs)
  const [cookieLang, admin, query] = await Promise.all([getLang(), isAdmin(), searchParams]);
  const lang = query.lang ? parseLang(query.lang) : cookieLang;
  const ui = t(lang);
  const D = ui.pdf;
  const { profile, parts, projects: allProjects } = getContent(lang);
  const projects = visibleProjects(allProjects, admin);
  const generated = new Intl.DateTimeFormat(lang === "ko" ? "ko-KR" : "en-US", { dateStyle: "long" }).format(new Date());
  const numberOf = (slug: string) => String(projects.findIndex((item) => item.slug === slug) + 1).padStart(2, "0");

  return (
    <div className="print-root mx-auto max-w-[1120px] px-4 py-6 text-ink sm:px-6">
      {/* PDF 파일을 만들 때: 인쇄 규칙을 화면에도 적용하고 쪽 배치를 맞춥니다 */}
      {query.pdf === "1" ? (
        <>
          <link rel="stylesheet" href="/print-layout.css" />
          <PdfFit />
        </>
      ) : null}
      {/* 화면에서만 보이는 안내 막대 */}
      <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-surface px-5 py-4">
        <div>
          <p className="text-base font-black text-ink">{D.title}</p>
          <p className="ko-keep mt-1 text-sm font-semibold leading-6 text-muted">{D.hint}</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" className="inline-flex items-center gap-1 text-sm font-bold text-muted hover:text-ink">
            <ArrowLeft className="h-4 w-4" /> {D.back}
          </Link>
          <PrintButton label={D.button} lang={lang} />
        </div>
      </div>

      {/* 1. 표지 */}
      <section className="print-page print-first flex min-h-[70vh] flex-col justify-between gap-12 border border-line bg-paper p-8 sm:p-12">
        <div>
          {lang === "en" ? <p className="text-xs font-black tracking-[0.2em] text-muted">{ui.home.eyebrow}</p> : null}
          <h1 className="mt-6 text-5xl font-black leading-none tracking-tight text-ink sm:text-6xl">{profile.name}</h1>
          <p className="ko-keep mt-4 text-2xl font-extrabold leading-snug text-ink">{D.cover}</p>
          <p className="ko-keep mt-3 max-w-2xl text-base font-semibold leading-8 text-muted">{profile.tagline}</p>
          <p className="ko-keep mt-3 text-xs font-semibold text-muted">{ui.footer.dataNotice}</p>
        </div>
        <ol className="grid gap-3 sm:grid-cols-2">
          {parts.map((part) => (
            <li key={part.no} className={`part-${part.no} flex items-start gap-3 border border-line bg-surface p-4`}>
              <PartIcon no={part.no} className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p className="text-xs font-black text-muted">{part.code}</p>
                <p className="ko-keep text-base font-extrabold text-ink">{part.title}</p>
                <p className="ko-keep mt-1 text-sm font-semibold text-muted">{part.tagline}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line pt-5 text-sm font-bold text-muted">
          <span>{D.projectCount(projects.length)}</span>
          <span>
            {D.generated} {generated} · {SITE_URL}
          </span>
        </div>
      </section>

      {/* 2. 목차: 프로젝트 성격(파트)별로 묶음 */}
      <section className="print-page mt-10 grid gap-10 border border-line bg-paper p-8 sm:p-12">
        <div>
          {lang === "en" ? <p className="text-xs font-black tracking-[0.2em] text-muted">CONTENTS</p> : null}
          <h2 className="mt-2 text-3xl font-black text-ink">{D.contents}</h2>
        </div>
        <ol className="grid gap-8">
          {parts.map((part) => {
            const items = byPart(projects, part.no);
            if (items.length === 0) return null;
            return (
              <li key={part.no} className={`part-${part.no} grid grid-cols-[3.25rem_2.5rem_minmax(0,1fr)] items-center gap-4 sm:grid-cols-[3.25rem_2.5rem_16rem_minmax(0,1fr)]`}>
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface shadow-sm">
                  <PartIcon no={part.no} className="h-6 w-6" />
                </span>
                <span className="text-base font-black text-ink">{String(part.no).padStart(2, "0")}</span>
                <span className="ko-keep text-lg font-extrabold text-ink">{part.title}</span>
                <span className="ko-keep col-span-3 text-base font-semibold leading-7 text-muted sm:col-span-1">
                  {items.map((project) => project.short ?? project.title).join(" / ")}
                </span>
              </li>
            );
          })}
        </ol>
      </section>

      {/* 3. 전체 요약 */}
      <section className="print-page mt-10 grid gap-8 border border-line bg-paper p-8 sm:p-12">
        <div>
          {lang === "en" ? <p className="text-xs font-black tracking-[0.2em] text-muted">SUMMARY</p> : null}
          <h2 className="mt-2 text-3xl font-black text-ink">{D.summary}</h2>
          <p className="ko-keep mt-3 max-w-3xl text-base leading-8 text-ink">{profile.intro}</p>
        </div>
        <table className="oy-table print-summary-table text-sm">
          <colgroup>
            <col style={{ width: "5%" }} />
            <col style={{ width: "13%" }} />
            <col style={{ width: "45%" }} />
            <col style={{ width: "14%" }} />
            <col style={{ width: "23%" }} />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">{D.colNo}</th>
              <th scope="col">{D.colPart}</th>
              <th scope="col">{D.colProject}</th>
              <th scope="col">{D.colPeriod}</th>
              <th scope="col">{D.colResult}</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => {
              const part = parts[project.part - 1];
              const metric = project.metrics[0];
              return (
                <tr key={project.slug}>
                  <td className="font-black">{numberOf(project.slug)}</td>
                  <td className="whitespace-nowrap font-bold">{part.short}</td>
                  <td className="ko-keep font-bold">
                    {project.title}
                    <span className="ko-keep mt-1 block text-xs font-semibold text-muted">{project.subtitle}</span>
                  </td>
                  <td className="whitespace-nowrap">{project.period}</td>
                  <td className="ko-keep">
                    {metric ? (
                      <>
                        <span className="font-black text-price">{metric.value}</span> <span className="font-semibold">{metric.label}</span>
                      </>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      {/* 4. 프로젝트별 상세: 상세 페이지와 같은 본문 */}
      {projects.map((project) => {
        const part = parts[project.part - 1];
        const status = statusOf(project, ui.status);
        // 대표 이미지가 따로 없으면 첫 번째 추가 이미지를 첫머리 오른쪽 단에 둡니다
        const hero = project.figureGroups?.length ? undefined : project.image ?? project.images?.[0];
        const restImages = (project.image ? project.images : project.images?.slice(1)) ?? [];
        const heroInColumn = Boolean(hero);
        return (
          <article key={project.slug} className={`print-page part-${project.part} mt-10 grid gap-10 border border-line bg-paper p-8 sm:p-12`}>
            <header className="print-header grid gap-5">
              {/* 제목은 전체 너비, 그 아래는 왼쪽 요약 · 오른쪽 대표 이미지, 맨 아래는 기간·분야·기술 한 줄 */}
              <div className="print-header-title grid gap-3">
              <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-muted">
                <span className="text-base font-black text-ink">No. {numberOf(project.slug)}</span>
                <span>·</span>
                <span>
                  {part.code} {part.title}
                </span>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`pill ${status === ui.status.done ? "pill-green" : "pill-red"}`}>{status}</span>
                  <span className="pill pill-gray">{part.short}</span>
                </div>
                <h2 className="ko-keep mt-3 text-3xl font-black leading-tight text-ink">{project.title}</h2>
                <p className="ko-keep mt-3 max-w-3xl text-lg font-semibold leading-8 text-ink">{project.subtitle}</p>
              </div>
              </div>
              <div className={`grid gap-5 ${heroInColumn ? "print-header-2" : ""}`}>
                <div className="print-header-text grid gap-3">
                  <ProjectSummary summary={summaryOf(project.slug, lang)} P={ui.project} show={heroInColumn ? "steps" : "all"} />
                </div>
                {hero ? (
                  <div className="print-header-figure">
                    <Figure image={hero} />
                  </div>
                ) : null}
              </div>
              {heroInColumn ? (
                <div className="print-glossary">
                  <ProjectSummary summary={summaryOf(project.slug, lang)} P={ui.project} show="glossary" />
                </div>
              ) : null}
              <div className="print-info">
                <ProjectInfoTable project={project} P={ui.project} />
              </div>
            </header>
            {heroInColumn ? (
              restImages.length ? (
                <div className={`grid items-start gap-4 ${restImages.length > 1 ? "print-figures-2" : ""}`}>
                  {restImages.map((extra) => (
                    <Figure key={extra.src} image={extra} />
                  ))}
                </div>
              ) : null
            ) : (
              <div className={`grid gap-5 ${(project.figureGroups?.length ?? 0) > 1 ? "print-groups-2" : ""}`}>
                <ProjectFigures project={project} />
              </div>
            )}
            <ProjectSections project={withAdminRoles(project, admin)} ui={ui} lang={lang} />
            <p className="ko-keep mt-6 text-xs font-semibold text-muted">{ui.footer.dataNotice}</p>
          </article>
        );
      })}

      <div className="no-print mt-10 flex justify-center">
        <PrintButton label={D.button} lang={lang} />
      </div>
    </div>
  );
}
