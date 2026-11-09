"use client";

import { Clock, List } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ContentsNav, type NavLabels, type NavPart } from "@/components/contents-nav";
import { TimelineNav, type TimelineItem } from "@/components/timeline-nav";
import { PROJECT_PREFIX } from "@/components/use-active-project";

type Tab = "contents" | "timeline";

/**
 * 사이드바 하나에 '목차 / 타임라인' 두 가지 보기를 큰 스위치로 보여 줍니다.
 * 기본값: 홈에서는 목차, 개별 프로젝트에서는 타임라인. 직접 고른 탭은 같은 종류의 화면 안에서만 유지됩니다.
 * 어느 탭이든 메인에 보이는 프로젝트를 강조합니다.
 */
export function SideTabs({ parts, timeline, labels }: { parts: NavPart[]; timeline: TimelineItem[]; labels: NavLabels }) {
  const pathname = usePathname();
  const kind = pathname.startsWith(PROJECT_PREFIX) ? "project" : "home";
  const defaultTab: Tab = kind === "project" ? "timeline" : "contents";
  const [manual, setManual] = useState<{ kind: string; tab: Tab } | null>(null);
  const tab: Tab = manual && manual.kind === kind ? manual.tab : defaultTab;

  const tabs = [
    { key: "contents" as const, label: labels.contents, Icon: List },
    { key: "timeline" as const, label: labels.timeline, Icon: Clock }
  ];
  return (
    <div>
      <div className="mb-4 grid grid-cols-2 gap-1 border-2 border-ink bg-ink p-1" role="tablist">
        {tabs.map(({ key, label, Icon }) => {
          const active = tab === key;
          return (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setManual({ kind, tab: key })}
              className={`flex items-center justify-center gap-2 px-2 py-3 text-base font-black transition ${active ? "bg-paper text-ink" : "text-paper opacity-70 hover:opacity-100"}`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {label}
            </button>
          );
        })}
      </div>
      {tab === "contents" ? <ContentsNav parts={parts} labels={labels} /> : <TimelineNav items={timeline} labels={{ timeline: labels.timeline, planned: labels.planned }} />}
    </div>
  );
}
