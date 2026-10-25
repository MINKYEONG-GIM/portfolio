import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

const PILL_TONES = ["pill-red", "pill-blue", "pill-purple"];

/** 상품 카드 꼴: 정사각 이미지 + 배지, 중분류(브랜드줄), 제목, 한 줄 설명, 빨간 핵심 수치, 기간, 알약 태그 */
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const lead = project.metrics[0];
  const status = project.status ?? (project.period.includes("진행 중") ? "진행 중" : "완료");
  return (
    <Link href={`/projects/${project.slug}`} className={`part-${project.part} group flex flex-col`}>
      <div className="relative aspect-square overflow-hidden border border-line bg-surface">
        {project.image ? (
          <Image
            src={project.image.src}
            alt={project.image.alt}
            width={project.image.width}
            height={project.image.height}
            sizes="(min-width: 1024px) 270px, 50vw"
            className="h-full w-full object-cover transition group-hover:scale-[1.03]"
          />
        ) : (
          <div className="tone-soft flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center">
            <span className="tone-text text-6xl font-black leading-none">{String(index).padStart(2, "0")}</span>
            <span className="ko-keep text-base font-extrabold leading-6 text-ink">{project.title}</span>
          </div>
        )}
        <span className="badge-circle tone-text absolute left-3 top-3 border-2 tone-border bg-paper">{String(index).padStart(2, "0")}</span>
        <span className="badge-circle absolute right-3 top-3 bg-[color:var(--accent)] text-ink">{status}</span>
      </div>
      <div className="flex flex-col items-center gap-1 px-1 pt-3 text-center">
        <p className="text-sm font-extrabold text-muted">{project.group.replace(/^[①-⑩] /, "")}</p>
        <h3 className="ko-keep line-clamp-2 text-base font-extrabold leading-6 text-ink">{project.title}</h3>
        <p className="ko-keep line-clamp-2 text-sm leading-5 text-muted">{project.subtitle}</p>
        {lead ? (
          <p className="mt-1 leading-tight">
            <span className="text-2xl font-black text-[color:var(--price)]">{lead.value}</span>
            <span className="ko-keep ml-1.5 text-sm font-bold text-ink">{lead.label}</span>
          </p>
        ) : null}
        <p className="text-xs font-bold text-muted">{project.period}</p>
        <div className="mt-1 flex flex-wrap justify-center gap-1">
          {project.tags.slice(0, 3).map((tag, tagIndex) => (
            <span key={tag} className={`pill ${PILL_TONES[tagIndex % PILL_TONES.length]}`}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
