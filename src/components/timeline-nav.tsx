"use client";

import Link from "next/link";
import { useRef } from "react";
import { PROJECT_PREFIX, useActiveProject, useRevealActive } from "@/components/use-active-project";

export type TimelineItem = { slug: string; title: string; part: number; partShort: string; start: string; draft?: boolean };

/** 오른쪽 사이드바: 유형과 상관없이 시작 시점 순 세로 타임라인. 메인에 보이는 프로젝트를 색으로 강조합니다. */
export function TimelineNav({ items, labels }: { items: TimelineItem[]; labels: { timeline: string; planned: string } }) {
  const active = useActiveProject();
  const listRef = useRef<HTMLOListElement>(null);
  useRevealActive(listRef, active);

  return (
    <nav aria-label={labels.timeline} className="text-sm">
      <p className="px-2 text-xs font-black tracking-[0.18em] text-muted">{labels.timeline.toUpperCase()}</p>
      <ol ref={listRef} className="relative mt-3 ml-[4.5rem] border-l-2 border-line">
        {items.map((item) => {
          const isActive = item.slug === active;
          return (
            <li key={item.slug} data-slug={item.slug} className={`part-${item.part} relative`}>
              <Link
                href={`${PROJECT_PREFIX}${item.slug}`}
                aria-current={isActive ? "page" : undefined}
                className={`group -ml-[2px] block border-l-2 py-2 pl-4 pr-2 transition ${isActive ? "tone-border tone-soft" : "border-transparent hover:bg-surface"}`}
              >
                <span className={`absolute -left-[4.5rem] top-2 w-[3.5rem] text-right text-[11px] font-black tracking-wide ${isActive ? "tone-text" : "text-muted"}`}>{item.start}</span>
                <span className={`absolute -left-[7px] top-[13px] h-3 w-3 rounded-full border-2 border-paper transition ${isActive ? "tone-bg scale-125" : "bg-line group-hover:tone-bg"}`} />
                <span className={`tone-text block text-[10px] font-black tracking-wide ${isActive ? "" : "opacity-70"}`}>{item.partShort}</span>
                <span className={`ko-keep block leading-5 ${isActive ? "font-extrabold text-ink" : "font-semibold text-muted group-hover:text-ink"}`}>
                  {item.title}
                  {item.draft ? <span className="ml-1 text-[10px] font-black text-muted">· {labels.planned}</span> : null}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
