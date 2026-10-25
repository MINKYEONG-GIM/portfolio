import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const lead = project.metrics[0];
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`part-${project.part} group flex h-full flex-col justify-between rounded-3xl border border-line bg-paper p-6 shadow-soft transition hover:-translate-y-0.5 hover:border-[color:var(--tone)]`}
    >
      <div>
        <div className="flex items-center justify-between">
          <span className="tone-text text-xs font-black tracking-[0.18em]">{String(index).padStart(2, "0")}</span>
          <span className="flex items-center gap-2 text-xs font-semibold text-muted">
            {project.status ? <span className="tone-soft tone-text rounded-full px-2 py-0.5 font-bold">{project.status}</span> : null}
            {project.period}
          </span>
        </div>
        <h3 className="ko-keep mt-4 text-xl font-extrabold leading-snug text-ink">{project.title}</h3>
        <p className="ko-keep mt-2 text-sm leading-6 text-muted">{project.subtitle}</p>
      </div>
      <div className="mt-6 flex items-end justify-between gap-4">
        {lead ? (
          <div>
            <p className="tone-text text-2xl font-black leading-none">{lead.value}</p>
            <p className="ko-keep mt-1.5 text-xs font-semibold text-muted">{lead.label}</p>
          </div>
        ) : (
          <span />
        )}
        <span className="tone-soft tone-text inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition group-hover:bg-[color:var(--tone)] group-hover:text-white">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
