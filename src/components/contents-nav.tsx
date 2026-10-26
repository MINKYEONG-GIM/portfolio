"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { PROJECT_PREFIX, useActiveProject, useRevealActive } from "@/components/use-active-project";

export type NavPart = { no: number; code: string; short: string; projects: { slug: string; title: string; draft?: boolean }[] };
export type NavLabels = { contents: string; timeline: string; home: string; planned: string };

/** 왼쪽 사이드바: 유형별(파트 → 프로젝트) 순서. 메인에 보이는 프로젝트를 색으로 강조합니다. */
export function ContentsNav({ parts, labels }: { parts: NavPart[]; labels: NavLabels }) {
  const pathname = usePathname();
  const active = useActiveProject();
  const listRef = useRef<HTMLUListElement>(null);
  useRevealActive(listRef, active);

  return (
    <nav aria-label={labels.contents} className="text-sm">
      <p className="px-2 text-xs font-black tracking-[0.18em] text-muted">{labels.contents.toUpperCase()}</p>
      <ul ref={listRef} className="mt-2 grid gap-0.5">
        <li>
          <Link href="/" className={`block px-2 py-1.5 font-extrabold hover:bg-surface ${pathname === "/" ? "text-ink" : "text-muted hover:text-ink"}`}>
            {labels.home}
          </Link>
        </li>
        {parts.map((part) => (
          <li key={part.no} className={`part-${part.no} mt-3`}>
            <Link href={`/#part-${part.no}`} className="flex items-center gap-2 px-2 py-1.5 font-black text-ink hover:bg-surface">
              <span className="tone-bg h-2.5 w-2.5 rounded-full" />
              <span className="tone-text text-xs tracking-[0.14em]">{part.code}</span>
              <span className="ko-keep">{part.short}</span>
            </Link>
            <ul className="ml-3 border-l border-line">
              {part.projects.map((project) => {
                const isActive = project.slug === active;
                return (
                  <li key={project.slug} data-slug={project.slug}>
                    <Link
                      href={`${PROJECT_PREFIX}${project.slug}`}
                      aria-current={isActive ? "page" : undefined}
                      className={`ko-keep -ml-px block border-l-2 py-1.5 pl-3 pr-2 leading-5 transition ${
                        isActive ? "tone-border tone-soft font-extrabold text-ink" : "border-transparent font-semibold text-muted hover:border-line hover:text-ink"
                      }`}
                    >
                      {project.title}
                      {project.draft ? <span className="ml-1 text-[10px] font-black text-muted">· {labels.planned}</span> : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
}
