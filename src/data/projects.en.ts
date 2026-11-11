import type { Part, Project } from "@/data/projects";

/**
 * 영어 번역. 한국어 원본(projects.ts)과 같은 slug/no 로 덮어씁니다.
 * 적지 않은 필드는 한국어 값이 그대로 쓰입니다(이미지 경로·숫자 등).
 */

export const PROFILE_EN = {
  name: "Minkyeong Kim",
  tagline: "A planner who turns customer and market insight into results",
  intro:
    "Started in customer and market analysis for fashion brands; now building the platform that connects company data to AI agents and designing the company-wide AI transformation. From the numbers to the shipped service, end to end."
};

export const PARTS_EN: Record<number, Partial<Part>> = {
  1: {
    title: "Enterprise AI Platform",
    short: "Enterprise AI Platform",
    question: "What the in-house AI agent platform is and how it was built",
    tagline: "Snowflake → Knowledge graph → MCP / Skills → Agent platform",
    summary:
      "Connects the DW, M365, HR and the knowledge graph to Claude via MCP and ships work know-how to everyone as skills. As of September 2026: 116 agents, 8,180 hours saved per month.",
    visual: {
      type: "image",
      src: "/projects/agent-kpi-demo.png",
      alt: "Asking the in-house AI agent platform for a store's monthly sales in plain language; it looks up the metric definition in the knowledge graph, queries the DW and answers with sources",
      width: 1226,
      height: 1051,
      caption: "the in-house AI agent kpi-query skill: question → knowledge graph → DW query → sourced answer"
    }
  },
  2: {
    title: "AI Talent Management",
    short: "AI Talent Management",
    question: "How people were trained, gathered and evaluated",
    tagline: "Training → AI talent development platform → AI talent evaluation",
    summary:
      "Training builds agent makers, the AI platform gathers their work, and a 100-point system evaluates it to build the AI talent pool: the basis for rewards, funding and placement.",
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
    title: "Internal Business Systems Planning",
    short: "Business Systems",
    question: "Services I planned, built and operated end to end",
    tagline: "Problem definition → Data structure design → Build → Operate & improve",
    summary:
      "Services I designed, built and ran myself: PIM, one hub for product data, and RAG search that made strategy decks searchable.",
    visual: {
      type: "image",
      src: "/projects/pim-pipeline.png",
      alt: "Pipeline design: SAP BI → Snowflake → PIM DB → PIM system → in-house OMS → online channels, with generative AI preprocessing",
      width: 1667,
      height: 784,
      caption: "PIM data integration: generative-AI preprocessing and OMS integration pipeline"
    }
  },
  4: {
    title: "Strategy Projects (Internal Consulting)",
    short: "Strategy Projects",
    question: "How analysis changed sales",
    tagline: "Customer and market insight",
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
    group: "Data hub",
    title: "PIM Data Integration System",
    short: "PIM",
    subtitle: "Unified management of every image in the company, with a flow built from image registration to delivery to online channels",
    period: "2025.09 – 2026.03",
    purpose:
      "Manage every product image in the company (model shots, flat-lay shots, thumbnails) in one image hub, and let AI adapt registered images and product data to each channel's specs and send them straight to online channels. The goal is to end re-entering the same information channel by channel.",
    metrics: [
      {"value":"6 days → 1 hour","label":"Listing lead time","note":"from receiving to on sale"},
      {"value":"100%","label":"Standard listings automated","note":"only events and promotions remain: 80% of time saved"}
    ],
    roles: [
      "Defined what PIM manages: product code, name, material, color, size, price, inventory and images (model, flat-lay, thumbnail) as the single source of product truth",
      "Mapped where data is created and how it flows across SAP, BI, local storage, Google Drive and email",
      "Designed the generative-AI workflow: per-item keyword extraction, channel-specific names and promotional copy, image spec adaptation",
      "Turned interviews with MD, photo and ops teams into requirements for listing procedures and per-channel rules"
    ],
    background:
      "Interviewing MD and AMD staff for three weeks and surveying their work showed that 54% of simple, repetitive work was ‘product listing and management’ (1,865 hours per month). The core bugs were ① product data scattered across SAP, BI, local folders, drives and email, and ② manual adjustment to each channel's different specs.\nTo solve this, a PIM (Product Information Management) system was built.",
    system: {
      flowTitle: "Product listing flow",
      intro:
        "Listing after receiving runs as one flow: images enter the hub, AI builds detail pages, per-channel agents fit each format and every channel receives the listing. Below: the image hub's six layers.",
      figures: [
        {
          src: "/projects/pim-pipeline.png",
          alt: "Pipeline design: SAP BI → Snowflake → PIM DB → PIM system → in-house OMS → online channels, with AI handling keyword extraction and channel-specific listing copy",
          caption: "PIM pipeline: product data in → AI processing (keywords, channel listings) → OMS → online channels",
          width: 1667,
          height: 784
        }
      ],
      layers: [
        { name: "1. Bulk upload", role: "Drag-and-drop bulk upload; re-uploads notify the detail-page AI.", items: [{ label: "Drag-and-drop bulk upload", note: "style code, color and cut type recognized from the file name" }, { label: "Re-upload", note: "added model shots etc. → the page-generation AI notified" }, { label: "Error badge", note: "unmatched files flagged on the home screen" }] },
        { name: "2. Image management", role: "Type, traits and product data turn each image into a searchable asset.", items: [{ label: "① Image type", note: "front/back/detail, product/model/concept shot" }, { label: "② Product traits", note: "material · mood" }, { label: "③ Style-code link", note: "SAP data (name, price) joined with PIM disclosure data" }] },
        { name: "3. Auto-editing", role: "Images are adjusted automatically to channel specs.", items: [{ label: "① Resizing", note: "size · ratio" }, { label: "② Retouching", note: "brand logo removal, background removal and more" }] },
        { name: "4. Search", role: "Search by product data, similar image or plain language.", items: [{ label: "Product-information search", note: "style code · item name · color" }, { label: "Similar-image search", note: "find images with an image" }, { label: "AI search", note: "natural-language search for product images" }] },
        { name: "5. Download", role: "Select the images you need and download them in bulk.", items: [{ label: "Select and bulk download", note: undefined }, { label: "My Pocket", note: "keep frequently used images" }] },
        { name: "6. Share", role: "Bundle only the images you want to share and edit.", items: [{ label: "Shared image bundles", note: undefined }, { label: "Edit inside a shared bundle", note: undefined }] }
      ],
      flow: [
        { title: "PLM product registration", body: "Base data registered in PLM flows into PIM automatically." },
        { title: "Receiving and inventory → new-product alert", body: "Receiving triggers an automatic new-product alert to the listing team." },
        { title: "Shooting · 3D generation → hub upload / API", body: "Shots (later 3D renders) go straight to the hub; no more Google upload or email." },
        { title: "Detail page production (AI)", body: "AI generates models, sales copy, detail pages and SEO tags." },
        { title: "Thumbnail and detail-page upload", body: "Thumbnails and detail pages attach to the style code automatically." },
        { title: "Per-channel data-optimization agent", body: "An agent converts names, categories and image specs for each channel." },
        { title: "the listing hub listing → all channels", body: "One listing goes to every channel: the company mall, Naver, Musinsa and more." },
        { title: "Monitoring dashboard", body: "Blocks ‘received but never on sale’ errors; people only review." }
      ],
      principles: [
        { title: "One source for product information", body: "Names, prices, materials, disclosure data and images originate only in PIM; channels consume them. Scattered data was core bug no. 1." },
        { title: "Agents, not people, fit channel formats", body: "Per-channel rules live in the data-optimization agent; when a rule changes, only the agent changes. This removes core bug no. 3, manual adjustment." },
        { title: "People supervise, they do not operate", body: "Standard listings are 100% automated. People review and feed back better AI logic, and only work that needs a platform MD, such as event listings and promotions, remains." },
        { title: "Linked to PLM, from production to after-sales", body: "Connected with PLM, PIM gives integrated product analysis from production to post-sale service and becomes the system base for global channel expansion." }
      ]
    },
    catalog: {
      title: "Business process: AS-IS → TO-BE, and the five changes",
      figures: [
        { src: "/projects/pim-asis-process.png", alt: "AS-IS listing process: merchandising (SAP registration) → logistics (receiving, inventory) → photo team (shooting, Google upload and email) → listing team (spotting new products from inventory, listing, sample requests, measuring and inner-tag checks, disclosure images, detail pages, thumbnails, the company mall image upload) → e-commerce team (the company mall, Sabangnet and the listing hub listings → Cafe24, Naver, Musinsa, Zigzag). Seven red boxes are the core bugs", caption: "[AS-IS] The old listing process: the same information re-typed by people across five teams. The seven red boxes are the core bugs", width: 1684, height: 1150 },
        { src: "/projects/pim-tobe-process.png", alt: "TO-BE big picture after PLM: inside PIM, merchandising (PLM registration) → logistics (receiving, inventory) → listing team (new-product alert, listing) → photo team (shooting, 3D generation, hub upload / API) → detail page production (AI) → thumbnail and page upload → per-channel data-optimization agent → the listing hub listing → all channels", caption: "[TO-BE] The PIM flow after PLM: new-product alerts go out automatically, shots and 3D renders enter through the hub, AI builds the pages, a per-channel agent fits each format and the listing hub sends to every channel. Every red box (core bug) is gone", width: 1720, height: 1204 }
      ],
      items: [
        {
          name: "[AS-IS] The previous business process — seven core bugs",
          steps: [
            { text: "Merchandising registers the product in SAP" },
            { text: "Logistics registers receiving and inventory" },
            { text: "Listing team digs through inventory to find new products", flag: "Bug" },
            { text: "Lists the product without photos" },
            { text: "Requests samples from logistics" },
            { text: "Measures and checks inner tags", flag: "Bug" },
            { text: "Makes disclosure images", flag: "Bug" },
            { text: "Photo team shoots" },
            { text: "Google upload and email", flag: "Bug" },
            { text: "Detail page production", flag: "Bug" },
            { text: "Thumbnails and pages entered" },
            { text: "Company mall image upload", flag: "Bug" },
            { text: "E-commerce team lists separately in the company mall, Sabangnet and the listing hub", flag: "Bug" },
            { text: "Sent to Cafe24, Naver, Musinsa, Zigzag" }
          ],
          body: "Five teams passed the same information along, re-typing it each time."
        },
        {
          name: "[TO-BE] After the system — one PIM flow",
          steps: [
            { text: "PLM product registration" },
            { text: "New-product alert as soon as receiving and inventory are registered" },
            { text: "Shooting / 3D generation" },
            { text: "Hub upload / API" },
            { text: "Detail page production (AI)" },
            { text: "Automatic thumbnail and detail upload" },
            { text: "Per-channel data optimization agent" },
            { text: "Listing hub registration" },
            { text: "Sent to all channels" }
          ],
          body: "Re-typing steps disappear; the listing team only reviews and handles exceptions."
        },
        {
          name: "Change ① Lead time from 6 days to 1 hour",
          body: "Listing lead time from receiving to on sale: average 6 days → at most 1 hour."
        },
        {
          name: "Change ② People no longer intervene",
          body: "Standard listings 100% automated; people review and give AI-logic feedback. Only events and promotions remain, saving 80% of time."
        },
        {
          name: "Change ③ Take the photo and AI does the rest",
          body: "The page is created and listed as the shot is taken; with 3D modeling, products go on sale at planning without a shoot."
        },
        {
          name: "Change ④ No more ‘received but not on sale’",
          body: "A monitoring dashboard completely blocks products received but never put on sale."
        },
        {
          name: "Change ⑤ Data as an asset, and what it enables",
          body: "All sales-side product data feeds AI training, enabling AI merchandising, recommendations and short-form content, and global channel expansion."
        }
      ]
    },
    steps: ["3-week MD/AMD work census","Define the two core bugs","PIM attributes and data flow","AI detail pages and channel-optimization agent","the listing hub → all channels automatically"],
    images: [
      { src: "/projects/pim-image-hub-home.png", alt: "Image hub home: left menu (work status, style information, image information, detail pages, My Pocket, other materials, per-channel information, master data, permissions, trash, AI search), filters for upload date, uploader, brand and color with a registration-error badge, and a grid of 34,031 images", caption: "Image hub home: upload date, uploader, brand and color filters plus a ‘registration error’ badge locate any of tens of thousands of images in the grid", width: 1197, height: 903 },
      { src: "/projects/pim-image-detail.png", alt: "List view with the image detail panel on the right: file name, brand, style code, colors, cut type, search keywords, size, uploader, upload time, and edit/download buttons", caption: "Image registration review and detail check", width: 1197, height: 883 },
      { src: "/projects/pim-style-status.png", alt: "Style status for one style code: style information review (pending) → image upload (2 flat-lay, 1 campaign, done) → channel image generation (done) → detail page generation (pending), with per-color detail-page status and retry buttons for failures", caption: "Style status: image upload → automatic per-channel image editing → review of the detail-page generation stage", width: 1381, height: 875 }
    ],
    thumb: {
      src: "/projects/pim-thumb.png",
      alt: "Image hub home: filters and image grid",
      width: 1000,
      height: 1000
    },
    stack: ["Snowflake", "SAP", "OMS", "Generative AI"],
    tags: ["PIM", "Product information", "AI channel listing"]
  },
  "md-ontology-design": {
    group: "② Ontology",
    title: "Building the Ontology: Adding a Business-Concept Layer to the Data Catalog",
    short: "MD business ontology",
    subtitle: "From a semantic layer centered on DW tables and columns to a business ontology with business-judgment concepts added",
    period: "2026.11 – ongoing",
    status: "ongoing",
    purpose:
      "Extends the range of answers to judgment questions by building an ontology that holds business know-how on top of the existing data catalog (semantic layer)",
    metrics: [
      { value: "markdown rate · reorder quantity · reorder timing · allocation · main sales channel", label: "Wider answer scope (judgment questions)" }
    ],
    roles: [
      "As a former merchandiser, drew out the five weekly decisions in interview form, without looking at tables, and organized business concepts and causal relations first",
      "Re-positioned the existing knowledge graph as the lower data-link layer and designed the two-layer structure joined by ‘seen in data as’ relations",
      "Defined the concept-table and relation-table formats (direction, attributes, exceptions)",
      "Recorded thresholds as attributes rather than nodes, together with their scope (brand)"
    ],
    background:
      "The company's unwritten rules and ways of working were not in it, so even with a semantic layer, users had to enter the company's judgment criteria again in every session.",
    system: {
      intro:
        "The existing knowledge graph (semantic layer) serves as the DW data-link layer, while MD experience knowledge such as ‘fit complaints → size issue → more returns → lower full-price sell-through’ is added to support faster decisions",
      layers: [
        { tint: true, name: "1. Ontology (upper concepts · schema)", role: "Nouns become concepts, verbs become relations. Concepts are grouped into buckets (labels) from the MD world, not the DW.", items: [{ label: "Metrics", note: "sell-out rate · full-price sell-through · days of stock · early sell-through" }, { label: "States / stages", note: "PLC early · growth · peak · decline" }, { label: "Decisions", note: "reorder · channel focus · markdown timing · next-season orders" }, { label: "Constraints", note: "days of stock · lead time" }, { label: "Timing / events", note: "season end · off-season sale · forecast peak passed" }] },
        { name: "2. Knowledge graph (lower concepts · real data and relations)", role: "Says where each concept is visible in data. Nothing built so far is thrown away; it keeps the upper layer from misreading data.", items: [{ label: "Full-price sell-through → DW sales metrics", note: undefined }, { label: "Fit complaints → review text · platform detail ratings", note: undefined }, { label: "Guarding facts", note: "the repair/inspection CS channel is not customer reviews · company-mall photos are not collected · jewelry accumulates lines per receipt" }] }
      ],
      flow: [
        { title: "User judgment query", body: "“Why isn't this style selling? What should we do?”" },
        { title: "Find the decision node", body: "Check which PLC stage it is in, such as introduction or decline." },
        { title: "Seen in data as", body: "Confirm exact numbers through the lower-level knowledge graph: full-price sell-through from sales metrics, fit complaints from review-text tables." }
      ],
      principles: [
        { title: "Center on the business world, not the data", body: "Tables and columns are only the lower layer that says where a concept appears in data. Labels come from the MD world (metric, state, decision, constraint, timing), not Table and Column." },
        { title: "Thresholds are attributes", body: "‘40% or more’, ‘four weeks’, ‘15/40/70%’, ‘×1.30/×0.85’, ‘30 Sep / 28 Feb’ are written as attributes of relations or concepts, not as nodes. Change a threshold and only a number changes; if brands differ, the scope is an attribute too." },
        { title: "Exceptions as separate blocking relations", body: "‘Sells well but do not reorder’ is modeled as reverse-direction ‘blocks’ relations, never mixed with general rules. The most valuable knowledge lives here." },
        { title: "Keep MD rules and app calculation rules apart", body: "Days to sell-out, the PLC curve and 2-week coverage come from the reorder app's logic and get their own ‘calculation rule (app)’ bucket. What exists only in MD knowledge (no reorder on low full-price sell-through, evaluation by days of stock, size-level reorders) is the core of the concept layer." },
        { title: "Open the tables last", body: "Start with the interview and two tables (concepts, relations), with neither Neo4j nor Snowflake open. Move to Neo4j once the tables fill up, using the same MERGE approach as before." }
      ]
    },
    steps: ["Interview SO/MD staff (judgment criteria in the work)","Write concept and relation tables","Migrate to Neo4j","Connect the Neo4j MCP"],
    stack: ["Neo4j", "Cypher queries", "Snowflake"],
    image: {
      src: "/projects/md-ontology-overview.png",
      alt: "Business-concept layer graph: 30 nodes and 38 relations among decisions, metrics, states, events, restrictions and calculation rules",
      caption: "Ontology (upper concepts): the business-concept layer where decisions, metrics, states, events, restrictions and calculation rules are linked as causes and grounds (30 nodes · 38 relations)",
      width: 1800,
      height: 1000
    },
    images: [
      {
        src: "/projects/md-ontology-judgment.png",
        alt: "Graph around the reorder decision node with candidate-making, checking and blocking relations",
        caption: "Reorder decision: metrics, restrictions, events and states make it a candidate (MAKES_CANDIDATE), are checked (CHECKS) and block it (BLOCKS)",
        width: 1800,
        height: 1000
      },
      {
        src: "/projects/md-ontology-quantity-eval.png",
        alt: "Graph from quantity-deciding and evaluating metrics to reorder quantity and reorder result",
        caption: "Quantity and evaluation: the same metrics serve as candidate criteria and evaluation criteria, forming a decision → result → next decision loop",
        width: 1800,
        height: 1000
      },
      {
        src: "/projects/md-ontology-data-link.png",
        alt: "Two-layer graph with business-concept nodes joined by dotted lines to DW table and column nodes",
        caption: "Seen in data as: SOURCED_FROM relations tie upper concepts (ontology) to lower concepts (knowledge graph) (24 links)",
        width: 1800,
        height: 1000
      }
    ],
    thumb: {
      src: "/projects/md-ontology-thumb.png",
      alt: "Center of the business-concept layer graph",
      width: 1000,
      height: 1000
    },
    tags: ["Ontology", "MD knowledge", "Knowledge graph"]
  },
  "daas-paas-operations": {
    group: "③ Infrastructure",
    title: "PaaS-based Service Operations",
    short: "PaaS operations",
    subtitle: "An in-house PaaS that deploys the apps non-developers build and provides the DB, file storage and schedules they need",
    period: "2026.03 – ongoing",
    purpose: 
      "An in-house PaaS where line staff deploy the web tools they build without developer help and get operations support. Overall deployment status, per-app MAU and call counts, and deployment domains are managed in one place.",
    background:
      "Web services built by individual employees were deployed to individual servers, which made company information hard to manage and made it hard to see which company data left through external DBs and external hosting.\nThe in-house PaaS was built to bring deployment inside the company, manage it in one place, and consolidate internal information, security and cost.",
    metrics: [
      { value: "311", label: "Deployments" },
      { value: "90%", label: "Deployment success rate", note: "n=235 deployments" }
    ],
    roles: [
      "Wrote, distributed and taught the one-click deployment guardrails (rules for AI coding tools)",
      "Designed Claude Code skills (requirements, triggers, behavior) that check a project against PaaS rules before deployment",
      "Turned recurring deployment and operations inquiries into skill features"
    ],
    features: [
      {
        eyebrow: "Core feature 01",
        title: "One-click deployment",
        summary: "Upload a ZIP or connect a Git repository and the app deploys. Guardrail rules for AI coding tools were shipped first to raise the success rate.",
        items: [
          { title: "ZIP and Git deployment", body: "Deploy by uploading a finished ZIP or connecting a Git repository. Each project card shows deployments in progress, the last successful time and error counts." },
          { title: "Deployment guardrails", body: "Rules that AI coding tools such as Cursor and Claude Code follow when generating code (platform and stack choices, safe defaults), distributed as a document to cut failed deployments." },
          { title: "Pre-deployment skill", body: "A Claude Code skill checks project structure, environment variables and build settings against PaaS rules before deploying." }
        ]
      },
      {
        eyebrow: "Core feature 02",
        title: "Operations, security and domains on one screen",
        summary: "Usage of each deployed app (MAU and call counts), data-security checks, deployment domains, schedules, DBs and file storage are all managed from one dashboard.",
        items: [
          { title: "MAU and call counts per app", body: "Monthly active users and API call counts are shown for every deployed app, separating the apps that are really used from the ones to retire and putting operating results in numbers." },
          { title: "Data-security check", body: "Company data must stay in the internal DB, so each app is checked before deployment for connections to any external database, closing the path for company data to leave." },
          { title: "Deployment domain management", body: "Domains are issued, changed and revoked per app, and which domain belongs to which app and owner is managed in one place." },
          { title: "Projects, schedules, DB and file storage", body: "Deployed apps with their service status, jobs that run at set times, and the databases and file stores apps use are created and monitored here." },
          { title: "Creation limits", body: "Project, DB and storage limits are shown so resources are planned." }
        ]
      }
    ],
    images: [
      {
        src: "/projects/paas-my-dashboard.png",
        alt: "Personal dashboard: my 3 projects with deployment URL, last success time and error count, my DB and file storage usage, my schedules, and runtime errors in the last 24 hours",
        caption: "The status of the web apps each person has deployed, as seen on their own dashboard",
        width: 1302,
        height: 1062
      },
      { src: "/projects/paas-monitoring.png", alt: "Admin service-usage monitoring: usage summary (356 app runs, 0.00% error rate, 1854.9 ms average response, p95 2811.9 ms, p99 3358.1 ms, 0 throttles, 0.00% deployment failures, 264 of 281 apps measurable), a call/error trend chart, and a per-application table with calls, error rate, latency, p95, p99, throttles and MAU. User names and IDs blurred, MAU values are examples", caption: "Admin view of every deployed web app", width: 2000, height: 1186 }
    ],
    thumb: {
      src: "/projects/paas-dashboard-thumb.png",
      alt: "PaaS dashboard",
      width: 1000,
      height: 1000
    },
    stack: ["Next.js", "Serverless", "CloudFront", "Claude Code Skill"],
    tags: ["PaaS", "One-click deployment", "Self-service"]
  },
  "strategy-rag-search": {
    group: "Knowledge search",
    title: "Internal Strategy-Document RAG Search",
    short: "RAG search",
    subtitle: "Not simple search, but a service that searches the organization's decision criteria",
    period: "2025.01 – 2025.07",
    purpose: "Turned sales data, product information and internal project documents into an AI search and summary service.",
    metrics: [
      { value: "98%", label: "Budget saved", note: "Self-built vector DB vs. allocated budget" },
      { value: "90%+", label: "Search accuracy" },
      { value: "4.9 / 5", label: "Satisfaction", note: "N=68" },
      { value: "6.8× / week", label: "Usage in core teams", note: "N=68" }
    ],
    roles: [
      "Iterated on preprocessing and retrieval logic through repeated user tests",
      "Expanded to the main screen of the group-wide training program"
    ],
    background:
      "An asset without a way to use it: fifteen years of high-quality strategy material had accumulated, but image-heavy PPTs and file-level storage left it unsearchable.",
    system: {
      intro:
        "Internal documents become JSON, vectorized with the OpenAI Embeddings API into a self-built vector DB. Only chunks close to the question go to the GPT API, which answers with sources.",
      layers: [
        {
          name: "① Internal source files",
          role: "Fifteen years of strategy decks, many image-only and unsearchable as is.",
          items: [{ label: "PPT · Excel · PDF · Word" }, { label: "OCR / image-to-text", note: "text inside charts and images" }]
        },
        {
          name: "② Document processing and JSON conversion",
          role: "Split into search units and saved as JSON with sources.",
          items: [{ label: "Text extraction" }, { label: "Document splitting", note: "chunks per page or slide" }, { label: "Source metadata", note: "file name · page · owning department · date" }]
        },
        {
          name: "③ Building the search data",
          role: "Vectorized with the OpenAI Embeddings API and stored in the self-built vector DB.",
          items: [{ label: "Embedding generation", note: "OpenAI Embeddings API" }, { label: "Vector DB storage", note: "self-hosted vector DB (98% below the allocated budget)" }]
        },
        {
          name: "④ User question",
          role: "Plain-language questions, e.g. “find last year's F/W sale strategy deck”.",
          items: [{ label: "Natural-language question" }, { label: "User and department", note: "used for permission filters" }]
        },
        {
          name: "⑤ Question search",
          role: "Question vector → similar-chunk search → top results, in in-house search code.",
          items: [
            { label: "Search code (built in-house)", note: "takes the question, runs the search, organizes results" },
            { label: "Embedding model", note: "vectorizes the question the same way as the documents" },
            { label: "Vector search", note: "similar chunks from the self-built vector DB, with source and relevance score" },
            { label: "Result filtering and ranking", note: "top results only, limited by department, date and permission" }
          ]
        },
        {
          name: "⑥ GPT API call",
          role: "Only retrieved content goes to the model, told not to invent beyond it.",
          items: [{ label: "User question + retrieved document content + answer instructions" }]
        },
        {
          name: "⑦ Final answer",
          role: "Shown with source documents and pages for a jump to the original.",
          items: [{ label: "Answer" }, { label: "Source documents and pages" }]
        }
      ],
      flow: [
        { title: "Question", body: "Ask in plain language." },
        { title: "Question embedding", body: "Vectorized with the same model as the documents." },
        { title: "Similar-document search", body: "Closest chunks retrieved from the vector DB." },
        { title: "Filtering and ranking", body: "Top results kept, then filtered by permission and more." },
        { title: "GPT API call", body: "Question + documents + instructions produce the answer." },
        { title: "Answer with sources", body: "Source documents and pages shown below the answer." }
      ],
      principles: [
        { title: "Fine-grained control", body: "Search conditions, permission filters, score thresholds and source management are controlled in code. More work than a managed service, but it fits the organization's rules." },
        { title: "No answer without a source", body: "Only retrieved documents go to the model, and every answer carries its source document and page." },
        { title: "What you build yourself", body: "Search logic, data refresh and failure handling have to be developed in-house. Preprocessing and search logic were revised through repeated user testing." },
        { title: "Preprocessing decides accuracy", body: "OCR quality on image PPTs and the chunking unit determined search accuracy. More time went into preprocessing than into the model." }
      ]
    },
    steps: ["Unstructured knowledge", "OCR / image-to-text", "Vector DB", "GPT API natural-language search", "Iterative user testing"],
    image: {
      src: "/projects/rag-search.png",
      alt: "Knowledge-bank search screen: asked for MD promotion materials, the assistant character searches the knowledge bank",
      caption: "Finding strategy documents in plain language",
      width: 1871,
      height: 1245
    },
    images: [
      {
        "src": "/projects/rag-search-architecture.png",
        "alt": "Six-step structure: source files, OCR, splitting into search units, embeddings and vector DB, similar-document search, GPT answer with sources, plus result numbers",
        "caption": "Search structure at a glance: source files → OCR → chunks → vector DB → similar-document search → answer with sources",
        "width": 1800,
        "height": 700
      }
    ],
    thumb: {
      src: "/projects/rag-search-thumb.png",
      alt: "The assistant character searching the knowledge bank",
      width: 800,
      height: 800
    },
    stack: ["OCR", "Vector DB", "GPT API"],
    tags: ["RAG", "Vector search", "Knowledge management"]
  },
  "ontology-agent-platform": {
    group: "① Agent platform",
    title: "Knowledge Graph-based Enterprise AI Agent Platform",
    short: "AI agent platform (the in-house AI agent)",
    subtitle: "A knowledge-graph-based enterprise AI agent platform where a plain-language request is enough to build a web app connected straight to the company DW",
    period: "2025.11 – ongoing",
    purpose:
      "With plain-language requests alone:\n1. Build web apps connected straight to the company DW\n2. Query BI data",
    metrics: [
      { value: "116", label: "Agents completed", note: "as of Sept 2026" },
      { value: "8,180 h / month", label: "Work hours saved by agents", note: "as of Sept 2026" }
    ],
    roles: [
      "Knowledge graph design: designed the schema from business-domain information and defined official metric definitions and golden SQL",
      "Skill procedure planning: designed the 'one graph lookup → SQL → read-only run' procedure",
      "Employee training design and delivery"
    ],
    background:
      "The in-house AI agent didn't know metric definitions and rules that differ by brand and person, so it got sales and profit numbers wrong two or three times. Once the numbers couldn't be trusted, trust collapsed and usage dropped.\nThe AI needed one reference point for the company's agreed metric definitions and business rules, used the same way every time.",
    system: {
      intro:
        "This platform puts agents on top of a knowledge graph. Built on a Neo4j knowledge graph, it processes each question in the order organization instructions → hooks → skills → MCP tools → gateway → knowledge graph and internal data.",
      layers: [
        {
          name: "1. Client Layer",
          role: "The company plugin in Claude Desktop, Claude Code or Cowork",
          items: [
            { label: "Claude Desktop · Code · Cowork" },
            { label: "company plugin", note: "bundle of skills, hooks and MCP connectors" },
            { label: "Org connector registration", note: "deployed per organization by admins" },
            { label: "SSO login", note: "queries run with the user's own permissions" }
          ]
        },
        {
          name: "2. Policy & Context Layer",
          role: "Org instructions and hooks read the context graph",
          items: [
            { label: "Org instructions", note: "rules for everyone, e.g. what to do when an MCP connection fails" },
            { label: "Session-start hook", note: "personalization, memory and in-house PaaS development rules" },
            { label: "Pre-question hook", note: "adds past corrections, golden SQL and company decisions from the context graph" },
            { label: "Safety principles", note: "read-only · own permissions · no personal-data columns · verify the person in charge is still employed" }
          ]
        },
        {
          name: "3. Agent Runtime",
          role: "The Claude model picks a skill and calls tools in order",
          items: [
            { label: "Claude model", note: "reasoning · SQL writing · answer writing" },
            { label: "Skill triggers", note: "skills selected by keyword and request type" },
            { label: "Memory", note: "per-user preferences and team rules kept as files; new definitions are recommended for knowledge graph registration" }
          ]
        },
        {
          name: "4. Capability Layer (skills)",
          role: "Skills hold no rules; they only set how to query the graph and which tools to call",
          items: [
            { label: "Natural-language KPI skill", note: "one graph lookup → SQL → read-only DW run" },
            { label: "Weekly report search skill", note: "finds brand weekly reports via the graph's vector index" },
            { label: "Internal admin guide skill", note: "expenses, policies, general affairs and other internal knowledge search" },
            { label: "App build & deploy skill", note: "building and preparing apps for deployment on the company standard" },
          ]
        },
        {
          name: "5. Tool Binding Layer (MCP tools)",
          role: "The tools skills actually call",
          items: [
            { label: "Knowledge graph lookup tool", note: "metric meaning · graph reads · weekly report and admin search" },
            { label: "Company DW query tool", note: "runs Snowflake queries (read-only)" },
            { label: "HR (attendance) tool", note: "leave info, requests, approval lines, approve, cancel" },
            { label: "Mail & calendar tool", note: "read, send and reply to mail; create and update events" }
          ]
        },
        {
          name: "6. Knowledge Graph & Data Layer",
          role: "Through the in-house MCP gateway, the DW, M365 and HR are read by the knowledge graph's definitions",
          items: [
            { label: "Neo4j knowledge graph", note: "metric definitions, formulas, joins, golden SQL" },
            { label: "Snowflake DW", note: "standard data models (aggregate tables)" },
            { label: "M365 Graph", note: "mail and calendar" },
            { label: "the in-house PaaS", note: "one-click deployment of employee-built apps" }
          ]
        }
      ],
      flow: [
        { title: "Question", body: "Ask in everyday words, e.g. “What were Brand A Gangnam's sales this May?”" },
        { title: "Knowledge graph lookup", body: "One graph lookup returns the metric definition and joins; SQL is written only from them" },
        { title: "Answer with sources", body: "Read-only DW query with the user's own permissions; definition, scope and sources attached" },
        { title: "Learning from corrections", body: "A correction like “No, from 25 January” is saved to the context graph and applied from the next question" }
      ],
      principles: [
        { title: "Meaning lives only in the knowledge graph", body: "Definitions, formulas and unwritten rules live only in the graph; fix it once and every agent follows that day" },
        { title: "Graph first, SQL second", body: "No guessing tables: SQL only after the graph lookup; a missing metric is answered as ‘no definition’" },
        { title: "Corrections build up in the graph", body: "User corrections and company decisions stay in the context graph, so the next person gets the same standard" }
      ]
    },
    steps: ["Knowledge graph design and build", "MCP servers connecting the graph and the DW", "Skills and hooks", "Plugin rollout and offline training", "Weekly use-case broadcasts across affiliates"],
    figureGroups: [
      {
        "title": "Building a dashboard by vibe coding with this tool",
        "images": [
          {
            "src": "/projects/platform-vibe-coding-flow.png",
            "alt": "Three steps: one plain-language request creates a dashboard web app, then one word, ‘connect it’, swaps in live Snowflake data",
            "caption": "Vibe-coding demo: one word, ‘connect it’, links it to live Snowflake data",
            "width": 1300,
            "height": 1305
          }
        ]
      },
      {
        "title": "Querying BI data in plain language",
        "images": [
          {
            "src": "/projects/agent-kpi-demo.png",
            "alt": "Asking Brand A Gangnam's May sales in natural language with the kpi-query skill: the metric definition is resolved from the knowledge graph, the DW is queried and the answer cites its sources",
            "caption": "kpi-query skill: natural-language question → metric definition resolved from the knowledge graph → DW query → answer with sources",
            "width": 1226,
            "height": 1051
          }
        ]
      }
    ],
    thumb: {
      "src": "/projects/agent-kpi-demo.png",
      "alt": "Asking Brand A Gangnam's May sales in natural language with the kpi-query skill: the metric definition is resolved from the knowledge graph, the DW is queried and the answer cites its sources",
      "width": 1226,
      "height": 1051
    },
    stack: ["MCP", "Claude Code Skill", "Snowflake", "Neo4j", "Cypher queries"],
    tags: ["Knowledge graph", "MCP"]
  },
  "fashion-ai-platform": {
    group: "② AI Platform",
    title: "Fashion AI Platform: Web-App Sharing, Recommendation & Submission Portal",
    short: "Fashion AI platform",
    subtitle: "Where employees publish business web apps built with the in-house AI platform, get similar apps recommended by job, and submit results",
    period: "2026 – in operation",
    purpose:
      "Employees upload the business web apps they built with the in-house AI platform and browse apps from the same job\nCheck AI learning materials\nCheck their own AI capability level",
    metrics: [
      { value: "119 / month", label: "Web apps uploaded (monthly average)" }
    ],
    roles: [
      "Service planning and information architecture",
      "User flow design: UI/UX and menus such as issuing a PAT, so people use the site without friction",
      "Monthly submission flow design"
    ],
    adminRoles: [
      "Personalized recommendations: colleagues' tools by job, brand, recently viewed and liked"
    ],
    background:
      "Business web apps built with the in-house AI platform multiplied, but who built what and what it achieved was scattered.\nRegister the web app → submit monthly results → evaluate → train now runs as one flow that records AX status automatically.",
    features: [
      {
        eyebrow: "Core feature 01",
        title: "Home: tasks and recommendations the moment you arrive",
        summary: "The first screen shows this month's tasks and the web apps that fit me, together",
        items: [
          { title: "Best web-app banner", body: "Web apps with the BEST badge rotate in a six-slide banner with monthly hours saved and users" },
          { title: "Job and category icon filter", body: "One row of job icons (Fashion, Dashboard, Merchandising, Production…); tap to filter web apps" },
          { title: "This month's tasks sidebar", body: "Deadline D-day, progress and survey status pinned on the right of every screen" }
        ]
      },
      {
        eyebrow: "Core feature 02",
        title: "Web-app registration and monthly submission",
        summary: "A form that states what changed in numbers, plus monthly results; the source data for evaluation and the talent pool",
        items: [
          { title: "4-part form", body: "① Description ② Usage guide ③ What changed (hours saved, KPI) ④ Access. Missing fields listed with reasons" },
          { title: "Usage-guide prompt: eight items that capture know-how", body: "Paste the prompt into the AI for a 1,500+ character guide; operating logic and work tips matter most" }
        ]
      },
      {
        eyebrow: "Core feature 03",
        title: "Requests and inquiries that accumulate automatically",
        summary: "Missing data or stuck on usage? Request or ask in the platform; recurring questions become FAQ",
        items: [
          { title: "Data requests", body: "Request what data is needed and why; tracked by status and turned into DW and graph tasks" },
          { title: "FAQ that builds itself", body: "Answers to recurring questions go to the FAQ on home and Help, so repeats fall" },
          { title: "Admin morning digest email", body: "Every day at 8 a.m., new accounts, submissions, uploads and survey responses emailed to admins" }
        ]
      }
    ],
    image: {
      src: "/projects/fashion-ai-platform.png",
      alt: "Fashion AI Platform home: best web-app banner, category icons and the monthly to-do sidebar",
      caption: "Fashion AI Platform home: best web-app banner · categories · monthly to-do sidebar",
      width: 1777,
      height: 1341
    },
    thumb: {
      src: "/projects/fashion-ai-platform-thumb.png",
      alt: "Fashion AI Platform home screen",
      width: 1000,
      height: 1000
    },
    stack: ["-"],
    tags: ["Registration & submission", "Next.js"]
  },
  "enterprise-agent-integration": {
    group: "④ Enterprise integration",
    title: "Enterprise Agent Integration: From Per-Brand to One",
    short: "Enterprise agent integration",
    subtitle: "Group agents built per brand into brand-level agents, then integrate them into one central harness for the whole company",
    period: "2026 – ongoing",
    status: "Ongoing",
    purpose:
      "Agents built separately by brands such as seven brands are grouped into brand-level agents, standardized with a common contract, knowledge graph and evaluation gate, and finally integrated into one company-wide agent.",
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
      "More than 100 per-brand, per-job agents were built on the in-house AI agent platform but the same sales metric came to be defined differently by brand and the same task was built separately per brand. To merge scattered agents into one, rules and metrics must be standardized first.",
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
        "The structure below is a roadmap. Data and system connections (in-house MCP Gateway) and the register → evaluate → recommend → train loop are in operation; loading rules and KPIs into the graph and promoting agents to skills proceed in stages.",
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
    short: "Recsys serving pipeline",
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
    short: "AI talent pool & evaluation",
    subtitle: "A 100-point system that measures outputs (agents) and people (participation) separately, building a talent pool for rewards, funding and placement",
    period: "2026.01 – in operation",
    purpose:
      "Instead of gut feel, we build quantitative criteria for who uses AI well and what they have produced, and show it as numbers. The results feed reward, funding and placement decisions, creating a virtuous cycle that expands AI talent.",
    metrics: [
      { value: "100 pts", label: "AI evaluation criteria built", note: "two axes: agents · people" },
      { value: "4 tiers", label: "Participation tiers", note: "Leading · Active · Entry · Watch" },
      { value: "5", label: "Member-care signals" },
      { value: "10 stages", label: "Member 360 journey" }
    ],
    roles: [
      "Designed the four public agent-evaluation criteria and the agent score formula; criteria public, grades admin-only",
      "Designed the 100-point participation weights and tiers, calibrating the in-house AI agent platform usage thresholds to the real distribution (40 people)",
      "Designed the talent-pool table, monthly-output popup and overall ranking rule (usage 35 : output 65)",
      "Designed the member 360 journey and care signals, recommended actions and follow-up drafts",
      "Designed the org-level AI usage dashboard (division → brand → department → person drill-down)"
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
          { title: "100-point participation score", body: "12 per uploaded agent (max 36) · advanced training 16 · basic training 8 · 1 per platform visit (max 20) · in-house AI agent 2.0 usage up to 20 (active days 8, messages 8, code sessions 4, each capped) so no single metric dominates." },
          { title: "Four tiers", body: "60+ Leading, 35 Active, 15 Entry, below that Watch. AI-agent usage thresholds were calibrated to the real distribution of the 40 people who also have platform accounts (median 5 active days, top quartile 10, etc.)." },
          { title: "Monthly output and a person's share of hours", body: "Clicking a name in the talent-pool table opens monthly new/version-up counts, change in hours saved, what changed and before/after screens. A person's share = agent hours saved × contribution (equal split by default)." },
          { title: "Overall ranking rule", body: "Scope: this month's AI-agent licence holders. Usage score (active days 40, messages 30, code sessions 30) and output score (Σ monthly hours saved × contribution) are each converted to percentiles and combined 35 : 65. Adjustments: line staff ×1.0, leaders ×1.5, AI office ×0.7; types: output-led, usage-led, balanced. Admin-only." }
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
    catalog: {
      title: "Agent evaluation criteria",
      items: [
        { name: "1. Is the domain clear", body: "1-1. Is the work area and problem whose productivity it raises clearly defined" },
        { name: "2. Did it deliver results", body: "2-1. How many work steps and hours did the agent save\n2-2. Did it deliver quantitative outcomes (sell-through, sell-through value, cost savings, etc.)" },
        { name: "3. Can it spread", body: "3-1. Is it a tool others can adopt, not just the builder (within the team / to other teams)" },
        { name: "4. Is there a next step", body: "4-1. Is the next stage of improvement concrete" }
      ]
    },
    insightsLabel: "Design principles",
    insights: [
      { title: "Measure outputs and people separately", body: "The agent score looks at outputs, the participation score at people. Merged, one agent would hide everything or frequent visitors would float to the top." },
      { title: "Criteria public, grades private", body: "Everyone sees what is evaluated; only admins see grades, rankings and comments." },
      { title: "Verify reported values", body: "Links are checked, and reported KPIs are being compared with DW actuals. Evaluation becomes the basis for what to trust and connect." }
    ],
    image: {
      src: "/projects/talent-pool-table.png",
      alt: "Admin agent-evaluation table: agent name, submission time, 2-1 steps and hours saved with score, 2-2 quantitative outcome before/after with score, 3-1 users and spread score",
      caption: "Admin agent-evaluation table: hours saved · quantitative outcome (before/after) · users and spread, each scored per criterion (builder names and URLs masked)",
      width: 1035,
      height: 780
    },
    thumb: {
      src: "/projects/talent-pool-thumb.png",
      alt: "Admin agent-evaluation table",
      width: 1000,
      height: 1000
    },
    stack: ["Next.js", "Prisma", "Snowflake DaaS", "HR DB integration"],
    tags: ["Talent pool", "Evaluation system", "Dashboard"]
  },
  "ax-discovery-agent-training": {
    group: "① Training",
    title: "Company-wide AI Agent Training",
    short: "AI agent training",
    subtitle: "Small, step by step, repeatedly: employees build AI agents hands-on",
    period: "2026.02 – ongoing",
    purpose: "Designed training, onboarding and operational support to reach a 20% AX conversion rate across the organization.",
    background:
      "To reach 20% AX adoption in-house, small-group, level-based offline training is repeated for employees who do not know where to start. Employees sign up per session to attend, and by the end of every session each person completes one web-based tool of their own.",
    metrics: [{ value: "~500", label: "People trained in AI agents" }],
    roles: [
      "Designed the curriculum and job-specific hands-on exercises",
      "Built the training content: level-based concept training (AI literacy slides, in-house AI agent 2.0 decks, connector deck) and hands-on sessions (6-step build practice, vibe-coding guide)"
    ],
    featuresTitle: "Training content",
    features: [
      {
        "eyebrow": "Part 1",
        "title": "Level-based concept training",
        "summary": "Because skill levels differ widely, one lecture is too hard for beginners and dull for experienced staff, so classes are split by level and kept small. Concept training is the preparation for the hands-on session that follows.",
        "items": [
          {
            "title": "AI literacy basics",
            "body": "Fourteen slides on AI fundamentals and what matters at work. Security principles and one-click deployment guardrails rewritten in plain company language."
          },
          {
            "title": "Classes by level",
            "body": "Beginner, intermediate and advanced classes teach concepts at the right level, removing the problem of a single lecture being hard for beginners and dull for experienced staff."
          },
          {
            "title": "in-house AI agent 2.0 training decks",
            "body": "Classroom decks in two sessions: session 1 (concepts, 41 slides) and session 2 (hands-on, 30 slides)."
          },
          {
            "title": "Connector concept",
            "body": "Explains connectors with a power-outlet analogy instead of developer terms, covering four things to know and the four connections inside a connector."
          }
        ]
      },
      {
        "eyebrow": "Part 2",
        "title": "Hands-on sessions",
        "summary": "Right after concept training, even first-time attendees turn a problem from their own work into one agent and publish it. Completion means one web-based tool of their own by the end of every session.",
        "items": [
          {
            "title": "6-step agent-building practice",
            "body": "Understand AI → define the work problem → write a prompt spec → prototype with Claude Code → security check → prepare to share and deploy. Each step has an output and check questions, with first-agent scenarios for MD, sales, design and CS."
          },
          {
            "title": "5-step vibe-coding guide",
            "body": "Decide what to build → build screens by vibe coding → connect BI data → prepare code for deployment → deploy. A usage-guide prompt makes the builder state operating logic, team tacit rules and KPIs first."
          },
          {
            "title": "One-click deployment",
            "body": "The finished tool is deployed to the in-house PaaS in one click, with a deployment guide session covering guardrail rules and the deployment procedure."
          },
          {
            "title": "Build and deploy support after the session",
            "body": "FAQ, 1:1 inquiries, data requests and offline help sign-up resolve whatever blocks people after the session."
          }
        ]
      }
    ],
    steps: ["Hands-on agent training", "Build & deploy support"],
    image: {
      src: "/projects/ax-training.jpg",
      alt: "Explaining the one-click deployment guide file from the podium at a training session",
      caption: "AI agent-building training: one-click deployment guide session",
      width: 2048,
      height: 1536
    },
    images: [
      { src: "/projects/ax-connector-slide.png", alt: "Training slide ‘What is a connector?’: the power-outlet analogy for plugging Claude into company systems, four things to know (connect only the company connector, ‘no data’ when disconnected, read-only, company login required), and the four connections inside (dw-mcp company DW, graph-mcp knowledge graph, mail-mcp mail and calendar, hr-mcp HR system)", caption: "Connector training material", width: 2400, height: 1400 }
    ],
    tags: ["AI agent training", "Training", "Onboarding"]
  },
  "naver-channel-strategy": {
    group: "Online channel strategy",
    title: "Redefining the Naver Channel Sales Strategy",
    short: "Naver channel strategy",
    subtitle: "Why it was customer-structure redesign, not channel expansion",
    period: "2024.01 – 2024.02",
    purpose: "Redesigned product, content and channel messaging from an analysis of each customer group's entry motives, lifting channel sales.",
    background:
      "The Naver channel was run on the assumption that more channels meant more sales, but growth had stalled. Live broadcasts stayed around 100 million KRW per show with a 0.8% purchase conversion rate, and exposure kept growing without anyone looking at who came in and why they left without buying.\nCustomer segments' entry motives and buying criteria had to come first, with products, content and pricing redesigned around them.",
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
      alt: "Brand B official store on Naver Shopping Live",
      caption: "Naver Shopping Live channel",
      width: 1056,
      height: 820
    },
    images: [
      {
        "src": "/projects/naver-live-results.png",
        "alt": "Before-and-after bar chart: live conversion from 0.8% to 1.9% and sales per show from 100M to 290M won",
        "caption": "Live commerce results: conversion 0.8% → 1.9%, sales per show 100M → 290M won (year on year)",
        "width": 1600,
        "height": 760
      }
    ],
    tags: ["Customer analysis", "Channel strategy", "Live commerce"]
  },
  "padding-rebranding-strategy": {
    group: "Product portfolio strategy",
    title: "the sports brand Padding Rebranding Strategy",
    short: "Padded-jacket rebranding",
    subtitle: "Designing core products from big data",
    period: "2024.11 – 2024.12",
    purpose: "Redefined product strategy and marketing messages from sales, review and platform data by age group.",
    background:
      "Customers wanted better value for the same money, and padded jackets were shifting from natural to synthetic fill.\nOur planning carried over last year's top styles, missing customers under 30 and men in their 30s.",
    metrics: [{ value: "100%", label: "Sales growth among customers under 30" }],
    roles: ["Analyzed men's and women's needs for padding items", "Analyzed three years of our own padding sales by item", "Analyzed reviews of top-selling items on the three key platforms"],
    image: {
      src: "/projects/padding-search.png",
      alt: "Search-volume analysis by apparel category: outerwear searches fell while off-season padding searches rose 183%",
      caption: "Market analysis: shrinking padding demand, growing off-season padding demand",
      width: 1686,
      height: 1174
    },
    images: [
      { src: "/projects/padding-01-economy.webp", alt: "Market slide: IMF growth projection for Korea 2.5% in 2024 and 2.2% in 2025, Bank of Korea forecast cut from 2.1% to 1.9%, and a table showing consumer spending at 71% of disposable income", caption: "[Market] Slowing growth: 1.9% forecast for 2025, consumer spending at a 71% ceiling of disposable income", width: 1701, height: 1177 },
      { src: "/projects/padding-02-synthetic-fill.png", alt: "Bar chart of fill materials among top-ranked padded jackets: natural fill 82% (36 styles) in 2022, 64% (28) in 2023, 37% (15) in 2024; synthetic fill 18% → 36% → 63% (26 styles)", caption: "[Market] Synthetic fill rising every year: natural (goose/duck) 82% → 64% → 37%, synthetic 18% → 36% → 63%", width: 1683, height: 1162 },
      { src: "/projects/padding-03-nuptse-onball.png", alt: "Three-year trend by The North Face product: Nuptse -38%, Himalayan -37%, Onball +57%, Summit +6%, Matterhorn and Matier new", caption: "[Benchmark] Falling Nuptse, rising Onball: down jackets decline while the synthetic-fill Onball grows 57%, a value choice weighing warmth and price together", width: 1692, height: 1176 },
      { src: "/projects/padding-04-30s-men.png", alt: "Gender share and age distribution for brands and lightweight jackets: National Geographic and Discovery centered on 40s with 70% women; The North Face and Arc'teryx lightweight jackets 46% and 67% men (+8%p, +9%p) centered on 30s", caption: "[Benchmark] Men in their 30s choose The North Face and Arc'teryx: the old benchmarks skew to 40s and women, the new ones to 25–39 and men", width: 1647, height: 1154 }
    ],
    catalog: {
      title: "Four findings",
      items: [
        { name: "[Market] Growth slows, spending at its ceiling", body: "1.9% growth forecast for 2025, spending at 71% of income. Not closing wallets, but choosing better value for the same money." },
        { name: "[Market] Synthetic fill rising every year", body: "In top-ranked jackets, natural fill fell 82% → 37% and synthetic rose 18% → 63% (2022 → 2024). That is why prices fell." },
        { name: "[Benchmark] Falling Nuptse, rising Onball", body: "The North Face Nuptse -38%, Himalayan -37%, synthetic-fill Onball +57%. A value choice weighing warmth and price." },
        { name: "[Benchmark] Men in their 30s choose The North Face and Arc'teryx", body: "Old benchmarks skew to 40s and 70%+ women, like ours. The North Face and Arc'teryx lightweight jackets: 46% and 67% men, led by 30s." }
      ]
    },
    steps: ["Market: economy and spending","Market: fill materials of top-ranked jackets","Benchmark: competitor product trends","Benchmark: age and gender preference","Redefine core products and message"],
    tags: ["Product strategy", "Review analysis", "Search trends"]
  },
  "china-brand-churn-analysis": {
    group: "Product portfolio strategy",
    title: "Customer Churn Analysis for a Premium Brand in China",
    short: "China brand churn analysis",
    subtitle: "Six non-customer studies to find ‘brand casual’, localized for white-collar (白领) women",
    period: "2025.02 – 2025.04",
    purpose:
      "Cross-checked non-customer interviews, street-style surveys, review big data and social media to find why sales fell and whom to win, carried through to SS and FW product input.",
    metrics: [
      { value: "+8%", label: "Sales growth vs. same month last year", note: "from decline to growth" },
      { value: "▲320%", label: "FW denim order value", note: "4 styles added" },
      { value: "6", label: "Customer-research methods run from zero", note: "46 interviews · 11 shop-alongs · 98 surveys · 177 garments · 2,100 outfits · review big data" }
    ],
    roleLead: "Proposed cutting formal-led products and rebuilding around shirts, denim and business casual.",
    roles: [
      "Defined the cause of declining sales as a shift in customers' workwear norms, not the products",
      "Ran six customer-research methods from zero, revising questions and methods each round, and wrote them up as the product customer-research validation process",
      "Derived steady and trend types per item and customers' top needs and complaints from three years of Tmall top-20 sales data and review big data",
      "Documented basics and differentiators for dresses, denim, knits/cardigans, shirts, tees and jackets by learning from benchmarks (Ralph Lauren, Edition, MO&Co., Uniqlo)",
      "Decided SS and FW inputs (type, fit, color, fabric) with the local merchandising team"
    ],
    background:
      "The brand kept decade-old hits such as glossy colored blouses, and sales fell 27% a year.\nOffice dress had gone casual, but only formal suiting remained: clothes ‘worn one day a week’.",
    catalog: {
      title: "Findings and strategy",
      items: [
        { name: "[Research] Six customer studies + three-year trends", body: "Cross-checked interviews, shop-alongs, surveys, dry-cleaner counts, outfits and review big data. Three-year sales trends, not last season's bestsellers." },
        { name: "[Diagnosis ①] Wearable one day a week, so a waste of money", body: "Office dress went casual; the brand stayed formal. 21% wore formal clothes daily, 70% said it had only formal clothes." },
        { name: "[Diagnosis ②] The customer to win: global-minded white-collar women", body: "Women aged 35–45 at large companies, 44% global-brand buyers. The brand's gold trims and loud colors read as ‘old’." },
        { name: "[PART ① brand casual] Expand to the dual TPO of daily commute and weekend shopping", body: "Dual TPO, where formality and comfort both matter, is largest at 52%, with 69% mid-to-high-priced brand purchases: the opportunity." },
        { name: "[Type and fit] Relaxed fit for formal types, regular fit for the rest", body: "Regular fit reads formal, looser reads casual. Of 2,013 outfits: loose-fit jackets 73%, regular-fit shirts 73%." },
        { name: "[PART ② Localization] At this price, versatility and quality-led luxury", body: "Good design is the baseline; versatility and quality-led luxury decide the purchase. Positioned between SPA and premium brands." },
        { name: "[Execution] SS and FW inputs", body: "SS: brand casual types added (delivered 31 March). FW: 4 denim styles (order value up 320%), 15 shirt styles, 6 shirt-dress styles." }
      ]
    },
    steps: ["Six non-customer studies", "Diagnosis: once-a-week wear · customer mismatch", "PART ① brand casual principles", "PART ② Localizing to white-collar needs", "Basics and differentiators per item", "SS · FW product input"],
    image: {
      src: "/projects/scofield-store.png",
      alt: "A the brand store inside a department store in China",
      caption: "Store in China",
      width: 897,
      height: 581
    },
    images: [
      {
        "src": "/projects/china-research-key-findings.png",
        "alt": "Charts: 21% wear formal clothes daily vs 70% say the brand only has formal clothes; workwear TPO 21% formal, 52% dual, 27% casual; fit shares from the outfit survey",
        "caption": "Key research numbers: formal demand 21% vs 70% supply perception, dual TPO 52%, actual outfit fits",
        "width": 1800,
        "height": 820
      }
    ],
    tags: ["Overseas market", "Customer research", "Product localization"]
  }
};
