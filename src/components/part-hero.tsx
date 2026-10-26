import Image from "next/image";
import { PartIcon } from "@/components/part-icon";
import { HarnessDiagram } from "@/components/harness-diagram";
import type { Part, Project } from "@/data/projects";
import type { UIStrings } from "@/data/i18n";
import type { Lang } from "@/lib/lang";

/**
 * 파트 소개 블록: 왼쪽 큰 비주얼, 오른쪽에 이 파트가 무엇인지(제목·한 줄·요약)와 핵심 성과 숫자.
 * 프로젝트 행 목록 위에 놓여 "이 파트가 대략 무슨 내용인지"를 먼저 보여 줍니다.
 */
export function PartHero({ part, projects, lang, ui, harnessJobs }: { part: Part; projects: Project[]; lang: Lang; ui: UIStrings; harnessJobs?: string[] }) {
  const highlights = projects.map((project) => ({ project, metric: project.metrics[0] })).filter((item) => item.metric).slice(0, 4);
  return (
    <div className="grid border-2 border-ink bg-paper lg:grid-cols-[1.05fr_1fr]">
      <figure className="flex flex-col border-b-2 border-ink lg:border-b-0 lg:border-r-2">
        <div className="tone-soft flex flex-1 items-center justify-center">
          {part.visual.type === "image" ? (
            <Image
              src={part.visual.src}
              alt={part.visual.alt}
              width={part.visual.width}
              height={part.visual.height}
              sizes="(min-width: 1024px) 560px, 100vw"
              className="h-full w-full object-cover"
              priority={part.no === 1}
            />
          ) : (
            <div className="w-full p-3">
              <HarnessDiagram jobs={harnessJobs ?? []} lang={lang} />
            </div>
          )}
        </div>
        <figcaption className="ko-keep border-t border-line px-4 py-2 text-xs font-bold text-muted">{part.visual.caption}</figcaption>
      </figure>
      <div className="flex flex-col gap-5 p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <span className="tone-bg flex h-10 w-10 items-center justify-center rounded-full text-white">
            <PartIcon no={part.no} className="h-5 w-5" />
          </span>
          <span className="tone-text text-sm font-black tracking-[0.18em]">{part.code}</span>
          <span className="text-sm font-bold text-muted">{ui.home.projectCount(projects.length)}</span>
        </div>
        <div>
          <h2 className="ko-keep text-2xl font-black leading-snug text-ink sm:text-3xl">{part.title}</h2>
          <p className="tone-text ko-keep mt-2 text-base font-extrabold">{part.tagline}</p>
          <p className="ko-keep mt-3 text-base leading-7 text-ink">{part.summary}</p>
        </div>
        {highlights.length > 0 ? (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {highlights.map(({ project, metric }) => (
              <a key={project.slug} href={`/projects/${project.slug}`} className="border border-line bg-paper p-3 transition hover:bg-surface">
                <p className="text-xl font-black leading-none text-[color:var(--price)]">{metric!.value}</p>
                <p className="ko-keep mt-1.5 line-clamp-2 text-xs font-bold leading-4 text-ink">{metric!.label}</p>
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
