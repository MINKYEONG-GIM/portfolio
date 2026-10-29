/**
 * 허브(비밀번호 화면)에서 고르는 직무별 포트폴리오.
 * 공개 화면 주소는 직무가 여러 개라는 사실이 드러나지 않게 각각 독립된 경로로 둡니다.
 */
export type JobPortfolio = {
  key: string;
  label: { ko: string; en: string };
  description: { ko: string; en: string };
  /** 공개 화면 경로. 아직 없으면 비웁니다. */
  href?: string;
  status: "live" | "planned";
};

export const JOBS: JobPortfolio[] = [
  {
    key: "service-planning",
    label: { ko: "서비스기획", en: "Service Planning" },
    description: {
      ko: "전사 AI 플랫폼 → 인재관리 → 서비스 기획·구축 → 고객·시장 인사이트. 프로젝트 12개, 한국어·영어.",
      en: "Enterprise AI Platform → Talent Management → Service Build → Customer & Market Insight. 12 projects, Korean and English."
    },
    href: "/",
    status: "live"
  },
  {
    key: "recsys",
    label: { ko: "추천 시스템 · ML 서빙", en: "Recommender Systems · ML Serving" },
    description: {
      ko: "개인화 추천 모델 서빙 파이프라인, 평가·실험 플랫폼 중심으로 재구성한 포트폴리오.",
      en: "A portfolio reframed around recommendation-model serving pipelines and evaluation/experimentation platforms."
    },
    status: "planned"
  }
];
