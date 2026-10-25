export type Metric = { value: string; label: string; note?: string };
export type Insight = { title: string; body: string };
export type FeatureItem = { title: string; body: string };
export type FeatureSection = { eyebrow: string; title: string; summary: string; items: FeatureItem[] };
export type VisionStep = { title: string; body: string };
export type Vision = { lead: string; note: string; steps: VisionStep[]; jobs: string[] };
export type CatalogItem = { name: string; trigger?: string; body: string };
export type ProjectImage = { src: string; alt: string; caption?: string; width: number; height: number };

export type Project = {
  slug: string;
  part: 1 | 2 | 3;
  /** 중분류 (파트 안에서 묶는 이름) */
  group: string;
  title: string;
  subtitle: string;
  period: string;
  purpose: string;
  metrics: Metric[];
  roles: string[];
  roleLead?: string;
  background?: string;
  steps?: string[];
  insights?: Insight[];
  insightsLabel?: string;
  features?: FeatureSection[];
  architecture?: { layers: string[]; sources: string[]; gateway: string };
  vision?: Vision;
  /** 카드와 상단에 붙는 상태 배지 (예: 진행 중, 준비 중) */
  status?: string;
  /** 아직 채우는 중인 섹션이면 안내문을 띄웁니다. */
  draft?: boolean;
  /** 스킬 목록·로드맵 항목처럼 이름 + 설명으로 나열하는 것 */
  catalog?: { title: string; items: CatalogItem[] };
  stack?: string[];
  image?: ProjectImage;
  tags: string[];
};

export const PARTS: { no: 1 | 2 | 3; code: string; title: string; tagline: string; summary: string }[] = [
  {
    no: 1,
    code: "Part 01",
    title: "고객·시장 인사이트",
    tagline: "분석으로 매출을 바꾼 일",
    summary: "데이터와 현장을 교차검증해 매출 문제를 고객 구조의 문제로 다시 정의하고, 채널·상품 전략으로 성과를 냈습니다."
  },
  {
    no: 2,
    code: "Part 02",
    title: "데이터·AI 서비스 구축",
    tagline: "흩어진 사내 데이터를 쓸 수 있게 만든 일",
    summary: "이미지로만 남아 있던 전략자료는 검색 가능한 지식으로, 시스템마다 흩어진 상품 데이터는 하나의 데이터 허브로 바꿨습니다."
  },
  {
    no: 3,
    code: "Part 03",
    title: "전사 AI 플랫폼과 AX",
    tagline: "조직 전체가 AI 에이전트를 만들고 쓰게 한 일",
    summary: "데이터·배포 인프라 위에 MCP 에이전트 플랫폼을 세우고, 운영 포털과 교육으로 전사에 확산했습니다. 인프라 → 플랫폼 → 포털 → 확산 순서입니다."
  }
];

export const PROFILE = {
  name: "김민경",
  tagline: "고객·시장 인사이트를 성과로 연결하는 기획자",
  intro:
    "패션 브랜드의 고객·시장 분석에서 출발해, 지금은 사내 데이터를 AI 에이전트에 연결하는 플랫폼을 만들고 전사 AI 전환을 설계합니다. 숫자를 읽는 일과 서비스를 만드는 일을 한 사람이 끝까지 맡는 것이 제 방식입니다."
};

export const PROJECTS: Project[] = [
  {
    slug: "naver-channel-strategy",
    part: 1,
    group: "온라인 채널 전략",
    title: "네이버 채널 판매 전략 재정의",
    subtitle: "왜 ‘채널 확장’이 아니라 ‘고객 구조 재설계’였는가",
    period: "2024.01 ~ 2024.02",
    purpose: "고객군별 진입 동기 분석을 통한 상품·콘텐츠·채널 메시지 재설계 및 채널 매출 상승",
    metrics: [
      { value: "137%", label: "라이브 방송 구매전환율 성장", note: "전년 대비 0.8% → 1.9%" },
      { value: "190%", label: "라이브 방송 회당 매출 성장", note: "전년 대비 1억 → 2.9억" }
    ],
    roles: [
      "기존 플랫폼 중심 성장의 한계를 고객 구조 문제로 재해석",
      "40대 고객군의 구매 기준과 진입 동기를 분석",
      "전략 상품에 마케팅 예산 집중",
      "콘텐츠 메시지·리뷰 전략·가격 정책을 고객 구매 기준에 맞게 재설계"
    ],
    image: {
      src: "/projects/naver-live.png",
      alt: "미쏘 네이버 쇼핑라이브 공식스토어 화면",
      caption: "네이버 쇼핑라이브 채널 운영 화면",
      width: 1056,
      height: 820
    },
    tags: ["고객 분석", "채널 전략", "라이브 커머스"]
  },
  {
    slug: "newbalance-padding-rebranding",
    part: 1,
    group: "상품 포트폴리오 전략",
    title: "뉴발란스 패딩 리브랜딩 전략",
    subtitle: "빅데이터 기반 핵심 상품 설계",
    period: "2024.11 ~ 2024.12",
    purpose: "연령대별 매출·리뷰·플랫폼 데이터를 분석해 상품 전략과 마케팅 메시지를 재정의",
    metrics: [{ value: "100%", label: "20대 이하 매출 성장" }],
    roles: [
      "남성과 여성의 패딩 아이템 니즈 분석",
      "자사 최근 3년 패딩 아이템별 매출 분석",
      "핵심 3개 플랫폼 매출 상위 아이템 리뷰 분석"
    ],
    image: {
      src: "/projects/padding-search.png",
      alt: "의류 카테고리별 검색량 분석 장표. 아우터 검색량이 줄어드는 가운데 역시즌 패딩 검색량은 183% 증가",
      caption: "시장 분석 장표: 줄어든 패딩 수요와 늘어난 ‘역시즌 패딩’ 수요",
      width: 1686,
      height: 1174
    },
    tags: ["상품 전략", "리뷰 분석", "검색 트렌드"]
  },
  {
    slug: "china-brand-churn-analysis",
    part: 1,
    group: "상품 포트폴리오 전략",
    title: "중국 고급 브랜드 고객 이탈 분석",
    subtitle: "매장 인터뷰·검색 트렌드·SNS·상권 조사를 결합해 상품 포트폴리오 전략을 제안",
    period: "2025.02 ~ 2025.03",
    purpose: "매장 고객·검색 트렌드·상권 착장·SNS 데이터를 서로 교차검증해 시장 변화의 원인을 파악",
    metrics: [{ value: "+8%", label: "전년 동월 대비 매출 성장", note: "매출 감소에서 성장으로 전환" }],
    roleLead: "과거 포멀 중심 상품 비중을 축소하고 셔츠·데님·편안한 비즈니스 캐주얼 중심으로 포트폴리오 재구성을 제안했습니다.",
    roles: [
      "매출 감소 원인을 상품 자체가 아닌 고객의 출근복 기준 변화로 정의",
      "포멀 정장 중심에서 비즈니스 캐주얼 중심으로 시장 변화 확인",
      "고객사는 과거 성공 아이템 중심으로 포트폴리오를 유지해 신규 고객 유입 한계 발생"
    ],
    background:
      "브랜드는 10년 전 성공했던 광택 유색 블라우스 등 기존 핵심상품 비중을 유지하며 매년 매출이 27%씩 줄고 있었습니다.",
    steps: ["매장 고객 인터뷰", "티몰 검색 트렌드 검증", "상하이 오피스 착장 조사", "도우인 SNS 콘텐츠 분석", "상품 포트폴리오 재구성 제안"],
    insights: [
      {
        title: "연령이 아니라 생활양식이 바뀌었다",
        body: "고객의 연령이 문제가 아니라, 동일 연령대의 생활양식과 직장복 규범이 바뀐 것이 핵심이었습니다."
      },
      {
        title: "과거 베스트셀러가 이탈의 원인이 될 수 있다",
        body: "기존 성공 공식이 상품 포트폴리오를 고착시키는 내부 리스크로 작동했습니다."
      },
      {
        title: "하나의 데이터로 결론 내리지 않는다",
        body: "매장 인터뷰 → 검색 → SNS → 현장 착장을 교차검증해 전략의 설득력을 높였습니다."
      }
    ],
    image: {
      src: "/projects/scofield-store.png",
      alt: "중국 백화점 내 스코필드 매장 전경",
      caption: "중국 현지 매장",
      width: 897,
      height: 581
    },
    tags: ["해외 시장", "교차검증", "포트폴리오 전략"]
  },
  {
    slug: "strategy-rag-search",
    part: 2,
    group: "지식 검색",
    title: "사내 전략자료 RAG 검색 서비스",
    subtitle: "‘검색 기능’이 아니라 ‘조직의 의사결정 기억’을 만드는 서비스",
    period: "2025.01 ~ 2025.07",
    purpose: "판매 데이터·상품정보·내부 프로젝트 자료를 AI 검색·요약 서비스로 전환",
    metrics: [
      { value: "98%", label: "예산 절감", note: "자체 벡터 DB 구성, 배정 예산 대비" },
      { value: "90%+", label: "검색 정확도" },
      { value: "4.9 / 5", label: "만족도", note: "N=68" },
      { value: "주 6.8회", label: "핵심부서 사용 횟수", note: "N=68" }
    ],
    roles: [
      "문서·도표 이미지를 텍스트화하고 검색 가능한 데이터로 구조화",
      "벡터 DB 구축 및 GPT API 기반 맥락 검색 기능 구현",
      "사용자 테스트를 반복하며 전처리 방식과 검색 로직 개선",
      "전 계열사 교육 프로그램 메인 화면 노출까지 확장"
    ],
    background:
      "15년간 고품질 전략자료가 축적돼 있었지만, 이미지 중심 PPT와 파일 단위 저장으로 검색이 불가능했습니다. 지식자산은 있었지만 활용 구조가 없는 상태였습니다.",
    steps: ["조직 지식 비구조화 문제", "OCR / 이미지 텍스트화", "Vector DB 구축", "GPT API 자연어 검색", "사용자 테스트 반복 개선"],
    insights: [
      {
        title: "정확도만으로는 Adoption이 생기지 않는다",
        body: "‘질문 한 번으로 관련 장표와 맥락을 빠르게 찾는다’는 사용 경험이 핵심이었습니다."
      },
      {
        title: "외부 솔루션보다 내부 데이터에 맞춘 설계",
        body: "내부 데이터 특성에 맞춰 OCR·Vector DB 구조를 직접 설계하는 것이 비용 대비 효율적이었습니다."
      },
      {
        title: "행동을 대체했다는 증거",
        body: "주 6.8회 사용과 4.9/5 만족도는 기술적 성공이 아니라, 파일 열기·사람에게 묻기라는 기존 행동을 실제로 대체했다는 증거입니다."
      }
    ],
    image: {
      src: "/projects/rag-search.png",
      alt: "지식뱅크 검색 화면. ‘MD 직무의 승진지식 자료 보여줘’라고 묻자 코코몽 캐릭터가 지식 뱅크를 찾는 중",
      caption: "자연어로 전략자료를 찾는 검색 화면",
      width: 1871,
      height: 1245
    },
    stack: ["OCR", "Vector DB", "GPT API"],
    tags: ["RAG", "벡터 검색", "지식 관리"]
  },
  {
    slug: "pim-data-integration",
    part: 2,
    group: "데이터 허브",
    title: "PIM 데이터 통합 시스템",
    subtitle: "업무 자동화의 실패 원인을 현업·시스템·외부환경 관점에서 재정의",
    period: "2025.09 ~ 2026.03",
    purpose: "RPA 자동화 요구를 데이터 구조 개선 프로젝트로 재정의하고 온라인 MD 운영 구조를 시스템화",
    metrics: [
      { value: "30% → 70%", label: "인력 효율화 가능 구조" },
      { value: "10여 개", label: "브랜드 데이터 통합" },
      { value: "SAP · BI · OMS", label: "시스템 연계" }
    ],
    roles: [
      "BI·SAP·로컬 저장소·구글 드라이브·이메일의 데이터 생성 위치와 흐름 정리",
      "상품 코드·이미지·가격·재고·판매 데이터 항목 매핑",
      "Snowflake 기반 데이터 저장 구조와 OMS 연계 스키마 설계",
      "생성형 AI 기반 전처리·분류·가공 Workflow 설계"
    ],
    background:
      "고객·상품·채널 데이터가 흩어져 있을 때 표준 데이터 구조와 운영 프로세스를 설계해 서비스화하는 프로젝트였습니다. 반복 업무 자동화 요구에서 출발했지만, 문제의 뿌리는 데이터 구조에 있었습니다.",
    steps: ["반복업무 자동화 요구", "현업·포토팀·MD 업무 인터뷰", "분산 데이터 구조 파악", "PIM / Snowflake 스키마 설계", "AI Workflow / OMS 연계"],
    insights: [
      {
        title: "자동화 대상은 동작이 아니라 판단이었다",
        body: "자동화해야 할 것은 ‘업무 동작’이 아니라 ‘중복 판단과 데이터 재입력’이었습니다. UI 자동화보다 데이터 허브가 선행돼야 합니다."
      },
      {
        title: "데이터 표준이 AX의 선행조건",
        body: "데이터 표준이 없으면 AI·RPA 도입이 오히려 유지보수 비용을 키웁니다. 핵심은 데이터 정의와 시스템 간 책임 경계입니다."
      },
      {
        title: "PIM은 저장소가 아니라 데이터 제품",
        body: "SAP → Snowflake → AI 가공 → OMS → 채널로 이어지는 운영체계의 중심 데이터 제품(Data Product)입니다."
      }
    ],
    image: {
      src: "/projects/pim-pipeline.png",
      alt: "생성형 AI 기반 데이터 전처리 및 수요예측·발주 자동화 파이프라인 설계도. SAP BI → Snowflake → PIM DB → PIM 시스템 → 사내 OMS → 개별 판매 온라인 채널, AI가 키워드 추출과 채널별 판매정보 생성을 담당",
      caption: "생성형 AI 기반 데이터 전처리 및 OMS 연계 파이프라인 설계",
      width: 1667,
      height: 784
    },
    stack: ["Snowflake", "SAP", "OMS", "생성형 AI"],
    tags: ["데이터 허브", "PIM", "AI Workflow"]
  },
  {
    slug: "daas-paas-operations",
    part: 3,
    group: "① 인프라",
    title: "DaaS · PaaS 기반 서비스 운영체계",
    subtitle: "비개발자가 직접 데이터 앱을 만들고 배포하는 셀프서비스 구조",
    period: "2026.03 ~ 진행 중",
    purpose: "비개발자 직군 현업이 직접 데이터 기반 앱을 만들고 배포할 수 있도록 데이터 접근·배포·운영 지원 구조를 구축",
    metrics: [
      { value: "약 30%↓", label: "DaaS 비용 절감" },
      { value: "90%", label: "배포 성공률" },
      { value: "43%↓", label: "사내 데이터 조회 관련 문의 감소" }
    ],
    roles: [
      "Snowflake DaaS 활용 지원 및 Materialized View·Query 성능 개선",
      "Next.js 앱의 서버리스 배포 운영과 실패 원인 분석",
      "Claude Code Skill 요구사항·호출 조건·동작 방식 설계",
      "반복 문의를 Skill 기능으로 전환"
    ],
    steps: ["DaaS 데이터 접근", "API / Node.js 서비스 연동", "PaaS 원클릭 배포", "Claude Skill 자연어 자동화", "문의 감소 · 셀프서비스"],
    stack: ["Snowflake", "Next.js", "Serverless", "Claude Code Skill"],
    tags: ["DaaS", "PaaS", "셀프서비스"]
  },
  {
    slug: "noa-mcp-agent-platform",
    part: 3,
    group: "② 에이전트 플랫폼",
    title: "노아: MCP 기반 사내 AI 에이전트 통합 플랫폼",
    subtitle: "사내 데이터와 업무 시스템을 MCP 서버로 표준화해 Claude에 연결한 엔터프라이즈 AI 에이전트 플랫폼",
    period: "2026.06 ~ 진행 중",
    purpose: "사내 데이터와 업무 시스템을 LLM 에이전트에 연결해, 사내 업무를 AI 도구화하고 생산성을 높입니다.",
    metrics: [
      { value: "116개", label: "완성된 에이전트 수", note: "2026년 9월 기준" },
      { value: "월 8,180시간", label: "에이전트로 절감한 업무 시간", note: "2026년 9월 기준" }
    ],
    roles: [
      "DW 통합 및 지식그래프 구축: 회사 공식 지표 정의·산식 정리, 지식그래프 설계와 데이터 정합성 검증",
      "MCP 서버 개발: MCP 기반 연결 구조 결정, 보안 원칙(읽기 전용·본인 권한) 수립",
      "스킬 및 훅 제작: 현업 인터뷰로 업무 절차 파악, 스킬과 공통 규칙(훅) 설계",
      "플러그인 배포 및 오프라인 교육: Claude 조직 관리(커넥터 등록, 조직 지침, 권한), 임직원 교육 기획과 진행",
      "전사 홍보: 매주 전 계열사 대상 주간 활용 사례 콘텐츠 기획·송출"
    ],
    background:
      "AI 에이전트로 생산성을 높이려 했지만, AI가 사내 시스템에 연결되지 않아 매번 데이터를 수기로 넣어야 했습니다. 사내 데이터와 시스템을 LLM 에이전트와 직접 연동하는 구조가 필요했습니다.",
    architecture: {
      layers: ["Client Layer", "Agent Layer · Policy & Context · Agent Runtime", "Capability Layer", "Tool Binding Layer"],
      gateway: "NoA MCP Gateway (중앙 원격 MCP 서버군)",
      sources: ["Snowflake DW", "M365 Graph", "HR Link", "Neo4j 지식그래프"]
    },
    steps: ["DW 통합 및 지식그래프 구축", "사내 시스템 연결용 MCP 서버 개발", "스킬 및 훅 제작", "플러그인 배포 및 오프라인 교육", "매주 전 계열사 엘리베이터·로비 영상 송출"],
    insights: [
      {
        title: "[도입] 정확도가 신뢰를 만든다",
        body: "매출·이익 같은 데이터가 2~3회 맞지 않으면 신뢰가 무너지고 사용률이 급락합니다. 초기에는 지식그래프로 기본 데이터 조회 정확도를 높이는 것이 가장 중요했습니다."
      },
      {
        title: "[활용] 잘 쓰는 사람의 방법을 스킬로",
        body: "잘 쓰는 사람의 활용법을 스킬로 만들어 전원에게 배포하면, 프롬프트 작성이 익숙하지 않은 사람도 높은 활용률을 보였습니다."
      },
      {
        title: "[생산성] 한 업무를 끝까지",
        body: "여러 업무를 조금씩 줄여 주는 도구보다, 한 업무를 처음부터 끝까지 처리해 주는 도구의 시간 절감 효과가 더 뚜렷했습니다."
      }
    ],
    image: {
      src: "/projects/noa-bi.png",
      alt: "noa-bi 스킬로 스파오 강남점 5월 매출을 자연어로 질문하자 지식그래프에서 지표 정의를 찾고 DW를 조회해 답하는 화면",
      caption: "noa-bi 스킬: 자연어 질문 → 지식그래프에서 지표 정의 확인 → DW 조회 → 출처와 함께 답변",
      width: 1226,
      height: 1051
    },
    catalog: {
      title: "제작·배포한 스킬",
      items: [
        {
          name: "usage-guide-writer",
          trigger: "“사용 가이드 써줘”, “Agent 등록 가이드”",
          body: "플랫폼에 올리는 Agent의 사용 가이드를, 만든 사람을 인터뷰해 작동 로직·회사/팀 불문율·KPI까지 담아 씁니다."
        },
        {
          name: "tacit-rule-interview",
          trigger: "“불문율 정리”, “노하우 문서화”, “에이전트에 넣을 규칙”",
          body: "실무자가 경험으로 지켜 온 불문율(기준값·우선순위·예외 처리·감으로 하는 판단)을 인터뷰로 끌어내, 사람과 AI가 같이 쓰는 규칙 문서로 정리합니다."
        },
        {
          name: "monthly-submit-helper",
          trigger: "“월별 제출 도와줘”, “절감 시간 계산”",
          body: "월별 아웃풋 제출(신규·버전업) 칸을 인터뷰로 채우고, 월 절감 시간을 계산 근거와 함께 산출합니다."
        },
        {
          name: "noa-bi",
          trigger: "“스파오 강남점 5월 매출 알려줘”처럼 KPI를 묻는 말",
          body: "지식그래프에서 지표 정의·산식·조인을 한 번에 가져와 SQL을 만들고 DW를 읽기 전용으로 조회합니다. 답에 정의·범위·출처를 함께 붙입니다."
        },
        {
          name: "noa-1p",
          trigger: "“2월 2주 주간보고”, “정판율 빨간불”",
          body: "브랜드 주간보고서를 벡터 검색으로 찾아 원문만 근거로 답합니다."
        }
      ]
    },
    stack: ["MCP", "Claude", "Snowflake", "Neo4j", "M365 Graph", "Claude Code Skill"],
    tags: ["MCP", "지식그래프", "스킬·훅"]
  },
  {
    slug: "fashion-ai-platform",
    part: 3,
    group: "③ 운영 포털",
    title: "패션 AI 플랫폼: Agent 공유·평가·학습 포털",
    subtitle: "직원이 노아로 만든 Agent를 올리고, 매달 성과를 제출하고, AI를 배우는 사내 플랫폼",
    period: "2026 ~ 운영 중",
    purpose:
      "사내에서 만들어지는 AI Agent를 한곳에 모아 사람마다 다르게 추천하고, 공정한 기준으로 성과를 평가하며, 누구나 제작자로 성장하도록 교육을 연결합니다.",
    metrics: [
      { value: "7종", label: "개인화 추천 신호", note: "직무·브랜드·행동 기반" },
      { value: "4가지", label: "Agent 공개 평가 기준" },
      { value: "100점", label: "참여 점수 만점 체계" },
      { value: "6단계", label: "Agent 제작 학습 경로" }
    ],
    roles: [
      "서비스 기획과 정보 구조 설계: ‘무엇을 하러 왔나’ 기준의 메뉴 4개(둘러보기·만들기·배우기·도움받기)와 모든 화면 공통 사이드바",
      "개인화 추천 로직 설계: 직무·브랜드·최근 본·좋아요 신호에 점수를 매기고 카드마다 추천 이유를 붙이는 규칙",
      "평가 체계 설계: Agent 등록 양식, 공개 평가 기준, Agent 점수·AI 등급, 인원 참여 점수와 인재풀 순위",
      "교육 커리큘럼 구성: AI 리터러시 슬라이드, 레벨별 강의 영상, 6단계 제작 실습, 노아 교육자료, 바이브코딩 가이드",
      "Next.js 풀스택 구현과 운영: Snowflake DaaS 연동, 캐시, 접근 정책, 관리자 대시보드"
    ],
    background:
      "노아 2.0으로 만든 Agent가 빠르게 늘면서 ‘누가 무엇을 만들었고 어떤 성과를 냈는지’가 흩어져 있었습니다. 등록 → 추천·확산 → 월별 성과 제출 → 평가 → 교육이 한 흐름으로 이어지는 플랫폼이 필요했습니다.",
    features: [
      {
        eyebrow: "핵심 기능 01",
        title: "개인화 서비스",
        summary:
          "홈은 들어온 사람마다 다릅니다. 인사 DB의 직무와 소속, 플랫폼 안에서의 행동(최근 본·좋아요한 Agent)으로 점수를 매겨 추천하고, 왜 골랐는지를 카드마다 한 줄로 붙입니다.",
        items: [
          {
            title: "○○님을 위한 추천",
            body: "제작자 직무가 내 직무와 같으면 +5, 카테고리가 내 직무면 +4, 같은 브랜드 동료가 만들었으면 +3, 최근 본·좋아요한 Agent와 같은 카테고리면 +2, 이번 주 조회·이번 달 버전업·14일 안 등록은 각 +1. 이미 본 Agent는 −2, 내가 만든 Agent는 제외. 신호가 없으면 ‘동료들이 많이 쓰는 Agent’로 채웁니다."
          },
          {
            title: "추천 이유와 기준 칩",
            body: "카드마다 가장 큰 이유 한 줄(예: ‘영업 직무 동료가 만든 Agent’)을 붙이고, 추천 위에는 쓰인 기준(영업 직무 · 스파오 · 최근 본 Agent 3개)을 칩으로 보여 줍니다."
          },
          {
            title: "직무 고정 Agent",
            body: "직무에 ‘온라인’이 들어 있거나 소속이 온라인BU면 홈 맨 위에 온라인 상품흐름 대시보드를 항상 띄웁니다."
          },
          {
            title: "오늘의 Agent · 우수 Agent 쇼케이스",
            body: "오늘의 Agent는 서울 날짜 기준으로 하루에 하나, 같은 날은 누구나 같은 Agent를 보고 자정까지 카운트다운합니다. 우수 Agent는 월 절감 시간 순 배너로 5초 자동 넘김."
          },
          {
            title: "내 할 일 사이드바",
            body: "이번 달 마감까지 남은 날, 설문 완료 여부, 월별 제출 n/N, 빈 칸이 있는 내 Agent 수를 모든 화면 오른쪽에 둡니다. 설문 → 제출 → 빈 칸 순서로 바로 갑니다."
          },
          {
            title: "순위 표현 금지",
            body: "일반 화면에 ‘N위’, 순위 번호, ‘랭킹’을 쓰지 않습니다. ‘많이 찾는 Agent’처럼 정렬만 보여 주고, 테스트가 순위 표현을 막습니다."
          }
        ]
      },
      {
        eyebrow: "핵심 기능 02",
        title: "인원 평가 체계",
        summary:
          "등록 양식부터 평가까지 ‘무엇을 바꿨는가’를 숫자로 적게 설계했습니다. Agent 점수와 AI 등급으로 결과물을, 참여 점수와 인재풀 순위로 사람을 봅니다. 기준은 공개하고 등급은 관리자에게만 보입니다.",
        items: [
          {
            title: "등록 양식 4 PART",
            body: "① 에이전트 설명(이름·카테고리·한 줄 설명·주소) ② 사용 가이드(확산 가능성 문항) ③ 노아로 무엇을 바꾼 것(사용 인원·월 절감 시간·삭제된 업무·성과 지표 1개 이상) ④ 접속 방법(비밀번호·SSO·보안 없음). 공동 제작자는 사내 계정으로 찾아 추가하고 기여율 합이 100%여야 합니다."
          },
          {
            title: "공개 평가 기준 4가지",
            body: "영역이 명확한가 · 실제로 성과를 내었는가(절감 시간, 정판율·정판액·비용절감 같은 정량 성과) · 확산 가능한가(팀 내·타팀) · 다음 스텝이 있는가. 기준은 게시판·등록·FAQ에 그대로 공개합니다."
          },
          {
            title: "Agent 점수 0~100",
            body: "월 절감 시간 30 · 정량 성과 40 · 사용 인원 15 · 다른 팀 확산 5(합 90을 100점으로 환산). 신고값은 그대로 믿되, 링크가 열리지 않으면 0점입니다."
          },
          {
            title: "AI 등급: 우수·보통·미흡",
            body: "Agent 점수와 글에서 읽은 기능 유형으로, 관리자가 매긴 정답 등급을 학습하는 순서형 로지스틱 회귀가 등급을 제안합니다. 우수 = 목적·해결 문제 명확, 보통 = 데이터 취합 등 추가 기능, 미흡 = 단순 대시보드."
          },
          {
            title: "참여 점수 100점",
            body: "업로드 Agent 개당 12점(최대 36) · 고급 교육 16 · 기본 교육 8 · 플랫폼 접속 회당 1점(최대 20) · 노아 2.0 사용량 최대 20(사용일수·메시지·코드세션을 나눠 각각 상한). 60점 이상 선도, 35 활용, 15 입문, 그 아래 관심."
          },
          {
            title: "월별 제출과 인재풀 순위",
            body: "그 달 노아 설문을 마쳐야 월별 제출을 낼 수 있고, Agent × 월 한 줄로 쌓입니다. 사람 몫 절감 시간은 Agent 절감 시간 × 기여율. 인재풀 표에서 이름을 누르면 달별 신규·버전업·절감 시간 증감·전후 비교 화면이 팝업으로 열립니다. 전체 순위는 사용 35 : 아웃풋 65로 확정해 구현 중입니다."
          }
        ]
      },
      {
        eyebrow: "핵심 기능 03",
        title: "교육 기능",
        summary:
          "설명만 듣는 교육이 아니라, 처음 온 직원도 자기 업무 문제를 Agent 하나로 만들어 올리는 것을 완료 기준으로 잡았습니다. 기초 → 영상 → 실습 → 배포까지 한 흐름입니다.",
        items: [
          {
            title: "AI 리터러시 기초",
            body: "AI의 기본 개념과 업무에서 알아야 할 핵심을 슬라이드 14장으로 학습합니다. 보안 원칙과 원클릭 배포 가드레일을 쉬운 사내 언어로 다시 썼습니다."
          },
          {
            title: "레벨별 강의 영상",
            body: "AI 트렌드 · 공통 · 새싹 · 기본 · 중급 · 고급 · 응용으로 나눠 내 수준에 맞는 강의를 고릅니다. 필수 영상은 배지로 표시하고 플랫폼 안에서 바로 봅니다."
          },
          {
            title: "6단계 Agent 제작 실습",
            body: "AI 기본 이해 → 업무 문제 정의 → Prompt Spec 작성 → Claude Code 프로토타입 구현 → 보안 점검 → 공유와 배포 준비. 단계마다 산출물과 점검 질문이 붙어 있고, MD·영업·디자인·CS 직무별 첫 Agent 시나리오를 제공합니다."
          },
          {
            title: "노아 2.0 교육자료",
            body: "집합교육 세션 1(기본 개념, 41장)과 세션 2(실습, 30장)를 과정 단위로 플랫폼에서 다시 볼 수 있습니다. 출석은 참여 점수에 반영됩니다."
          },
          {
            title: "바이브코딩 가이드 5단계",
            body: "만들 에이전트 정하기 → 바이브코딩으로 화면 만들기 → BI 데이터 연동 → 배포용으로 코드 수정 → 배포하기. 사용 가이드 작성용 프롬프트도 제공해, 작동 로직과 팀의 불문율·KPI를 제작자에게 먼저 묻도록 합니다."
          },
          {
            title: "노아 시작하기 체크리스트와 도움받기",
            body: "계정 신청 → 노아 접속 → DaaS 토큰 → 첫 Agent → 이번 달 설문·제출 5단계를 자동 판정합니다. FAQ, 1:1 문의, 데이터 추가 요청, 오프라인 접속 지원 신청이 함께 붙어 있습니다."
          }
        ]
      }
    ],
    insightsLabel: "설계 원칙",
    insights: [
      {
        title: "빈 값을 0으로 치지 않는다",
        body: "점수를 낼 때 사용 인원·절감 시간·난이도 중 하나라도 비어 있으면 점수를 내지 않고 무엇이 비었는지 돌려줍니다. 낮은 점수로 오해받는 일을 막기 위해서입니다."
      },
      {
        title: "개인정보는 최소로",
        body: "인사 DB에서는 이름·사번·소속·이메일·직무만 읽습니다. 주소·생년월일·연락처는 읽지 않습니다. 모든 화면은 로그인 후, 패션 사업부 구성원만 들어옵니다."
      },
      {
        title: "데이터 수집을 제출 흐름에 묶는다",
        body: "월별 제출 전에 그 달 설문을 먼저 받습니다. 만족도·절감 시간·필요한 지원이 매달 자연스럽게 쌓입니다."
      }
    ],
    vision: {
      lead:
        "사용 가이드 ④ 작동 로직과 회사·팀 불문율(기준값·우선순위·예외 처리), ⑥ KPI(측정 지표·도입 전후·측정 주기)는 Agent 하나의 설명서가 아닙니다. 그 직무가 감으로 지켜 온 판단 기준을 기계가 읽을 수 있는 형태로 꺼내는 장치입니다. 이것이 전 직무에 걸쳐 쌓이면 ‘직무 지식그래프’가 되고, 중심 AI 하네스는 어떤 직무의 질문이든 그 직무의 규칙과 KPI를 먼저 찾아 적용한 뒤 알맞은 Agent를 호출합니다.",
      note:
        "아래 구조는 로드맵입니다. 데이터·시스템 연결(노아 MCP Gateway)과 Agent 등록 → 평가 → 추천 → 교육 루프는 운영 중이고, 규칙·KPI의 그래프 적재와 Agent의 스킬 승격을 단계적으로 진행합니다.",
      jobs: ["상품기획", "영업", "마케팅", "온라인", "IMC", "SCM", "생산", "물류", "CS"],
      steps: [
        {
          title: "공통 계약으로 통일한다",
          body: "모든 Agent가 같은 7항목 사용 가이드를 갖게 하고, 로직·불문율·KPI는 사람이 읽는 글과 함께 기계가 읽는 구조(입력·출력·규칙[조건·기준값·우선순위·예외]·KPI[지표·전·후·주기]·데이터 출처)로도 남깁니다. 인터뷰형 스킬이 작성자를 대신 묻습니다."
        },
        {
          title: "직무 맵을 뼈대로 삼는다",
          body: "카테고리 12개 × 업무 단계로 직무 맵을 만들고 각 Agent를 (직무, 단계) 칸에 꽂습니다. 비어 있는 칸은 그대로 AX 과제 후보가 되어 전사 과제 발굴과 이어집니다."
        },
        {
          title: "불문율을 지식그래프에 올린다",
          body: "회사 공식 지표 정의가 들어 있는 지식그래프에 Rule(기준값·우선순위·예외)과 KPI 노드를 붙이고 직무·지표·데이터 소스와 연결합니다. 지표 산식을 그래프에서 찾아 쓰듯, 하네스는 직무 규칙을 그래프에서 찾아 적용합니다."
        },
        {
          title: "평가가 승격 게이트가 된다",
          body: "AI 등급 우수, 링크 정상, KPI 전후가 제출된 Agent만 중심 하네스가 호출할 수 있는 스킬·MCP 툴로 승격합니다. 평가 체계가 ‘무엇을 믿고 연결할지’를 정합니다."
        },
        {
          title: "프로세스를 따라 체인으로 잇는다",
          body: "상품 흐름(기획 → 발주 → 입고 → 매장 배분 → 판매 → 리오더)처럼 직무를 가로지르는 프로세스 하나를 골라 3~4개 직무의 Agent를 체인으로 묶어 증명하고, 그다음 프로세스로 넓힙니다. Policy & Context 레이어가 읽기 전용·본인 권한 원칙을 그대로 지킵니다."
        },
        {
          title: "KPI로 루프를 닫는다",
          body: "월별 제출의 KPI(전·후·주기)를 DW 실측과 대조해 신고값을 검증하고, 결과를 Agent 신뢰도 → 추천·라우팅 가중치 → 교육 과제로 되돌립니다. 개인화·평가·교육 세 기능이 이 루프를 돌리는 장치입니다."
        }
      ]
    },
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", "Snowflake DaaS", "Redis", "Vitest"],
    tags: ["개인화", "평가 체계", "교육", "Next.js"]
  },
  {
    slug: "ax-discovery-agent-training",
    part: 3,
    group: "④ 전사 확산",
    title: "전사 AX 과제 발굴 및 AI Agent 교육",
    subtitle: "소규모로, 단계별로, 반복해서. 전사 AX 과제를 찾고 AI Agent를 직접 만들어 보는 교육",
    period: "2026.02 ~ 진행 중",
    purpose: "조직 내 AX 전환율 20% 달성을 위해 교육·온보딩·운영 지원을 설계",
    metrics: [
      { value: "21개", label: "AX 프로젝트 발굴" },
      { value: "약 500명", label: "AI Agent 교육" }
    ],
    roles: [
      "현업 업무를 분석해 AI 적용 가능 과제를 정의",
      "효과·난이도·데이터 준비도 기준으로 우선순위 평가",
      "교육 커리큘럼과 직무별 실습 과제 설계",
      "교육 이후 실제 Agent 제작·배포까지 기술 지원"
    ],
    steps: ["업무 프로세스 인터뷰", "AX 후보 발굴", "우선순위 평가", "Agent 교육 Hands-on", "제작·배포 지원"],
    image: {
      src: "/projects/ax-training.jpg",
      alt: "강단에서 원클릭 배포 가이드 파일을 설명하는 교육 현장",
      caption: "AI Agent 제작 교육 현장: 원클릭 배포 가이드 세션",
      width: 2048,
      height: 1536
    },
    tags: ["AX 과제 발굴", "교육", "온보딩"]
  },
  {
    slug: "recsys-serving-pipeline",
    part: 3,
    group: "⑤ 다음 단계",
    title: "개인화 추천 서빙 파이프라인",
    subtitle: "규칙 기반 추천에서 모델 기반 실시간 서빙으로",
    period: "준비 중",
    status: "준비 중",
    draft: true,
    purpose:
      "개인화 추천 모델의 서빙 파이프라인을 설계·개발·운영합니다. ANN 기반 후보 검색부터 추론 서버를 통한 모델 서빙, 실시간 추천 API 제공까지 End-to-End 서빙 흐름을 책임집니다. 추천 모델의 성능을 다각도로 검증하기 위한 Offline Evaluator, Online Simulator, A/B 테스트 플랫폼을 구축하고, 주요 지표를 실시간으로 모니터링하는 시스템을 운영합니다. AI 도구를 활용해 추천 플랫폼과 백엔드 기능을 빠르게 프로토타이핑·통합하고, 검증된 결과를 안정적인 프로덕션 코드로 발전시킵니다.",
    metrics: [],
    background:
      "지금 패션 AI 플랫폼의 추천은 직무·브랜드·행동 7종 신호에 점수를 매기는 규칙 기반입니다. 사용 로그와 월별 KPI가 쌓이면 이를 학습 데이터로 삼아 모델 기반 추천과 서빙 파이프라인으로 발전시키는 것이 다음 단계입니다.",
    roles: ["(작성 예정) 설계·개발·운영에서 맡은 범위"],
    catalog: {
      title: "채울 구성 요소",
      items: [
        { name: "ANN 기반 후보 검색", body: "임베딩으로 후보 Agent·콘텐츠를 빠르게 좁히는 단계. (작성 예정)" },
        { name: "추론 서버 · 모델 서빙", body: "학습된 추천 모델을 서빙하는 추론 서버와 배포 방식. (작성 예정)" },
        { name: "실시간 추천 API", body: "홈·사이드바가 호출하는 추천 API 계약과 지연 시간 목표. (작성 예정)" },
        { name: "Offline Evaluator", body: "과거 로그로 모델을 비교 검증하는 오프라인 평가기. (작성 예정)" },
        { name: "Online Simulator", body: "배포 전 트래픽을 흉내 내 동작을 확인하는 시뮬레이터. (작성 예정)" },
        { name: "A/B 테스트 플랫폼", body: "추천 변형을 나눠 보여 주고 지표 차이를 검정하는 실험 체계. (작성 예정)" },
        { name: "실시간 지표 모니터링", body: "클릭·사용·절감 시간 등 주요 지표를 실시간으로 보는 모니터링. (작성 예정)" },
        { name: "AI 도구 기반 프로토타이핑 → 프로덕션", body: "AI 도구로 빠르게 시제품을 만들고 검증된 것만 안정적인 프로덕션 코드로 올리는 흐름. (작성 예정)" }
      ]
    },
    tags: ["추천 시스템", "모델 서빙", "A/B 테스트"]
  }
];

/** 파트 안의 중분류를 등장 순서대로 돌려줍니다. */
export function groupsOfPart(part: 1 | 2 | 3): { group: string; projects: Project[] }[] {
  const result: { group: string; projects: Project[] }[] = [];
  for (const project of projectsByPart(part)) {
    const found = result.find((item) => item.group === project.group);
    if (found) found.projects.push(project);
    else result.push({ group: project.group, projects: [project] });
  }
  return result;
}

export function projectsByPart(part: 1 | 2 | 3) {
  return PROJECTS.filter((project) => project.part === part);
}

export function findProject(slug: string) {
  return PROJECTS.find((project) => project.slug === slug);
}

export function neighbors(slug: string) {
  const index = PROJECTS.findIndex((project) => project.slug === slug);
  return {
    prev: index > 0 ? PROJECTS[index - 1] : null,
    next: index >= 0 && index < PROJECTS.length - 1 ? PROJECTS[index + 1] : null
  };
}
