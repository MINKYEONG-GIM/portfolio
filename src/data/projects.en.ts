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
    title: "Enterprise AI Platform",
    short: "Enterprise AI Platform",
    question: "What NoA, the in-house AI agent platform, is and how it was built",
    tagline: "Snowflake → Knowledge graph → MCP / Skills → Agent platform",
    summary:
      "NoA, the in-house AI agent platform, standardizes the DW, M365, HR and the knowledge graph as MCP servers connected to Claude, and turns power users' habits into skills distributed to everyone. Employees ask in plain language, build agents for their own work, publish them, and submit results every month. As of September 2026: 116 agents and 8,180 hours saved per month. The projects below are the pieces of this platform, from infrastructure to enterprise integration.",
    visual: {
      type: "image",
      src: "/projects/noa-bi.png",
      alt: "Asking NoA (the in-house AI agent platform) for a store's monthly sales in plain language; it looks up the metric definition in the knowledge graph, queries the DW and answers with sources",
      width: 1226,
      height: 1051,
      caption: "NoA noa-bi skill: question → knowledge graph → DW query → sourced answer"
    }
  },
  2: {
    title: "AI Talent Management",
    short: "AI Talent Management",
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
    title: "Service Planning, Build & Operations",
    short: "Service Build",
    question: "Services I planned, built and operated end to end",
    tagline: "Problem definition → Data structure design → Build → Operate & improve",
    summary:
      "Projects where I did not stop at requirements: I designed the data structure and service logic, built the service and ran it. PIM pulled scattered product data into one hub; the RAG search service turned image-only strategy decks into searchable knowledge.",
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
    group: "Data hub",
    title: "PIM Data Integration System",
    short: "PIM",
    subtitle: "A product-information hub that manages every product attribute in one place and lets AI generate channel-ready listings published straight to online channels",
    period: "2025.09 – 2026.03",
    purpose:
      "Upload product information once into PIM: product name, price, materials, model shots, flat-lay shots, thumbnails. AI then adapts it to each online channel's listing rules (naming conventions, promotional copy, categories, image specs) and publishes through the OMS. The goal is to end re-entering the same product data channel by channel.",
    metrics: [
      {"value":"6 days → 1 hour","label":"Listing lead time","note":"from receiving to on sale"},
      {"value":"100%","label":"Standard listings automated","note":"only events and promotions remain: 80% of time saved"},
      {"value":"54%","label":"Non-value work spent on listing","note":"3-week MD/AMD census, 1,865 h per month"},
      {"value":"30% → 70%","label":"Structure that enables staffing efficiency"}
    ],
    roles: [
      "Defined what PIM manages: product code, name, material, color, size, price, inventory and images (model, flat-lay, thumbnail) as the single source of product truth",
      "Mapped where data is created and how it flows across SAP, BI, local storage, Google Drive and email",
      "Designed the Snowflake-based PIM storage structure and the OMS integration schema",
      "Designed the generative-AI workflow: per-item keyword extraction, channel-specific names and promotional copy, image spec adaptation",
      "Turned interviews with MD, photo and ops teams into requirements for listing procedures and per-channel rules"
    ],
    background: 
      "Three weeks of shadowing MDs and AMDs and doing their work showed that 54% of non-value-adding work was ‘product listing and management’ (1,865 hours a month). Three core bugs: ① product data was scattered across SAP, BI, local folders, drives and email; ② the process ran on habit; ③ every channel needed manual adjustment to its own format.\nSo a PIM (Product Information Management) system managing all product data in one place was needed. Global SPA brands and leading fashion companies already used one; the company had partial functions in the Elandmall back office and EHUB, but nothing complete, so no process had ever been established.",
    features: [
      {
        eyebrow: "Core feature 01",
        title: "Single source of product information",
        summary: "Everything about a product lives in PIM. Entered once, the same values feed every channel.",
        items: [
          { title: "Core attributes", body: "Product code, name, material, color, size and other base attributes, standardized across brands that used to differ." },
          { title: "Price and inventory", body: "List price, discount price and stock synced from SAP and BI so nothing is edited per channel." },
          { title: "Image assets", body: "Model shots, flat-lay shots, thumbnails and detail images managed by purpose and spec. The photo team uploads once; channel-specific versions are derived." },
          { title: "10+ brands unified", body: "Product data scattered across brand folders, sheets and email brought into one structure." }
        ]
      },
      {
        eyebrow: "Core feature 02",
        title: "AI-powered channel listing",
        summary: "Once product data is in, AI produces each channel's listing and publishes it through the OMS.",
        items: [
          { title: "Per-item keyword extraction", body: "Keywords for search and classification extracted from product data and images, usable inside PIM." },
          { title: "Channel-specific listing copy", body: "Product names, promotional copy and categories generated to each platform's rules." },
          { title: "Automatic image specs", body: "Images converted to each channel's thumbnail ratio, file size and background requirements." },
          { title: "OMS-linked publishing", body: "Processed listings flow through the in-house OMS to each online channel, with no manual re-entry on channel screens." }
        ]
      },
      {
        eyebrow: "Core feature 03",
        title: "Image hub UI: once a photo comes in, the product reaches the channels",
        summary: "Images uploaded by the photo team are matched to style codes automatically, and each style's progress from review to channel images to detail pages is visible on one screen.",
        items: [
          { title: "Home: image grid and filters", body: "Upload date, uploader, brand (SPAO, SPAO Kids, MIXXO, ROEM, SHOOPEN and more), color filters and a ‘registration error’ badge locate any of tens of thousands of images (e.g. 34,031) at once. Grid and list views, drag-and-drop bulk upload." },
          { title: "Image details", body: "File name, brand, style code, colors (multiple), cut type (campaign, tag/inner tag, flat-lay detail/front, model), search keywords, size, uploader and upload time in one panel, with edit and download. Files are matched automatically by the naming rule style code_color_cut type." },
          { title: "Style status", body: "Search one style code to see each stage with its last update: style information review (pending/done) → image upload (count per cut type) → channel image generation → detail page generation. Colors whose detail page failed get a ‘retry’ button." },
          { title: "Menu", body: "Work status, style information, image information, detail pages, My Pocket, other materials, per-channel information, master data, permissions, trash and AI search. Role-based permissions let the photo, listing and e-commerce teams use the same screens differently." }
        ]
      }
    ],
    system: {
      intro:
        "PIM completes the product flow after receiving in one line. When merchandising registers a product in PLM, receiving and inventory registration trigger a new-product alert; photographed (later 3D-generated) images enter the image hub via E-HUB upload or API. AI builds the detail page (Picasso) and thumbnails, a per-channel data-optimization agent fits each channel's format, and E-Hub sends to every channel. The six layers below are the image hub's structure.",
      layers: [
        { name: "1. Bulk upload", role: "Drag and drop many images at once. Re-uploads such as added model shots notify detail-page production (Picasso).", items: [{ label: "Drag-and-drop bulk upload", note: "style code, color and cut type recognized from the file name" }, { label: "Re-upload", note: "added model shots etc. → Picasso notified" }, { label: "Error badge", note: "unmatched files flagged on the home screen" }] },
        { name: "2. Image management", role: "Each image gets its type, product traits and product information, becoming a searchable asset.", items: [{ label: "① Image type", note: "front/back/detail, product/model/concept shot" }, { label: "② Product traits", note: "material · mood" }, { label: "③ Style-code link", note: "SAP data (name, price) joined with PIM disclosure data" }] },
        { name: "3. Auto-editing", role: "Images are adjusted automatically to channel specs.", items: [{ label: "① Resizing", note: "size · ratio" }, { label: "② Retouching", note: "brand logo removal, background removal and more" }] },
        { name: "4. Search", role: "Find by product information or by similar image.", items: [{ label: "Product-information search", note: "style code · item name · color" }, { label: "Similar-image search", note: "find images with an image" }, { label: "AI search", note: "natural-language search for product images" }] },
        { name: "5. Download", role: "Select the images you need and download them in bulk.", items: [{ label: "Select and bulk download", note: undefined }, { label: "My Pocket", note: "keep frequently used images" }] },
        { name: "6. Share", role: "Like Google Maps, bundle only the images you want to share and edit.", items: [{ label: "Shared image bundles", note: undefined }, { label: "Edit inside a shared bundle", note: undefined }] }
      ],
      flow: [
        { title: "PLM product registration", body: "Merchandising registers the product in PLM (planning and production) and the base data flows to PIM." },
        { title: "Receiving and inventory → new-product alert", body: "When logistics registers receiving and inventory, the listing team is alerted automatically instead of digging through inventory to spot new products." },
        { title: "Shooting · 3D generation → E-HUB upload / API", body: "Photo-team shots (later 3D renders) enter the image hub by E-HUB upload or API. The Google upload and email steps disappear." },
        { title: "Detail page production (Picasso)", body: "AI generates models, proposes sales copy, builds the detail page and writes SEO tags. Sample requests, measuring, inner-tag checks and disclosure images are replaced by PIM data." },
        { title: "Thumbnail and detail-page upload", body: "Generated thumbnails and detail pages attach to the style code automatically." },
        { title: "Per-channel data-optimization agent", body: "An agent converts data to each channel's naming rules, categories, image specs and promotional copy: the step people used to adjust by hand." },
        { title: "E-Hub listing → all channels", body: "One listing in E-Hub is sent to every channel (Elandmall, Sabangnet, Cafe24, Naver, Musinsa, Zigzag and more)." },
        { title: "Monitoring dashboard", body: "Displayed styles are managed in one place, blocking the human error of ‘received but never on sale’. People become supervisors who review and improve AI logic." }
      ],
      principles: [
        { title: "One source for product information", body: "Names, prices, materials, disclosure data and images originate only in PIM; channels consume them. Scattered data was core bug no. 1." },
        { title: "Agents, not people, fit channel formats", body: "Per-channel rules live in the data-optimization agent; when a rule changes, only the agent changes. This removes core bug no. 3, manual adjustment." },
        { title: "People supervise, they do not operate", body: "Standard listings are 100% automated. People review and feed back better AI logic, and only work that needs a platform MD, such as event listings and promotions, remains." },
        { title: "Linked to PLM, from production to after-sales", body: "Connected with PLM, PIM gives integrated product analysis from production to post-sale service and becomes the system base for global channel expansion." }
      ]
    },
    catalog: {
      title: "Ways of working: AS-IS → TO-BE, and the four changes",
      items: [
        { name: "[AS-IS] The old way — seven core bugs", body: "Merchandising registers in SAP → logistics registers receiving and inventory → the listing team digs through inventory to find new products (bug) → lists without photos → requests samples from logistics → measures and checks inner tags (bug) → makes disclosure images (bug) → photo team shoots → Google upload and email (bug) → detail page production (bug) → thumbnails and pages entered → Elandmall image upload (bug) → e-commerce team lists separately in Elandmall, Sabangnet and E-Hub (bug) → sent to Cafe24, Naver, Musinsa, Zigzag. Five teams passed the same information along, re-typing it each time." },
        { name: "[TO-BE] After the system — one PIM flow", body: "PLM registration → new-product alert on receiving → shooting / 3D generation → E-HUB upload / API → detail page (Picasso) → automatic thumbnail and page upload → per-channel optimization agent → E-Hub listing → all channels. Re-typing steps disappear; the listing team only reviews and handles exceptions." },
        { name: "Change ① Lead time from 6 days to 1 hour", body: "Listing lead time from receiving to on sale drops from an average of 6 days to at most 1 hour." },
        { name: "Change ② People no longer intervene", body: "Standard listings are 100% automated. People become supervisors who review and improve AI logic rather than operators, and only tasks that need a platform MD, such as event listings and promotions, remain, saving 80% of the time." },
        { name: "Change ③ Take the photo and AI does the rest", body: "Model generation, sales copy, detail pages, channel-specific image conversion and SEO tags. The page is created and listed as the shot is taken; once 3D modeling is ready, products can go on sale at planning without a shoot." },
        { name: "Change ④ No more ‘received but not on sale’", body: "A monitoring dashboard managing every displayed style completely blocks the human error of products received but never put on sale." },
        { name: "Data as an asset, and what it enables", body: "All sales-side product information (images, names) becomes data that strengthens AI training. Products become searchable by image and natural language, and customer-facing data absent from production data enables new models such as AI merchandising, AI recommendations and AI short-form content. Linked to PLM, PIM provides integrated analysis from production to after-sales and underpins global channel expansion." }
      ]
    },
    steps: ["3-week MD/AMD work census","Define the three core bugs","PIM attributes and data flow","Build the image hub","AI detail pages and channel-optimization agent","E-Hub → all channels automatically"],
    image: {
      src: "/projects/pim-pipeline.png",
      alt: "Pipeline design: SAP BI → Snowflake → PIM DB → PIM system → in-house OMS → online channels, with AI handling keyword extraction and channel-specific listing copy",
      caption: "PIM pipeline: product data in → AI processing (keywords, channel listings) → OMS → online channels",
      width: 1667,
      height: 784
    },
    images: [
      { src: "/projects/pim-asis-process.png", alt: "AS-IS listing process: merchandising (SAP registration) → logistics (receiving, inventory) → photo team (shooting, Google upload and email) → listing team (spotting new products from inventory, listing, sample requests, measuring and inner-tag checks, disclosure images, detail pages, thumbnails, Elandmall image upload) → e-commerce team (Elandmall, Sabangnet and E-Hub listings → Cafe24, Naver, Musinsa, Zigzag). Seven red boxes are the core bugs", caption: "[AS-IS] The old listing process: the same information re-typed by people across five teams. The seven red boxes are the core bugs", width: 1684, height: 1150 },
      { src: "/projects/pim-image-hub-home.png", alt: "Image hub home: left menu (work status, style information, image information, detail pages, My Pocket, other materials, per-channel information, master data, permissions, trash, AI search), filters for upload date, uploader, brand and color with a registration-error badge, and a grid of 34,031 images", caption: "Image hub home: upload date, uploader, brand and color filters plus a ‘registration error’ badge locate any of tens of thousands of images in the grid", width: 1197, height: 903 },
      { src: "/projects/pim-image-detail.png", alt: "List view with the image detail panel on the right: file name, brand, style code, colors, cut type, search keywords, size, uploader, upload time, and edit/download buttons", caption: "Image details: the file-name rule (style code_color_cut type) auto-matches style code, colors and cut type, with search keywords viewed and edited in one panel", width: 1197, height: 883 },
      { src: "/projects/pim-style-status.png", alt: "Style status for one style code: style information review (pending) → image upload (2 flat-lay, 1 campaign, done) → channel image generation (done) → detail page generation (pending), with per-color detail-page status and retry buttons for failures", caption: "Style status: review → image upload → channel image generation → detail page generation per style on one screen, with ‘retry’ for colors whose page failed", width: 1381, height: 875 }
    ],
    stack: ["Snowflake", "SAP", "OMS", "Generative AI"],
    tags: ["PIM", "Product information", "AI channel listing"]
  },
  "daas-paas-operations": {
    group: "② Infrastructure",
    title: "PaaS-based Service Operations",
    short: "PaaS operations",
    subtitle: "An in-house PaaS that deploys the apps non-developers build and provides the DB, file storage and schedules they need",
    period: "2026.03 – ongoing",
    purpose: 
      "An in-house PaaS where line staff deploy the web tools they build without developer help and get operations support. Overall deployment status, per-app MAU and call counts, and deployment domains are managed in one place.",
    background:
      "As line staff put the web apps they built on external services one by one, problems piled up. Nobody could manage where or how company information was stored, company data leaked out through external DBs and hosting, and each person paid separately for domains and hosting.\nThe in-house PaaS was built to bring deployment inside the company, manage it in one place, and consolidate internal information, security and cost.",
    metrics: [{ value: "90%", label: "Deployment success rate", note: "n=235 deployments" }],
    roles: [
      "Operated serverless deployment of Next.js apps and analyzed deployment failures",
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
    steps: ["One-click deploy via ZIP or Git", "Ship deployment guardrails", "Automate pre-deploy checks with a Claude skill", "Run schedules, DBs and storage", "Fewer inquiries · self-service"],
    image: {
      src: "/projects/paas-dashboard.png",
      alt: "PaaS dashboard: one-click deploy shortcut, project/schedule/DB/file-storage/limit cards, and my projects with ZIP deployment, error counts, service status and last success time",
      caption: "PaaS dashboard: one-click deploy · projects, schedules, DBs, storage and limits · my project status",
      width: 1553,
      height: 746
    },
    images: [
      {
        src: "/projects/paas-my-dashboard.png",
        alt: "Personal dashboard: my 3 projects with deployment URL, last success time and error count, my DB and file storage usage, my schedules, and runtime errors in the last 24 hours",
        caption: "Personal dashboard: the status and errors of the apps I deployed, my DB and file storage usage, my schedules and the last 24 hours of runtime errors on one screen",
        width: 1302,
        height: 1062
      }
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
      "Converted document and chart images to text and structured them as searchable data",
      "Built the vector DB and implemented contextual search on the GPT API",
      "Iterated on preprocessing and retrieval logic through repeated user tests",
      "Expanded to the main screen of the group-wide training program"
    ],
    background:
      "Fifteen years of high-quality strategy documents existed, but image-heavy slides stored as files made them unsearchable. The knowledge asset was there; the structure to use it was not.",
    system: {
      intro:
        "Internal PPT, Excel, PDF and Word originals are converted into JSON with text and source information, vectorized with the OpenAI Embeddings API and stored in a separate vector DB. When a user asks a question, the question is vectorized the same way, similar document chunks are retrieved, and only the retrieved results are passed to the GPT API, which answers with the source document and page. Composition: JSON files → Embeddings API → vector DB → search code → GPT API.",
      layers: [
        {
          name: "① Internal source files",
          role: "Fifteen years of strategy material. Many are image-heavy PPTs that cannot be searched as they are.",
          items: [{ label: "PPT · Excel · PDF · Word" }, { label: "OCR / image-to-text", note: "text inside charts and images" }]
        },
        {
          name: "② Document processing and JSON conversion",
          role: "Documents are split into search units and tagged with their source as JSON.",
          items: [{ label: "Text extraction" }, { label: "Document splitting", note: "chunks per page or slide" }, { label: "Source metadata", note: "file name · page · owning department · date" }]
        },
        {
          name: "③ Building the search data",
          role: "Text in the JSON is converted into vectors with the embeddings API and stored in a vector DB. Documents must use the same model as questions for similarity search to work.",
          items: [{ label: "Embedding generation", note: "OpenAI Embeddings API" }, { label: "Vector DB storage", note: "self-hosted vector DB (98% below the allocated budget)" }]
        },
        {
          name: "④ User question",
          role: "Employees ask in everyday words, e.g. “find last year's F/W sale strategy deck”.",
          items: [{ label: "Natural-language question" }, { label: "User and department", note: "used for permission filters" }]
        },
        {
          name: "⑤ Question search",
          role: "Question embedding → related-document search → top results. Hand-written search code owns this stage.",
          items: [
            { label: "Python or TypeScript", note: "search-flow code that takes the question, calls the search API and organizes results" },
            { label: "Embedding model", note: "e.g. OpenAI text-embedding-3-small — converts the question into a numeric vector" },
            { label: "Vector DB or vector search service", note: "e.g. PostgreSQL + pgvector, Chroma, OpenAI Vector Store — returns similar chunks with source and relevance score" },
            { label: "Result filtering and ranking", note: "keep only highly relevant documents; restrict by department, document date and access permission" }
          ]
        },
        {
          name: "⑥ GPT API call",
          role: "Only the retrieved document content is sent to the model, with answer instructions so it does not invent anything outside the documents.",
          items: [{ label: "User question + retrieved document content + answer instructions" }]
        },
        {
          name: "⑦ Final answer",
          role: "The answer is shown with its source documents and pages so the user can jump to the original.",
          items: [{ label: "Answer" }, { label: "Source documents and pages" }]
        }
      ],
      flow: [
        { title: "Question", body: "Ask in everyday words, e.g. “find last year's F/W sale strategy deck”." },
        { title: "Question embedding", body: "The question is vectorized with the same embedding model used for the documents." },
        { title: "Similar-document search", body: "The vector DB returns the chunks closest to the question, each with content, source and relevance score." },
        { title: "Filtering and ranking", body: "Only top results by relevance are kept, then filtered again by department, date and access permission." },
        { title: "GPT API call", body: "Question + selected document content + answer instructions produce the summary or answer." },
        { title: "Answer with sources", body: "Source documents and pages are attached below the answer so users can check the original immediately." }
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
    thumb: {
      src: "/projects/rag-search-thumb.png",
      alt: "The assistant character searching the knowledge bank",
      width: 800,
      height: 800
    },
    stack: ["OCR", "Vector DB", "GPT API"],
    tags: ["RAG", "Vector search", "Knowledge management"]
  },
  "noa-mcp-agent-platform": {
    group: "① Agent platform",
    title: "Ontology-based Enterprise AI Agent Platform",
    short: "AI agent platform (NoA)",
    subtitle: "An enterprise AI agent platform where internal data, metrics and business rules are defined as an ontology (knowledge graph) and every MCP server runs on that ontology. Known internally as NoA",
    period: "2025.11 – ongoing",
    purpose: 
      "Load the company's metric definitions and business rules into a Neo4j ontology (knowledge graph) so that LLM agents answer against that graph, giving every employee a work environment where they can build job-specific agents grounded in company data.",
    metrics: [
      { value: "116", label: "Agents completed", note: "as of Sept 2026" },
      { value: "8,180 h / month", label: "Work hours saved by agents", note: "as of Sept 2026" }
    ],
    roles: [
      "Ontology design: a knowledge-graph schema with metrics, tables, columns, brands, stores and seasons as nodes, and formulas, joins, usage conditions and synonyms as relationships",
      "Knowledge graph build: loaded official metric definitions and golden SQL into Neo4j, and used Cypher queries to find missing or conflicting definitions and validate them against the DW",
      "MCP server development: packaged graph lookups (resolve, read_cypher) and DW queries as MCP tools, with read-only and own-permission security principles",
      "Skills and hooks: fixed the procedure 'one graph lookup → SQL → read-only run' as skills, and designed hooks that store user corrections and company decisions in the context graph",
      "Plugin rollout and offline training: Claude org administration (connectors, org instructions, permissions), employee training design and delivery",
      "Company-wide promotion: weekly use-case content planned and broadcast across all affiliates"
    ],
    background:
      "Even after connecting AI agents to internal data, the same 'sales' figure was computed differently by brand and by person, because the model guessed tables and formulas. After two or three wrong sales or profit numbers, trust collapsed and usage dropped.\nWhat was needed before more connections was a meaning the company had agreed on. Metric definitions, formulas, joins, season rules and unwritten rules were loaded into one ontology, and the structure was changed so that every agent queries that graph before writing any SQL.",
    system: {
      intro:
        "This platform (NoA) puts agents on top of an ontology. A Neo4j knowledge graph sits in the middle; hooks, skills and MCP tools all query it before they act. Users only ask questions in Claude Desktop or Code, and the six layers below take the question through org instructions → hooks → skills → MCP tools → gateway → ontology and internal data. Every layer keeps the read-only and own-permissions principles.",
      layers: [
        {
          name: "1. Client Layer",
          role: "Where employees enter. Turning on the noa plugin in Claude Desktop, Claude Code or Cowork attaches every layer below.",
          items: [
            { label: "Claude Desktop · Code · Cowork" },
            { label: "noa plugin", note: "bundle of skills, hooks and MCP connectors" },
            { label: "Org connector registration", note: "deployed per organization by admins" },
            { label: "SSO login", note: "queries run with the user's own permissions" }
          ]
        },
        {
          name: "2. Policy & Context Layer",
          role: "Inserts company rules and context before the question reaches the model. Org instructions and hooks read the context graph, the ontology's 'event layer'.",
          items: [
            { label: "Org instructions", note: "rules for everyone, e.g. what to do when an MCP connection fails" },
            { label: "SessionStart hook", note: "personalization and memory rules, NoA Vibe development rules (read the docs first)" },
            { label: "UserPromptSubmit hook", note: "finds past corrections, golden SQL and company decisions in the context graph and prepends them to the question" },
            { label: "Safety principles", note: "read-only · own permissions · no personal-data columns · verify the person in charge is still employed" }
          ]
        },
        {
          name: "3. Agent Runtime",
          role: "The Claude model understands the question, picks the skill whose trigger matches and calls tools in order. Meaning is asked of the graph, never guessed.",
          items: [
            { label: "Claude model", note: "reasoning · SQL writing · answer writing" },
            { label: "Skill triggers", note: "skills selected by keyword and request type" },
            { label: "Memory", note: "per-user preferences and team rules kept as files; new definitions are recommended for ontology registration" }
          ]
        },
        {
          name: "4. Capability Layer (skills)",
          role: "Power users' procedures turned into skills. A skill holds no rules itself; it only says how to query the graph and which tools to call in which order.",
          items: [
            { label: "noa-bi", note: "natural-language KPI queries: one graph resolve → SQL → read-only DW run" },
            { label: "noa-1p", note: "brand weekly-report RAG: original chunks retrieved via the graph's vector index" },
            { label: "noa-ebg", note: "customer-research judgments and guidance from the EBG graph" },
            { label: "noa-onboarding", note: "expenses, policies, general affairs and other internal knowledge search" },
            { label: "noa-hr-attend", note: "leave balance, requests and approvals" },
            { label: "noa-outlook", note: "mail and calendar reading and writing" },
            { label: "noa-vibe", note: "building and preparing apps for deployment on the company standard" },
            { label: "usage-guide-writer · tacit-rule-interview · monthly-submit-helper", note: "interview-style skills that draw out unwritten rules as ontology candidates" }
          ]
        },
        {
          name: "5. Tool Binding Layer (MCP tools)",
          role: "The tools skills actually call. One MCP server per system, and the tool names are the whole list of allowed actions. The ontology lookup tools come first.",
          items: [
            { label: "neo4j-mcp", note: "resolve (meaning of metrics, stores, seasons) · read_cypher (read-only Cypher queries) · search_1p_report · ebg_search · onboarding_search" },
            { label: "snowflake-mcp", note: "run_snowflake_query (read-only)" },
            { label: "hrlink-mcp", note: "leave info, requests, approval lines, approve, cancel" },
            { label: "outlook-mcp", note: "read, send and reply to mail; create and update events" }
          ]
        },
        {
          name: "6. Ontology & Data Layer (NoA MCP Gateway → ontology · internal data)",
          role: "A central group of remote MCP servers receives every tool call in one place and checks authentication and permissions. The ontology (knowledge graph) sits in the middle; the DW, M365 and HR are sources read according to its definitions.",
          items: [
            { label: "Neo4j ontology · knowledge graph", note: "metric definitions, formulas, joins, golden SQL, brand/store/season dictionaries, EBG, onboarding, 1P report vector index, context graph (corrections and decisions)" },
            { label: "Snowflake DW (EDW)", note: "standard models KF_* and *_AGGR — only the tables and columns the ontology points to are queried" },
            { label: "M365 Graph", note: "mail and calendar" },
            { label: "HR Link", note: "attendance and approvals" },
            { label: "NoA Vibe (PaaS)", note: "one-click deployment of employee-built apps" }
          ]
        }
      ],
      flow: [
        { title: "Question", body: "Ask in everyday words, e.g. “What were SPAO Gangnam's sales this May?”" },
        { title: "Context injection", body: "The UserPromptSubmit hook finds related corrections (e.g. 26SS starts on 25 January), golden SQL and company decisions in the context graph and prepends them." },
        { title: "Skill selection", body: "The keyword ‘sales’ turns on the noa-bi skill, which proceeds by its fixed procedure." },
        { title: "Ontology lookup", body: "One graph resolve returns the metric definition (sales = SUM(SALEAMT)), measure columns, join conditions, store codes and season ranges. The model does not guess." },
        { title: "SQL writing", body: "SQL is written only from what the graph returned. If needed, read_cypher reads more of the graph; injected corrections take priority for dates and seasons." },
        { title: "Read-only execution", body: "snowflake-mcp queries the DW with the user's own permissions. The tool has no write capability." },
        { title: "Answer with sources", body: "Definition, scope and sources (tables, the graph node that holds the formula) are attached so numbers can be verified." },
        { title: "Learning from corrections", body: "If the user corrects, e.g. “No, from 25 January”, it is stored in the context graph and applied automatically from the next question. If the definition itself must change, ontology registration is recommended." }
      ],
      principles: [
        { title: "Meaning lives only in the ontology", body: "Metric definitions, formulas, joins and unwritten rules live only in the knowledge graph; skills only fix the order of calls. Change the graph once and every skill and agent follows the same day." },
        { title: "Graph first, SQL second", body: "The model never guesses tables. SQL is written only after the graph lookup, and a metric missing from the graph is answered as ‘no definition’." },
        { title: "Read-only, own permissions", body: "DW tools can only read, and every call goes out with the SSO-authenticated user's own permissions. HR data is read only from allowed columns." },
        { title: "Corrections accumulate in the graph", body: "User corrections and company decisions do not vanish with the conversation; they stay in the context graph so the next person's question gets the same standard." }
      ]
    },
    steps: ["Ontology design and knowledge graph build", "MCP servers connecting the graph and the DW", "Skills and hooks", "Plugin rollout and offline training", "Weekly use-case broadcasts across affiliates"],
    image: {
      src: "/projects/noa-bi.png",
      alt: "Asking SPAO Gangnam's May sales in natural language with the noa-bi skill: the metric definition is resolved from the knowledge graph, the DW is queried and the answer cites its sources",
      caption: "noa-bi skill: natural-language question → metric definition resolved from the knowledge graph (ontology) → DW query → answer with sources",
      width: 1226,
      height: 1051
    },
    catalog: {
      title: "Skills built and distributed",
      items: [
        {
          name: "noa-bi",
          trigger: "KPI questions such as “SPAO Gangnam sales in May”",
          body: "Fetches the metric definition, formula and joins from the knowledge graph in one call, writes SQL and queries the DW read-only. Definition, scope and sources are attached to the answer."
        },
        {
          name: "noa-1p",
          trigger: "“Week 2 of February weekly report”, “sell-through red flag”",
          body: "Finds brand weekly reports through the graph's vector index and answers only from the original text."
        },
        {
          name: "tacit-rule-interview",
          trigger: "“Write down the unwritten rules”, “document the know-how”, “rules to put into the agent”",
          body: "Interviews practitioners to draw out the unwritten rules they follow from experience (thresholds, priorities, exceptions, gut-feel judgments) and organizes them as candidate rules for the ontology."
        },
        {
          name: "usage-guide-writer",
          trigger: "“Write the usage guide”, “Agent registration guide”",
          body: "Writes the usage guide for an agent being published on the platform by interviewing its maker, covering the logic, company and team unwritten rules, and KPIs."
        },
        {
          name: "monthly-submit-helper",
          trigger: "“Help with the monthly submission”, “calculate hours saved”",
          body: "Fills in the monthly output submission (new or version-up) through an interview and computes monthly hours saved with the basis for the calculation."
        }
      ]
    },
    stack: ["MCP", "Claude", "Snowflake", "Neo4j", "Cypher queries", "M365 Graph", "Claude Code Skill"],
    tags: ["Ontology", "Knowledge graph", "MCP"]
  },
  "fashion-ai-platform": {
    group: "② AI Platform",
    title: "Fashion AI Platform: Agent Sharing, Recommendation & Submission Portal",
    short: "Fashion AI platform",
    subtitle: "Where employees publish agents built with NoA (the in-house AI agent platform), get personalized recommendations, and submit results every month",
    period: "2026 – in operation",
    purpose:
      "Employees upload the tools they built with the in-house AI agent (NoA). Staff browse agents by job function and check their own AI capability level, while the CAIO office reviews each person's agent capability and the logic inside their agents.",
    metrics: [
      { value: "119 / month", label: "Agents uploaded (monthly average)" }
    ],
    roles: [
      "Service planning and information architecture: four menus by intent (Browse · Build · Learn · Get help) and a sidebar shared by every screen",
      "Personalized recommendation logic: scoring on job, brand, recently viewed and liked signals, with a reason on every card",
      "Registration and monthly-submission flow: 4-part form, co-creator contribution split, 7-item usage-guide prompt, survey-before-submission order",
      "Next.js full-stack implementation and operations: Snowflake DaaS integration, caching, access policy, admin dashboards"
    ],
    background:
      "As agents built with NoA 2.0 multiplied, who built what and what it achieved was scattered.\nRegister → recommend and spread → submit monthly results → evaluate → train runs as one flow, automatically accumulating data on the company's AX status.",
    features: [
      {
        eyebrow: "Core feature 01",
        title: "Home: tasks and recommendations the moment you arrive",
        summary:
          "One first screen shows both ‘what I have to do this month’ and ‘the agents that fit me’. Without opening any menu, the eye moves from the banner to the job filter, the recommendation cards and the task sidebar.",
        items: [
          { title: "Top menu and Agent registration", body: "Four menus (Browse agents · Build & submit · Learn · Get help), search, and an ‘Register agent’ button reachable from anywhere. Only admins see the ‘Admin’ menu." },
          { title: "Recommended · Best · Popular · NoA news tabs", body: "Recommendations for me, top-rated agents, most-viewed agents and platform/NoA notices are separate tabs switched right on the home screen." },
          { title: "Best agent banner", body: "Agents with the BEST AGENT badge rotate in a six-slide banner with name, one-liner, monthly hours saved and number of users, so the first thing shown is which agents deliver results." },
          { title: "Job and category icon filter", body: "One row of icons: All · Fashion · Dashboard · Merchandising · Production · Online · Logistics · Sales · Automation · HR · Marketing · VMD and more. Tapping one switches the list below to that job's agents." },
          { title: "Recommended for you", body: "My job, department and recently viewed agents are shown as criteria chips, followed by cards chosen on those criteria, each with category, creator and thumbnail." },
          { title: "This month's tasks sidebar", body: "Days to the submission deadline, progress (e.g. 1 of 3 done), whether this month's survey is complete, monthly submissions and agents needing input stay pinned on the right as a reminder on every visit." },
          { title: "Side recommendation card", body: "Below the sidebar, one agent close to my job is shown with its monthly hours saved so it can be tried right away." }
        ]
      },
      {
        eyebrow: "Core feature 02",
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
        eyebrow: "Core feature 03",
        title: "Agent registration and monthly submission",
        summary:
          "A registration form that makes people state what changed in numbers, and a monthly flow that re-reports results. Evaluation and the talent pool use this data as is.",
        items: [
          { title: "4-part form", body: "① Agent description (name, category, one-liner, URL) ② Usage guide ③ What NoA changed (users, monthly hours saved, removed tasks, at least one KPI) ④ Access (password, SSO or no security). Instead of browser validation, all missing fields are listed with reasons and jump links." },
          { title: "Co-creators and contribution", body: "Co-creators are found by company account; contributions must total 100%. When people change, the split resets to equal. Each co-creator is recorded separately so it counts toward their own participation." },
          { title: "Usage-guide prompt: eight questions that capture know-how", body: "Pressing ‘Copy prompt’ on the submission screen and pasting it into NoA produces a usage guide of 1,500+ characters that a first-time colleague can follow as is. Items: ① task ② access ③ steps ④ operating logic ⑤ use ⑥ KPIs ⑦ cautions and FAQs ⑧ work tips and sense. ④ and ⑧ matter most: judgment logic only the owner knows, such as deriving a reorder quantity, is written with real numbers (which figures, in what order, with which thresholds and adjustments such as remaining selling weeks, minimum order unit, end-of-season sell-out target), plus situational rules (‘when a figure crosses a threshold → state → action’) and ‘input → calculation → result’ in numbers. NoA must ask the builder one question at a time instead of guessing logic or tacit rules, and tools that only display figures are labeled ‘for viewing’ rather than invented. A separate optional field, ‘My tips · what makes this tool different’ (up to 1,000 characters), collects uses others don't know and how it differs from similar tools." },

          { title: "Registration text written by a Claude Code skill", body: "The agent-output-writer skill in the NoA plugin reads the agent's source code first, interviews its maker, and produces the 4-part form, the 7-item usage guide and the monthly submission fields (logic, company and team unwritten rules, KPIs, basis for hours saved) as one block of text. Paste it into the submission screen and you are done, so people who put off registering because of the writing now publish." },
          { title: "Monthly submission", body: "Requires completing that month's NoA survey first. New agents reuse board values; version-ups must restate changes, users, hours saved, removed tasks, KPIs and the guide. One row per agent × month, editable within the month." },
          { title: "Getting started in 5 steps", body: "Account request → NoA access → DaaS token → first agent → this month's survey and submission. Completion is judged automatically from data." },
          { title: "Hide, don't delete", body: "Deleted posts are hidden, not removed from the DB, so build history and evaluation records keep the talent-pool figures stable." }
        ]
      },
      {
        eyebrow: "Core feature 04",
        title: "Requests and inquiries that accumulate automatically",
        summary:
          "When the data someone wants to see in the in-house AI agent is missing, or they get stuck using NoA, they request or ask right inside the platform. Everything lands in the admin screens, and recurring questions accumulate into the FAQ so the same question comes back less often.",
        items: [
          {
            title: "Data requests",
            body: "When data is missing from the in-house AI agent (NoA), people request what they need and why. Requests accumulate in the admin screen with a status (received, in review, applied) and become DW and knowledge-graph integration tasks."
          },
          {
            title: "1:1 NoA usage inquiries",
            body: "Questions about access, installation, skills or errors are filed by type and answered by admins. Each inquiry and answer stays on that person's journey (member 360)."
          },
          {
            title: "FAQ that builds itself",
            body: "When the same question recurs, the answer is promoted to an FAQ item shown on the home page and the Help menu. As inquiries accumulate the FAQ grows and repeat questions fall."
          },
          {
            title: "Offline help sessions",
            body: "People who can't be helped in writing sign up for an offline session at a set time and place; sign-ups are managed on the same screen."
          },
          {
            title: "Admin morning digest email",
            body: "Every day at 8 a.m., new accounts, monthly output submissions (new/version-up), new agent uploads and NoA survey responses received since 1 p.m. the previous day are sent to admins as counts and lists. Each item links to the admin screen, so admins know the day's work from the email without opening the platform."
          }
        ]
      }
    ],
    insightsLabel: "Design principles",
    insights: [
      { title: "Show reasons, not ranks", body: "Regular screens show no rankings; each recommendation carries a one-line reason, so people find the right agent without feeling lined up." },
      { title: "Minimal personal data", body: "Only name, employee number, department, email and job are read from the HR DB. Address, birth date and phone are never read. Every screen requires login and is limited to the fashion business group." },
      { title: "Tie data collection to the submission flow", body: "The month's survey comes before the monthly submission, so satisfaction, hours saved and needed support accumulate naturally every month." }
    ],
    image: {
      src: "/projects/fashion-ai-platform.png",
      alt: "Fashion AI Platform home: best-agent banner, category icons, personalized recommendations and the monthly to-do sidebar",
      caption: "Fashion AI Platform home: best-agent banner · categories · personalized recommendations · monthly to-do sidebar",
      width: 1777,
      height: 1341
    },
    thumb: {
      src: "/projects/fashion-ai-platform-thumb.png",
      alt: "Fashion AI Platform home screen",
      width: 1000,
      height: 1000
    },
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", "Snowflake DaaS", "Redis", "Vitest"],
    tags: ["Personalization", "Registration & submission", "Next.js"]
  },
  "enterprise-agent-integration": {
    group: "③ Enterprise integration",
    title: "Enterprise Agent Integration: From Per-Brand to One",
    short: "Enterprise agent integration",
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
      "More than 100 per-brand, per-job agents were built on NoA, the in-house AI agent platform, but the same sales metric came to be defined differently by brand and the same task was built separately per brand. To merge scattered agents into one, rules and metrics must be standardized first.",
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
    group: "④ Next step",
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
      "Designed the 100-point participation weights and tiers, calibrating NoA (in-house AI agent platform) usage thresholds to the real distribution (40 people)",
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
      "People were told to use AI tools, but few knew where or what to start with. One-off lectures ended when they ended, and hardly anyone had turned a problem from their own work into an agent. Skill levels varied so much that one lecture was too hard for beginners and dull for experienced users.\nTraining had to be small, leveled and repeated, with one real agent built and published as the completion criterion.",
    metrics: [{ value: "~500", label: "People trained in AI agents" }],
    roles: [
      "Designed the curriculum and job-specific hands-on exercises",
      "Provided technical support through to building and deploying real agents after training",
      "Built the platform's learning features: AI literacy slides, leveled video lessons, 6-step build practice, training decks for NoA (the in-house AI agent platform), vibe-coding guide"
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
    steps: ["Hands-on agent training", "Build & deploy support"],
    image: {
      src: "/projects/ax-training.jpg",
      alt: "Explaining the one-click deployment guide file from the podium at a training session",
      caption: "AI agent-building training: one-click deployment guide session",
      width: 2048,
      height: 1536
    },
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
    short: "Padded-jacket rebranding",
    subtitle: "Designing core products from big data",
    period: "2024.11 – 2024.12",
    purpose: "Redefined product strategy and marketing messages from sales, review and platform data by age group.",
    background:
      "The economy was cooling. Korea's growth was expected to slow from 2.5% in 2024 to 1.9% in 2025, and consumer spending stood at 71% of disposable income, a ceiling where people could not spend more but were not spending less either. Buying better value for the same money showed up in padded jackets too. Looking into why the average price of top-ranked jackets had fallen, the share of costly goose and duck down fell from 82% in 2022 to 37% in 2024 while polyester and other synthetic fills rose to 63%. At the competitor, the down jackets Nuptse and Himalayan fell 38% and 37% while the synthetic-fill Onball grew 57%.\nOur own planning, meanwhile, carried over last year's top-selling styles, and what customers under 30 and men in their 30s bought and why never reached the plan. Three years of sales, review and search data had to be read together to redefine the core products and the marketing message.",
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
        { name: "[Market] Growth slows, spending at its ceiling", body: "Korea's growth is forecast to slow from 2.5% in 2024 to 1.9% in 2025 (Bank of Korea cut on 28 November). Consumer spending is 71% of disposable income: people cannot spend more but are not spending less. They are not closing their wallets; they are choosing better value for the same money." },
        { name: "[Market] Synthetic fill rising every year", body: "Among top-ranked padded jackets (44 in 2022, 44 in 2023, 41 in 2024), costly goose and duck down fell from 82% to 64% to 37%, while polyester and other synthetic fills rose from 18% to 36% to 63%. That is why prices came down." },
        { name: "[Benchmark] Falling Nuptse, rising Onball", body: "The North Face's down jackets Nuptse and Himalayan fell 38% and 37% year on year, while the synthetic-fill Onball grew 57% and Matterhorn and Matier entered. Customers no longer insist on down; they weigh warmth and price together and choose value synthetic fill." },
        { name: "[Benchmark] Men in their 30s choose The North Face and Arc'teryx", body: "The old benchmarks, National Geographic and Discovery, skewed to 40s with 70%+ women, much like New Balance lightweight-jacket customers. The North Face and Arc'teryx lightweight jackets are 46% and 67% men (+8%p, +9%p) with 30s the largest group, and their search volume is growing fast: a different customer base." }
      ]
    },
    steps: ["Market: economy and spending","Market: fill materials of top-ranked jackets","Benchmark: competitor product trends","Benchmark: age and gender preference","Redefine core products and message"],
    tags: ["Product strategy", "Review analysis", "Search trends"]
  },
  "china-brand-churn-analysis": {
    group: "Product portfolio strategy",
    title: "Customer Churn Analysis for a Premium Brand in China",
    short: "China brand churn analysis",
    subtitle: "Scofield China: six zero-base customer studies to find ‘Sco casual’ and localize the assortment for white-collar (白领) customers, as a product EBG validation project",
    period: "2025.02 – 2025.04",
    purpose:
      "Built a process to validate Scofield China's products against customer-research rules (EBG), and cross-checked store customers, non-customer interviews, street-style surveys, review big data and social media to find the cause of falling sales, the customer to win, and item-level product principles, carried through to SS and FW product input.",
    metrics: [
      { value: "+8%", label: "Sales growth vs. same month last year", note: "from decline to growth" },
      { value: "▲320%", label: "FW denim order value", note: "4 styles added" },
      { value: "6", label: "Customer-research methods run from zero", note: "46 interviews · 11 shop-alongs · 98 surveys · 177 garments · 2,100 outfits · review big data" }
    ],
    roleLead: "Proposed shrinking the formal-led assortment and rebuilding the portfolio around shirts, denim and comfortable business casual.",
    roles: [
      "Defined the cause of declining sales as a shift in customers' workwear norms, not the products",
      "Ran six customer-research methods from zero, revising questions and methods each round, and wrote them up as the product EBG validation process",
      "Derived steady and trend types per item and customers' top needs and complaints from three years of Tmall top-20 sales data and review big data",
      "Documented basics and differentiators for dresses, denim, knits/cardigans, shirts, tees and jackets by learning from benchmarks (Ralph Lauren, Edition, MO&Co., Uniqlo)",
      "Decided SS and FW inputs (type, fit, color, fabric) with the local merchandising team"
    ],
    background:
      "The brand kept a heavy share of past hits such as glossy colored blouses from a decade earlier, and sales were falling 27% a year. In non-customer interviews people said Scofield clothes could be worn only one day a week, so they felt like a waste of money. Office dress had become casual, yet Scofield still offered formal suiting; only 21% of interviewees wore formal clothes daily, while 70% said the brand had nothing but formal clothes.\nThe customer to win was different too: white-collar (白领) women aged 35–45 at large companies, familiar with the ‘old money’ look through Xiaohongshu and global brands (44% had bought them). The brand's gold trims and loud colors and patterns, tuned to general Chinese customers, read as ‘old’.",
    catalog: {
      title: "Findings and strategy",
      items: [
        { name: "[Research] Six customer studies from zero", body: "46 non-customer interviews, 11 shop-alongs, 98 surveys, a full count of 177 garments at premium dry cleaners and tailors, about 2,100 outfits observed in business districts and premium malls, Tmall review big data (millions of reviews) and 400 Xiaohongshu ‘classic / old money’ posts. Questions were revised each round, and the procedure became the product EBG validation process." },
        { name: "[Diagnosis ①] Wearable one day a week, so a waste of money", body: "Office dress had gone casual while the brand kept fitting formal suiting, so customers felt there was nothing to buy. 21% wore formal clothes daily; 70% said the brand had only formal clothes." },
        { name: "[Diagnosis ②] The customer to win: global-minded white-collar women", body: "Women aged 35–45 at large companies. 44% had bought global brands such as Sandro and Lemaire and saw simple, clean old-money design as premium. The brand's gold trims and loud colors read as something for people over 50." },
        { name: "[PART ① Sco casual] Expand to the dual TPO of daily commute and weekend shopping", body: "Formal occasions 21%, dual occasions where both formality and comfort matter 52%, casual 27%. In the dual TPO, 69% of purchases were mid-to-high-priced brands: the opportunity area." },
        { name: "[Type and fit] Relaxed fit for formal types, regular fit for the rest", body: "Among 2,013 outfits in business districts: loose-fit jackets 73%, regular-fit shirts 73%, regular-fit tees 76%, waisted dresses 60%, regular-fit cardigans 61%. Regular fit reads as formal and anything looser as casual, so type and fit must be decided together." },
        { name: "[Heritage] Borrow RL signatures and show classic layering", body: "Knits, cardigans, jackets and shirts were read as heritage when they followed Ralph Lauren signatures (cable and logo knits, logo shirts); other types needed classic layered styling with jackets or vests, seen in 70% of classic outfit posts." },
        { name: "[PART ② Localization] At this price, versatility and quality-led luxury", body: "For a mid-to-high-priced brand, good design is the baseline; frequent, long wear and luxury felt through quality decide the purchase (“Taobao lens finds look-alikes, so quality matters”). Sco casual sits between what SPA brands cannot offer (quality, feminine style) and what premium brands cannot offer (value, casual)." },
        { name: "[Dresses] Brand concept from Ralph Lauren, product from Edition", body: "Input the steady slim type and the rising plain H-line type. Minimal with a twist through silhouette changes (60%) rather than trims, four fixed monotone colors varied by brightness, and ‘silk-like’ viscose, acetate and lyocell instead of real silk for a premium feel." },
        { name: "[Item principles] Denim · knits/cardigans · shirts · tees · jackets", body: "Denim: feminine details, 3 cm longer legs, silk-like blends against fading. Knits: fit, texture and easy-care cotton together. Shirts: white and blue fixed every year with fit and fabric expanded, fabric matched to each occasion's complaints (creasing, breathability). Tees: 61–65 cm hip length for tucked or untucked wear, one silhouette per design. Jackets: basics varied in detail and fabric and styled with jeans to show the dual TPO." },
        { name: "[Research TO-BE] Three years of data, not one point in time", body: "Moved from last season's bestsellers to three or more years of sales trends, classifying steady, trend and declining types. Trend types are added even at lower sales because they grow." },
        { name: "[Execution] SS and FW inputs", body: "Added Sco casual types missing from SS (delivered 31 March). For FW, 4 denim styles (order value up 320%), 15 shirt styles, 6 basic shirt-dress styles, and a larger share of casual basic knits and cardigans, applying the semi-wide and straight fits and the white and sky-blue colors most worn by customers." }
      ]
    },
    steps: ["Six non-customer studies", "Diagnosis: once-a-week wear · customer mismatch", "PART ① Sco casual principles", "PART ② Localizing to white-collar needs", "Basics and differentiators per item", "SS · FW product input"],
    image: {
      src: "/projects/scofield-store.png",
      alt: "A Scofield store inside a department store in China",
      caption: "Store in China",
      width: 897,
      height: 581
    },
    tags: ["Overseas market", "EBG customer research", "Product localization"]
  }
};
