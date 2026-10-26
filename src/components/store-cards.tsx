import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PartIcon } from "@/components/part-icon";
import type { Part, Project } from "@/data/projects";

const CARD = "relative block h-[22rem] w-[19rem] shrink-0 snap-start overflow-hidden rounded-3xl border border-line bg-surface transition hover:-translate-y-0.5 sm:w-[23rem]";

/**
 * 텍스트 없는 비주얼 카드. 이미지(없으면 파트 색 바탕 + 아이콘 + 번호)만 보이고,
 * 마우스를 올리면 제목이 아래에서 살짝 올라옵니다. 누르면 상세 페이지로 갑니다.
 */
export function StoreProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link href={`/projects/${project.slug}`} data-project-slug={project.slug} aria-label={project.title} className={`part-${project.part} group ${CARD}`}>
      {project.image ? (
        <Image
          src={project.image.src}
          alt=""
          width={project.image.width}
          height={project.image.height}
          sizes="368px"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.04]"
        />
      ) : (
        <div className="tone-soft flex h-full w-full flex-col items-center justify-center gap-4">
          <span className="tone-bg flex h-20 w-20 items-center justify-center rounded-full text-white">
            <PartIcon no={project.part} className="h-9 w-9" />
          </span>
          <span className="tone-text text-6xl font-black leading-none">{String(index).padStart(2, "0")}</span>
        </div>
      )}
      <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/80 to-black/0 px-6 pb-5 pt-14 text-base font-extrabold text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <span className="ko-keep block">{project.title}</span>
        <span className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-white/80">
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </span>
    </Link>
  );
}

/** 캐러셀 첫 장: 파트 대표 비주얼. 아이콘 배지만 있고 글자는 없습니다. */
export function StorePartCard({ part }: { part: Part }) {
  return (
    <a href={`#part-${part.no}`} aria-label={part.title} className={`part-${part.no} group ${CARD} bg-ink`}>
      {part.visual.type === "image" ? (
        <Image src={part.visual.src} alt="" width={part.visual.width} height={part.visual.height} sizes="368px" className="h-full w-full object-cover opacity-90" />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <PartIcon no={part.no} className="tone-text h-24 w-24" />
        </div>
      )}
      <span className="tone-bg absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg">
        <PartIcon no={part.no} className="h-6 w-6" />
      </span>
    </a>
  );
}

/** 애플식 섹션 제목: 굵은 검정 + 회색 이어지는 문장 */
export function StoreHeading({ part, hint }: { part: Part; hint: string }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <h2 className="ko-keep text-2xl font-black leading-tight sm:text-3xl">
        <span className="text-ink">
          {part.code}. {part.title}.
        </span>{" "}
        <span className="text-muted">{part.tagline}</span>
      </h2>
      <span className="inline-flex items-center gap-1 text-xs font-bold text-muted">
        {hint} <ArrowRight className="h-3.5 w-3.5" />
      </span>
    </div>
  );
}
