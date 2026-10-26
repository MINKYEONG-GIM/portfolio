import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Project } from "@/data/projects";

const PILL_TONES = ["pill-red", "pill-blue", "pill-purple"];

export function statusOf(project: Project) {
  return project.status ?? (project.period.includes("진행 중") ? "진행 중" : "완료");
}

export function groupLabel(project: Project) {
  return project.group.replace(/^[①-⑩] /, "");
}

/** 썸네일 자리. 이미지가 없으면 파트 색 바탕에 번호를 크게 씁니다. */
export function Thumb({ project, index, className = "" }: { project: Project; index: number; className?: string }) {
  return (
    <div className={`relative overflow-hidden border border-line bg-surface ${className}`}>
      {project.image ? (
        <Image
          src={project.image.src}
          alt={project.image.alt}
          width={project.image.width}
          height={project.image.height}
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
export function ProjectRow({ project, index }: { project: Project; index: number }) {
  const lead = project.metrics[0];
  const status = statusOf(project);
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`part-${project.part} group grid grid-cols-[6rem_1fr] gap-x-4 gap-y-3 border-b border-line py-5 transition hover:bg-surface sm:grid-cols-[9rem_1fr_auto] sm:items-center sm:gap-6 sm:px-3`}
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
            <span className={`pill ${status === "준비 중" ? "pill-gray" : "pill-green"}`}>{status}</span>
          )}
          {project.period !== status ? <p className="mt-1 text-xs font-bold text-muted">{project.period}</p> : null}
        </div>
        <ChevronRight className="h-5 w-5 shrink-0 text-muted group-hover:text-ink" />
      </div>
    </Link>
  );
}

/** 대표 프로젝트: 이미지 왼쪽, 설명·수치 오른쪽의 큰 카드 */
export function FeaturedProject({ project, index }: { project: Project; index: number }) {
  return (
    <Link href={`/projects/${project.slug}`} className={`part-${project.part} group grid border-2 border-ink bg-paper transition hover:bg-surface lg:grid-cols-[1.1fr_1fr]`}>
      <Thumb project={project} index={index} className="aspect-[16/10] w-full border-0 border-b-2 border-ink lg:border-b-0 lg:border-r-2" />
      <div className="flex flex-col justify-between gap-6 p-6 sm:p-8">
        <div>
          <p className="flex items-center gap-2 text-xs font-black">
            <span className="pill pill-green">대표 프로젝트</span>
            <span className="tone-text">{groupLabel(project)}</span>
          </p>
          <h3 className="ko-keep mt-3 text-2xl font-black leading-tight text-ink group-hover:underline sm:text-3xl">{project.title}</h3>
          <p className="ko-keep mt-3 text-base leading-7 text-ink">{project.subtitle}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {project.metrics.slice(0, 2).map((metric) => (
            <div key={metric.label} className="border border-line bg-paper p-4">
              <p className="text-2xl font-black leading-none text-[color:var(--price)] sm:text-3xl">{metric.value}</p>
              <p className="ko-keep mt-2 text-sm font-bold text-ink">{metric.label}</p>
              {metric.note ? <p className="text-xs font-semibold text-muted">{metric.note}</p> : null}
            </div>
          ))}
        </div>
        <p className="flex items-center justify-between text-sm font-bold text-muted">
          <span>{project.period}</span>
          <span className="inline-flex items-center gap-1 text-ink">
            자세히 보기 <ChevronRight className="h-4 w-4" />
          </span>
        </p>
      </div>
    </Link>
  );
}
