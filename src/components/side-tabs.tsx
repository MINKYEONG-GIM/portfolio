"use client";

import { useState } from "react";
import { ContentsNav, type NavLabels, type NavPart } from "@/components/contents-nav";
import { TimelineNav, type TimelineItem } from "@/components/timeline-nav";

/** 사이드바 하나에 '목차 / 타임라인' 탭. 어느 탭이든 메인에 보이는 프로젝트를 강조합니다. */
export function SideTabs({ parts, timeline, labels }: { parts: NavPart[]; timeline: TimelineItem[]; labels: NavLabels }) {
  const [tab, setTab] = useState<"contents" | "timeline">("contents");
  const tabs = [
    { key: "contents" as const, label: labels.contents },
    { key: "timeline" as const, label: labels.timeline }
  ];
  return (
    <div>
      <div className="mb-3 flex border-b-2 border-ink" role="tablist">
        {tabs.map((item) => (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={tab === item.key}
            onClick={() => setTab(item.key)}
            className={`flex-1 px-2 py-2 text-sm font-extrabold transition ${tab === item.key ? "bg-ink text-paper" : "text-muted hover:text-ink"}`}
          >
            {item.label}
          </button>
        ))}
      </div>
      {tab === "contents" ? <ContentsNav parts={parts} labels={labels} /> : <TimelineNav items={timeline} labels={{ timeline: labels.timeline, planned: labels.planned }} />}
    </div>
  );
}
