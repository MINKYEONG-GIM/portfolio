import Link from "next/link";
import { PartHero } from "@/components/part-hero";
import { PartIcon } from "@/components/part-icon";
import { ProjectRow } from "@/components/project-row";
import { byPart, getContent } from "@/data/content";
import { t } from "@/data/i18n";
import { getLang } from "@/lib/lang";

/** 언어 쿠키를 읽으므로 요청마다 그립니다. */
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const lang = await getLang();
  const ui = t(lang);
  const { parts, profile, projects } = getContent(lang);
  const numberOf = new Map(projects.map((project, index) => [project.slug, index + 1]));
  const harnessJobs = projects.find((project) => project.vision)?.vision?.jobs;

  return (
    <div className="grid gap-12">
      {/* 1. 한 줄 소개 */}
      <section className="bg-[color:var(--accent)] px-6 py-8 text-ink sm:px-10 sm:py-10">
        <p className="text-xs font-black tracking-[0.22em]">{ui.home.eyebrow}</p>
        <h1 className="ko-keep mt-2 text-3xl font-black leading-tight sm:text-4xl">
          {profile.name} · {profile.tagline}
        </h1>
        <p className="ko-keep mt-3 max-w-3xl text-base font-semibold leading-7">{profile.intro}</p>
      </section>

      {/* 2. 주제 한 줄 (어디로 갈지) */}
      <section className="grid gap-3">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-2xl font-black text-ink">{ui.home.ask}</h2>
          <p className="text-sm font-bold text-muted">{ui.home.counts(projects.length, parts.length)}</p>
        </div>
        <div className="oy-grid grid-cols-1 sm:grid-cols-3">
          {parts.map((part) => (
            <a key={part.no} href={`#part-${part.no}`} className={`part-${part.no} flex flex-col gap-2 bg-paper p-4 transition hover:bg-surface`}>
              <span className="flex items-center justify-between">
                <span className="tone-bg flex h-9 w-9 items-center justify-center rounded-full text-white">
                  <PartIcon no={part.no} className="h-4 w-4" />
                </span>
                <span className="tone-text text-2xl font-black leading-none">{byPart(projects, part.no).length}</span>
              </span>
              <span className="ko-keep text-base font-black leading-6 text-ink">{part.short}</span>
              <span className="ko-keep text-xs font-semibold leading-5 text-muted">{part.question}</span>
            </a>
          ))}
        </div>
      </section>

      {/* 3. 주제별: 소개 블록(큰 비주얼 + 무엇인지) → 프로젝트 행 */}
      {parts.map((part) => {
        const list = byPart(projects, part.no);
        return (
          <section key={part.no} id={`part-${part.no}`} className={`part-${part.no} grid gap-5 scroll-mt-28`}>
            <PartHero part={part} projects={list} lang={lang} ui={ui} harnessJobs={harnessJobs} />
            <div className="border-t border-line">
              {list.map((project) => (
                <ProjectRow key={project.slug} project={project} index={numberOf.get(project.slug) ?? 0} ui={ui} />
              ))}
            </div>
          </section>
        );
      })}

      {/* 4. 타임라인 */}
      <section id="timeline" className="grid gap-5 scroll-mt-28">
        <div className="oy-band flex items-baseline gap-3">
          <h2 className="text-ink">{ui.home.timeline}</h2>
          <span className="text-base font-bold text-muted">{ui.home.timelineNote}</span>
        </div>
        <table className="oy-table">
          <tbody>
            {[...projects]
              .sort((a, b) => a.period.localeCompare(b.period))
              .map((project) => (
                <tr key={project.slug} className={`part-${project.part}`}>
                  <th scope="row">{project.period}</th>
                  <td>
                    <Link href={`/projects/${project.slug}`} className="ko-keep text-base font-extrabold text-ink hover:underline">
                      <span className="tone-text mr-2 text-xs font-black">{parts[project.part - 1].short}</span>
                      {project.title}
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
