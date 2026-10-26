import type { Lang } from "@/lib/lang";

const LABELS = {
  ko: {
    aria: "전 직무를 중심 AI 하네스에 연결하는 구조도",
    hub: "중심 AI 하네스",
    hubSub1: "Agent Runtime · 라우팅",
    hubSub2: "Policy & Context",
    graph: "직무 지식그래프",
    graphSub: "지표 정의 · 작동 로직 · 불문율(기준값·우선순위·예외) · KPI(지표·전후·주기)",
    sources: ["Snowflake DW", "M365 Graph", "HR Link", "업무 시스템 MCP"],
    loopTitle: "패션 AI 플랫폼 루프",
    loop: ["① Agent 등록 + 사용 가이드", "② 평가 → 스킬 승격", "③ 개인화 추천·확산", "④ 교육 → 새 Agent"],
    govTitle: "거버넌스",
    gov: ["읽기 전용 · 본인 권한", "링크 검증 · AI 등급 게이트", "KPI 신고값 ↔ DW 실측 대조", "개인정보 최소 조회"],
    legend: "모든 직무의 Agent는 같은 계약(입력·출력·규칙·KPI)으로 등록되고, 평가를 통과한 것만 하네스가 호출합니다."
  },
  en: {
    aria: "Diagram connecting every job function to a central AI harness",
    hub: "Central AI Harness",
    hubSub1: "Agent Runtime · Routing",
    hubSub2: "Policy & Context",
    graph: "Job knowledge graph",
    graphSub: "Metric definitions · Logic · Tacit rules (threshold · priority · exception) · KPIs (metric · before/after · cadence)",
    sources: ["Snowflake DW", "M365 Graph", "HR Link", "Business system MCP"],
    loopTitle: "Fashion AI Platform loop",
    loop: ["① Register agent + usage guide", "② Evaluate → promote to skill", "③ Personalized recommendation", "④ Training → new agents"],
    govTitle: "Governance",
    gov: ["Read-only · own permissions", "Link check · AI grade gate", "Reported KPI ↔ DW actuals", "Minimal personal data"],
    legend: "Every agent registers with the same contract (inputs · outputs · rules · KPIs); only those that pass evaluation are called by the harness."
  }
} as const;

/**
 * 전 직무를 중심 AI 하네스에 연결하는 큰 그림.
 * 위: 직무 노드(반원) → 가운데: 중심 하네스 → 아래: 지식그래프 → 데이터·시스템. 양옆: 플랫폼 루프 · 거버넌스.
 */
export function HarnessDiagram({ jobs, lang = "ko" }: { jobs: string[]; lang?: Lang }) {
  const L = LABELS[lang];
  const cx = 480;
  const cy = 330;
  const radius = 270;
  const hub = 86;
  const nodes = jobs.map((job, index) => {
    const phi = (Math.PI * index) / Math.max(jobs.length - 1, 1);
    const x = cx + radius * Math.cos(phi);
    const y = cy - radius * Math.sin(phi);
    const dx = cx - x;
    const dy = cy - y;
    const len = Math.hypot(dx, dy);
    return { job, x, y, ex: cx - (dx / len) * hub, ey: cy - (dy / len) * hub };
  });

  return (
    <svg viewBox="0 0 960 640" role="img" aria-label={L.aria} className="h-auto w-full">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--muted)" />
        </marker>
      </defs>

      {nodes.map((node) => (
        <line key={`line-${node.job}`} x1={node.x} y1={node.y} x2={node.ex} y2={node.ey} stroke="var(--line)" strokeWidth="2" markerEnd="url(#arrow)" />
      ))}
      {nodes.map((node) => (
        <g key={node.job}>
          <rect x={node.x - 52} y={node.y - 19} width="104" height="38" rx="19" fill="var(--tone-soft)" />
          <text x={node.x} y={node.y + 5} textAnchor="middle" fontSize="13" fontWeight="800" fill="var(--tone)">
            {node.job}
          </text>
        </g>
      ))}

      <circle cx={cx} cy={cy} r={hub} fill="var(--tone)" />
      <text x={cx} y={cy - 14} textAnchor="middle" fontSize="16" fontWeight="900" fill="#ffffff">
        {L.hub}
      </text>
      <text x={cx} y={cy + 8} textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff" opacity="0.9">
        {L.hubSub1}
      </text>
      <text x={cx} y={cy + 26} textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff" opacity="0.9">
        {L.hubSub2}
      </text>

      <line x1={cx} y1={cy + hub} x2={cx} y2={452} stroke="var(--muted)" strokeWidth="2" markerEnd="url(#arrow)" markerStart="url(#arrow)" />
      <rect x="240" y="456" width="480" height="52" rx="14" fill="var(--paper)" stroke="var(--tone)" strokeWidth="2" />
      <text x={cx} y="477" textAnchor="middle" fontSize="14" fontWeight="900" fill="var(--ink)">
        {L.graph}
      </text>
      <text x={cx} y="496" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--muted)">
        {L.graphSub}
      </text>
      <line x1={cx} y1={508} x2={cx} y2={548} stroke="var(--muted)" strokeWidth="2" markerEnd="url(#arrow)" markerStart="url(#arrow)" />
      {L.sources.map((source, index) => {
        const width = 112;
        const gap = 10;
        const total = width * 4 + gap * 3;
        const x = cx - total / 2 + index * (width + gap);
        return (
          <g key={source}>
            <rect x={x} y="552" width={width} height="44" rx="12" fill="var(--surface)" stroke="var(--line)" />
            <text x={x + width / 2} y="579" textAnchor="middle" fontSize="11" fontWeight="800" fill="var(--ink)">
              {source}
            </text>
          </g>
        );
      })}

      <rect x="20" y="430" width="196" height="166" rx="16" fill="var(--surface)" stroke="var(--line)" />
      <text x="118" y="456" textAnchor="middle" fontSize="12" fontWeight="900" fill="var(--tone)">
        {L.loopTitle}
      </text>
      {L.loop.map((step, index) => (
        <text key={step} x="36" y={482 + index * 26} fontSize="11" fontWeight="700" fill="var(--ink)">
          {step}
        </text>
      ))}
      <line x1="216" y1="482" x2="238" y2="482" stroke="var(--muted)" strokeWidth="2" markerEnd="url(#arrow)" />

      <rect x="744" y="430" width="196" height="166" rx="16" fill="var(--surface)" stroke="var(--line)" />
      <text x="842" y="456" textAnchor="middle" fontSize="12" fontWeight="900" fill="var(--tone)">
        {L.govTitle}
      </text>
      {L.gov.map((rule, index) => (
        <text key={rule} x="760" y={482 + index * 26} fontSize="11" fontWeight="700" fill="var(--ink)">
          {rule}
        </text>
      ))}
      <line x1="744" y1="482" x2="722" y2="482" stroke="var(--muted)" strokeWidth="2" markerEnd="url(#arrow)" />

      <text x="480" y="628" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--muted)">
        {L.legend}
      </text>
    </svg>
  );
}
