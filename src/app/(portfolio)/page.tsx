import { PartIcon } from "@/components/part-icon";
import { ProjectRow } from "@/components/project-row";
import { byPart, getContent, visibleProjects } from "@/data/content";
import { t } from "@/data/i18n";
import { isAdmin } from "@/lib/hub-auth";
import { getLang } from "@/lib/lang";

/** 언어·관리자 쿠키를 읽으므로 요청마다 그립니다. */
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [lang, admin] = await Promise.all([getLang(), isAdmin()]);
  const ui = t(lang);
  const { parts, projects: allProjects } = getContent(lang);
  const projects = visibleProjects(allProjects, admin);
  const numberOf = new Map(projects.map((project, index) => [project.slug, index + 1]));

  return (
    <div className="grid gap-14">
      {/* 1. 머리: 라벨 + 파트 아이콘 (소개 문단 없음) */}
      <section className="grid gap-6 rounded-3xl bg-surface px-6 py-8 sm:px-10 sm:py-10">
        <p className="text-xs font-black tracking-[0.22em] text-muted">{ui.home.eyebrow}</p>
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
          {parts.map((part) => (
            <a key={part.no} href={`#part-${part.no}`} className={`part-${part.no} group flex w-32 flex-col items-center gap-2 text-center sm:w-36`}>
              <span className="tone-soft flex h-16 w-16 items-center justify-center rounded-full transition group-hover:scale-105">
                <PartIcon no={part.no} className="tone-text h-7 w-7" />
              </span>
              <span className="ko-keep text-sm font-extrabold leading-5 text-ink">{part.short}</span>
              <span className="text-xs font-bold text-muted">{byPart(projects, part.no).length}</span>
            </a>
          ))}
        </div>
      </section>

      {/* 2. 파트마다: 짧은 제목 + 회색 흐름 문장 + 세로 행 목록 */}
      {parts.map((part) => {
        const list = byPart(projects, part.no);
        return (
          <section key={part.no} id={`part-${part.no}`} className={`part-${part.no} grid gap-4 scroll-mt-32`}>
            <div>
              <h2 className="ko-keep text-2xl font-black leading-tight text-ink sm:text-3xl">
                {part.code}. {part.title}
              </h2>
              <p className="ko-keep mt-2 text-base font-bold leading-6 text-muted">{part.tagline}</p>
            </div>
            <div className="grid gap-4">
              {list.map((project) => (
                <ProjectRow key={project.slug} project={project} index={numberOf.get(project.slug) ?? 0} ui={ui} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
