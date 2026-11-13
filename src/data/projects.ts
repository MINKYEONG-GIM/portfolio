export type Metric = { value: string; label: string; note?: string };
export type Insight = { title: string; body: string };
export type FeatureItem = { title: string; body: string };
export type FeatureSection = { eyebrow: string; title: string; summary: string; items: FeatureItem[] };
export type VisionStep = { title: string; body: string };
export type Vision = { lead: string; note: string; steps: VisionStep[]; jobs: string[] };
export type SystemLayer = { name: string; role: string; items: { label: string; note?: string }[]; /** true 인 층을 색 바탕으로 강조 (없으면 마지막 층) */ tint?: boolean };
export type SystemArchitecture = {
  intro: string;
  /** 처리 흐름 소제목을 프로젝트별로 바꿀 때 (없으면 "질문 처리 과정") */
  flowTitle?: string;
  layers: SystemLayer[];
  /** 질문 한 번이 처리되는 순서 */
  flow: { title: string; body: string }[];
  principles: { title: string; body: string }[];
  /** 소개 문단 바로 아래에 보여 줄 그림 */
  figures?: ProjectImage[];
};
/** 단계 목록. flag 가 있으면 그 단계를 강조(예: 버그)하고 flag 문구를 배지로 붙입니다. */
export type CatalogStep = { text: string; flag?: string };
export type CatalogItem = { name: string; trigger?: string; body: string; steps?: CatalogStep[] };
export type ProjectImage = { src: string; alt: string; caption?: string; width: number; height: number };
/** 제목을 붙여 묶은 이미지. 둘 이상이면 가로로 나란히 보여 줍니다. */
export type FigureGroup = { title: string; images: ProjectImage[] };

export type Project = {
  slug: string;
  /** 목차·요약에 쓰는 짧은 이름 (없으면 title) */
  short?: string;
  part: 1 | 2 | 3 | 4;
  /** 중분류 (파트 안에서 묶는 이름) */
  group: string;
  title: string;
  subtitle: string;
  period: string;
  purpose: string;
  metrics: Metric[];
  roles: string[];
  /** 관리자로 로그인했을 때만 역할 목록 끝에 붙여 보여 줄 항목 */
  adminRoles?: string[];
  roleLead?: string;
  background?: string;
  steps?: string[];
  /** 진행 단계 바로 아래에 보여 줄 실제 사례 이미지 */
  stepFigures?: ProjectImage[];
  insights?: Insight[];
  insightsLabel?: string;
  features?: FeatureSection[];
  /** 기능 섹션의 제목·탭 이름을 프로젝트별로 바꿀 때 (없으면 "핵심 기능") */
  featuresTitle?: string;
  architecture?: { layers: string[]; sources: string[]; gateway: string };
  /** 레이어별 구성 요소까지 적은 상세 시스템 구조 */
  system?: SystemArchitecture;
  vision?: Vision;
  /** 카드와 상단에 붙는 상태 배지 (예: 진행 중, 준비 중) */
  status?: string;
  /** 아직 채우는 중인 섹션이면 안내문을 띄웁니다. */
  draft?: boolean;
  /** true 면 관리자로 로그인했을 때만 보입니다. (준비 중 안내는 띄우지 않음) */
  adminOnly?: boolean;
  /** 스킬 목록·로드맵 항목처럼 이름 + 설명으로 나열하는 것 */
  catalog?: { title: string; items: CatalogItem[]; /** 제목 바로 아래에 보여 줄 그림 */ figures?: ProjectImage[] };
  stack?: string[];
  image?: ProjectImage;
  /** 대표 이미지 아래에 이어서 보여 줄 추가 화면 */
  images?: ProjectImage[];
  /** 있으면 image·images 대신 이 묶음을 상단에 보여 줍니다. */
  figureGroups?: FigureGroup[];
  /** 목록 썸네일용 정사각 이미지. 없으면 image 를 씁니다. */
  thumb?: ProjectImage;
  tags: string[];
};

/** 파트 소개 블록의 큰 비주얼. 사진·장표가 있으면 이미지, 없으면 구조도를 그립니다. */
export type PartVisual =
  | { type: "image"; src: string; alt: string; width: number; height: number; caption: string }
  | { type: "harness"; caption: string };

export type Part = {
  no: 1 | 2 | 3 | 4;
  code: string;
  /** 파트가 무엇인지 설명하는 제목 */
  title: string;
  /** 상단 탭·타일에 쓰는 짧은 이름 */
  short: string;
  /** 타일에 쓰는 한 줄 질문 */
  question: string;
  tagline: string;
  summary: string;
  visual: PartVisual;
};

export const PARTS: Part[] = [
  {
    no: 1,
    code: "Part 01",
    title: "전사 AI 인프라",
    short: "전사 AI 인프라",
    question: "사내 AI 에이전트 통합 플랫폼이 무엇이고 어떻게 만들어졌는지",
    tagline: "Snowflake → 지식그래프 → MCP / 스킬 → 에이전트 플랫폼",
    summary:
      "사내 데이터를 MCP로 Claude에 연결하고 노하우를 스킬로 전원 배포. 2026년 9월 기준 Agent 160개, 월 8,180시간 절감.",
    visual: {
      type: "image",
      src: "/projects/agent-kpi-demo.png",
      alt: "사내 AI 에이전트 플랫폼에서 자연어로 매장 매출을 물으면 지식그래프에서 지표 정의를 찾고 DW를 조회해 출처와 함께 답하는 화면",
      width: 1226,
      height: 1051,
      caption: "사내 AI 에이전트 kpi-query 스킬: 질문 → 지식그래프 → DW 조회 → 출처 있는 답"
    }
  },
  {
    no: 2,
    code: "Part 02",
    title: "AI 인재관리",
    short: "AI 인재관리",
    question: "사람을 어떻게 키우고, 모으고, 평가했는지",
    tagline: "교육 → AI 인재 육성 플랫폼 → AI 인재 평가",
    summary:
      "교육으로 Agent 제작자를 키우고, AI 플랫폼에 결과물을 모으고, 100점 체계로 평가해 AI 인재풀 구축. 포상·금액 지원·배치의 근거.",
    visual: {
      type: "image",
      src: "/projects/ax-training.jpg",
      alt: "강단에서 원클릭 배포 가이드를 설명하는 AI Agent 제작 교육 현장",
      width: 2048,
      height: 1536,
      caption: "AI Agent 제작 교육 현장"
    }
  },
  {
    no: 3,
    code: "Part 03",
    title: "사내 업무 시스템 기획",
    short: "사내 업무 시스템",
    question: "기획부터 구축·운영까지 직접 맡은 서비스",
    tagline: "문제 정의 → 데이터 구조 설계 → 구축 → 운영·개선",
    summary:
      "데이터 구조 설계부터 구축·운영까지 직접 맡은 서비스. 상품 데이터를 한곳에 모은 전사 통합 Image 플랫폼, 전략자료를 검색 가능하게 바꾼 RAG 검색.",
    visual: {
      type: "image",
      src: "/projects/pim-pipeline.png",
      alt: "SAP BI → Snowflake → 전사 통합 Image 플랫폼 DB → 전사 통합 Image 플랫폼 → 사내 OMS → 온라인 채널로 이어지는 생성형 AI 기반 데이터 파이프라인 설계도",
      width: 1667,
      height: 784,
      caption: "전사 통합 Image 플랫폼: 생성형 AI 전처리와 OMS 연계 파이프라인"
    }
  },
  {
    no: 4,
    code: "Part 04",
    title: "전략 프로젝트(사내 컨설팅)",
    short: "전략 프로젝트",
    question: "분석으로 매출을 어떻게 바꿨는지",
    tagline: "고객·시장 인사이트",
    summary:
      "데이터와 현장을 교차검증해 매출 문제를 고객 구조의 문제로 다시 정의하고, 채널·상품 전략으로 성과 창출.",
    visual: {
      type: "image",
      src: "/projects/padding-search.png",
      alt: "의류 카테고리별 검색량 분석 장표. 아우터 검색량 감소 속 역시즌 패딩 검색량 183% 증가",
      width: 1686,
      height: 1174,
      caption: "시장 분석 장표: 줄어든 패딩 수요와 늘어난 역시즌 패딩 수요"
    }
  }
];

export const PROFILE = {
  name: "김민경",
  tagline: "고객·시장 인사이트를 성과로 연결하는 기획자",
  intro:
    "패션 브랜드 고객·시장 분석에서 출발해, 지금은 사내 데이터를 AI 에이전트에 연결하는 플랫폼 구축과 전사 AI 전환 설계. 숫자 분석부터 서비스 구축까지 직접."
};

export const PROJECTS: Project[] = [
  {
    slug: "agent-platform",
    part: 1,
    group: "① 에이전트 플랫폼",
    title: "지식그래프 기반 사내 AI 에이전트 통합 플랫폼",
    short: "AI 에이전트 플랫폼(사내 AI 에이전트)",
    subtitle: "자연어 요청만으로 사내 DW에 바로 연결된 웹을 만들 수 있는, 지식그래프 기반 엔터프라이즈 AI 에이전트 플랫폼",
    period: "2025.11 ~ 진행 중",
    purpose:
      "1. 자연어 요청만으로 사내 DW에 연결된 웹앱 제작\n2. 자연어로 BI 데이터 조회 가능한 환경 구축",
    metrics: [
      { value: "160개", label: "완성 에이전트 수", note: "2026년 9월(오픈 첫 달) 기준" },
      { value: "월 8,180시간", label: "에이전트로 절감한 업무 시간", note: "2026년 9월(오픈 첫 달) 기준" },
      { value: "85% 절감", label: "사내 데이터(BI) 조회 소요시간", note: "ASIS 27분 → TOBE 4분" }
    ],
    roles: [
      "브랜드·시즌·매장 등 현업 용어와 DW 테이블·컬럼의 매핑 사전 구축: 같은 질문에 같은 답이 나오도록 동의어와 기준값 정리",
      "그래프·DW 연결용 MCP 서버 요구사항 정의: 도구 목록, 입력·출력 형식, 읽기 전용 권한 범위를 개발자와 협의",
      "플러그인 배포 프로세스 설계: 설치 가이드, 커넥터 연결 절차, 자주 묻는 오류 대응 문서 작성"
    ],
    background:
      "1. 사내 직원들이 만든 웹앱 도구에 회사 DW 데이터 연결이 안되니 도구를 제작해도 실제 시간 절감 효과가 미미하여 보안 이슈 최소화하며 개별 인원이 제작한 웹앱 도구에 사내 데이터를 연결 지원하고자 함\n2. 사내 BI 데이터 조회시 평균 소요시간 27분으로 BI 소요시간을 AI 통해 75% 절감하고자 함.",
    system: {
      intro:
        "Neo4j 지식그래프를 기반으로 조직 지침 → 훅 → 스킬 → MCP 도구 → 게이트웨이 → 지식그래프·사내 데이터 순서로 질문 처리",
      layers: [
        {
          name: "1. Client Layer",
          role: "Claude 데스크톱·Claude Code·Cowork에서 사내 플러그인 사용",
          items: [
            { label: "플러그인", note: "스킬·훅·MCP 커넥터 묶음" },
            { label: "조직 커넥터", note: "관리자가 조직 단위로 배포" }
          ]
        },
        {
          name: "2. Policy & Context Layer",
          role: "조직 지침과 훅이 컨텍스트 그래프를 읽음",
          items: [
            { label: "조직 지침", note: "MCP 연결 실패 시 안내 절차 등 전원 공통 규칙" },
            { label: "대화 시작 훅", note: "사내 PaaS 개발 규칙 적용" }
          ]
        },
        {
          name: "3. 스킬 Layer",
          role: "스킬은 그래프 조회 방법과 도구 호출 순서 결정",
          items: [
            { label: "자연어 KPI 조회 스킬", note: "지식그래프 1회 조회 → SQL 작성 → DW 읽기 전용 실행" },
            { label: "주간보고 검색 스킬", note: "그래프 벡터 인덱스로 브랜드 주간보고 원문을 찾아 답변" },
            { label: "사내 행정 안내 스킬", note: "경비·규정·총무 등 사내 행정 지식 검색" },
            { label: "앱 개발·배포 스킬", note: "사내 표준으로 앱 개발·배포 준비" }
          ]
        },
        {
          name: "4. MCP 도구(툴 바인딩)",
          role: "스킬이 실제로 부르는 도구",
          items: [
            { label: "지식그래프 조회", note: "지표 의미 해석 · 그래프 읽기 · 주간보고·행정 지식 검색" },
            { label: "사내 DW 조회", note: "Snowflake 쿼리 실행(읽기 전용)" },
            { label: "인사(근태)", note: "연차 정보·신청·결재선·승인·취소" },
            { label: "메일·일정", note: "메일 조회·발송·회신, 일정 생성·수정" }
          ]
        },
        {
          name: "5. 지식그래프 & DW",
          role: "사내 MCP 게이트웨이를 거쳐 지식그래프 기준으로 DW·M365·HR 조회",
          items: [
            { label: "Neo4j 지식그래프", note: "지표 정의·산식·조인·골든 SQL" },
            { label: "Snowflake DW", note: "표준 데이터 모델(집계 테이블)" },
            { label: "M365 Graph", note: "메일·일정" },
            { label: "사내 PaaS", note: "직원이 만든 앱의 원클릭 배포" }
          ]
        }
      ],
      flow: [
        { title: "질문", body: "“A브랜드 강남점 올해 5월 매출 알려줘”" },
        { title: "지식그래프 조회", body: "그래프 1회 조회로 지표 정의·조인 확인, 그 정의로만 SQL 작성" },
        { title: "출처와 함께 답변", body: "본인 권한으로 DW 읽기 전용 조회 후 정의·범위·출처를 붙여 답변" },
        { title: "교정 학습", body: "“아니, 1월 25일부터” 같은 교정을 컨텍스트 그래프에 저장, 다음 질문부터 자동 적용" }
      ],
      principles: [
        { title: "의미는 지식그래프에만", body: "지표 정의·산식·불문율은 그래프에만. 그래프만 고치면 전 에이전트에 같은 날 반영" },
        { title: "그래프 먼저, SQL은 나중", body: "테이블 추측 금지. 그래프 조회 뒤에만 SQL 작성, 없는 지표는 ‘정의 없음’ 답변" },
        { title: "교정은 그래프에 축적", body: "사용자 교정·회사 결정을 컨텍스트 그래프에 남겨 다음 사람 질문에도 같은 기준 적용" }
      ]
    },
    steps: ["지식그래프 설계 및 구축", "그래프·DW 연결용 MCP 서버 개발", "스킬 및 훅 제작", "플러그인 배포 및 오프라인 교육", "매주 전 계열사 활용 사례 송출"],
    stepFigures: [
      {
        src: "/projects/agent-case-broadcast.png",
        alt: "사옥 엘리베이터 화면에 송출 중인 사내 AI 에이전트 활용 사례 영상: 리뷰 206건을 자동 분석해 채널별 리뷰의 긍·부정 요소를 정리한 화면",
        caption: "5단계 실제 사례: 사옥 엘리베이터 화면으로 매주 송출되는 활용 사례 영상 (채널별 리뷰 긍·부정 자동 분석)",
        width: 1723,
        height: 889
      }
    ],
    figureGroups: [
      {
        "title": "해당 도구를 이용하여 바이브코딩으로 대시보드 제작",
        "images": [
          {
            "src": "/projects/platform-vibe-coding-flow.png",
            "alt": "자연어 한 줄 요청으로 대시보드 웹이 만들어지고, 이어서 ‘연동해줘’ 한 마디로 Snowflake 실데이터로 교체되는 과정을 세 단계로 보여 주는 화면",
            "caption": "바이브코딩 시연: ‘연동해줘’ 한 마디로 Snowflake 실데이터에 연결",
            "width": 1300,
            "height": 1305
          }
        ]
      },
      {
        "title": "BI 데이터를 자연어로 조회",
        "images": [
          {
            "src": "/projects/agent-kpi-demo.png",
            "alt": "kpi-query 스킬로 A브랜드 강남점 5월 매출을 자연어로 질문하자 지식그래프에서 지표 정의를 찾고 DW를 조회해 답하는 화면",
            "caption": "kpi-query 스킬: 자연어 질문 → 지식그래프에서 지표 정의 확인 → DW 조회 → 출처와 함께 답변",
            "width": 1226,
            "height": 1051
          }
        ]
      }
    ],
    thumb: {
      "src": "/projects/agent-kpi-demo.png",
      "alt": "kpi-query 스킬로 A브랜드 강남점 5월 매출을 자연어로 질문하자 지식그래프에서 지표 정의를 찾고 DW를 조회해 답하는 화면",
      "width": 1226,
      "height": 1051
    },
   
    stack: ["MCP", "Claude Code Skill", "Snowflake", "Neo4j", "Cypher 쿼리"],
    tags: ["지식그래프", "MCP", "Text to SQL"]
  },
  {
    slug: "md-ontology-design",
    part: 1,
    group: "② 온톨로지",
    title: "온톨로지 구축: 데이터 카탈로그에 업무 개념층 추가",
    short: "MD 업무 온톨로지",
    subtitle: "DW 테이블·컬럼 중심의 시맨틱 레이어에서 업무 판단 개념을 추가한 업무 온톨로지 재설계",
    period: "2026.11 ~ 진행 중",
    status: "진행 중",
    purpose:
      "기존 데이터 카탈로그(시맨틱 레이어)에서 업무 노하우를 담은 온톨로지 구축을 통한 판단 질문까지 답변 범위 확장",
    metrics: [
      { value: "할인율 · 리오더수량 · 리오더시점 · 분배 · 주력판매채널", label: "답변 범위 확대 (판단 질문)" }
    ],
    roles: [
      "실무자 인터뷰 통해 업무 개념과 인과 관계 정리",
      "개념 표·관계 표(방향·속성·예외) 양식 정의"
    ],
    background:
      "회사의 불문율·업무 방식이 들어 있지 않아, 시맨틱 레이어가 있더라도 사용자가 세션마다 회사의 판단 기준을 그때그때 넣어줘야 했음.",
    system: {
      intro:
        "기존 지식그래프(시맨틱 레이어)는 DW 데이터 연결층으로 ‘핏 불만 → 사이즈 이슈 → 반품 증가 → 정판율 하락’ 같은 MD 경험 지식을 담아 빠른 의사결정을 지원하고자 함",
      layers: [
        { tint: true, name: "1. 온톨로지 (상위 개념 · 스키마)", role: "명사는 개념, 동사는 관계. 개념은 DW가 아니라 MD 세계에서 온 바구니(라벨)로 구분.", items: [{ label: "지표", note: "소진율 · 정판율 · 재고보유일수 · 초기 판매율" }, { label: "상태·단계", note: "PLC 도입 · 성장 · 피크 · 감소" }, { label: "판단", note: "리오더 · 채널 주력 · 할인 시점 · 다음 시즌 발주" }, { label: "제약", note: "재고보유일수 · 리드타임" }, { label: "시점·사건", note: "시즌 엔딩 · 시즌오프 · 예측 피크 통과" }] },
        { name: "2. 지식그래프 (하위 개념 · 실제 데이터와 관계)", role: "개념이 ‘데이터로는 어디서 보이는가’를 알려주는 층. 지금까지의 작업은 버려지지 않고 위층이 데이터를 잘못 읽지 않게 보호.", items: [{ label: "정판율 → DW 매출 지표", note: undefined }, { label: "핏 불만 → 리뷰 텍스트 · 플랫폼 세부평가", note: undefined }, { label: "지켜 주는 사실", note: "수선·심의 CS 채널은 고객 리뷰가 아님 · 자사몰 사진은 미수집 · 주얼리는 입고마다 줄이 쌓임" }] }
      ],
      flow: [
        { title: "사용자 판단 질의", body: "“이 스타일 왜 안 팔려? 어떻게 해야 해?”" },
        { title: "판단 노드 찾기", body: "도입기, 쇠퇴기 등 어느 PLC 단계인지 확인." },
        { title: "데이터로는", body: "하위 개념인 지식그래프를 통해 정확한 숫자 확인. 정판율은 매출 지표에서, 핏 불만은 리뷰 텍스트 테이블 조회." }
      ],
      principles: [
        { title: "중심은 데이터가 아니라 업무 세계", body: "테이블·컬럼은 개념이 데이터로 어디서 보이는지 알려주는 아래층일 뿐입니다. 라벨도 Table·Column이 아니라 지표·상태·판단·제약·시점처럼 MD 세계에서 온 바구니로 만듭니다." },
        { title: "기준값은 속성으로", body: "‘40% 이상’, ‘평균 4주’, ‘15/40/70%’, ‘1.30/0.85배’, ‘9/30·2/28’ 같은 기준은 노드가 아니라 관계나 개념의 속성에 적습니다. 기준이 바뀌면 숫자만 고치고, 브랜드마다 다르면 적용 범위도 속성에 둡니다." },
        { title: "예외는 막는 관계로 따로", body: "‘잘 팔리는데도 리오더 안 하는 경우’는 일반 규칙과 섞지 않고 반대 방향의 ‘막는다’ 관계로 만듭니다. 가장 귀한 지식이 여기에 있습니다." },
        { title: "MD 판단 규칙과 앱 계산 규칙을 섞지 않는다", body: "판매소진 예상일·PLC 곡선·2주 커버리지는 리오더 앱의 계산 로직에서 온 것이라 ‘계산 규칙(앱)’ 바구니에 따로 둡니다. 앱에는 없고 MD 지식에만 있는 것(정판율 낮으면 리오더 안 함, 재고보유일수로 사후 평가, 사이즈 단위 리오더)이 개념층의 핵심입니다." },
        { title: "테이블은 마지막에 연다", body: "Neo4j도 Snowflake도 열지 않고 인터뷰와 표 두 개(개념 표·관계 표)로 시작합니다. 표가 차면 그때 Neo4j로 옮기고, 방법은 익힌 MERGE 그대로입니다." }
      ]
    },
    steps: ["SO/MD 직무 인터뷰 (업무 내 판단 기준)","개념 표 · 관계 표 작성","Neo4j로 이관","Neo4j MCP 연결"],
    stack: ["Neo4j", "Cypher 쿼리", "Snowflake"],
    image: {
      src: "/projects/md-ontology-overview.png",
      alt: "업무 개념층 그래프: 판단·지표·상태·사건·제약·계산 규칙 30개 노드와 38개 관계",
      caption: "온톨로지 (상위 개념): 판단·지표·상태·사건·제약·계산 규칙이 원인과 근거로 이어진 업무 개념층 (노드 30 · 관계 38)",
      width: 1800,
      height: 1000
    },
    images: [
      {
        src: "/projects/md-ontology-judgment.png",
        alt: "리오더 판단 노드를 중심으로 후보로 만드는 관계, 확인하는 관계, 막는 관계가 이어진 그래프",
        caption: "리오더 판단: 지표·제약·사건·상태가 후보로 만들고(MAKES_CANDIDATE), 확인하고(CHECKS), 막는(BLOCKS) 세 종류의 관계",
        width: 1800,
        height: 1000
      },
      {
        src: "/projects/md-ontology-quantity-eval.png",
        alt: "수량 결정 지표와 평가 지표가 리오더 수량과 리오더 성과로 이어지는 그래프",
        caption: "수량 결정과 평가: 같은 지표가 후보 기준이자 평가 기준이 되어 판단 → 결과 → 다음 판단 고리 형성",
        width: 1800,
        height: 1000
      },
      {
        src: "/projects/md-ontology-data-link.png",
        alt: "업무 개념 노드가 DW 테이블과 컬럼 노드에 점선으로 연결된 2층 구조 그래프",
        caption: "데이터로는: 상위 개념(온톨로지)과 하위 개념(지식그래프)을 잇는 SOURCED_FROM 관계 (연결 24)",
        width: 1800,
        height: 1000
      }
    ],
    thumb: {
      src: "/projects/md-ontology-thumb.png",
      alt: "업무 개념층 그래프의 중심부",
      width: 1000,
      height: 1000
    },
    tags: ["온톨로지", "MD 지식", "지식그래프"]
  },
  {
    slug: "daas-paas-operations",
    part: 1,
    group: "③ 인프라",
    title: "PaaS 기반 서비스 운영체계",
    short: "PaaS 운영체계",
    subtitle: "비개발자가 만든 앱의 배포 및 DB·파일 스토리지, 스케줄을 지원하는 사내 PaaS",
    period: "2026.03 ~ 진행 중",
    purpose:
      "현업이 직접 만든 웹도구를 개발자 도움 없이 배포하고 운영 지원하는 사내 PaaS. 전체 배포현황 및 웹별 MAU·호출 수, 배포 도메인 통합 관리",
    background:
      "개별 직원이 제작한 웹서비스를 개별 서버로 배포하니 회사 내부 정보 관리가 어렵고 외부 DB·외부 호스팅으로 회사 데이터 반출되는 현황 파악 어려움. 배포를 회사 안으로 모아 한곳에서 관리하고, 내부 정보·보안·비용을 통합하고자 제작",
    metrics: [
      { value: "311건", label: "배포 건수" },
      { value: "90%", label: "배포 성공률", note: "n=235건" }
    ],
    roles: [
      "원클릭 배포 가드레일 문서(AI 개발 도구용 규칙) 작성과 배포, 교육",
      "Claude Code Skill 요구사항·호출 조건·동작 방식 설계: 배포 전에 프로젝트를 PaaS 기준에 맞게 점검",
      "반복되는 배포·운영 문의를 Skill 기능으로 전환"
    ],
    features: [
      {
        eyebrow: "핵심 기능 01",
        title: "원클릭 배포",
        summary: "배포 성공률을 높이려고 AI 개발 도구가 따르는 가드레일 규칙을 먼저 배포",
        items: [
          { title: "ZIP · Git 연결 배포", body: "완성된 ZIP을 업로드하거나 Git 저장소를 연결해 배포. 오류 건은 프로젝트 카드에서 바로 확인" },
          { title: "원클릭 배포 가드레일", body: "AI 개발 도구(Claude Code)가 코드 작성시 지켜야 할 규칙(스택 선택, 안전 기본값)을 문서로 배포" },
          { title: "배포 준비 스킬", body: "배포 전에 프로젝트 구조·환경변수·빌드 설정을 PaaS 기준으로 점검하는 Claude Code 스킬 제공" }
        ]
      },
      {
        eyebrow: "핵심 기능 02",
        title: "운영 · 보안 · 도메인을 한 화면에서",
        summary: "배포한 앱의 사용량(MAU · 호출 수), 데이터 보안 점검, DB 스토리지를 한 화면에서 관리",
        items: [
          { title: "웹별 MAU · 호출 수", body: "배포한 앱마다 월간 활성 사용자(MAU)와 API 호출 수 확인" },
          { title: "데이터 보안 점검", body: "전사 데이터는 사내 DB만 쓰도록, 연결 DB 관리" }
        ]
      }
    ],
    images: [
      {
        src: "/projects/paas-my-dashboard.png",
        alt: "개인 사용자 대시보드: 내 프로젝트 3건(배포 주소·최종 성공 시각·오류 수), 내 DB와 파일 스토리지 사용량, 내 스케줄, 최근 24시간 런타임 오류",
        caption: "개별 인원들이 보는 본인의 웹배포 현황 대시보드",
        width: 1302,
        height: 1062
      },
      { src: "/projects/paas-monitoring.png", alt: "관리자용 서비스 활용도 모니터링: 서비스 이용 현황 요약(앱 실행 횟수 356, 실행 오류율 0.00%, 평균 응답시간 1854.9ms, p95 2811.9ms, p99 3358.1ms, 처리 제한 0, 배포 실패율 0.00%, 집계 가능한 앱 264/281), 기간 추이 그래프(호출수·에러수), 어플리케이션별 활용도 표(호출수·에러율·평균지연·p95·p99·스로틀·MAU). 사용자명·ID는 블러 처리, MAU는 예시 숫자", caption: "관리자가 보는 전체 배포 웹 현황", width: 2000, height: 1186 }
    ],
    thumb: {
      src: "/projects/paas-dashboard-thumb.png",
      alt: "PaaS 대시보드",
      width: 1000,
      height: 1000
    },
    stack: ["Next.js", "Serverless", "CloudFront", "Claude Code Skill"],
    tags: ["PaaS", "원클릭 배포", "셀프서비스"]
  },
  {
    slug: "enterprise-agent-integration",
    part: 1,
    group: "④ 전사 통합",
    title: "전사 에이전트 통합: 브랜드별에서 하나로",
    short: "전사 에이전트 통합",
    subtitle: "브랜드마다 만든 Agent를 브랜드 단위 에이전트로 묶고, 최종적으로 전사 하나의 중심 하네스로 통합",
    period: "2026 ~ 진행 중",
    status: "진행 중",
    draft: true,
    purpose:
      "7개 브랜드처럼 브랜드마다 따로 만들어지는 Agent를 브랜드 단위 에이전트로 묶고, 공통 계약·지식그래프·평가 게이트로 표준화해 최종적으로 전사 하나의 에이전트로 통합.",
    metrics: [
      { value: "160개", label: "통합 대상 Agent", note: "2026년 9월 기준" },
      { value: "9개", label: "연결할 직무" },
      { value: "3단계", label: "통합 로드맵", note: "브랜드 → 사업부 → 전사" }
    ],
    roles: [
      "통합 구조 설계: 브랜드 → 사업부 → 전사 3단계와 각 단계의 완료 기준",
      "공통 계약 정의: 모든 Agent가 같은 사용 가이드(로직·불문율·KPI) 구조를 갖게 함",
      "지식그래프 확장 설계: 지표 정의 옆에 브랜드별 규칙·KPI 노드를 붙이는 구조",
      "승격 게이트 운영: 평가를 통과한 Agent만 중심 하네스가 호출하는 스킬로 올림"
    ],
    background:
      "사내 AI 에이전트 통합 플랫폼 위에서 브랜드별 직무별 Agent가 100개 넘게 만들어졌지만, 같은 매출 지표를 브랜드마다 다르게 정의하고 같은 업무를 브랜드마다 따로 만든 경우가 생김. 흩어진 Agent를 묶어 하나로 가려면 규칙과 지표를 먼저 표준화 필요.",
    features: [
      {
        eyebrow: "1단계",
        title: "브랜드별 에이전트",
        summary: "브랜드마다 직무별 Agent를 브랜드 단위로 묶음. 브랜드의 지표 정의와 불문율이 브랜드 지식그래프에 쌓임.",
        items: [
          { title: "브랜드 Agent 묶음", body: "브랜드 × 직무(상품기획·영업·마케팅·온라인·SCM 등) 칸에 Agent를 꽂아 빈 칸과 중복을 한눈에 확인. 빈 칸은 AX 과제 후보임." },
          { title: "브랜드 지식그래프", body: "브랜드별 지표 정의·기준값·시즌 규칙(예: 시즌 시작일, 정판율 목표)을 그래프에 적재해 Agent가 짐작하지 않게 함." },
          { title: "같은 계약", body: "모든 Agent가 입력·출력·규칙·KPI를 같은 구조로 남김. 브랜드가 달라도 읽는 방법은 하나임." }
        ]
      },
      {
        eyebrow: "2단계",
        title: "사업부 통합",
        summary: "브랜드 공통 지표와 규칙을 사업부 단위로 표준화하고, 브랜드별로 따로 만들던 같은 업무를 하나의 Agent로 합침.",
        items: [
          { title: "공통 지표 표준화", body: "매출·정판율·재고 같은 공통 지표는 사업부 정의 하나로 통일하고, 브랜드 예외만 규칙으로 남김." },
          { title: "중복 Agent 통합", body: "같은 업무의 브랜드별 Agent를 하나로 합치고 브랜드는 파라미터로 받음. 평가 점수가 높은 쪽을 기준으로 합침." },
          { title: "프로세스 체인", body: "기획 → 발주 → 입고 → 배분 → 판매 → 리오더처럼 직무를 가로지르는 프로세스 하나를 골라 Agent를 체인으로 묶어 증명." }
        ]
      },
      {
        eyebrow: "3단계",
        title: "전사 하나의 에이전트",
        summary: "중심 하네스가 어떤 브랜드·직무의 질문이든 그 규칙과 KPI를 먼저 찾아 적용하고, 승격된 Agent를 골라 호출.",
        items: [
          { title: "중심 하네스", body: "Agent Runtime · 라우팅 · Policy & Context 레이어가 요청을 받아 직무·브랜드 규칙을 지식그래프에서 찾고 알맞은 스킬을 호출." },
          { title: "승격 게이트", body: "AI 등급 우수, 링크 정상, KPI 전후가 제출된 Agent만 하네스가 호출하는 스킬·MCP 툴로 올림." },
          { title: "KPI 폐루프", body: "월별 제출 KPI를 DW 실측과 대조해 신뢰도를 갱신하고, 추천·라우팅 가중치와 교육 과제로 되돌림." }
        ]
      }
    ],
    steps: ["브랜드별 Agent 등록·사용 가이드 표준화", "브랜드 지식그래프에 규칙·KPI 적재", "사업부 공통 지표·중복 Agent 통합", "평가 게이트로 스킬 승격", "전사 중심 하네스 하나로"],
    vision: {
      lead:
        "사용 가이드 ④ 작동 로직과 회사·팀 불문율(기준값·우선순위·예외 처리), ⑥ KPI(측정 지표·도입 전후·측정 주기)는 Agent 하나의 설명서가 아님. 그 직무가 감으로 지켜 온 판단 기준을 기계가 읽을 수 있는 형태로 꺼내는 장치임. 이것이 전 직무에 걸쳐 쌓이면 ‘직무 지식그래프’가 되고, 중심 AI 하네스는 어떤 직무의 질문이든 그 직무의 규칙과 KPI를 먼저 찾아 적용한 뒤 알맞은 Agent를 호출함.",
      note:
        "아래 구조는 로드맵임. 데이터·시스템 연결(사내 AI 에이전트 MCP Gateway)과 Agent 등록 → 평가 → 추천 → 교육 루프는 운영 중이고, 규칙·KPI의 그래프 적재와 Agent의 스킬 승격을 단계적으로 진행.",
      jobs: ["상품기획", "영업", "마케팅", "온라인", "IMC", "SCM", "생산", "물류", "CS"],
      steps: [
        {
          title: "공통 계약으로 통일",
          body: "모든 Agent가 같은 7항목 사용 가이드를 갖게 하고, 로직·불문율·KPI는 사람이 읽는 글과 함께 기계가 읽는 구조(입력·출력·규칙[조건·기준값·우선순위·예외]·KPI[지표·전·후·주기]·데이터 출처)로도 남김. 인터뷰형 스킬이 작성자를 대신 질문."
        },
        {
          title: "직무 맵을 뼈대로 삼음",
          body: "카테고리 12개 × 업무 단계로 직무 맵을 만들고 각 Agent를 (직무, 단계) 칸에 꽂음. 비어 있는 칸은 그대로 AX 과제 후보가 되어 전사 과제 발굴과 이어짐."
        },
        {
          title: "불문율을 지식그래프에 올림",
          body: "회사 공식 지표 정의가 들어 있는 지식그래프에 Rule(기준값·우선순위·예외)과 KPI 노드를 붙이고 직무·지표·데이터 소스와 연결. 지표 산식을 그래프에서 찾아 쓰듯, 하네스는 직무 규칙을 그래프에서 찾아 적용."
        },
        {
          title: "평가가 승격 게이트가 됨",
          body: "AI 등급 우수, 링크 정상, KPI 전후가 제출된 Agent만 중심 하네스가 호출할 수 있는 스킬·MCP 툴로 승격. 평가 체계가 ‘무엇을 믿고 연결할지’를 정함."
        },
        {
          title: "프로세스를 따라 체인으로 연결",
          body: "상품 흐름(기획 → 발주 → 입고 → 매장 배분 → 판매 → 리오더)처럼 직무를 가로지르는 프로세스 하나를 골라 3~4개 직무의 Agent를 체인으로 묶어 증명하고, 그다음 프로세스로 넓힘. Policy & Context 레이어가 읽기 전용·본인 권한 원칙을 그대로 지킴."
        },
        {
          title: "KPI로 루프를 닫음",
          body: "월별 제출의 KPI(전·후·주기)를 DW 실측과 대조해 신고값을 검증하고, 결과를 Agent 신뢰도 → 추천·라우팅 가중치 → 교육 과제로 되돌림. 개인화·평가·교육 세 기능이 이 루프를 돌리는 장치임."
        }
      ]
    },
    stack: ["MCP", "Neo4j 지식그래프", "Claude Code Skill", "Snowflake"],
    tags: ["전사 통합", "중심 하네스", "지식그래프"]
  },
  {
    slug: "recsys-serving-pipeline",
    part: 1,
    group: "⑤ 다음 단계",
    title: "개인화 추천 서빙 파이프라인",
    short: "추천 서빙 파이프라인",
    subtitle: "규칙 기반 추천에서 모델 기반 실시간 서빙으로",
    period: "준비 중",
    status: "준비 중",
    draft: true,
    purpose:
      "개인화 추천 모델의 서빙 파이프라인을 설계·개발·운영. ANN 기반 후보 검색부터 추론 서버를 통한 모델 서빙, 실시간 추천 API 제공까지 End-to-End 서빙 흐름 책임. 추천 모델의 성능을 다각도로 검증하기 위한 Offline Evaluator, Online Simulator, A/B 테스트 플랫폼을 구축하고, 주요 지표를 실시간으로 모니터링하는 시스템 운영. AI 도구를 활용해 추천 플랫폼과 백엔드 기능을 빠르게 프로토타이핑·통합하고, 검증된 결과를 안정적인 프로덕션 코드로 발전.",
    metrics: [],
    background:
      "지금 패션 AI 플랫폼의 추천은 직무·브랜드·행동 7종 신호에 점수를 매기는 규칙 기반임. 사용 로그와 월별 KPI가 쌓이면 이를 학습 데이터로 삼아 모델 기반 추천과 서빙 파이프라인으로 발전시키는 것이 다음 단계임.",
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
  },
  {
    slug: "ax-discovery-agent-training",
    part: 2,
    group: "① 교육",
    title: "전사 AI Agent 교육",
    short: "AI Agent 교육",
    subtitle: "소규모로, 단계별로, 반복해서. AI 도구 제작 교육",
    period: "2026.02 ~ 진행 중",
    purpose: "조직 내 AX 전환율 20% 달성을 위해 교육·온보딩·운영 지원을 설계",
    background:
      "사내 AX 전환 20%를 위해 어디서부터 시작해야 할지 모르는 직원들을 위해 소규모로, 수준별 반복 오프라인 교육 진행",
    metrics: [
      { value: "누적 500명", label: "AI Agent 교육 수강생" },
      { value: "세션당 1개", label: "매 세션 종료 시 웹 형태의 본인 도구 완성" }
    ],
    roles: [
      "교육 커리큘럼과 직무별 실습 과제 설계",
      "교육 내용 구성: 레벨별 개념 교육과 핸즈온 세션(웹 대시보드 제작)"
    ],
    featuresTitle: "교육 내용",
    features: [
      {
        "eyebrow": "1부",
        "title": "레벨별 개념 교육",
        "summary": "수준 차이가 커서 같은 강의로는 초보에게 어렵고 숙련자에게 지루하므로, 레벨별로 반을 나눠 소규모로 진행. 개념 교육은 이어지는 핸즈온 세션의 준비 단계.",
        "items": [
          {
            "title": "AI 리터러시 기초",
            "body": "AI의 기본 개념과 업무에서 알아야 할 핵심을 슬라이드 14장으로 교육. 보안 원칙과 원클릭 배포 가드레일을 쉬운 사내 언어로 다시 작성."
          },
          {
            "title": "레벨별 반 편성",
            "body": "초급·중급·고급 레벨별로 반을 나눠 수준에 맞는 개념을 교육. 같은 강의에서 초보는 어렵고 숙련자는 지루해지는 문제 해소."
          },
          {
            "title": "사내 AI 에이전트 2.0 교육자료",
            "body": "집합교육 세션 1(기본 개념, 41장)과 세션 2(실습, 30장)로 구성한 교육자료."
          },
          {
            "title": "커넥터 개념",
            "body": "개발 용어 대신 전원 콘센트 비유로 커넥터를 설명하고, 꼭 알아둘 점 4가지와 커넥터 안의 연결 4개를 교육."
          }
        ]
      },
      {
        "eyebrow": "2부",
        "title": "핸즈온 세션",
        "summary": "개념 교육 직후 처음 온 직원도 자기 업무 문제를 Agent 하나로 만들어 올리는 실습. 매 세션 종료 시 웹 형태의 본인 도구 하나 완성이 완료 기준.",
        "items": [
          {
            "title": "6단계 Agent 제작 실습",
            "body": "AI 기본 이해 → 업무 문제 정의 → Prompt Spec 작성 → Claude Code 프로토타입 구현 → 보안 점검 → 공유와 배포 준비. 단계마다 산출물과 점검 질문이 붙어 있고, MD·영업·디자인·CS 직무별 첫 Agent 시나리오 제공."
          },
          {
            "title": "바이브코딩 가이드 5단계",
            "body": "만들 에이전트 정하기 → 바이브코딩으로 화면 만들기 → BI 데이터 연동 → 배포용으로 코드 수정 → 배포하기. 사용 가이드 작성용 프롬프트도 제공해, 작동 로직과 팀의 불문율·KPI를 제작자에게 먼저 묻도록 함."
          },
          {
            "title": "원클릭 배포",
            "body": "완성한 도구를 사내 PaaS에 원클릭으로 배포. 배포 가이드 세션에서 가드레일 규칙과 배포 절차 설명."
          },
          {
            "title": "세션 후 제작·배포 지원",
            "body": "FAQ, 1:1 문의, 데이터 추가 요청, 오프라인 접속 지원 신청으로 세션 이후 막힌 부분 해결."
          }
        ]
      }
    ],
    steps: ["Agent 교육 Hands-on", "제작·배포 지원"],
    image: {
      src: "/projects/ax-training.jpg",
      alt: "강단에서 원클릭 배포 가이드 파일을 설명하는 교육 현장",
      caption: "AI Agent 제작 교육 현장: 원클릭 배포 가이드 세션",
      width: 2048,
      height: 1536
    },
    images: [
      { src: "/projects/ax-connector-slide.png", alt: "교육자료 ‘커넥터(Connector)란?’ 슬라이드: 클로드를 사내 시스템에 꽂아주는 전원 콘센트라는 비유, 꼭 알아둘 점 4가지(사내 커넥터 하나만 연결, 끊기면 ‘데이터가 없습니다’, 읽기 전용, 사내 계정 로그인 필요), 커넥터 안의 연결 4개(dw-mcp 사내 DW, graph-mcp 지식그래프, mail-mcp 메일·일정, hr-mcp 인사 시스템)", caption: "커넥터 교육자료", width: 2400, height: 1400 }
    ],
    tags: ["AI Agent 교육", "교육", "온보딩"]
  },
  {
    slug: "fashion-ai-platform",
    part: 2,
    group: "② AI 플랫폼",
    title: "패션 AI 플랫폼: AI 도구 공유·추천 포털",
    short: "패션 AI 플랫폼",
    subtitle: "직원이 사내 AI 플랫폼으로 만든 업무용 웹앱을 올리고, 직무에 따라 유사 웹앱을 추천받고 성과를 제출하는 사내 포털",
    period: "2026.08 ~ 운영 중",
    purpose:
      "현업은 본인이 사내 AI 플랫폼을 사용하여 제작한 웹앱 도구 업로드 및 동일 직무의 웹앱 도구 확인 및 본인 AI 역량 수준 확인",
    metrics: [
      { value: "누적 160개", label: "업로드 웹앱", note: "2026.09~" }
    ],
    roles: [
      "서비스 기획과 정보 구조 설계",
      "사용자 플로우 구성: UI/UX 구축, PAT 값 발급 메뉴 등 사용자가 끊김 없이 어려움 없이 사이트를 이용하도록 흐름 설계",
      "월별 도구 제출 흐름 설계"
    ],
    adminRoles: [
      "개인화 추천 로직 설계: 직무·브랜드·최근 본·좋아요 기반 타 직원 제작 도구 추천"
    ],
    background:
      "사내 AI 플랫폼으로 만든 업무용 웹앱이 급증했으나 누가 무엇을 만들어 어떤 성과를 냈는지에 대한 정보가 흩어짐.\n제작 웹앱 등록 → 월별 성과 제출 → 평가 → 교육을 한 흐름으로 AX 현황 자동 축적",
    features: [
      {
        eyebrow: "핵심 기능 01",
        title: "홈 화면: 들어오자마자 할 일과 참고 추천 에이전트가 보임",
        summary: "첫 화면에서 이번 달 할 일과 나에게 맞는 동일 직무 동료가 제작한 웹앱을 함께 확인",
        items: [
          { title: "우수 웹앱 배너", body: "BEST 배지 웹앱 6개를 롤링 배너로 노출, 월 절감 시간·사용 인원 표시" },
          { title: "직무·카테고리 아이콘 필터", body: "패션·대시보드·상품기획·생산 등 직무 아이콘 한 줄, 누르면 해당 직무 웹앱만 표시" },
          { title: "이번 달 할 일 사이드바", body: "제출 마감 D-day·진행률·설문 완료 여부를 모든 화면 오른쪽에 고정" }
        ]
      },
      {
        eyebrow: "핵심 기능 02",
        title: "웹앱 등록과 월별 제출",
        summary: "‘무엇을 바꿨는가’를 숫자로 적는 등록 양식과 매달 성과 제출. 평가·인재풀의 원천 데이터",
        items: [
          { title: "등록 양식 4 PART", body: "① 설명 ② 사용 가이드 ③ 바꾼 것(절감 시간·성과 지표) ④ 접속 방법. 빠진 칸은 이유와 함께 표시" },
          { title: "사용 가이드 프롬프트: 노하우를 담는 8항목", body: "프롬프트를 AI에 붙이면 1,500자 이상 가이드 작성. 핵심은 작동 로직·업무 꿀팁" }
        ]
      },
      {
        eyebrow: "핵심 기능 03",
        title: "요청과 문의가 자동으로 쌓이는 구조",
        summary: "원하는 데이터가 없거나 사용법이 막히면 플랫폼에서 바로 요청·문의. 반복 질문은 FAQ로 축적",
        items: [
          { title: "데이터 추가 요청", body: "필요한 데이터와 이유를 요청, 접수·검토·반영 상태로 관리해 DW·지식그래프 연동으로 연결" },
          { title: "FAQ 자동 축적", body: "반복 문의의 답변을 FAQ로 올려 홈·도움받기에 노출, 같은 질문 감소" },
          { title: "관리자 오전 알림 메일", body: "매일 오전 8시, 신규 계정·제출·업로드·설문 응답을 묶어 관리자에게 메일 발송" }
        ]
      }
    ],
    image: {
      src: "/projects/fashion-ai-platform.png",
      alt: "패션 AI 플랫폼 홈: 우수 웹앱 배너, 카테고리 아이콘, 오른쪽 사이드바의 이번 달 할 일",
      caption: "패션 AI 플랫폼 홈: 우수 웹앱 배너 · 카테고리 · 이번 달 할 일 사이드바",
      width: 1777,
      height: 1341
    },
    thumb: {
      src: "/projects/fashion-ai-platform-thumb.png",
      alt: "패션 AI 플랫폼 홈 화면",
      width: 1000,
      height: 1000
    },
    stack: ["-"],
    tags: ["등록·제출", "Next.js"]
  },
  {
    slug: "ai-talent-pool",
    adminOnly: true,
    part: 2,
    group: "③ AI 인재 평가",
    title: "AI 인재풀과 인원 평가 체계",
    short: "AI 인재풀·인원 평가",
    subtitle: "결과물(Agent)과 사람(참여)을 따로 재는 100점 체계로, 포상·지원·배치에 쓸 인재풀 구축",
    period: "2026.01 ~ 운영 중",
    purpose:
      "누가 AI를 잘 쓰고 무엇을 만들어 냈는지를 감이 아니라 정량 기준을 만들어 숫자로 노출. 결과는 포상·금액 지원·배치 결정에 사용하여 AI 인재 확장 선순환 형성.",
    metrics: [
      { value: "100점", label: "AI 평가 기준 구축", note: "Agent 평가 · 인원 평가 두 축" },
      { value: "4단계", label: "참여 티어", note: "선도 · 활용 · 입문 · 관심" },
      { value: "5종", label: "구성원 케어 신호" },
      { value: "10단계", label: "구성원 360 여정" }
    ],
    roles: [
      "Agent 평가 기준 4가지와 Agent 점수 산식 설계, 기준은 공개하고 등급은 관리자에게만",
      "참여 점수 100점 가중치와 티어 설계, AI 에이전트 사용량 기준값을 실제 분포(40명)에 맞춤",
      "AI 인재풀 표·월별 아웃풋 팝업·전체 순위 기준(사용 35 : 아웃풋 65) 설계",
      "구성원 360 여정과 케어 신호·추천 조치·후속 안내 초안 설계",
      "조직별 AI 사용 대시보드(사업부 → 브랜드 → 부서 → 사람 드릴다운) 설계"
    ],
    background:
      "교육을 받은 사람과 Agent를 만든 사람이 늘수록, 누구를 포상하고 어디에 예산을 더 주고 누구를 어느 팀에 배치할지 판단할 근거 필요. 신고값만 믿지 않고, 결과물과 참여를 따로 재는 체계 구축.",
    features: [
      {
        eyebrow: "핵심 기능 01",
        title: "Agent 평가: 결과물을 잰다",
        summary:
          "평가 기준은 게시판·등록·FAQ에 그대로 공개하고, 등급은 관리자에게만 노출. 신고값은 그대로 믿되 링크가 열리지 않으면 0점.",
        items: [
          {
            title: "공개 평가 기준 4가지",
            body: "영역이 명확한가 · 실제로 성과를 내었는가(절감 시간, 정판율·정판액·비용절감 같은 정량 성과) · 확산 가능한가(팀 내·타팀) · 다음 스텝이 있는가."
          },
          {
            title: "Agent 점수 0~100",
            body: "월 절감 시간 30 · 정량 성과 40 · 사용 인원 15 · 다른 팀 확산 5(합 90을 100점으로 환산). 링크가 열리지 않으면 0점."
          },
          {
            title: "AI 등급: 우수·보통·미흡",
            body: "Agent 점수와 글에서 읽은 기능 유형으로, 관리자가 매긴 정답 등급을 학습하는 순서형 로지스틱 회귀가 등급을 제안함. 우수 = 목적·해결 문제 명확, 보통 = 데이터 취합 등 추가 기능, 미흡 = 단순 대시보드."
          },
          {
            title: "빈 값을 0으로 치지 않는다",
            body: "사용 인원·절감 시간·난이도 중 하나라도 비어 있으면 점수를 내지 않고 무엇이 비었는지 돌려줌. 낮은 점수로 오해받는 일을 막기 위함."
          }
        ]
      },
      {
        eyebrow: "핵심 기능 02",
        title: "인원 평가: 참여를 잰다",
        summary:
          "계정별 AI 활용 수준을 한 숫자로 환산. 가중치는 한 파일에만 있어 기준을 바꾸고 싶으면 그곳만 고치면 됨.",
        items: [
          {
            title: "참여 점수 100점",
            body: "업로드 Agent 개당 12점(최대 36) · 고급 교육 16 · 기본 교육 8 · 플랫폼 접속 회당 1점(최대 20) · 사내 AI 에이전트 2.0 사용량 최대 20(사용일수 8·메시지 8·코드세션 4로 나눠 각각 상한). 한 지표만 튀는 사람이 전부 가져가지 않게 함."
          },
          {
            title: "티어 4단계",
            body: "60점 이상 선도, 35 활용, 15 입문, 그 아래 관심. 사내 AI 에이전트 플랫폼 사용량 기준값은 플랫폼 계정과 겹치는 40명의 실제 분포(사용일수 중앙값 5·상위 25% 10 등)에 맞춤."
          },
          {
            title: "월별 아웃풋과 사람 몫 절감 시간",
            body: "인재풀 표에서 이름을 누르면 달별 신규·버전업·절감 시간 증감·바뀐 점·전후 비교 화면이 팝업으로 열림. 사람 몫 절감 시간 = Agent 월 절감 시간 × 기여율(공동 제작 기본 균등)."
          },
          {
            title: "전체 순위 기준",
            body: "대상은 이번 달 AI 에이전트 권한자. 사용 점수(사용일수 40·메시지 30·코드세션 30)와 아웃풋 점수(Σ 월 절감 시간 × 기여율)를 각각 백분위로 바꿔 사용 35 : 아웃풋 65로 합산. 현업 ×1.0 · 리더급 ×1.5 · AI 전담 조직 ×0.7 보정, 유형은 아웃풋형·사용형·균형형. 관리자 화면에만 노출."
          }
        ]
      },
      {
        eyebrow: "핵심 기능 03",
        title: "구성원 360과 케어: 사람을 챙긴다",
        summary:
          "한 사람의 여정을 이메일 하나로 이어 시간 순서로 보고, 이탈·정체 신호를 자동으로 찾아 관리자가 먼저 손을 내밀게 함.",
        items: [
          {
            title: "구성원 360 여정",
            body: "가입 → 신청 → 권한 → 교육 → 사용량 → Agent 제작 → 문의 → 요청 → 오프라인 헬프 → 설문. 개인정보는 이름·사번·소속·이메일만 쓰고 주소·생년월일·연락처는 읽지 않음."
          },
          {
            title: "케어 신호 5종",
            body: "권한 있는데 미사용 · 30일 이상 미사용 · 기본 교육만 수강 · 활발히 쓰지만 Agent 미등록 · 신청했지만 권한 없음. 이미 쌓인 데이터(사용량·권한·교육 명단·Agent 등록·신청)로만 판단."
          },
          {
            title: "추천 조치와 후속 안내 초안",
            body: "신호마다 추천 조치를 붙이고 메일·일정 초안 제공. 자동 발송은 없고, 관리자가 Outlook 작성 창에서 고쳐서 직접 발송."
          },
          {
            title: "조직별 AI 사용 대시보드",
            body: "사업부 → 브랜드 → 부서 → 사람으로 한 단계씩 들어가는 드릴다운. 막대 하나가 그 묶음 인원 전체이고 실사용 / 권한만 있음 / 권한 없음으로 나눠 칠함."
          }
        ]
      }
    ],
    catalog: {
      title: "Agent 평가 기준",
      items: [
        { name: "1. 영역이 명확한가", body: "1-1. 생산성을 높이려는 업무 영역과 문제가 명확한가" },
        { name: "2. 실제로 성과를 내었는가", body: "2-1. 에이전트를 통해 업무 단계, 시간이 얼마나 절감되었는가\n2-2. 실제 정량성과(정판율, 정판액, 비용절감 등)를 내었는가" },
        { name: "3. 확산 가능한가", body: "3-1. 개인만 사용하는 것이 아닌 확산 가능한 도구인가 (팀 내 확산 / 타팀 확산)" },
        { name: "4. 다음 스텝이 있는가", body: "4-1. 고도화할 다음 단계가 구체적인가" }
      ]
    },
    insightsLabel: "설계 원칙",
    insights: [
      {
        title: "결과물과 사람을 따로 잰다",
        body: "Agent 점수는 결과물을, 참여 점수는 사람을 봅니다. 하나로 합치면 Agent 한 개로 모든 것을 가리거나, 접속만 많은 사람이 위로 올라옵니다."
      },
      {
        title: "기준은 공개, 등급은 비공개",
        body: "무엇을 보고 평가하는지는 모두에게 보여 주고, 결과 등급·순위·멘트는 관리자에게만 보여 줍니다."
      },
      {
        title: "신고값은 검증한다",
        body: "링크가 열리는지 확인하고, KPI 신고값은 DW 실측과 대조하는 방향으로 넓힙니다. 평가가 ‘무엇을 믿고 연결할지’의 기준이 됩니다."
      }
    ],
    image: {
      src: "/projects/talent-pool-table.png",
      alt: "관리 화면 Agent 평가 표: Agent 이름, 제출 시각, 2-1 단계·시간(월 절감 시간과 점수), 2-2 정량 성과(전후 비교와 점수), 3-1 팀·확산(사용 인원·확산 점수)",
      caption: "관리 화면 Agent 평가 표: 절감 시간 · 정량 성과(전후) · 확산 인원을 기준별 점수와 함께 한 줄로 확인 (제작자 이름과 주소는 가림)",
      width: 1035,
      height: 780
    },
    thumb: {
      src: "/projects/talent-pool-thumb.png",
      alt: "관리 화면 Agent 평가 표",
      width: 1000,
      height: 1000
    },
    stack: ["Next.js", "Prisma", "Snowflake DaaS", "인사 DB 연동"],
    tags: ["인재풀", "평가 체계", "대시보드"]
  },
  {
    slug: "pim-data-integration",
    part: 3,
    group: "데이터 허브",
    title: "전사 통합 Image 플랫폼",
    short: "전사 통합 Image 플랫폼",
    subtitle: "법인 내 모든 이미지 통합관리 및 이미지 등록부터 온라인 채널 송신까지 FLOW 구축",
    period: "2025.09 ~ 2026.03",
    purpose:
      "모델컷·바닥컷·썸네일 등 법인 내 모든 상품 이미지를 전사 통합 Image 플랫폼 한곳에서 관리하고, 등록된 이미지와 상품 정보를 AI가 채널별 규격에 맞게 가공해 온라인 채널까지 바로 송신. 채널마다 같은 정보를 다시 입력하던 일을 없애는 것이 목표.",
    metrics: [
      {"value":"6일 → 최대 1시간","label":"상품등록 리드타임","note":"입고부터 판매까지"},
      {"value":"100%","label":"일반상품등록 자동화","note":"기획전·프로모션만 남아 시간 80% 절감"}
    ],
    roles: [
      "전사 통합 Image 플랫폼이 관리할 상품 정보 정의: 상품 코드·상품명·소재·색상·사이즈·판매가·재고·이미지(모델컷·바닥컷·썸네일)를 ‘상품정보의 단일 원천’으로 묶는 항목 설계",
      "데이터 생성 위치와 흐름 정리: SAP·BI·로컬 저장소·구글 드라이브·이메일에 흩어진 정보가 어디서 생기고 어디로 가는지 매핑",
      "생성형 AI 가공 Workflow 설계: 아이템별 키워드 추출, 채널별 상품명·프로모션 문구 생성, 이미지 규격 맞춤",
      "현업·포토팀·MD 인터뷰로 등록 절차와 채널별 규정을 요구사항으로 정리"
    ],
    background:
      "3주간 MD·AMD를 만나 업무 전수조사 통해 단순반복 업무의 54%가 ‘상품등록·관리’였음(월 1,865시간). 핵심 버그는 ① 상품 데이터가 SAP·BI·로컬 폴더·드라이브·메일에 흩어져 있었고 ② 채널마다 다른 규격에 맞춰 ‘수기로’ 조정해야 했음.",
    system: {
      flowTitle: "상품 등록 흐름",
      intro:
        "입고 후 상품 등록을 한 흐름으로. 이미지가 전사 통합 Image 플랫폼에 들어오면 AI가 상품페이지를, 채널별 Agent가 규격을 맞춰 전 채널 송신.",
      figures: [
        {
          src: "/projects/pim-pipeline.png",
          alt: "생성형 AI 기반 데이터 전처리 및 채널 등록 파이프라인 설계도. SAP BI → Snowflake → 전사 통합 Image 플랫폼 DB → 전사 통합 Image 플랫폼 → 사내 OMS → 개별 판매 온라인 채널, AI가 아이템별 키워드 추출과 채널별 판매정보 생성을 담당",
          caption: "전사 통합 Image 플랫폼 파이프라인: 상품정보 입력 → AI 가공(키워드 추출·채널별 판매정보 생성) → OMS → 온라인 채널 등록",
          width: 1667,
          height: 784
        }
      ],
      layers: [
        { name: "1. 대량 업로드", role: "드래그 앤 드롭 대량 업로드. 재업로드 시 상품페이지 AI에 알림.", items: [{ label: "드래그 앤 드롭 대량 업로드", note: "파일명 규칙으로 스타일코드·컬러·컷유형 자동 인식" }, { label: "이미지 재업로드", note: "모델컷 추가 등 → 상품페이지 생성 AI에 알림" }, { label: "등록 오류 배지", note: "매칭 안 된 파일을 홈에서 바로 표시" }] },
        { name: "2. 이미지 관리", role: "종류·특성·상품 정보를 붙여 ‘검색되는 자산’으로 전환.", items: [{ label: "① 이미지 종류", note: "앞/뒤/디테일, 상품컷/모델컷/컨셉컷" }, { label: "② 상품 특성", note: "소재 · 무드" }, { label: "③ 스타일코드 연동", note: "SAP 정보(상품명·가격)와 전사 통합 Image 플랫폼 고시정보 자동 결합" }] },
        { name: "3. 자동편집", role: "채널 규격에 맞게 이미지를 자동 보정.", items: [{ label: "① 리사이징", note: "크기 · 비율" }, { label: "② 리터칭 · 후가공", note: "브랜드 로고 제거 · 배경 제거 등" }] },
        { name: "4. 검색", role: "상품 정보·유사 이미지·자연어로 검색.", items: [{ label: "상품정보 기반 검색", note: "스타일코드 · 아이템명 · 색상 등" }, { label: "유사 이미지 검색", note: "이미지로 이미지 찾기" }, { label: "AI 검색", note: "자연어로 상품 이미지 찾기" }] },
        { name: "5. 다운로드", role: "원하는 이미지를 골라 일괄 다운로드.", items: [{ label: "선택 후 일괄 다운로드", note: undefined }, { label: "마이포켓", note: "자주 쓰는 이미지 모아 두기" }] },
        { name: "6. 공유", role: "원하는 이미지만 묶어 공유·편집.", items: [{ label: "이미지 묶음 공유 링크", note: undefined }, { label: "공유 묶음 안에서 편집", note: undefined }] }
      ],
      flow: [
        { title: "PLM 상품 등록", body: "PLM에 등록한 기본 정보가 전사 통합 Image 플랫폼으로 자동 연결." },
        { title: "입고 · 재고 등록 → 신상 등록 알림", body: "입고 등록 즉시 상품등록팀에 신상 알림 자동 발송." },
        { title: "촬영 · 3D 생성 → 전사 통합 Image 플랫폼 업로드 / API", body: "촬영분(향후 3D)이 전사 통합 Image 플랫폼으로 직행. 구글 업로드·메일 단계 삭제." },
        { title: "상품페이지 제작(AI)", body: "AI가 모델·판매 문구·상품페이지·SEO 태그 생성." },
        { title: "썸네일 · 상품페이지 업로드", body: "썸네일·상세페이지가 스타일코드에 자동 연결." },
        { title: "채널별 데이터 최적화 Agent", body: "채널별 상품명·카테고리·이미지 규격을 Agent가 변환." },
        { title: "통합 등록 허브 상품등록 → 전 채널 송신", body: "한 번 등록으로 자사몰·네이버·무신사 등 전 채널 송신." },
        { title: "모니터링 대시보드", body: "‘입고됐는데 판매 안 올라간’ 누락 차단. 사람은 검수만." }
      ],
      principles: [
        { title: "상품 정보의 원천은 하나", body: "상품명·가격·소재·고시정보·이미지는 전사 통합 Image 플랫폼 한곳에서만 생기고, 채널은 그것을 받아 쓸 뿐입니다. 흩어진 데이터가 핵심 버그 1번이었습니다." },
        { title: "채널 규격은 사람이 아니라 Agent가 맞춘다", body: "채널마다 다른 규칙은 채널별 데이터 최적화 Agent에 두고, 규칙이 바뀌면 Agent만 고칩니다. 사람이 수기로 조정하던 핵심 버그 3번을 없앱니다." },
        { title: "사람은 관리자가 아니라 감독자", body: "일반상품등록은 100% 자동화하고, 사람은 검수하고 더 나은 AI 로직을 고민해 피드백합니다. 기획전 등록·프로모션 적용처럼 플랫폼 MD와 소통해야 하는 일만 남깁니다." },
        { title: "PLM과 이어 생산부터 CS까지", body: "전사 통합 Image 플랫폼은 기획·생산 관리인 PLM과 연계되어 생산부터 판매 후 CS까지 통합된 상품 분석을 제공하고, 글로벌 채널 확장의 시스템 기반이 됩니다." }
      ]
    },
    catalog: {
      title: "업무 프로세스: AS-IS → TO-BE, 그리고 바뀌는 5가지",
      figures: [
        { src: "/projects/pim-asis-process.png", alt: "AS-IS 상품등록 프로세스 큰 그림: 상품기획(SAP 상품 등록) → 물류(입고·재고 등록) → 포토팀(촬영, 구글 업로드·이메일 발송) → 상품등록팀(재고로 신상 확인, 상품 등록, 물류 샘플 요청, 실측·이너택 확인, 정보고시 이미지 제작, 상품 페이지 제작, 썸네일·상품페이지 기입, 자사몰 이미지 업로드) → 이커머스팀(자사몰·사방넷·통합 등록 허브 상품등록 → 카페24·네이버·무신사·지그재그 송신). 빨간 칸 7곳이 핵심 버그", caption: "[AS-IS] 상품등록 프로세스 큰 그림: 팀 다섯 곳을 거치며 같은 정보를 사람이 옮겨 적던 흐름. 빨간 칸 7곳이 핵심 버그", width: 1684, height: 1150 },
        { src: "/projects/pim-tobe-process.png", alt: "TO-BE 큰 그림(PLM 이후): 전사 통합 Image 플랫폼 안에서 상품기획(PLM 상품 등록) → 물류(입고·재고 등록) → 상품등록팀(신상 등록 알림, 상품 등록) → 포토팀(촬영·3D 생성, 허브 업로드/API I/F) → 상품 페이지 제작(AI) → 썸네일·상품페이지 업로드 → 채널별 데이터 최적화 Agent → 통합 등록 허브 상품등록 → 전 채널 송신", caption: "[TO-BE] PLM 이후 전사 통합 Image 플랫폼 큰 그림: 신상 등록 알림이 자동으로 가고, 촬영·3D 생성분이 허브로 들어오면 AI가 상품페이지를 만들고 채널별 Agent가 규격을 맞춰 통합 등록 허브에서 전 채널로 송신. 빨간 칸(핵심 버그)이 모두 사라짐", width: 1720, height: 1204 }
      ],
      items: [
        {
          name: "[AS-IS] 기존 업무 프로세스 — 핵심 버그 7곳",
          steps: [
            { text: "상품기획이 SAP에 상품 등록" },
            { text: "물류 입고·재고 등록" },
            { text: "상품등록팀이 재고를 뒤져 신상 확인", flag: "버그" },
            { text: "사진 없이 상품 등록" },
            { text: "물류 샘플 요청" },
            { text: "실측·이너택 확인", flag: "버그" },
            { text: "정보고시 이미지 제작", flag: "버그" },
            { text: "포토팀 촬영" },
            { text: "구글 업로드·이메일 발송", flag: "버그" },
            { text: "상품 페이지 제작", flag: "버그" },
            { text: "썸네일·상품페이지 기입" },
            { text: "자사몰 이미지 업로드", flag: "버그" },
            { text: "이커머스팀이 자사몰·사방넷·통합 등록 허브에 각각 상품 등록", flag: "버그" },
            { text: "카페24·네이버·무신사·지그재그 송신" }
          ],
          body: "팀 다섯 곳(상품기획·물류·포토팀·상품등록팀·이커머스팀)을 거치며 같은 정보를 사람이 여러 번 옮겨 적음"
        },
        {
          name: "[TO-BE] 시스템 도입 후 — 전사 통합 Image 플랫폼 한 줄 흐름",
          steps: [
            { text: "PLM 상품 등록" },
            { text: "입고·재고 등록과 동시에 신상 등록 알림" },
            { text: "촬영·3D 생성" },
            { text: "전사 통합 Image 플랫폼 업로드/API" },
            { text: "상품페이지 제작(AI)" },
            { text: "썸네일·상세 자동 업로드" },
            { text: "채널별 데이터 최적화 Agent" },
            { text: "통합 등록 허브 상품등록" },
            { text: "전 채널 송신" }
          ],
          body: "사람이 옮겨 적는 단계가 사라지고, 상품등록팀은 검수와 예외 처리만 수행"
        },
        {
          name: "변화 ① 리드타임 6일 → 최대 1시간",
          body: "입고부터 판매까지 상품등록 리드타임 평균 6일 → 최대 1시간"
        },
        {
          name: "변화 ② 사람은 더 이상 개입하지 않는다",
          body: "일반상품등록 100% 자동화. 사람은 검수·AI 로직 피드백, 기획전·프로모션만 남아 시간 80% 절감"
        },
        {
          name: "변화 ③ 사진만 촬영하면 AI가 해결한다",
          body: "촬영과 동시에 상품페이지 생성·채널 등록. 3D 모델링 완성 시 촬영 없이 기획과 동시에 판매"
        },
        {
          name: "변화 ④ ‘입고됐는데 판매가 안 올라간’ 휴먼 에러 차단",
          body: "모니터링 대시보드로 입고 후 판매 누락 완전 차단"
        },
        {
          name: "변화 ⑤ 데이터 자산화와 확장",
          body: "판매용 상품정보 전체가 AI 학습 데이터로. AI 상품기획·추천·숏폼 등 새 모델과 글로벌 채널 확장 기반"
        }
      ]
    },
    steps: ["3주 MD·AMD 업무 전수조사","핵심 버그 2가지 정의","전사 통합 Image 플랫폼 항목·데이터 흐름 설계","AI 상세페이지·채널 최적화 Agent","통합 등록 허브 → 전 채널 자동 송신"],
    images: [
      { src: "/projects/pim-image-hub-home.png", alt: "전사 통합 Image 플랫폼 홈: 왼쪽 메뉴(작업현황조회·스타일정보관리·이미지정보관리·상세페이지관리·마이포켓·기타자료실·채널별정보관리·마스터관리·권한관리·휴지통·AI 검색), 상단의 업로드일·업로더·브랜드·컬러 필터와 등록 오류 배지, 이미지 34,031장 그리드", caption: "전사 통합 Image 플랫폼 홈: 업로드일 · 업로더 · 브랜드 · 컬러 필터와 ‘등록 오류’ 배지로 수만 장의 이미지를 바로 찾는 그리드 화면", width: 1197, height: 903 },
      { src: "/projects/pim-image-detail.png", alt: "이미지 목록 보기와 오른쪽 이미지 상세 정보 패널: 파일명, 브랜드, 스타일코드, 색상(복수), 컷유형, 검색 키워드, 용량, 업로더, 업로드 일자, 수정·다운로드 버튼", caption: "이미지 등록 검수 및 상세 정보 확인", width: 1197, height: 883 },
      { src: "/projects/pim-style-status.png", alt: "스타일현황관리: 스타일코드 하나의 스타일 정보 검수(검수 전) → 이미지 업로드(바닥컷 2 · 캠페인컷 1, 완료) → 채널이미지 생성(완료) → 상세페이지 생성(생성 전) 단계와 색상별 상세페이지 생성 상태, 실패 건 재시도 버튼", caption: "스타일현황관리: 이미지 업로드 → 채널별 이미지 자동편집 → 상세페이지 생성 단계 검수", width: 1381, height: 875 }
    ],
    thumb: {
      src: "/projects/pim-thumb.png",
      alt: "전사 통합 Image 플랫폼 홈: 필터와 이미지 그리드",
      width: 1000,
      height: 1000
    },
    stack: ["-"],
    tags: ["전사 통합 Image 플랫폼", "상품정보 관리", "AI 채널 등록"]
  },
  {
    slug: "strategy-rag-search",
    part: 3,
    group: "지식 검색",
    title: "사내 전략자료 RAG 검색 서비스",
    short: "RAG 검색",
    subtitle: "‘단순 검색’이 아닌 ‘조직의 의사결정 기준’을 검색하는 서비스",
    period: "2025.01 ~ 2025.07",
    purpose: "판매 데이터·상품정보·내부 프로젝트 자료를 AI 검색·요약 서비스로 전환",
    metrics: [
      { value: "98%", label: "예산 절감", note: "자체 벡터 DB 구성, 배정 예산 대비" },
      { value: "90%+", label: "검색 정확도" },
      { value: "4.9 / 5", label: "만족도", note: "N=68" },
      { value: "주 7회", label: "핵심부서 사용 횟수", note: "N=68" }
    ],
    roles: [
      "전략자료 JSON화",
      "검색 화면 UI/UX 기획",
      "사용자 테스트를 반복하며 전처리 방식과 검색 로직 개선"
    ],
    background:
      "고품질의 전략자료 자산은 있지만 활용 구조가 없는 상태로 15년치 전략자료가 축적돼 있었지만, 이미지 중심 PPT와 파일 단위 저장으로 검색 및 활용 어려움",
    system: {
      intro:
        "문서를 JSON으로 바꿔 OpenAI Embeddings API로 벡터화해 자체 벡터 DB에 저장. 가까운 문서만 GPT API에 넘겨 근거와 함께 답변.",
      layers: [
        {
          name: "① 사내 원본 파일",
          role: "15년치 전략자료. 이미지 PPT가 많아 그대로는 검색 불가.",
          items: [{ label: "PPT · Excel · PDF · Word" }, { label: "OCR / 이미지 텍스트화", note: "도표·이미지 안의 글자를 텍스트로" }]
        },
        {
          name: "② 문서 처리 및 JSON 변환",
          role: "검색 단위로 쪼개고 출처를 붙여 JSON 변환.",
          items: [{ label: "텍스트 추출" }, { label: "문서 분할", note: "페이지·슬라이드 단위 청크" }, { label: "출처 정보 저장", note: "파일명 · 페이지 · 작성 부서 · 날짜" }]
        },
        {
          name: "③ 검색용 데이터 구축",
          role: "OpenAI Embeddings API로 벡터화해 자체 벡터 DB에 저장.",
          items: [{ label: "임베딩 생성", note: "OpenAI Embeddings API" }, { label: "벡터 DB 저장", note: "자체 구성 벡터 DB (배정 예산 대비 98% 절감)" }]
        },
        {
          name: "④ 사용자 질문 입력",
          role: "평소 말로 질문. 예: “작년 F/W 세일 전략 자료 찾아줘”",
          items: [{ label: "자연어 질문" }, { label: "사용자·부서 정보", note: "권한 필터에 사용" }]
        },
        {
          name: "⑤ 질문 검색",
          role: "질문 벡터화 → 유사 문서 검색 → 상위 결과 선정. 직접 개발한 검색 코드.",
          items: [
            { label: "검색 코드 (직접 개발)", note: "질문 수신 → 검색 호출 → 결과 정리" },
            { label: "임베딩 모델", note: "질문을 문서와 같은 방식으로 벡터화" },
            { label: "벡터 검색", note: "자체 구성 벡터 DB에서 유사 문서 조각·출처·관련도 점수 반환" },
            { label: "검색 결과 필터링 및 정렬", note: "관련도 상위만, 부서·날짜·권한으로 제한" }
          ]
        },
        {
          name: "⑥ GPT API 호출",
          role: "검색된 문서만 전달, 문서 밖 내용은 지어내지 않도록 지시.",
          items: [{ label: "사용자 질문 + 검색된 문서 내용 + 답변 지침" }]
        },
        {
          name: "⑦ 최종 답변",
          role: "근거 문서·페이지를 함께 보여 줘 원본 바로 확인.",
          items: [{ label: "답변 내용" }, { label: "근거 문서 및 페이지" }]
        }
      ],
      flow: [
        { title: "질문", body: "평소 말로 질문." },
        { title: "질문 임베딩", body: "문서와 같은 모델로 질문 벡터화." },
        { title: "유사 문서 검색", body: "벡터 DB에서 가까운 문서 조각 검색." },
        { title: "필터링·정렬", body: "상위 결과만 남기고 권한 등으로 거름." },
        { title: "GPT API 호출", body: "질문 + 문서 + 지침으로 답변 생성." },
        { title: "근거와 함께 답변", body: "답변 아래 근거 문서·페이지 표시." }
      ],
      principles: [
        { title: "세밀한 제어", body: "검색 조건, 권한 필터, 점수 기준, 출처 관리를 코드로 직접 제어합니다. 관리형 서비스보다 손이 가지만 조직 기준에 맞출 수 있습니다." },
        { title: "출처가 없는 답은 없다", body: "검색된 문서만 모델에 전달하고, 답변마다 근거 문서·페이지를 붙입니다." },
        { title: "직접 개발하는 부분", body: "검색 로직, 데이터 갱신, 장애 처리는 직접 개발해야 합니다. 사용자 테스트를 반복하며 전처리 방식과 검색 로직을 고쳤습니다." },
        { title: "전처리가 정확도를 정한다", body: "이미지 PPT의 OCR 품질과 문서 분할 단위가 검색 정확도를 좌우했습니다. 모델보다 전처리에 시간을 더 썼습니다." }
      ]
    },
    steps: ["조직 지식 비구조화 문제", "OCR / 이미지 텍스트화", "Vector DB 구축", "GPT API 자연어 검색", "사용자 테스트 반복 개선"],
    image: {
      src: "/projects/rag-search.png",
      alt: "지식뱅크 검색 화면. ‘MD 직무의 승진지식 자료 보여줘’라고 묻자 지식 검색 봇 캐릭터가 지식 뱅크를 찾는 중",
      caption: "자연어로 전략자료를 찾는 검색 화면",
      width: 1871,
      height: 1245
    },
    thumb: {
      src: "/projects/rag-search-thumb.png",
      alt: "지식 검색 봇 캐릭터가 지식 뱅크를 찾는 검색 화면",
      width: 800,
      height: 800
    },
    stack: ["OCR", "Vector DB", "GPT API"],
    tags: ["RAG", "벡터 검색", "지식 관리"]
  },
  {
    slug: "naver-channel-strategy",
    part: 4,
    group: "온라인 채널 전략",
    title: "네이버 채널 판매 전략 재정의",
    short: "네이버 채널 전략",
    subtitle: "왜 ‘채널 확장’이 아니라 ‘고객 구조 재설계’였는가",
    period: "2024.01 ~ 2024.02",
    purpose: "고객군별 진입 동기 분석을 통한 상품·콘텐츠·채널 메시지 재설계 및 채널 매출 상승",
    background:
      "온라인 매출 성장을 위해서는 신규 온라인 채널 확장 및 전략이 필요했음. 기존의 2035에 집중되어 있던 온라인 매출 확장을 위해 온라인 채널 및 온라인 고객 확장 전략 필요",
    metrics: [
      { value: "137%", label: "라이브 방송 구매전환율 성장", note: "전년 대비 0.8% → 1.9%" },
      { value: "190%", label: "라이브 방송 회당 매출 성장", note: "전년 대비 1억 → 2.9억" }
    ],
    roles: [
      "기존 플랫폼 중심 성장의 한계를 고객 구조 문제로 재해석",
      "40대 고객군의 구매 기준과 진입 동기를 분석",
      "콘텐츠 메시지·리뷰 전략·가격 정책을 고객 구매 기준에 맞게 재설계"
    ],
    image: {
      src: "/projects/naver-live.png",
      alt: "B브랜드 네이버 쇼핑라이브 공식스토어 화면",
      caption: "네이버 쇼핑라이브 채널 운영 화면",
      width: 1056,
      height: 820
    },
    images: [
      {
        "src": "/projects/naver-live-results.png",
        "alt": "라이브 방송 구매전환율 0.8%에서 1.9%, 회당 매출 1억에서 2.9억으로 오른 전후 비교 막대그래프",
        "caption": "라이브 방송 성과: 구매전환율 0.8% → 1.9%, 회당 매출 1억 → 2.9억 (전년 대비)",
        "width": 1600,
        "height": 760
      }
    ],
    tags: ["고객 분석", "채널 전략", "라이브 커머스"]
  },
  {
    slug: "padding-rebranding-strategy",
    part: 4,
    group: "상품 포트폴리오 전략",
    title: "스포츠 브랜드 패딩 리브랜딩 전략",
    short: "패딩 리브랜딩",
    subtitle: "빅데이터 기반 핵심 상품 설계",
    period: "2024.11 ~ 2024.12",
    purpose: "연령대별 매출·리뷰·플랫폼 데이터를 분석해 상품 전략과 마케팅 메시지를 재정의",
    background:
      "고객은 같은 돈으로 더 나은 가성비를 찾고, 패딩 시장도 천연 충전재에서 화섬으로 이동 중.\n자사는 전년 상위 품번을 이어 가는 기획이라 20대 이하·30대 남성 니즈가 빠져 있었음.",
    metrics: [{ value: "100%", label: "20대 이하 매출 성장", note: "24FW 대비 25FW" }],
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
    images: [
      { src: "/projects/padding-01-economy.webp", alt: "시장 분석 장표: IMF 한국 성장률 전망 2024년 2.5%, 2025년 2.2%와 한국은행 전망 2.1%에서 1.9%로 하향, 가처분소득 대비 소비지출 비중 71% 표", caption: "[시장] 경제 성장 둔화: 2025년 성장률 1.9% 전망, 소비지출 비중 71%의 한계점 — 더 쓸 수 없지만 덜 쓰지도 않는 상황", width: 1701, height: 1177 },
      { src: "/projects/padding-02-synthetic-fill.png", alt: "랭킹 상위 패딩의 충전재 비중 막대 그래프: 천연 충전재 2022년 82%(36STY), 2023년 64%(28STY), 2024년 37%(15STY), 화학섬유 충전재 18% → 36% → 63%(26STY)", caption: "[시장] 매년 늘어나는 화섬 충전재 비중: 천연(구스·덕) 82% → 64% → 37%, 화학섬유 18% → 36% → 63%", width: 1683, height: 1162 },
      { src: "/projects/padding-03-nuptse-onball.png", alt: "노스페이스 제품별 3개년 추세: 눕시 -38%, 히말라야 -37%, 온볼 +57%, 써밋 +6%, 마테호른·마티에 신규", caption: "[경쟁사] 지는 눕시와 뜨는 온볼: 구스 패딩은 줄고 인공충전재 온볼은 57% 성장 — 보온성과 가격을 함께 보는 가성비 선택", width: 1692, height: 1176 },
      { src: "/projects/padding-04-30s-men.png", alt: "브랜드·경량패딩의 성별 비중과 연령 분포: 내셔널지오그래픽·디스커버리는 40대 중심에 여성 70%, 노스페이스·아크테릭스 경량패딩은 남성 46%·67%(+8%p·+9%p)에 30대 중심", caption: "[경쟁사] 30대 남성은 노스페이스와 아크테릭스: 기존 경쟁 브랜드(내셔널지오그래픽·디스커버리)는 4050·여성 중심, 노스페이스·아크테릭스 경량패딩은 2530·남성 선호", width: 1647, height: 1154 }
    ],
    catalog: {
      title: "분석 결과 4가지",
      items: [
        { name: "[시장] 경제 성장은 둔화, 소비는 한계선", body: "2025년 성장률 1.9% 전망, 소비지출 비중 71%. 지갑을 닫기보다 같은 돈으로 더 나은 가성비를 고르는 소비" },
        { name: "[시장] 매년 늘어나는 화섬 충전재 비중", body: "랭킹 상위 패딩의 천연 충전재 82% → 37%, 화섬 충전재 18% → 63%(2022 → 2024). 가격이 낮아진 이유" },
        { name: "[경쟁사] 지는 눕시와 뜨는 온볼", body: "노스페이스 눕시 -38%·히말라야 -37%, 인공충전재 온볼 +57%. 보온성과 가격을 함께 보는 가성비 선택" },
        { name: "[경쟁사] 30대 남성은 노스페이스와 아크테릭스", body: "기존 경쟁 브랜드는 40대·여성 70%대로 자사와 비슷. 노스페이스·아크테릭스 경량패딩은 남성 46%·67%, 30대 중심" }
      ]
    },
    steps: ["시장: 경제·소비 지표 점검","시장: 랭킹 상위 패딩 충전재 분석","경쟁사: 경쟁 브랜드 제품별 추세","경쟁사: 브랜드·경량패딩 연령·성별 선호","핵심 상품·메시지 재정의"],
    tags: ["상품 전략", "리뷰 분석", "검색 트렌드"]
  },
  {
    slug: "china-brand-churn-analysis",
    part: 4,
    group: "상품 포트폴리오 전략",
    title: "중국 고급 브랜드 고객 이탈 분석",
    short: "중국 브랜드 이탈 분석",
    subtitle: "비고객 조사 6종으로 찾은 ‘브랜드 캐주얼’, 바이링(白领) 맞춤 현지화",
    period: "2025.02 ~ 2025.04",
    purpose:
      "비고객 인터뷰·착장 조사·리뷰 빅데이터·SNS를 교차검증해 매출 하락 원인과 잡아야 할 고객을 찾고 SS·FW 상품 투입까지 연결",
    metrics: [
      { value: "+8%", label: "전년 동월 대비 매출 성장", note: "매출 감소에서 성장으로 전환" },
    ],
    roleLead: "포멀 중심 상품을 줄이고 셔츠·데님·비즈니스 캐주얼 중심으로 재구성 제안.",
    roles: [
      "매출 감소 원인을 상품 자체가 아닌 고객의 출근복 기준 변화로 정의",
      "6가지 고객조사 방법을 제로베이스에서 직접 실행하며 질문과 방법을 버전업, 상품 고객조사 검증 프로세스로 정리",
      "경쟁사 3개년 티몰 TOP20 매출 데이터와 리뷰 빅데이터로 아이템별 스테디·트렌드 유형과 고객 1번 니즈·불만(JJ) 도출",
      "원피스·청바지·니트/가디건·셔츠·티셔츠·자켓의 기본기와 차별화 원리를 벤치마크 브랜드(랄프로렌·에디션·모앤코·유니클로)에서 내려받아 정리",
      "현지 상품기획팀과 함께 SS·FW 투입 상품(유형·핏·컬러·소재) 결정"
    ],
    background:
      "10년 전 히트 상품(광택 유색 블라우스) 비중을 유지하며 매년 매출 27% 감소.\n출근 착장은 캐주얼해졌는데 정장풍만 남아 ‘일주일에 하루 입는 옷’이 됨.",
    catalog: {
      title: "분석 결과와 전략",
      items: [
        { name: "[조사] 6가지 고객조사 + 3개년 누적 분석", body: "인터뷰·동행쇼핑·설문·세탁소 전수·착장·리뷰 빅데이터로 교차검증. 직전 시즌 베스트 대신 3개년 매출 추이로 판단" },
        { name: "[진단①] 일주일에 하루만 입을 수 있어 돈이 아깝다", body: "출근복은 캐주얼해졌는데 자사는 정장풍 유지. 격식 옷 매일 착용 21%, ‘격식 옷만 있다’ 응답 70%" },
        { name: "[진단②] 잡아야 할 고객은 글로벌 감도의 바이링(白领)", body: "3545 대기업 직장인 여성, 글로벌 브랜드 소비 경험 44%. 자사의 금장·화려한 컬러는 ‘올드’로 인식" },
        { name: "[PART① 브랜드 캐주얼] 일상 출근·주말 쇼핑 듀얼 TPO로 확장", body: "격식과 편함이 둘 다 중요한 듀얼 TPO 52%로 최대, 이 중 중고가 브랜드 구매 69%의 기회 영역" },
        { name: "[유형·핏] 포멀 유형은 편한 핏으로, 그 외는 정핏으로", body: "정핏이면 격식, 벗어나면 캐주얼로 읽힘. 착장 조사(n=2,013) 루즈핏 자켓 73%, 정핏 셔츠 73%" },
        { name: "[PART② 현지화] 비싼 만큼 활용도와 품질의 고급스러움", body: "예쁜 디자인은 기본, 활용도와 품질의 고급스러움이 구매 조건. SPA와 프리미엄 브랜드 사이가 포지션" },
        { name: "[실행] SS·FW 상품 투입", body: "SS 브랜드 캐주얼 유형 추가 투입. FW 청바지 4STY(발주액 ▲320%), 셔츠 15STY, 셔츠형 원피스 6STY" }
      ]
    },
    steps: ["6가지 비고객 조사 실행", "진단: 주 1회 착용 · 고객 미스매치", "PART① 브랜드 캐주얼 원리", "PART② 바이링 니즈 현지화", "아이템별 기본기 · 차별화 원리", "SS · FW 상품 투입"],
    image: {
      src: "/projects/scofield-store.png",
      alt: "중국 백화점 내 브랜드 매장 전경",
      caption: "중국 현지 매장",
      width: 897,
      height: 581
    },
    images: [
      {
        "src": "/projects/china-research-key-findings.png",
        "alt": "격식 옷을 매일 입는 고객 21% 대 격식 옷만 있다는 응답 70%, 출근복 TPO 분포 포멀 21%·듀얼 52%·캐주얼 27%, 착장 조사 핏 비율을 정리한 그래프",
        "caption": "고객조사 핵심 숫자: 격식 옷 수요 21% vs 공급 인식 70%, 듀얼 TPO 52%, 실제 착장의 핏",
        "width": 1800,
        "height": 820
      }
    ],
    tags: ["해외 시장", "고객조사 기준", "상품 현지화"]
  }
];

/** 파트 안의 중분류를 등장 순서대로 돌려줍니다. */
export function groupsOfPart(part: 1 | 2 | 3 | 4): { group: string; projects: Project[] }[] {
  const result: { group: string; projects: Project[] }[] = [];
  for (const project of projectsByPart(part)) {
    const found = result.find((item) => item.group === project.group);
    if (found) found.projects.push(project);
    else result.push({ group: project.group, projects: [project] });
  }
  return result;
}

export function projectsByPart(part: 1 | 2 | 3 | 4) {
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
