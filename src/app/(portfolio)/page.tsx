import Link from "next/link";
import { FeaturedProject, ProjectRow } from "@/components/project-row";
import { PartIcon } from "@/components/part-icon";
import { PARTS, PROFILE, PROJECTS, projectsByPart } from "@/data/projects";

export default function HomePage() {
  // 전체 번호: 파트 순서대로 01부터
  const numberOf = new Map(PROJECTS.map((project, index) => [project.slug, index + 1]));

  return (
    <div className="grid gap-12">
      {/* 1. 한 줄 소개 */}
      <section className="bg-[color:var(--accent)] px-6 py-8 text-ink sm:px-10 sm:py-10">
        <p className="text-xs font-black tracking-[0.22em]">SERVICE PLANNING PORTFOLIO</p>
        <h1 className="ko-keep mt-2 text-3xl font-black leading-tight sm:text-4xl">
          {PROFILE.name} · {PROFILE.tagline}
        </h1>
        <p className="ko-keep mt-3 max-w-3xl text-base font-semibold leading-7">{PROFILE.intro}</p>
      </section>

      {/* 2. 주제 5개 한 줄 (어디로 갈지) */}
      <section className="grid gap-3">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-2xl font-black text-ink">어떤 걸 보고 싶으세요?</h2>
          <p className="text-sm font-bold text-muted">프로젝트 {PROJECTS.length}개 · 주제 {PARTS.length}개</p>
        </div>
        <div className="oy-grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {PARTS.map((part) => (
            <a key={part.no} href={`#part-${part.no}`} className={`part-${part.no} flex flex-col gap-2 bg-paper p-4 transition hover:bg-surface`}>
              <span className="flex items-center justify-between">
                <span className="tone-bg flex h-9 w-9 items-center justify-center rounded-full text-white">
                  <PartIcon no={part.no} className="h-4 w-4" />
                </span>
                <span className="tone-text text-2xl font-black leading-none">{projectsByPart(part.no).length}</span>
              </span>
              <span className="ko-keep text-base font-black leading-6 text-ink">{part.short}</span>
              <span className="ko-keep text-xs font-semibold leading-5 text-muted">{part.question}</span>
            </a>
          ))}
        </div>
      </section>

      {/* 3. 주제별 목록: 띠 헤더 + 가로 행. 첫 주제의 첫 프로젝트는 대표 카드 */}
      {PARTS.map((part, partIndex) => {
        const projects = projectsByPart(part.no);
        const [first, ...rest] = projects;
        const featured = partIndex === 0 ? first : null;
        const rows = partIndex === 0 ? rest : projects;
        return (
          <section key={part.no} id={`part-${part.no}`} className={`part-${part.no} grid gap-5 scroll-mt-28`}>
            <div className="oy-band flex flex-wrap items-center gap-3">
              <span className="tone-bg flex h-9 w-9 items-center justify-center rounded-full text-white">
                <PartIcon no={part.no} className="h-4 w-4" />
              </span>
              <span className="tone-text text-sm font-black tracking-[0.18em]">{part.code}</span>
              <h2 className="ko-keep text-ink">{part.title}</h2>
              <span className="text-base font-bold text-muted">{projects.length}개</span>
            </div>
            <p className="ko-keep text-base leading-7 text-ink">{part.summary}</p>
            {featured ? <FeaturedProject project={featured} index={numberOf.get(featured.slug) ?? 1} /> : null}
            {rows.length > 0 ? (
              <div className="border-t border-line">
                {rows.map((project) => (
                  <ProjectRow key={project.slug} project={project} index={numberOf.get(project.slug) ?? 0} />
                ))}
              </div>
            ) : null}
          </section>
        );
      })}

      {/* 4. 타임라인 */}
      <section id="timeline" className="grid gap-5 scroll-mt-28">
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
