import type { Part, Project } from "@/data/projects";

/**
 * 영어 번역. 한국어 원본(projects.ts)과 같은 slug/no 로 덮어씁니다.
 * 적지 않은 필드는 한국어 값이 그대로 쓰입니다(이미지 경로·숫자 등).
 */

export const PROFILE_EN = {
  name: "Minkyeong Kim",
  tagline: "A planner who turns customer and market insight into results",
  intro:
    "I started in customer and market analysis for fashion brands. Today I build the platform that connects company data to AI agents and design the company-wide AI transformation. My way of working: the same person reads the numbers and ships the service, end to end."
};

export const PARTS_EN: Record<number, Partial<Part>> = {
  1: {
    title: "MCP-based Enterprise AI Agent Platform",
    short: "MCP-based Enterprise AI Agent Platform",
    question: "What NoA is and how it was built",
    tagline: "Snowflake → Knowledge graph → MCP / Skills → Agent platform",
    summary:
      "NoA standardizes the DW, M365, HR and the knowledge graph as MCP servers connected to Claude, and turns power users' habits into skills distributed to everyone. Employees ask in plain language, build agents for their own work, publish them, and submit results every month. As of September 2026: 116 agents and 8,180 hours saved per month. The projects below are the pieces of NoA, from data foundation to enterprise integration.",
    visual: {
      type: "image",
      src: "/projects/noa-bi.png",
      alt: "Asking NoA for a store's monthly sales in plain language; it looks up the metric definition in the knowledge graph, queries the DW and answers with sources",
      width: 1226,
      height: 1051,
      caption: "NoA noa-bi skill: question → knowledge graph → DW query → sourced answer"
    }
  },
  2: {
    title: "Talent Management: growing builders through training, gathering them on the AI platform, and measuring them fairly with AI talent evaluation",
    short: "Talent Management",
    question: "How people were trained, gathered and evaluated",
    tagline: "① Training → ② AI Platform → ③ AI Talent Evaluation",
    summary:
      "Training turns every employee into an agent builder; the AI platform gathers their work for recommendation and monthly submission; and a 100-point system that measures outputs (agents) and people (participation) separately builds the AI talent pool. Rewards, funding and placement decisions rest on the data from these three steps.",
    visual: {
      type: "image",
      src: "/projects/ax-training.jpg",
      alt: "Explaining the one-click deployment guide from the podium at an AI agent-building training session",
      width: 2048,
      height: 1536,
      caption: "AI agent-building training session"
    }
  },
  3: {
    title: "Customer & Market Insight",
    short: "Customer & Market",
    question: "How analysis changed sales",
    tagline: "Changing sales through analysis",
    summary:
      "Cross-validating data against the field, I reframed sales problems as customer-structure problems and delivered results through channel and product strategy.",
    visual: {
      type: "image",
      src: "/projects/padding-search.png",
      alt: "Search-volume analysis by apparel category: outerwear searches fell while off-season padding searches rose 183%",
      width: 1686,
      height: 1174,
      caption: "Market analysis slide: shrinking padding demand, growing off-season padding demand"
    }
  }
};

export const PROJECTS_EN: Record<string, Partial<Project>> = {
  "pim-data-integration": {
    group: "① Data foundation",
    title: "PIM Data Integration System",
    subtitle: "Reframing why business automation failed, from the field, the systems and the environment",
    period: "2025.09 – 2026.03",
    purpose: "Reframed an RPA automation request as a data-structure project and systematized online MD operations.",
    metrics: [
      { value: "30% → 70%", label: "Structure that enables staffing efficiency" },
      { value: "10+", label: "Brands' data integrated" },
      { value: "SAP · BI · OMS", label: "Systems connected" }
    ],
    roles: [
      "Mapped where data is created and how it flows across BI, SAP, local storage, Google Drive and email",
      "Mapped product code, image, price, inventory and sales data fields",
      "Designed the Snowflake-based storage structure and the OMS integration schema",
      "Designed the generative-AI workflow for preprocessing, classification and enrichment"
    ],
    background:
      "When customer, product and channel data are scattered, the job is to design a standard data structure and operating process and turn it into a service. The project began as a request to automate repetitive work, but the root of the problem was data structure.",
    steps: ["Automation request", "Interviews with MD, photo and ops teams", "Mapping scattered data", "PIM / Snowflake schema design", "AI workflow / OMS integration"],
    insights: [
      { title: "The target was judgment, not motion", body: "What needed automating was not the clicks but duplicated judgment and re-entry of data. A data hub must come before UI automation." },
      { title: "Data standards are the precondition for AX", body: "Without data standards, AI and RPA increase maintenance cost. The core is data definitions and clear ownership boundaries between systems." },
      { title: "PIM is a data product, not a store", body: "It is the central data product of an operating system that runs SAP → Snowflake → AI enrichment → OMS → channels." }
    ],
    image: {
      src: "/projects/pim-pipeline.png",
      alt: "Pipeline design: SAP BI → Snowflake → PIM DB → PIM system → in-house OMS → online channels, with AI handling keyword extraction and channel-specific listing copy",
      caption: "Generative-AI preprocessing and OMS integration pipeline design",
      width: 1667,
      height: 784
    },
    stack: ["Snowflake", "SAP", "OMS", "Generative AI"],
    tags: ["Data hub", "PIM", "AI workflow"]
  },
  "daas-paas-operations": {
    group: "① Data foundation",
    title: "DaaS · PaaS Service Operations",
    subtitle: "A self-service structure where non-developers build and deploy data apps themselves",
    period: "2026.03 – ongoing",
    purpose: "Built the data-access, deployment and operations support so that non-developer staff can build and deploy data-driven apps on their own.",
    metrics: [
      { value: "~30% ↓", label: "DaaS cost reduction" },
      { value: "90%", label: "Deployment success rate" },
      { value: "43% ↓", label: "Internal data-query inquiries" }
    ],
    roles: [
      "Supported Snowflake DaaS adoption and improved materialized views and query performance",
      "Operated serverless deployment of Next.js apps and analyzed failure causes",
      "Designed Claude Code skills: requirements, trigger conditions and behavior",
      "Turned recurring inquiries into skill features"
    ],
    steps: ["DaaS data access", "API / Node.js integration", "PaaS one-click deploy", "Claude skill automation", "Fewer inquiries · self-service"],
    stack: ["Snowflake", "Next.js", "Serverless", "Claude Code Skill"],
    tags: ["DaaS", "PaaS", "Self-service"]
  },
  "strategy-rag-search": {
    group: "② Knowledge search",
    title: "Internal Strategy-Document RAG Search",
    subtitle: "Not a search feature but the organization's decision memory",
    period: "2025.01 – 2025.07",
    purpose: "Turned sales data, product information and internal project documents into an AI search and summary service.",
    metrics: [
      { value: "98%", label: "Budget saved", note: "Self-built vector DB vs. allocated budget" },
      { value: "90%+", label: "Search accuracy" },
      { value: "4.9 / 5", label: "Satisfaction", note: "N=68" },
      { value: "6.8× / week", label: "Usage in core teams", note: "N=68" }
    ],
    roles: [
      "Converted document and chart images to text and structured them as searchable data",
      "Built the vector DB and implemented contextual search on the GPT API",
      "Iterated on preprocessing and retrieval logic through repeated user tests",
      "Expanded to the main screen of the group-wide training program"
    ],
    background:
      "Fifteen years of high-quality strategy documents existed, but image-heavy slides stored as files made them unsearchable. The knowledge asset was there; the structure to use it was not.",
    steps: ["Unstructured knowledge", "OCR / image-to-text", "Vector DB", "GPT API natural-language search", "Iterative user testing"],
    insights: [
      { title: "Accuracy alone does not create adoption", body: "The core was the experience of finding the right slides and their context with a single question." },
      { title: "Design for internal data beats buying", body: "Designing OCR and vector-DB structure around our own data was more cost-effective than an external solution." },
      { title: "Evidence that behavior changed", body: "6.8 uses a week and 4.9/5 satisfaction show it replaced opening files and asking colleagues, not just that the tech worked." }
    ],
    image: {
      src: "/projects/rag-search.png",
      alt: "Knowledge-bank search screen: asked for MD promotion materials, the assistant character searches the knowledge bank",
      caption: "Finding strategy documents in plain language",
      width: 1871,
      height: 1245
    },
    stack: ["OCR", "Vector DB", "GPT API"],
    tags: ["RAG", "Vector search", "Knowledge management"]
  },
  "noa-mcp-agent-platform": {
    group: "③ Agent platform",
    title: "NoA: MCP-based Enterprise AI Agent Platform",
    subtitle: "Internal data and business systems standardized as MCP servers and connected to Claude",
    period: "2026.06 – ongoing",
    purpose: "Connect internal data and business systems to LLM agents so that everyday work becomes AI tooling and productivity rises.",
    metrics: [
      { value: "116", label: "Agents completed", note: "as of Sept 2026" },
      { value: "8,180 h / month", label: "Work hours saved by agents", note: "as of Sept 2026" }
    ],
    roles: [
      "DW integration and knowledge graph: defined official metrics and formulas, designed the graph, validated data consistency",
      "MCP server development: chose the MCP connection structure and set security principles (read-only, own permissions)",
      "Skills and hooks: mapped work procedures through field interviews, designed skills and shared rules (hooks)",
      "Plugin rollout and in-person training: Claude org administration (connectors, org instructions, permissions), employee training",
      "Company-wide promotion: weekly use-case content broadcast to all affiliates"
    ],
    background:
      "We wanted AI agents to raise productivity, but AI was not connected to internal systems, so data had to be entered by hand every time. We needed a structure that wires internal data and systems directly into LLM agents.",
    system: {
      intro:
        "NoA puts the company on top of Claude. Users only ask questions in Claude Desktop or Code; the six layers below take the question through org instructions → hooks → skills → MCP tools → gateway → internal data. Every layer keeps the read-only and own-permissions principles.",
      layers: [
        {
          name: "1. Client Layer",
          role: "Where employees start. Turning on the noa plugin in Claude Desktop, Claude Code or Cowork attaches every layer below.",
          items: [
            { label: "Claude Desktop · Code · Cowork" },
            { label: "noa plugin", note: "bundle of skills, hooks and MCP connectors" },
            { label: "Org connector registration", note: "deployed org-wide by admins" },
            { label: "SSO login", note: "queries run with the user's own permissions" }
          ]
        },
        {
          name: "2. Policy & Context Layer",
          role: "Inserts company rules and context before the question reaches the model, via org instructions and hooks.",
          items: [
            { label: "Org instructions", note: "shared rules for everyone, e.g. what to do when an MCP connection fails" },
            { label: "SessionStart hook", note: "personalization and memory rules, NoA Vibe dev rules (read the docs first)" },
            { label: "UserPromptSubmit hook", note: "pulls past corrections, golden SQL and company decisions from the context graph and attaches them to the question" },
            { label: "Safety principles", note: "read-only · own permissions · no personal-data columns · verify a person is still employed before naming them" }
          ]
        },
        {
          name: "3. Agent Runtime",
          role: "The Claude model understands the question, picks the skill whose trigger matches, and calls tools in the skill's order.",
          items: [
            { label: "Claude model", note: "reasoning, SQL writing, answer writing" },
            { label: "Skill triggers", note: "skills selected by keywords and request type" },
            { label: "Memory", note: "user preferences and team rules kept as files" }
          ]
        },
        {
          name: "4. Capability Layer (skills)",
          role: "Power users' procedures turned into skills. A skill holds no rules itself; it only says which tools to call in which order.",
          items: [
            { label: "noa-bi", note: "natural-language KPI queries: one knowledge-graph lookup → SQL → DW" },
            { label: "noa-1p", note: "brand weekly-report RAG: vector search returns source chunks" },
            { label: "noa-ebg", note: "customer-research standards (EBG) guidance and review" },
            { label: "noa-onboarding", note: "expenses, policies and general-affairs guidance" },
            { label: "noa-hr-attend", note: "leave balance, requests and approvals" },
            { label: "noa-outlook", note: "mail and calendar" },
            { label: "noa-vibe", note: "build and prepare apps for deployment the company way" },
            { label: "usage-guide-writer · tacit-rule-interview · monthly-submit-helper", note: "interview-style skills that help with platform submissions" }
          ]
        },
        {
          name: "5. Tool Binding Layer (MCP tools)",
          role: "The tools skills actually call. One MCP server per system; the tool names are the full list of allowed actions.",
          items: [
            { label: "neo4j-mcp", note: "resolve · read_cypher · search_1p_report · ebg_search · onboarding_search" },
            { label: "snowflake-mcp", note: "run_snowflake_query (read-only)" },
            { label: "hrlink-mcp", note: "leave info, requests, approval lines, approve, cancel" },
            { label: "outlook-mcp", note: "read, send and reply to mail; create and update events" }
          ]
        },
        {
          name: "6. NoA MCP Gateway → internal data & systems",
          role: "A central group of remote MCP servers receives every tool call, checks authentication and permissions, and forwards it to internal systems.",
          items: [
            { label: "Snowflake DW (EDW)", note: "standard models KF_* · *_AGGR, DaaS personal and brand schemas" },
            { label: "Neo4j knowledge graph", note: "metric definitions, formulas, joins, golden SQL, EBG, onboarding, weekly-report vector index, context graph (corrections and decisions)" },
            { label: "M365 Graph", note: "mail and calendar" },
            { label: "HR Link", note: "attendance and approvals" },
            { label: "NoA Vibe (PaaS)", note: "one-click deployment of employee-built apps" }
          ]
        }
      ],
      flow: [
        { title: "Question", body: "Ask in everyday words, e.g. “What were SPAO Gangnam's sales this May?”" },
        { title: "Context injection", body: "The UserPromptSubmit hook finds relevant corrections (e.g. the 26SS season starts Jan 25), golden SQL and company decisions in the context graph and prepends them." },
        { title: "Skill selection", body: "The word “sales” triggers the noa-bi skill, which runs its defined procedure." },
        { title: "Semantic resolution", body: "One knowledge-graph resolve returns the metric definition (sales = SUM(SALEAMT)), measure columns, join conditions and store codes. The model does not guess." },
        { title: "SQL writing", body: "SQL is written only from what the graph returned. Date and season rules follow the injected corrections first." },
        { title: "Read-only execution", body: "snowflake-mcp queries the DW with the user's own permissions. The tool has no write capability." },
        { title: "Answer with sources", body: "Definition, scope and sources (tables, formula origin) are attached so the number can be verified." },
        { title: "Learning from corrections", body: "If the user says “no, from Jan 25”, it is stored in the context graph as a correction and applied automatically from the next question." }
      ],
      principles: [
        { title: "Rules in the graph, procedures in skills", body: "Metric definitions and tacit rules live only in the knowledge graph; skills define call order. Change the graph once and every skill follows." },
        { title: "Read-only · own permissions", body: "DW tools can only read, and every call runs under the SSO-authenticated user's own permissions. HR data is limited to allowed columns." },
        { title: "Accuracy first", body: "Two or three wrong numbers destroy trust. Graph lookups and source attribution replace model guesswork." },
        { title: "Deploy from one place", body: "Skills, hooks and connectors ship as a single plugin rolled out org-wide, so a power user's method reaches everyone the same day." }
      ]
    },
    catalog: {
      title: "Skills built and deployed",
      items: [
        { name: "usage-guide-writer", trigger: "“write a usage guide”, “agent registration guide”", body: "Interviews the builder and writes the agent's usage guide for the platform, including operating logic, company/team tacit rules and KPIs." },
        { name: "tacit-rule-interview", trigger: "“organize tacit rules”, “document know-how”, “rules for the agent”", body: "Draws out the tacit rules practitioners follow from experience (thresholds, priorities, exceptions, gut-feel judgments) and writes them as rules both people and AI can use." },
        { name: "monthly-submit-helper", trigger: "“help with the monthly submission”, “calculate hours saved”", body: "Fills in the monthly output submission (new or version-up) by interview and derives monthly hours saved with the reasoning." },
        { name: "noa-bi", trigger: "any KPI question such as “SPAO Gangnam sales in May”", body: "Pulls metric definitions, formulas and joins from the knowledge graph in one call, writes SQL and queries the DW read-only. Answers include definition, scope and source." },
        { name: "noa-1p", trigger: "“week 2 of February report”, “sell-through red flag”", body: "Finds brand weekly reports by vector search and answers only from the source text." }
      ]
    },
    steps: ["DW integration & knowledge graph", "MCP servers for internal systems", "Skills & hooks", "Plugin rollout & in-person training", "Weekly video in elevators & lobbies across affiliates"],
    insights: [
      { title: "[Adoption] Accuracy builds trust", body: "If sales or profit figures are wrong two or three times, trust collapses and usage drops. Early on, raising basic query accuracy with the knowledge graph mattered most." },
      { title: "[Usage] Turn power users' methods into skills", body: "Packaging how the best users work as skills and distributing them to everyone gave high usage even to people uncomfortable writing prompts." },
      { title: "[Productivity] Finish one job end to end", body: "A tool that completes one task from start to finish saves far more time than tools that shave a little off many tasks." }
    ],
    image: {
      src: "/projects/noa-bi.png",
      alt: "The noa-bi skill answering a plain-language question about SPAO Gangnam's May sales: it checks the metric definition in the knowledge graph, queries the DW and answers with sources",
      caption: "noa-bi skill: question → metric definition from the knowledge graph → DW query → sourced answer",
      width: 1226,
      height: 1051
    },
    stack: ["MCP", "Claude", "Snowflake", "Neo4j", "M365 Graph", "Claude Code Skill"],
    tags: ["MCP", "Knowledge graph", "Skills & hooks"]
  },
  "fashion-ai-platform": {
    group: "② AI Platform",
    title: "Fashion AI Platform: Agent Sharing, Recommendation & Submission Portal",
    subtitle: "Where employees publish agents built with NoA, get personalized recommendations, and submit results every month",
    period: "2026 – in operation",
    purpose:
      "Gathers every agent built in the company in one place, recommends differently to each person, and collects monthly results in one format so that evaluation, the talent pool and training all run on the same data.",
    metrics: [
      { value: "7", label: "Personalization signals", note: "job, brand, behavior" },
      { value: "4 parts", label: "Agent registration form" },
      { value: "7 items", label: "Usage-guide prompt", note: "incl. logic, tacit rules, KPIs" },
      { value: "5 steps", label: "Getting-started checklist" }
    ],
    roles: [
      "Service planning and information architecture: four menus by intent (Browse · Build · Learn · Get help) and a sidebar shared by every screen",
      "Personalized recommendation logic: scoring on job, brand, recently viewed and liked signals, with a reason on every card",
      "Registration and monthly-submission flow: 4-part form, co-creator contribution split, 7-item usage-guide prompt, survey-before-submission order",
      "Next.js full-stack implementation and operations: Snowflake DaaS integration, caching, access policy, admin dashboards"
    ],
    background:
      "As agents built with NoA 2.0 multiplied, who built what and what it achieved was scattered. We needed a platform where register → recommend and spread → submit monthly results → evaluate → train runs as one flow.",
    features: [
      {
        eyebrow: "Core feature 01",
        title: "Personalization",
        summary:
          "The home screen differs for every person. Job and department from the HR DB plus in-platform behavior (recently viewed and liked agents) are scored, and every card carries a one-line reason.",
        items: [
          { title: "Recommended for you", body: "+5 if the builder's job matches mine, +4 if the category matches my job, +3 if built by a colleague in my brand, +2 if in the same category as agents I viewed or liked, +1 each for views this week, a version-up this month, or registration within 14 days. −2 if already viewed; my own agents excluded. With no signal, it falls back to “agents colleagues use most”." },
          { title: "Reasons and criteria chips", body: "Each card shows the strongest reason (e.g. “built by a colleague in Sales”), and chips above the list show the criteria used (Sales · SPAO · 3 recently viewed)." },
          { title: "Job-pinned agent", body: "If the job title contains “online” or the department is the online BU, the online product-flow dashboard is always pinned at the top." },
          { title: "Agent of the day · Best agents", body: "One agent per day by Seoul date, identical for everyone, with a countdown to midnight. Best agents rotate in a banner by monthly hours saved, auto-advancing every 5 seconds." },
          { title: "My tasks sidebar", body: "Days left until the month's deadline, survey status, monthly submissions n/N, and my agents with empty fields, on the right of every screen, in survey → submission → blanks order." },
          { title: "No rankings", body: "No “#1”, rank numbers or “ranking” on regular screens. Only sorting such as “most viewed”; a test enforces it." }
        ]
      },
      {
        eyebrow: "Core feature 02",
        title: "Agent registration and monthly submission",
        summary:
          "A registration form that makes people state what changed in numbers, and a monthly flow that re-reports results. Evaluation and the talent pool use this data as is.",
        items: [
          { title: "4-part form", body: "① Agent description (name, category, one-liner, URL) ② Usage guide ③ What NoA changed (users, monthly hours saved, removed tasks, at least one KPI) ④ Access (password, SSO or no security). Instead of browser validation, all missing fields are listed with reasons and jump links." },
          { title: "Co-creators and contribution", body: "Co-creators are found by company account; contributions must total 100%. When people change, the split resets to equal. Each co-creator is recorded separately so it counts toward their own participation." },
          { title: "7-item usage-guide prompt", body: "① Task ② Access ③ Steps ④ Operating logic and company/team tacit rules (thresholds, priorities, exceptions) ⑤ Use ⑥ KPIs (metric, before/after, cadence) ⑦ Cautions. For logic and tacit rules, NoA asks the builder instead of guessing." },
          { title: "Monthly submission", body: "Requires completing that month's NoA survey first. New agents reuse board values; version-ups must restate changes, users, hours saved, removed tasks, KPIs and the guide. One row per agent × month, editable within the month." },
          { title: "Getting started in 5 steps", body: "Account request → NoA access → DaaS token → first agent → this month's survey and submission. Completion is judged automatically from data." },
          { title: "Hide, don't delete", body: "Deleted posts are hidden, not removed from the DB, so build history and evaluation records keep the talent-pool figures stable." }
        ]
      }
    ],
    insightsLabel: "Design principles",
    insights: [
      { title: "Show reasons, not ranks", body: "Regular screens show no rankings; each recommendation carries a one-line reason, so people find the right agent without feeling lined up." },
      { title: "Minimal personal data", body: "Only name, employee number, department, email and job are read from the HR DB. Address, birth date and phone are never read. Every screen requires login and is limited to the fashion business group." },
      { title: "Tie data collection to the submission flow", body: "The month's survey comes before the monthly submission, so satisfaction, hours saved and needed support accumulate naturally every month." }
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", "Snowflake DaaS", "Redis", "Vitest"],
    tags: ["Personalization", "Registration & submission", "Next.js"]
  },
  "enterprise-agent-integration": {
    group: "④ Enterprise integration",
    title: "Enterprise Agent Integration: From Per-Brand to One",
    subtitle: "Group agents built per brand into brand-level agents, then integrate them into one central harness for the whole company",
    period: "2026 – ongoing",
    status: "Ongoing",
    purpose:
      "Agents built separately by brands such as SPAO, MIXXO, New Balance, WHO.A.U, ROEM, SHOOPEN and EBLIN are grouped into brand-level agents, standardized with a common contract, knowledge graph and evaluation gate, and finally integrated into one company-wide agent.",
    metrics: [
      { value: "116", label: "Agents to integrate", note: "as of Sept 2026" },
      { value: "9", label: "Job functions to connect" },
      { value: "3 phases", label: "Integration roadmap", note: "brand → division → company" }
    ],
    roles: [
      "Integration structure: brand → division → company in three phases, with completion criteria for each",
      "Common contract: every agent carries the same usage-guide structure (logic, tacit rules, KPIs)",
      "Knowledge-graph extension: brand-specific rule and KPI nodes next to metric definitions",
      "Promotion gate: only agents that pass evaluation become skills the central harness can call"
    ],
    background:
      "More than 100 per-brand, per-job agents were built on NoA, but the same sales metric came to be defined differently by brand and the same task was built separately per brand. To merge scattered agents into one, rules and metrics must be standardized first.",
    features: [
      {
        eyebrow: "Phase 1",
        title: "Per-brand agents",
        summary: "Group each brand's per-job agents at brand level. Brand metric definitions and tacit rules accumulate in the brand knowledge graph.",
        items: [
          { title: "Brand agent sets", body: "Place agents in brand × job cells (merchandising, sales, marketing, online, SCM…) to see gaps and duplicates at a glance. Gaps become AX task candidates." },
          { title: "Brand knowledge graph", body: "Load brand metric definitions, thresholds and season rules (season start dates, sell-through targets) so agents stop guessing." },
          { title: "One contract", body: "Every agent records inputs, outputs, rules and KPIs in the same structure. Brands differ; the way to read them does not." }
        ]
      },
      {
        eyebrow: "Phase 2",
        title: "Division integration",
        summary: "Standardize shared metrics and rules at division level and merge same-task agents that were built per brand.",
        items: [
          { title: "Standardized shared metrics", body: "Shared metrics such as sales, sell-through and inventory get one division-level definition; brand exceptions remain as rules." },
          { title: "Merge duplicate agents", body: "Same-task agents across brands merge into one with brand as a parameter, using the higher-scoring agent as the base." },
          { title: "Process chains", body: "Pick one cross-functional process (planning → ordering → inbound → allocation → sales → reorder) and chain agents along it to prove the model." }
        ]
      },
      {
        eyebrow: "Phase 3",
        title: "One company-wide agent",
        summary: "The central harness finds the rules and KPIs for any brand or job first, then selects and calls promoted agents.",
        items: [
          { title: "Central harness", body: "Agent Runtime, routing and the Policy & Context layer receive the request, look up job and brand rules in the knowledge graph, and call the right skill." },
          { title: "Promotion gate", body: "Only agents with an Excellent AI grade, a working link and submitted before/after KPIs become skills or MCP tools the harness can call." },
          { title: "KPI closed loop", body: "Monthly-submission KPIs are checked against DW actuals to update trust, which feeds back into recommendation and routing weights and training tasks." }
        ]
      }
    ],
    steps: ["Standardize per-brand registration & guides", "Load rules & KPIs into the brand graph", "Integrate shared metrics & duplicate agents", "Promote through the evaluation gate", "One central harness company-wide"],
    vision: {
      lead:
        "Usage-guide item ④ (operating logic and company/team tacit rules: thresholds, priorities, exceptions) and item ⑥ (KPIs: metric, before/after, cadence) are not just one agent's manual. They are a device for extracting the judgment criteria a job has followed by feel into a form machines can read. Accumulated across every job, this becomes a job knowledge graph, and the central AI harness looks up a job's rules and KPIs first, then calls the right agent.",
      note:
        "The structure below is a roadmap. Data and system connections (NoA MCP Gateway) and the register → evaluate → recommend → train loop are in operation; loading rules and KPIs into the graph and promoting agents to skills proceed in stages.",
      jobs: ["Merchandising", "Sales", "Marketing", "Online", "IMC", "SCM", "Production", "Logistics", "CS"],
      steps: [
        { title: "Unify on one contract", body: "Every agent carries the same 7-item usage guide, and logic, tacit rules and KPIs are kept both as prose and as a machine-readable structure (inputs, outputs, rules [condition, threshold, priority, exception], KPIs [metric, before, after, cadence], data sources). Interview-style skills ask the builder on the platform's behalf." },
        { title: "Use the job map as the skeleton", body: "Build a job map of 12 categories × work stages and place every agent in a (job, stage) cell. Empty cells become AX task candidates and connect to company-wide task discovery." },
        { title: "Put tacit rules in the knowledge graph", body: "Attach Rule (threshold, priority, exception) and KPI nodes to the graph that already holds official metric definitions, linked to jobs, metrics and data sources. Just as formulas are looked up in the graph, the harness looks up job rules there." },
        { title: "Make evaluation the promotion gate", body: "Only agents with an Excellent AI grade, a working link and submitted before/after KPIs are promoted to skills or MCP tools the harness can call. Evaluation decides what to trust and connect." },
        { title: "Chain along a process", body: "Pick one process that crosses jobs, such as product flow (planning → ordering → inbound → allocation → sales → reorder), chain three or four jobs' agents to prove it, then widen to the next process. The Policy & Context layer keeps read-only and own-permission principles intact." },
        { title: "Close the loop with KPIs", body: "Check monthly-submission KPIs (before, after, cadence) against DW actuals to validate reported values, and feed the result back into agent trust → recommendation and routing weights → training tasks. Personalization, evaluation and training are the three mechanisms that turn this loop." }
      ]
    },
    stack: ["MCP", "Neo4j knowledge graph", "Claude Code Skill", "Snowflake"],
    tags: ["Enterprise integration", "Central harness", "Knowledge graph"]
  },
  "recsys-serving-pipeline": {
    group: "⑤ Next step",
    title: "Personalized Recommendation Serving Pipeline",
    subtitle: "From rule-based recommendation to model-based real-time serving",
    period: "Planned",
    status: "Planned",
    purpose:
      "Design, build and operate the serving pipeline for personalized recommendation models: end-to-end from ANN candidate retrieval through model serving on an inference server to a real-time recommendation API. Build an offline evaluator, an online simulator and an A/B testing platform to validate models from multiple angles, and operate real-time monitoring of key metrics. Use AI tools to prototype and integrate recommendation and backend features quickly, then harden validated results into stable production code.",
    background:
      "Today the Fashion AI Platform's recommendation is rule-based, scoring seven job, brand and behavior signals. As usage logs and monthly KPIs accumulate, the next step is to use them as training data and evolve into model-based recommendation with a serving pipeline.",
    roles: ["(To be written) Scope owned across design, development and operations"],
    catalog: {
      title: "Components to fill in",
      items: [
        { name: "ANN candidate retrieval", body: "Narrowing candidate agents and content quickly with embeddings. (to be written)" },
        { name: "Inference server · model serving", body: "Inference server and deployment approach for trained recommendation models. (to be written)" },
        { name: "Real-time recommendation API", body: "API contract and latency targets for the home and sidebar. (to be written)" },
        { name: "Offline evaluator", body: "Comparing models on historical logs. (to be written)" },
        { name: "Online simulator", body: "Simulating traffic before release to verify behavior. (to be written)" },
        { name: "A/B testing platform", body: "Splitting recommendation variants and testing metric differences. (to be written)" },
        { name: "Real-time metric monitoring", body: "Live monitoring of clicks, usage, hours saved and other key metrics. (to be written)" },
        { name: "AI-assisted prototyping → production", body: "Rapid prototypes with AI tools, with only validated results promoted to stable production code. (to be written)" }
      ]
    },
    tags: ["Recommender systems", "Model serving", "A/B testing"]
  },
  "ai-talent-pool": {
    group: "③ AI Talent Evaluation",
    title: "AI Talent Pool and People Evaluation System",
    subtitle: "A 100-point system that measures outputs (agents) and people (participation) separately, building a talent pool for rewards, funding and placement",
    period: "2026 – in operation",
    purpose:
      "Makes who uses AI well and what they have built visible in numbers rather than by feel. Agents are measured against public criteria, people by a participation score, and the results inform rewards, funding and placement decisions.",
    metrics: [
      { value: "100 pts", label: "Participation score", note: "agents · training · visits · NoA usage" },
      { value: "4 tiers", label: "Participation tiers", note: "Leading · Active · Entry · Watch" },
      { value: "5", label: "Member-care signals" },
      { value: "10 stages", label: "Member 360 journey" }
    ],
    roles: [
      "Designed the four public agent-evaluation criteria and the agent score formula; criteria public, grades admin-only",
      "Designed the 100-point participation weights and tiers, calibrating NoA usage thresholds to the real distribution (40 people)",
      "Designed the talent-pool table, monthly-output popup and overall ranking rule (usage 35 : output 65)",
      "Designed the member 360 journey and care signals, recommended actions and follow-up drafts",
      "Designed and built the org-level AI usage dashboard (division → brand → department → person drill-down)"
    ],
    background:
      "As more people took training and built agents, we needed grounds for deciding whom to reward, where to add budget and whom to place in which team. Rather than trusting reported values alone, we built a system that measures outputs and participation separately.",
    features: [
      {
        eyebrow: "Core feature 01",
        title: "Agent evaluation: measuring outputs",
        summary: "Criteria are published on the board, the registration form and the FAQ; grades are visible only to admins. Reported values are trusted as is, but a broken link scores zero.",
        items: [
          { title: "Four public criteria", body: "Is the domain clear · Did it deliver results (hours saved, quantitative outcomes such as sell-through, sell-through value, cost savings) · Can it spread (within and across teams) · Is there a next step." },
          { title: "Agent score 0–100", body: "Monthly hours saved 30 · quantitative outcome 40 · users 15 · cross-team spread 5 (90 total, scaled to 100). A broken link scores zero." },
          { title: "AI grade: Excellent · Fair · Poor", body: "An ordinal logistic regression trained on admin-assigned grades proposes a grade from the agent score and the feature type read from the post. Excellent = clear purpose and problem; Fair = extra features such as data aggregation; Poor = a plain dashboard." },
          { title: "Blanks are not zeros", body: "If users, hours saved or difficulty is missing, no score is produced and the missing field is reported, so nobody is misread as low-scoring." }
        ]
      },
      {
        eyebrow: "Core feature 02",
        title: "People evaluation: measuring participation",
        summary: "Each account's AI usage level becomes one number. The weights live in a single file, so changing the standard means changing one place.",
        items: [
          { title: "100-point participation score", body: "12 per uploaded agent (max 36) · advanced training 16 · basic training 8 · 1 per platform visit (max 20) · NoA 2.0 usage up to 20 (active days 8, messages 8, code sessions 4, each capped) so no single metric dominates." },
          { title: "Four tiers", body: "60+ Leading, 35 Active, 15 Entry, below that Watch. NoA usage thresholds were calibrated to the real distribution of the 40 people who also have platform accounts (median 5 active days, top quartile 10, etc.)." },
          { title: "Monthly output and a person's share of hours", body: "Clicking a name in the talent-pool table opens monthly new/version-up counts, change in hours saved, what changed and before/after screens. A person's share = agent hours saved × contribution (equal split by default)." },
          { title: "Overall ranking rule", body: "Scope: this month's NoA licence holders. Usage score (active days 40, messages 30, code sessions 30) and output score (Σ monthly hours saved × contribution) are each converted to percentiles and combined 35 : 65. Adjustments: line staff ×1.0, leaders ×1.5, CAIO office ×0.7; types: output-led, usage-led, balanced. Admin-only." }
        ]
      },
      {
        eyebrow: "Core feature 03",
        title: "Member 360 and care: looking after people",
        summary: "One person's journey is stitched together by email and shown in time order, and churn or stall signals are detected automatically so admins can reach out first.",
        items: [
          { title: "Member 360 journey", body: "Sign-up → application → access → training → usage → agent building → inquiries → requests → offline help → survey. Only name, employee number, department and email are used; no address, birth date or phone." },
          { title: "Five care signals", body: "Has access but unused · unused 30+ days · basic training only · active user without a registered agent · applied but no access. Judged only from data already collected." },
          { title: "Recommended actions and follow-up drafts", body: "Each signal comes with a recommended action and draft email or calendar invite. Nothing is sent automatically; admins edit and send from Outlook." },
          { title: "Org-level AI usage dashboard", body: "Drill down division → brand → department → person. Each bar is the whole group, split into active users / access only / no access." }
        ]
      }
    ],
    insightsLabel: "Design principles",
    insights: [
      { title: "Measure outputs and people separately", body: "The agent score looks at outputs, the participation score at people. Merged, one agent would hide everything or frequent visitors would float to the top." },
      { title: "Criteria public, grades private", body: "Everyone sees what is evaluated; only admins see grades, rankings and comments." },
      { title: "Verify reported values", body: "Links are checked, and reported KPIs are being compared with DW actuals. Evaluation becomes the basis for what to trust and connect." }
    ],
    stack: ["Next.js", "Prisma", "Snowflake DaaS", "HR DB integration"],
    tags: ["Talent pool", "Evaluation system", "Dashboard"]
  },
  "ax-discovery-agent-training": {
    group: "① Training",
    title: "Company-wide AX Task Discovery and AI Agent Training",
    subtitle: "Small, step by step, repeatedly: finding AX tasks across the company and building agents hands-on",
    period: "2026.02 – ongoing",
    purpose: "Designed training, onboarding and operational support to reach a 20% AX conversion rate across the organization.",
    metrics: [
      { value: "21", label: "AX projects discovered" },
      { value: "~500", label: "People trained in AI agents" },
      { value: "6 steps", label: "Agent-building learning path" },
      { value: "85 slides", label: "Training decks", note: "literacy 14 · NoA sessions 41+30" }
    ],
    roles: [
      "Analyzed field work to define tasks where AI can apply",
      "Prioritized by impact, difficulty and data readiness",
      "Designed the curriculum and job-specific hands-on exercises",
      "Provided technical support through to building and deploying real agents after training",
      "Built the platform's learning features: AI literacy slides, leveled video lessons, 6-step build practice, NoA training decks, vibe-coding guide"
    ],
    features: [
      {
        eyebrow: "Platform learning features",
        title: "Learning inside the platform",
        summary: "Not lecture-only training: completion means a first-time employee turns a problem from their own work into one agent and publishes it. Basics → videos → practice → deployment in one flow.",
        items: [
          { title: "AI literacy basics", body: "Fourteen slides on AI fundamentals and what matters at work. Security principles and one-click deployment guardrails rewritten in plain company language." },
          { title: "Leveled video lessons", body: "AI trends · common · sprout · basic · intermediate · advanced · applied, so people pick lessons at their level. Required videos are badged and play inside the platform." },
          { title: "6-step agent-building practice", body: "Understand AI → define the work problem → write a prompt spec → prototype with Claude Code → security check → prepare to share and deploy. Each step has an output and check questions, with first-agent scenarios for MD, sales, design and CS." },
          { title: "NoA 2.0 training decks", body: "Session 1 (concepts, 41 slides) and session 2 (hands-on, 30 slides) available in the platform by course. Attendance counts toward the participation score." },
          { title: "5-step vibe-coding guide", body: "Decide what to build → build screens by vibe coding → connect BI data → prepare code for deployment → deploy. A usage-guide prompt makes the builder state operating logic, team tacit rules and KPIs first." },
          { title: "Getting-started checklist and help", body: "Account request → NoA access → DaaS token → first agent → this month's survey and submission, judged automatically. FAQ, 1:1 inquiries, data requests and offline help sign-up sit alongside." }
        ]
      }
    ],
    steps: ["Work-process interviews", "AX candidate discovery", "Prioritization", "Hands-on agent training", "Build & deploy support"],
    image: {
      src: "/projects/ax-training.jpg",
      alt: "Explaining the one-click deployment guide file from the podium at a training session",
      caption: "AI agent-building training: one-click deployment guide session",
      width: 2048,
      height: 1536
    },
    tags: ["AX task discovery", "Training", "Onboarding"]
  },
  "naver-channel-strategy": {
    group: "Online channel strategy",
    title: "Redefining the Naver Channel Sales Strategy",
    subtitle: "Why it was customer-structure redesign, not channel expansion",
    period: "2024.01 – 2024.02",
    purpose: "Redesigned product, content and channel messaging from an analysis of each customer group's entry motives, lifting channel sales.",
    metrics: [
      { value: "137%", label: "Live-commerce conversion growth", note: "YoY, 0.8% → 1.9%" },
      { value: "190%", label: "Live-commerce sales per show", note: "YoY, ₩100M → ₩290M" }
    ],
    roles: [
      "Reinterpreted the limits of platform-led growth as a customer-structure problem",
      "Analyzed purchase criteria and entry motives of customers in their 40s",
      "Concentrated marketing budget on strategic products",
      "Redesigned content messaging, review strategy and pricing around customers' purchase criteria"
    ],
    image: {
      src: "/projects/naver-live.png",
      alt: "MIXXO official store on Naver Shopping Live",
      caption: "Naver Shopping Live channel",
      width: 1056,
      height: 820
    },
    tags: ["Customer analysis", "Channel strategy", "Live commerce"]
  },
  "newbalance-padding-rebranding": {
    group: "Product portfolio strategy",
    title: "New Balance Padding Rebranding Strategy",
    subtitle: "Designing core products from big data",
    period: "2024.11 – 2024.12",
    purpose: "Redefined product strategy and marketing messages from sales, review and platform data by age group.",
    metrics: [{ value: "100%", label: "Sales growth among customers under 30" }],
    roles: ["Analyzed men's and women's needs for padding items", "Analyzed three years of our own padding sales by item", "Analyzed reviews of top-selling items on the three key platforms"],
    image: {
      src: "/projects/padding-search.png",
      alt: "Search-volume analysis by apparel category: outerwear searches fell while off-season padding searches rose 183%",
      caption: "Market analysis: shrinking padding demand, growing off-season padding demand",
      width: 1686,
      height: 1174
    },
    tags: ["Product strategy", "Review analysis", "Search trends"]
  },
  "china-brand-churn-analysis": {
    group: "Product portfolio strategy",
    title: "Customer Churn Analysis for a Premium Brand in China",
    subtitle: "Combining store interviews, search trends, social media and district surveys into a product-portfolio strategy",
    period: "2025.02 – 2025.03",
    purpose: "Cross-validated store customers, search trends, street-style observation and social data to identify the cause of market change.",
    metrics: [{ value: "+8%", label: "Sales growth vs. same month last year", note: "from decline to growth" }],
    roleLead: "Proposed shrinking the formal-led assortment and rebuilding the portfolio around shirts, denim and comfortable business casual.",
    roles: [
      "Defined the cause of declining sales as a shift in customers' workwear norms, not the products",
      "Confirmed the market shift from formal suiting to business casual",
      "Found the client kept a portfolio centered on past hits, limiting new-customer inflow"
    ],
    background: "The brand kept a heavy share of past hits such as glossy colored blouses from a decade earlier, and sales were falling 27% a year.",
    steps: ["Store customer interviews", "Tmall search-trend validation", "Shanghai office street-style survey", "Douyin content analysis", "Portfolio rebuild proposal"],
    insights: [
      { title: "Lifestyle changed, not age", body: "The issue was not customers' age but a change in the lifestyle and workwear norms of the same age group." },
      { title: "Past bestsellers can cause churn", body: "The old success formula became an internal risk that locked the product portfolio in place." },
      { title: "Never conclude from one dataset", body: "Cross-validating store interviews → search → social → street style made the strategy persuasive." }
    ],
    image: {
      src: "/projects/scofield-store.png",
      alt: "A Scofield store inside a department store in China",
      caption: "Store in China",
      width: 897,
      height: 581
    },
    tags: ["Overseas market", "Cross-validation", "Portfolio strategy"]
  }
};
