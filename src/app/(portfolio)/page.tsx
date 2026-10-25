import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { PartIcon } from "@/components/part-icon";
import { PARTS, PROFILE, PROJECTS, groupsOfPart, projectsByPart } from "@/data/projects";

export default function HomePage() {
  let counter = 0;
  return (
    <div className="grid gap-14">
      {/* 1. 한 줄 소개 (짧게) */}
      <section className="bg-[color:var(--accent)] px-6 py-8 text-ink sm:px-10 sm:py-10">
        <p className="text-xs font-black tracking-[0.22em]">SERVICE PLANNING PORTFOLIO</p>
        <h1 className="ko-keep mt-2 text-3xl font-black leading-tight sm:text-4xl">
          {PROFILE.name} · {PROFILE.tagline}
        </h1>
        <p className="ko-keep mt-3 max-w-3xl text-base font-semibold leading-7">{PROFILE.intro}</p>
      </section>

      {/* 2. 어디를 누를지 바로 보이는 타일 */}
      <section className="grid gap-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-2xl font-black text-ink">어떤 걸 보고 싶으세요?</h2>
          <p className="text-sm font-bold text-muted">프로젝트 {PROJECTS.length}개 · 주제 {PARTS.length}개</p>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {PARTS.map((part) => {
            const projects = projectsByPart(part.no);
            return (
              <div key={part.no} className={`part-${part.no} flex flex-col border-2 border-line bg-paper transition hover:border-[color:var(--tone)]`}>
                <a href={`#part-${part.no}`} className="tone-soft flex items-start gap-3 p-5">
                  <span className="tone-bg flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white">
                    <PartIcon no={part.no} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="tone-text block text-xs font-black tracking-[0.18em]">{part.code}</span>
                    <span className="ko-keep block text-xl font-black leading-7 text-ink">{part.short}</span>
                    <span className="ko-keep block text-sm font-bold leading-6 text-ink">{part.question}</span>
                  </span>
                  <ArrowRight className="tone-text mt-1 h-5 w-5 shrink-0" />
                </a>
                <ul className="flex flex-1 flex-col divide-y divide-line">
                  {projects.map((project) => (
                    <li key={project.slug}>
                      <Link
                        href={`/projects/${project.slug}`}
                        className="ko-keep flex items-center justify-between gap-2 px-5 py-3 text-base font-semibold text-ink transition hover:bg-surface"
                      >
                        <span className="line-clamp-1">{project.title}</span>
                        <ChevronRight className="h-4 w-4 shrink-0 text-muted" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. 주제별 카드 (대분류 → 중분류 → 프로젝트) */}
      {PARTS.map((part) => (
        <section key={part.no} id={`part-${part.no}`} className={`part-${part.no} grid gap-6 scroll-mt-28`}>
          <div className="oy-band flex flex-wrap items-center gap-3">
            <span className="tone-bg flex h-9 w-9 items-center justify-center rounded-full text-white">
              <PartIcon no={part.no} className="h-4 w-4" />
            </span>
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

      {/* 4. 타임라인 */}
      <section id="timeline" className="grid gap-6 scroll-mt-28">
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
                      <span className="tone-text mr-2 text-xs font-black">{PARTS[project.part - 1].short}</span>
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
