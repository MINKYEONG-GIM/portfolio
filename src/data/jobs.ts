/**
 * 허브(비밀번호 화면)에서 고르는 직무별 포트폴리오.
 * 공개 화면 주소는 직무가 여러 개라는 사실이 드러나지 않게 각각 독립된 경로로 둡니다.
 */
export type JobPortfolio = {
  key: string;
  label: string;
  description: string;
  /** 공개 화면 경로. 아직 없으면 비웁니다. */
  href?: string;
  status: "공개 중" | "준비 중";
};

export const JOBS: JobPortfolio[] = [
  {
    key: "service-planning",
    label: "서비스기획",
    description: "노아 플랫폼 → 인원관리·AX 인재 양성 → 전사 에이전트 통합 → 데이터·AI 서비스 → 고객·시장 인사이트. 프로젝트 12개.",
    href: "/",
    status: "공개 중"
  },
  {
    key: "recsys",
    label: "추천 시스템 · ML 서빙",
    description: "개인화 추천 모델 서빙 파이프라인, 평가·실험 플랫폼 중심으로 재구성한 포트폴리오.",
    status: "준비 중"
  }
];
