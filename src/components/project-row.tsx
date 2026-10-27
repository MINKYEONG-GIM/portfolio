import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { groupLabel, statusOf } from "@/data/content";
import type { UIStrings } from "@/data/i18n";

const PILL_TONES = ["pill-red", "pill-blue", "pill-purple"];

/** 썸네일 자리. 이미지가 없으면 파트 색 바탕에 번호를 크게 씁니다. */
export function Thumb({ project, index, className = "" }: { project: Project; index: number; className?: string }) {
  const picture = project.thumb ?? project.image;
  return (
    <div className={`relative overflow-hidden rounded-xl border border-line bg-surface ${className}`}>
      {picture ? (
        <Image
          src={picture.src}
          alt={picture.alt}
          width={picture.width}
          height={picture.height}
          sizes="(min-width: 1024px) 320px, 40vw"
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="tone-soft flex h-full w-full items-center justify-center">
          <span className="tone-text text-3xl font-black leading-none sm:text-5xl">{String(index).padStart(2, "0")}</span>
        </div>
      )}
    </div>
  );
}

/**
 * 가로 행: 썸네일 | 중분류 · 제목 · 설명 · 태그 | 핵심 수치 · 기간 · 상태.
 * 파트에 프로젝트가 하나뿐이어도 폭이 같아 어색하지 않습니다.
 */
export function ProjectRow({ project, index, ui }: { project: Project; index: number; ui: UIStrings }) {
  const lead = project.metrics[0];
  const status = statusOf(project, ui.status);
  return (
    <Link
      href={`/projects/${project.slug}`}
      data-project-slug={project.slug}
      className={`part-${project.part} group grid grid-cols-[6rem_1fr] gap-x-4 gap-y-3 rounded-2xl border border-line bg-paper p-4 shadow-soft transition hover:-translate-y-0.5 hover:border-[color:var(--tone)] sm:grid-cols-[9rem_1fr_auto] sm:items-center sm:gap-6 sm:p-5`}
    >
      <Thumb project={project} index={index} className="aspect-square w-full" />
      <div className="min-w-0">
        <p className="flex items-center gap-2 text-xs font-black">
          <span className="text-muted">{String(index).padStart(2, "0")}</span>
          <span className="tone-text">{groupLabel(project)}</span>
        </p>
        <h3 className="ko-keep mt-1 text-xl font-extrabold leading-7 text-ink group-hover:underline">{project.title}</h3>
        <p className="ko-keep mt-1 line-clamp-2 text-sm leading-6 text-muted">{project.subtitle}</p>
        <div className="mt-2 flex flex-wrap gap-1">
          {project.tags.slice(0, 3).map((tag, tagIndex) => (
            <span key={tag} className={`pill ${PILL_TONES[tagIndex % PILL_TONES.length]}`}>
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="col-span-2 flex items-center justify-between gap-4 sm:col-span-1 sm:w-56 sm:flex-col sm:items-end sm:justify-center sm:text-right">
        <div>
          {lead ? (
            <>
              <p className="text-2xl font-black leading-none text-[color:var(--price)]">{lead.value}</p>
              <p className="ko-keep mt-1 text-sm font-bold text-ink">{lead.label}</p>
            </>
          ) : (
            <span className={`pill ${status === ui.status.planned ? "pill-gray" : "pill-green"}`}>{status}</span>
          )}
          {project.period !== status ? <p className="mt-1 text-xs font-bold text-muted">{project.period}</p> : null}
        </div>
        <ChevronRight className="h-5 w-5 shrink-0 text-muted group-hover:text-ink" />
      </div>
    </Link>
  );
}
