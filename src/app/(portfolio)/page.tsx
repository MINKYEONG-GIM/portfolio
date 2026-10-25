import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { PARTS, PROFILE, PROJECTS, groupsOfPart, projectsByPart } from "@/data/projects";

export default function HomePage() {
  let counter = 0;
  return (
    <div className="grid gap-14">
      {/* 배너: 한 줄 소개 */}
      <section className="grid gap-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h1 className="text-3xl font-extrabold text-ink">서비스기획 포트폴리오</h1>
          <p className="text-base font-extrabold text-muted">2024.01 - 진행 중</p>
        </div>
        <div className="bg-[color:var(--accent)] px-6 py-10 text-ink sm:px-10 sm:py-14">
          <p className="text-xs font-black tracking-[0.22em]">PROJECT PORTFOLIO</p>
          <h2 className="ko-keep mt-3 text-3xl font-black leading-tight sm:text-5xl">{PROFILE.tagline}</h2>
          <p className="mt-5 text-xl font-extrabold">{PROFILE.name}</p>
          <p className="ko-keep mt-2 max-w-3xl text-base font-semibold leading-7">{PROFILE.intro}</p>
        </div>

        {/* 대분류 3개 요약 */}
        <div className="oy-grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5">
          {PARTS.map((part) => (
            <a key={part.no} href={`#part-${part.no}`} className={`part-${part.no} flex flex-col gap-1 bg-paper px-5 py-5 transition hover:bg-surface`}>
              <span className="tone-text text-xs font-black tracking-[0.18em]">{part.code}</span>
              <span className="ko-keep text-lg font-extrabold text-ink">{part.title}</span>
              <span className="ko-keep text-sm font-semibold text-muted">{part.tagline}</span>
              <span className="tone-text mt-2 text-3xl font-black leading-none">{projectsByPart(part.no).length}</span>
            </a>
          ))}
        </div>

        {/* 전체 프로젝트 격자 인덱스 */}
        <div className="oy-grid grid-cols-2 lg:grid-cols-4">
          <span className="flex items-center justify-between gap-2 bg-surface px-4 py-4 text-base font-extrabold text-ink">전체 ({PROJECTS.length})</span>
          {PROJECTS.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="ko-keep flex items-center justify-between gap-2 bg-paper px-4 py-4 text-base font-semibold text-ink transition hover:bg-surface"
            >
              <span className="line-clamp-2">{project.title}</span>
              <ChevronRight className="h-4 w-4 shrink-0 text-muted" />
            </Link>
          ))}
        </div>
      </section>

      {/* 대분류 → 중분류 → 프로젝트 카드 */}
      {PARTS.map((part) => (
        <section key={part.no} id={`part-${part.no}`} className={`part-${part.no} grid gap-6 scroll-mt-6`}>
          <div className="oy-band flex flex-wrap items-baseline gap-3">
            <span className="tone-text text-sm font-black tracking-[0.18em]">{part.code}</span>
            <h2 className="ko-keep text-ink">{part.title}</h2>
            <span className="ko-keep text-base font-bold text-muted">{part.tagline}</span>
          </div>
          <p className="ko-keep text-base leading-7 text-ink">{part.summary}</p>
          {groupsOfPart(part.no).map((group) => (
            <div key={group.group} className="grid gap-4">
              <h3 className="flex items-center gap-2 border-b border-line pb-2 text-lg font-extrabold text-ink">
                <span className="tone-bg h-2.5 w-2.5 rounded-full" />
                {group.group}
                <span className="text-sm font-bold text-muted">{group.projects.length}</span>
              </h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
                {group.projects.map((project) => {
                  counter += 1;
                  return <ProjectCard key={project.slug} project={project} index={counter} />;
                })}
              </div>
            </div>
          ))}
        </section>
      ))}

      <section id="timeline" className="grid gap-6 scroll-mt-6">
        <div className="oy-band flex items-baseline gap-3">
          <h2 className="text-ink">타임라인</h2>
          <span className="text-base font-bold text-muted">시작 시점 순</span>
        </div>
        <table className="oy-table">
          <tbody>
            {[...PROJECTS]
              .sort((a, b) => a.period.localeCompare(b.period))
              .map((project) => (
                <tr key={project.slug} className={`part-${project.part}`}>
                  <th scope="row">{project.period}</th>
                  <td>
                    <Link href={`/projects/${project.slug}`} className="ko-keep text-base font-extrabold text-ink hover:underline">
                      <span className="tone-text mr-2 text-xs font-black">{PARTS[project.part - 1].code}</span>
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
