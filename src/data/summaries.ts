import type { Lang } from "@/lib/lang";

/** 프로젝트 맨 위 한눈 요약(문제 → 한 일 → 결과)과 용어 풀이. 처음 보는 사람이 먼저 읽는 부분입니다. */
export type ProjectSummaryText = {
  problem: string;
  action: string;
  result: string;
  glossary: { term: string; desc: string }[];
};

export const SUMMARIES: Record<string, Partial<Record<Lang, ProjectSummaryText>>> = {
  "ontology-agent-platform": {
    "ko": {
      "problem": "1. 사내 직원들이 만든 웹앱 도구에 회사 DW 데이터 연결이 안되니 도구를 제작해도 실제 시간 절감 효과가 미미하여 보안 이슈 최소화하며 개별 인원이 제작한 웹앱 도구에 사내 데이터를 연결 지원하고자 함\n2. 사내 BI 데이터 조회시 평균 소요시간 27분으로 BI 소요시간을 AI 통해 75% 절감하고자 함.",
      "action": "지표 정의를 지식그래프로 적재, 말로 사내 DW 연결 웹을 만드는 환경 구축",
      "result": "에이전트 160개 생성, 월 8,180시간 업무 절감(2026년 9월 기준)",
      "glossary": []
    },
    "en": {
      "problem": "1. Web apps built by employees could not connect to the company DW, so they saved little real time; the aim was to connect individually built web apps to in-house data while keeping security issues to a minimum.\n2. Querying in-house BI data took 27 minutes on average; the aim was to cut that time by 75% with AI.",
      "action": "Put metric definitions in a knowledge graph so a plain request builds a DW-linked web app.",
      "result": "160 agents built and 8,180 work hours saved per month (Sept 2026).",
      "glossary": []
    }
  },
  "md-ontology-design": {
    "ko": {
      "problem": "회사 판단 기준이 없어 사용자가 세션마다 AI에 직접 입력해야 했음",
      "action": "MD의 주간 판단 5가지를 인터뷰로 꺼내 지식그래프 위 온톨로지 층 설계",
      "result": "할인율·리오더 수량·시점 등 판단 질문까지 답변 범위 확대",
      "glossary": [
        {
          "term": "정판율",
          "desc": "할인 없이 정상가로 팔린 비율"
        },
        {
          "term": "소진율",
          "desc": "입고된 물량 중 팔려 나간 비율"
        },
        {
          "term": "PLC",
          "desc": "상품의 도입·성장·피크·감소 주기"
        },
        {
          "term": "리오더",
          "desc": "잘 팔리는 상품을 추가로 발주하는 것"
        }
      ]
    },
    "en": {
      "problem": "Company judgment rules weren't in the data catalog, so users re-entered them each session.",
      "action": "Drew out five weekly MD decisions in interviews and designed an ontology layer.",
      "result": "AI now answers judgment questions such as markdown rate and reorder quantity and timing.",
      "glossary": [
        {
          "term": "Full-price sell-through",
          "desc": "Share of stock sold at full price, without discounts"
        },
        {
          "term": "Sell-out rate",
          "desc": "Share of received stock that has been sold"
        },
        {
          "term": "PLC",
          "desc": "Product life cycle: introduction, growth, peak, decline"
        },
        {
          "term": "Reorder",
          "desc": "Ordering more of a product that is selling well"
        }
      ]
    }
  },
  "daas-paas-operations": {
    "ko": {
      "problem": "직원이 만든 웹이 개별 서버·외부 DB에 흩어져 데이터 반출 파악이 어려움",
      "action": "배포·DB·스케줄을 한곳에서 지원하는 사내 PaaS와 배포 가드레일 구축",
      "result": "배포 311건, 배포 성공률 90%(n=235) 달성",
      "glossary": [
        {
          "term": "MAU",
          "desc": "한 달 동안 실제로 쓴 사용자 수"
        }
      ]
    },
    "en": {
      "problem": "Employee-built web apps sat on separate servers and outside DBs, hiding data outflow.",
      "action": "Built an in-house PaaS for deployment, DBs and schedules, plus guardrails for AI tools.",
      "result": "311 deployments with a 90% deployment success rate (n=235).",
      "glossary": [
        {
          "term": "MAU",
          "desc": "Monthly active users: people who used an app in a month"
        }
      ]
    }
  },
  "ax-discovery-agent-training": {
    "ko": {
      "problem": "AX 전환 20% 목표에도 직원 대부분이 어디서 시작할지 모름",
      "action": "수준별 소규모 반복 교육과 6단계 Agent 제작 실습 설계",
      "result": "누적 500명 교육, 세션마다 본인 웹 도구 1개씩 완성",
      "glossary": [
        {
          "term": "AX",
          "desc": "AI로 일하는 방식을 바꾸는 AI 전환"
        },
        {
          "term": "핸즈온 세션",
          "desc": "직접 만들어 보는 실습형 교육"
        }
      ]
    },
    "en": {
      "problem": "The goal was 20% AX adoption, but most employees didn't know where to start.",
      "action": "Designed small, level-based, repeated classes and a 6-step agent-building practice.",
      "result": "500 people trained in total, each finishing one web tool of their own per session.",
      "glossary": [
        {
          "term": "AX",
          "desc": "AI transformation: changing how work is done with AI"
        },
        {
          "term": "Hands-on session",
          "desc": "A practice class where people build things themselves"
        }
      ]
    }
  },
  "fashion-ai-platform": {
    "ko": {
      "problem": "직원이 만든 업무용 웹앱과 성과 정보가 여기저기 흩어져 있었음",
      "action": "웹앱 등록·월별 성과 제출을 잇는 사내 포털과 사용자 플로우 기획",
      "result": "월 평균 119개 웹앱 업로드, 사내 AX 현황 데이터 자동 축적",
      "glossary": [
        {
          "term": "AX",
          "desc": "AI로 일하는 방식을 바꾸는 AI 전환"
        }
      ]
    },
    "en": {
      "problem": "Business web apps built by employees, and their results, were scattered.",
      "action": "Planned an in-house portal and user flow for web-app registration and monthly results.",
      "result": "119 web apps uploaded per month on average, with AX data building up automatically.",
      "glossary": [
        {
          "term": "AX",
          "desc": "AI transformation: changing how work is done with AI"
        }
      ]
    }
  },
  "pim-data-integration": {
    "ko": {
      "problem": "흩어진 상품 데이터를 채널마다 수기 등록, 단순반복 업무의 54% 차지",
      "action": "전사 통합 Image 플랫폼과 AI 가공으로 전 채널에 자동 송신하는 흐름 설계",
      "result": "상품등록 리드타임 6일→최대 1시간, 일반상품등록 100% 자동화",
      "glossary": [
        {
          "term": "리드타임",
          "desc": "입고부터 판매 시작까지 걸리는 시간"
        },
        {
          "term": "스타일코드",
          "desc": "상품마다 붙는 고유 식별 번호"
        }
      ]
    },
    "en": {
      "problem": "Scattered product data was re-keyed by hand per channel: 54% of repetitive work.",
      "action": "Designed a flow where a company-wide integrated image platform and AI format listings and send them to every channel.",
      "result": "Listing lead time cut from 6 days to 1 hour; standard listings 100% automated.",
      "glossary": [
        {
          "term": "Lead time",
          "desc": "Time from receiving stock to going on sale"
        },
        {
          "term": "Style code",
          "desc": "A unique ID number given to each product"
        }
      ]
    }
  },
  "strategy-rag-search": {
    "ko": {
      "problem": "15년 치 전략자료가 이미지 중심 PPT라 검색이 불가능했음",
      "action": "OCR·벡터 DB 기반, 근거 문서와 함께 답하는 자연어 검색 구축",
      "result": "검색 정확도 90%+, 만족도 4.9/5, 배정 예산 대비 98% 절감",
      "glossary": []
    },
    "en": {
      "problem": "15 years of strategy decks were image-heavy PPTs that no one could search.",
      "action": "Built natural-language search on OCR and a vector DB that answers with its sources.",
      "result": "90%+ search accuracy, 4.9/5 satisfaction and 98% of the allocated budget saved.",
      "glossary": []
    }
  },
  "naver-channel-strategy": {
    "ko": {
      "problem": "노출만 늘려 라이브 방송 구매전환율이 0.8%에 정체",
      "action": "40대 고객 진입 동기 분석으로 상품·콘텐츠·가격 재설계",
      "result": "라이브 구매전환율 0.8%→1.9%, 회당 매출 1억→2.9억",
      "glossary": [
        {
          "term": "구매전환율",
          "desc": "방문자 중 실제로 구매한 사람의 비율"
        },
        {
          "term": "라이브 커머스",
          "desc": "실시간 방송으로 상품을 파는 판매 방식"
        },
        {
          "term": "진입 동기",
          "desc": "고객이 채널에 들어온 이유"
        }
      ]
    },
    "en": {
      "problem": "Exposure kept growing, but live-commerce conversion stalled at 0.8%.",
      "action": "Analyzed why customers in their 40s came in; redesigned products, content and pricing.",
      "result": "Live conversion rose from 0.8% to 1.9%; sales per show from ₩100M to ₩290M.",
      "glossary": [
        {
          "term": "Conversion rate",
          "desc": "Share of visitors who actually buy"
        },
        {
          "term": "Live commerce",
          "desc": "Selling products through real-time video broadcasts"
        },
        {
          "term": "Entry motive",
          "desc": "Why a customer came into the channel"
        }
      ]
    }
  },
  "padding-rebranding-strategy": {
    "ko": {
      "problem": "전년 상위 품번만 이어 가 젊은 고객의 패딩 구매 이유를 놓침",
      "action": "3년 매출·리뷰·검색 데이터로 핵심 상품과 마케팅 메시지 재정의",
      "result": "20대 이하 고객 매출 100% 성장",
      "glossary": [
        {
          "term": "BP",
          "desc": "기준 삼아 배우는 경쟁 사례(벤치마크)"
        },
        {
          "term": "화섬 충전재",
          "desc": "폴리에스터 등 화학섬유로 만든 패딩 속 솜"
        },
        {
          "term": "품번",
          "desc": "상품마다 붙는 고유 번호"
        },
        {
          "term": "역시즌 패딩",
          "desc": "제철이 아닌 때 사는 패딩 수요"
        },
        {
          "term": "경량패딩",
          "desc": "얇고 가벼운 패딩"
        }
      ]
    },
    "en": {
      "problem": "Planning repeated last year's best-sellers and missed why young buyers chose jackets.",
      "action": "Read 3 years of sales, review and search data to redefine core products and messaging.",
      "result": "Sales among customers under 30 grew 100%.",
      "glossary": [
        {
          "term": "Benchmark",
          "desc": "A competitor case studied as a model to learn from"
        },
        {
          "term": "Synthetic fill",
          "desc": "Padding made of polyester and other man-made fibers"
        },
        {
          "term": "Off-season padding",
          "desc": "Padded jackets bought outside winter"
        },
        {
          "term": "Lightweight jacket",
          "desc": "A thin, light padded jacket"
        }
      ]
    }
  },
  "china-brand-churn-analysis": {
    "ko": {
      "problem": "격식 위주 상품을 유지해 매년 매출이 27%씩 감소",
      "action": "비고객 인터뷰 등 6가지 고객조사로 원인 진단, 상품 현지화",
      "result": "전년 동월 대비 매출 +8% 전환, FW 청바지 발주액 320% 증가",
      "glossary": [
        {
          "term": "비고객 조사",
          "desc": "우리 상품을 사지 않는 사람을 조사하는 것"
        },
        {
          "term": "바이링(白领)",
          "desc": "사무직 화이트칼라 직장인을 뜻하는 중국어"
        },
        {
          "term": "TPO",
          "desc": "옷을 입는 시간·장소·상황"
        },
        {
          "term": "브랜드 캐주얼",
          "desc": "출근과 주말에 다 입는 고급 캐주얼"
        },
        {
          "term": "SS·FW",
          "desc": "봄여름 시즌·가을겨울 시즌"
        },
        {
          "term": "동행쇼핑",
          "desc": "고객과 함께 쇼핑하며 행동을 관찰하는 조사"
        }
      ]
    },
    "en": {
      "problem": "The brand kept its formal-heavy lineup, and sales fell 27% every year.",
      "action": "Ran six customer studies, including non-customer interviews, and localized the products.",
      "result": "Sales up 8% year on year, from decline to growth; FW denim order value up 320%.",
      "glossary": [
        {
          "term": "Non-customer research",
          "desc": "Studying people who do not buy the brand"
        },
        {
          "term": "White-collar (白领)",
          "desc": "Chinese term for office workers"
        },
        {
          "term": "TPO",
          "desc": "Time, place and occasion an outfit is worn for"
        },
        {
          "term": "Brand casual",
          "desc": "Premium casual wear fit for both office and weekend"
        },
        {
          "term": "SS · FW",
          "desc": "Spring/summer and fall/winter seasons"
        },
        {
          "term": "Shop-along",
          "desc": "Shopping with a customer to observe how they buy"
        }
      ]
    }
  }
};

export function summaryOf(slug: string, lang: Lang): ProjectSummaryText | null {
  return SUMMARIES[slug]?.[lang] ?? null;
}
