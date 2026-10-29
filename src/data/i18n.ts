import type { Lang } from "@/lib/lang";

/** 화면 고정 문구. 프로젝트 내용은 projects.ts(한국어)·projects.en.ts(영어)에 있습니다. */
const UI = {
  ko: {
    siteTitle: "프로젝트 리스트",
    nav: { home: "홈", timeline: "타임라인", contents: "목차", summary: (n: number) => `서비스기획 · 프로젝트 ${n}개` },
    home: {
      eyebrow: "SERVICE PLANNING PORTFOLIO",
      title: "프로젝트",
      viewTimeline: "타임라인 보기",
      swipeHint: "옆으로 넘겨 보세요",
      ask: "어떤 걸 보고 싶으세요?",
      counts: (n: number, m: number) => `프로젝트 ${n}개 · 주제 ${m}개`,
      projectCount: (n: number) => `프로젝트 ${n}개`,
      timeline: "타임라인",
      timelineNote: "시작 시점 순"
    },
    status: { done: "완료", ongoing: "진행 중", planned: "준비 중" },
    row: { featured: "대표 프로젝트", more: "자세히 보기" },
    project: {
      home: "홈",
      period: "프로젝트 기간",
      area: "분야",
      stack: "기술·도구",
      draftNotice: "내용을 채워 가는 섹션입니다. 구성만 먼저 잡아 두고 진행하면서 성과·역할·자료를 보강합니다.",
      tabs: {
        purpose: "목적",
        result: "성과",
        background: "배경",
        architecture: "시스템 구조",
        features: "핵심 기능",
        contents: "내용",
        principles: "설계 원칙",
        role: "역할",
        process: "진행",
        insight: "인사이트",
        visual: "자료",
        vision: "비전"
      },
      titles: {
        purpose: "프로젝트 목적",
        result: "성과",
        background: "프로젝트 배경",
        architecture: "시스템 구조",
        architectureSimple: "구조",
        features: "핵심 기능",
        contents: "프로젝트 내용",
        principles: "설계 원칙",
        role: "역할과 기여",
        process: "프로젝트 진행",
        insight: "핵심 인사이트",
        visual: "화면과 자료",
        vision: "전 직무를 하나의 하네스로",
        visionHow: "모든 직무를 중심 하네스에 연결하는 방법",
        stack: "기술과 도구"
      },
      flowTitle: "질문 한 번이 처리되는 순서",
      principlesTitle: "구조를 지키는 원칙",
      nextLayer: "↓ 다음 층으로",
      dataFlow: "↓ 데이터 흐름 ↓",
      trigger: "호출:",
      insightLabel: "INSIGHT",
      principleLabel: "PRINCIPLE",
      prev: "이전 프로젝트",
      next: "다음 프로젝트"
    },
    footer: { note: "각 프로젝트의 수치는 당시 기준입니다." },
    admin: {
      login: "관리자로 로그인하기",
      title: "관리자 로그인",
      hint: "비밀번호가 맞으면 준비 중인 항목까지 보이는 관리자 모드로 들어갑니다. 일반 방문은 로그인 없이 그대로 볼 수 있습니다.",
      mode: "관리자 모드",
      modeHint: "준비 중 항목 표시 중",
      hub: "허브",
      logout: "로그아웃",
      back: "돌아가기",
      draftOnlyAdmin: "이 항목은 관리자에게만 보입니다."
    },
    hub: {
      password: "비밀번호",
      enter: "들어가기",
      wrong: "비밀번호가 맞지 않습니다.",
      notConfigured: "환경변수 HUB_PASSWORD 가 설정되지 않았습니다. 로컬은 .env.local, Vercel 은 Environment Variables 에 넣어 주세요.",
      eyebrow: "MAIN",
      title: (name: string) => `${name} · 직무별 포트폴리오`,
      hint: "직무를 고르면 그 직무용 공개 화면이 새 탭에서 열립니다.",
      lock: "잠그기",
      live: "공개 중",
      planned: "준비 중"
    }
  },
  en: {
    siteTitle: "Project List",
    nav: { home: "Home", timeline: "Timeline", contents: "Contents", summary: (n: number) => `Service Planning · ${n} projects` },
    home: {
      eyebrow: "SERVICE PLANNING PORTFOLIO",
      title: "Projects",
      viewTimeline: "View timeline",
      swipeHint: "Swipe to see more",
      ask: "What would you like to see?",
      counts: (n: number, m: number) => `${n} projects · ${m} topics`,
      projectCount: (n: number) => `${n} projects`,
      timeline: "Timeline",
      timelineNote: "by start date"
    },
    status: { done: "Done", ongoing: "Ongoing", planned: "Planned" },
    row: { featured: "Featured", more: "View details" },
    project: {
      home: "Home",
      period: "Period",
      area: "Area",
      stack: "Stack & tools",
      draftNotice: "This section is still being filled in. The structure is in place; results, role and materials will follow as the work progresses.",
      tabs: {
        purpose: "Purpose",
        result: "Results",
        background: "Background",
        architecture: "Architecture",
        features: "Core features",
        contents: "Contents",
        principles: "Design principles",
        role: "Role",
        process: "Process",
        insight: "Insights",
        visual: "Visuals",
        vision: "Vision"
      },
      titles: {
        purpose: "Purpose",
        result: "Results",
        background: "Background",
        architecture: "System architecture",
        architectureSimple: "Architecture",
        features: "Core features",
        contents: "Project contents",
        principles: "Design principles",
        role: "Role & contribution",
        process: "Process",
        insight: "Key insights",
        visual: "Screens & materials",
        vision: "Every job on one harness",
        visionHow: "How to connect every job to the central harness",
        stack: "Stack & tools"
      },
      flowTitle: "How one question flows through",
      principlesTitle: "Principles that hold the structure",
      nextLayer: "↓ to the next layer",
      dataFlow: "↓ data flow ↓",
      trigger: "Trigger:",
      insightLabel: "INSIGHT",
      principleLabel: "PRINCIPLE",
      prev: "Previous project",
      next: "Next project"
    },
    footer: { note: "Figures are as of each project's period." },
    admin: {
      login: "Admin login",
      title: "Admin login",
      hint: "With the right password you enter admin mode, which also shows planned items. Regular visitors can browse without logging in.",
      mode: "Admin mode",
      modeHint: "showing planned items",
      hub: "Hub",
      logout: "Log out",
      back: "Back",
      draftOnlyAdmin: "This item is visible to admins only."
    },
    hub: {
      password: "Password",
      enter: "Enter",
      wrong: "Wrong password.",
      notConfigured: "HUB_PASSWORD is not set. Add it to .env.local locally, or to Environment Variables on Vercel.",
      eyebrow: "MAIN",
      title: (name: string) => `${name} · Portfolios by role`,
      hint: "Pick a role to open its public portfolio in a new tab.",
      lock: "Lock",
      live: "Live",
      planned: "Planned"
    }
  }
} as const;

export type UIStrings = (typeof UI)["ko"];

export function t(lang: Lang): UIStrings {
  return UI[lang] as unknown as UIStrings;
}
