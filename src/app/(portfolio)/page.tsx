import { PartIcon } from "@/components/part-icon";
import { StoreHeading, StorePartCard, StoreProjectCard } from "@/components/store-cards";
import { byPart, getContent, visibleProjects } from "@/data/content";
import { t } from "@/data/i18n";
import { isAdmin } from "@/lib/hub-auth";
import { getLang } from "@/lib/lang";

/** 언어·관리자 쿠키를 읽으므로 요청마다 그립니다. */
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [lang, admin] = await Promise.all([getLang(), isAdmin()]);
  const ui = t(lang);
  const { parts, profile, projects: allProjects } = getContent(lang);
  const projects = visibleProjects(allProjects, admin);
  const numberOf = new Map(projects.map((project, index) => [project.slug, index + 1]));

  return (
    <div className="grid gap-16">
      {/* 1. 스토어식 머리: 왼쪽 큰 제목, 오른쪽 한 줄 소개 */}
      <section className="grid gap-8 rounded-3xl bg-surface px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[1fr_auto] lg:items-end">
        <h1 className="text-6xl font-black tracking-tight text-ink sm:text-7xl">{ui.home.title}</h1>
        <div className="grid gap-3 lg:max-w-md lg:text-right">
          <p className="ko-keep text-2xl font-black leading-snug text-ink">{profile.tagline}</p>
          <p className="text-base font-extrabold text-ink">{profile.name}</p>
          <p className="ko-keep text-sm font-semibold leading-6 text-muted">{profile.intro}</p>
        </div>
      </section>

      {/* 2. 파트 아이콘 행 (제품 이미지 대신 아이콘) */}
      <section className="no-scrollbar flex gap-4 overflow-x-auto px-2 sm:justify-center sm:gap-12">
        {parts.map((part) => (
          <a key={part.no} href={`#part-${part.no}`} className={`part-${part.no} group flex w-40 shrink-0 flex-col items-center gap-3 text-center`}>
            <span className="tone-soft flex h-24 w-24 items-center justify-center rounded-full transition group-hover:scale-105">
              <PartIcon no={part.no} className="tone-text h-11 w-11" />
            </span>
            <span className="ko-keep text-base font-extrabold text-ink">{part.short}</span>
            <span className="text-xs font-bold text-muted">{ui.home.projectCount(byPart(projects, part.no).length)}</span>
          </a>
        ))}
      </section>


      {/* 3. 파트마다: 애플식 제목 + 가로 스냅 카드 (첫 장은 파트 소개, 이후 프로젝트 한 장씩) */}
      {parts.map((part) => {
        const list = byPart(projects, part.no);
        return (
          <section key={part.no} id={`part-${part.no}`} className={`part-${part.no} grid gap-5 scroll-mt-32`}>
            <StoreHeading part={part} hint={ui.home.swipeHint} />
            <div id={`part-${part.no}-list`} className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6">
              <StorePartCard part={part} />
              {list.map((project) => (
                <StoreProjectCard key={project.slug} project={project} index={numberOf.get(project.slug) ?? 0} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
