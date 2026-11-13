import type { Metadata } from "next";
import { PartIcon } from "@/components/part-icon";
import { withAdminRoles } from "@/components/project-body";
import { byPart, getContent, visibleProjects } from "@/data/content";
import { t } from "@/data/i18n";
import type { Project, ProjectImage } from "@/data/projects";
import { summaryOf } from "@/data/summaries";
import { isAdmin } from "@/lib/hub-auth";
import { getLang, parseLang } from "@/lib/lang";

/**
 * 다운로드용 PDF 를 만드는 슬라이드형 문서 (16:9, 한 장 = PDF 한 쪽).
 * 표지(남색) → 목차 → 전체 요약 → 프로젝트마다 최대 3장
 *   1장: 대표 이미지 | 기간 · 목적 · 역할/기여 · 성과
 *   2장: 두 번째 이미지 | 배경 · 진행 단계 · 핵심 내용
 *   3장: 남은 화면 이미지 (있을 때만)
 * scripts/make-pdf.mjs 가 /deck?lang=ko|en 을 PDF 로 저장합니다.
 */

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return { title: t(lang).pdf.title, robots: { index: false, follow: false } };
}

const L = {
  ko: {
    portfolio: "PROJECT PORTFOLIO",
    period: "프로젝트 기간",
    purpose: "프로젝트 목적",
    role: "역할/기여",
    result: "성과",
    background: "프로젝트 배경",
    steps: "프로젝트 진행",
    points: "핵심 내용",
    screens: "주요 화면",
    stack: "기술·도구"
  },
  en: {
    portfolio: "PROJECT PORTFOLIO",
    period: "Period",
    purpose: "Purpose",
    role: "Role & contribution",
    result: "Results",
    background: "Background",
    steps: "How it went",
    points: "Key points",
    screens: "Key screens",
    stack: "Stack"
  }
} as const;

/** 프로젝트의 모든 그림을 보여 줄 순서대로 (같은 파일은 한 번만) */
function imagesOf(project: Project): ProjectImage[] {
  const all = [
    ...(project.image ? [project.image] : []),
    ...(project.figureGroups?.flatMap((group) => group.images) ?? []),
    ...(project.images ?? []),
    ...(project.catalog?.figures ?? []),
    ...(project.system?.figures ?? []),
    ...(project.stepFigures ?? [])
  ];
  const seen = new Set<string>();
  return all.filter((image) => (seen.has(image.src) ? false : (seen.add(image.src), true)));
}

/** 2장의 '핵심 내용' 세 줄: 목록 → 기능 → 처리 과정 → 인사이트 → 요약 순으로 있는 것을 씁니다 */
function pointsOf(project: Project, summary: ReturnType<typeof summaryOf>): { title: string; body: string }[] {
  if (project.catalog?.items.length) return project.catalog.items.slice(0, 3).map((item) => ({ title: item.name, body: item.body }));
  if (project.features?.length) return project.features.slice(0, 3).map((section) => ({ title: section.title, body: section.summary }));
  if (project.system?.flow.length) return project.system.flow.slice(0, 3);
  if (project.insights?.length) return project.insights.slice(0, 3);
  if (summary) return [{ title: "", body: summary.problem }, { title: "", body: summary.action }, { title: "", body: summary.result }];
  return [];
}

function Shot({ image, fit = "contain" }: { image: ProjectImage; fit?: "contain" | "cover" }) {
  return (
    <figure className="dk-shot">
      <div className="dk-shot-frame">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image.src} alt={image.alt} style={{ objectFit: fit }} />
      </div>
      {image.caption ? <figcaption>{image.caption}</figcaption> : null}
    </figure>
  );
}

function Head({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <header className="dk-head">
      <p className="dk-label">{label}</p>
      <h2 className="dk-title">{title}</h2>
      {subtitle ? <p className="dk-sub">{subtitle}</p> : null}
    </header>
  );
}

function Foot({ page, name }: { page: number; name: string }) {
  return (
    <footer className="dk-foot">
      <span>{name}</span>
      <span>{String(page).padStart(2, "0")}</span>
    </footer>
  );
}

export default async function DeckPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const [cookieLang, admin, query] = await Promise.all([getLang(), isAdmin(), searchParams]);
  const lang = query.lang ? parseLang(query.lang) : cookieLang;
  const ui = t(lang);
  const D = ui.pdf;
  const W = L[lang];
  const { profile, parts, projects: allProjects } = getContent(lang);
  const projects = visibleProjects(allProjects, admin);
  const numberOf = (slug: string) => String(projects.findIndex((item) => item.slug === slug) + 1).padStart(2, "0");
  let page = 1;

  return (
    <div className="dk-root" lang={lang}>
      <link rel="stylesheet" href="/deck.css" />

      {/* 표지 */}
      <section className="dk-slide dk-cover">
        <div>
          <p className="dk-cover-label">{W.portfolio}</p>
          <h1 className="dk-cover-title">{profile.tagline}</h1>
          <p className="dk-cover-sub">{D.cover}</p>
        </div>
        <div className="dk-cover-bottom">
          <p className="dk-cover-name">{profile.name}</p>
          <p className="dk-cover-note">{ui.footer.dataNotice}</p>
        </div>
      </section>

      {/* 목차 */}
      <section className="dk-slide">
        <header className="dk-head">
          <p className="dk-label">CONTENTS</p>
          <h2 className="dk-title">{D.contents}</h2>
        </header>
        <ol className="dk-toc">
          {parts.map((part) => {
            const items = byPart(projects, part.no);
            if (items.length === 0) return null;
            return (
              <li key={part.no}>
                <span className="dk-toc-icon">
                  <PartIcon no={part.no} className="h-5 w-5" />
                </span>
                <span className="dk-toc-no">{String(part.no).padStart(2, "0")}</span>
                <span className="dk-toc-title">{part.title}</span>
                <span className="dk-toc-items">{items.map((project) => project.short ?? project.title).join(" / ")}</span>
              </li>
            );
          })}
        </ol>
        <Foot page={++page} name={profile.name} />
      </section>

      {/* 전체 요약 */}
      <section className="dk-slide">
        <header className="dk-head">
          <p className="dk-label">SUMMARY</p>
          <h2 className="dk-title">{D.summary}</h2>
          <p className="dk-sub">{profile.intro}</p>
        </header>
        <table className="dk-table">
          <thead>
            <tr>
              <th style={{ width: "6%" }}>{D.colNo}</th>
              <th style={{ width: "17%" }}>{D.colPart}</th>
              <th>{D.colProject}</th>
              <th style={{ width: "15%" }}>{D.colPeriod}</th>
              <th style={{ width: "26%" }}>{D.colResult}</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => {
              const metric = project.metrics[0];
              return (
                <tr key={project.slug}>
                  <td className="dk-strong">{numberOf(project.slug)}</td>
                  <td>{parts[project.part - 1].short}</td>
                  <td className="dk-strong">{project.title}</td>
                  <td>{project.period}</td>
                  <td>
                    {metric ? (
                      <>
                        <b className="dk-blue">{metric.value}</b> {metric.label}
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
        <Foot page={++page} name={profile.name} />
      </section>

      {/* 프로젝트마다 최대 3장 */}
      {projects.map((raw) => {
        const project = withAdminRoles(raw, admin);
        const part = parts[project.part - 1];
        const label = `Part ${String(part.no).padStart(2, "0")} | ${part.title}`;
        const summary = summaryOf(project.slug, lang);
        const shots = imagesOf(project);
        const [first, second, ...rest] = shots;
        const points = pointsOf(project, summary);
        const steps = (project.steps ?? []).slice(0, 6);
        const extra = rest.slice(0, 3);
        return (
          <div key={project.slug} className={`part-${project.part}`}>
            {/* 1장: 개요 */}
            <section className="dk-slide">
              <Head label={label} title={project.title} subtitle={project.subtitle} />
              <div className={`dk-body ${first ? "" : "dk-body-full"}`}>
                {first ? (
                  <div className="dk-left">
                    <Shot image={first} />
                  </div>
                ) : null}
                <div className="dk-right">
                  <div className="dk-block">
                    <h3>{W.period}</h3>
                    <p>{project.period}</p>
                  </div>
                  <div className="dk-block">
                    <h3>{W.purpose}</h3>
                    <p className="dk-pre dk-clamp-4">{project.purpose}</p>
                  </div>
                  <div className="dk-block">
                    <h3>{W.role}</h3>
                    <ul className="dk-box dk-bullets">
                      {project.roles.slice(0, 5).map((role) => (
                        <li key={role}>{role}</li>
                      ))}
                    </ul>
                  </div>
                  {project.metrics.length ? (
                    <div className="dk-block">
                      <h3>{W.result}</h3>
                      <div className="dk-metrics">
                        {project.metrics.slice(0, 4).map((metric) => (
                          <div key={metric.label} className="dk-metric">
                            <span className="dk-metric-label">{metric.label}</span>
                            <b className="dk-metric-value">{metric.value}</b>
                            {metric.note ? <span className="dk-metric-note">{metric.note}</span> : null}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
              <Foot page={++page} name={profile.name} />
            </section>

            {/* 2장: 배경 · 진행 · 핵심 내용 */}
            {project.background || steps.length || points.length ? (
              <section className="dk-slide">
                <Head label={label} title={project.title} subtitle={project.subtitle} />
                <div className={`dk-body ${second ?? first ? "" : "dk-body-full"}`}>
                  {second ?? first ? (
                    <div className="dk-left">
                      <Shot image={(second ?? first)!} />
                    </div>
                  ) : null}
                  <div className="dk-right">
                    {project.background ? (
                      <div className="dk-block">
                        <h3>{W.background}</h3>
                        <p className="dk-box dk-pre dk-clamp-5">{project.background}</p>
                      </div>
                    ) : null}
                    {steps.length ? (
                      <div className="dk-block">
                        <h3>{W.steps}</h3>
                        <ol className="dk-steps" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
                          {steps.map((step, index) => (
                            <li key={step}>
                              <span className="dk-step-no">{String(index + 1).padStart(2, "0")}</span>
                              <span className="dk-step-text">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    ) : null}
                    {points.length ? (
                      <div className="dk-block">
                        <h3>{W.points}</h3>
                        <ol className="dk-points">
                          {points.map((point, index) => (
                            <li key={index}>
                              <span className="dk-point-no">{String(index + 1).padStart(2, "0")}</span>
                              <span className="dk-point-text">
                                {point.title ? <b>{point.title}</b> : null}
                                {point.title ? " " : null}
                                {point.body}
                              </span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    ) : null}
                  </div>
                </div>
                <Foot page={++page} name={profile.name} />
              </section>
            ) : null}

            {/* 3장: 남은 화면 (있을 때만) */}
            {extra.length ? (
              <section className="dk-slide">
                <Head label={label} title={project.title} subtitle={W.screens} />
                <div className={`dk-gallery dk-gallery-${extra.length}`}>
                  {extra.map((image) => (
                    <Shot key={image.src} image={image} />
                  ))}
                </div>
                <Foot page={++page} name={profile.name} />
              </section>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
