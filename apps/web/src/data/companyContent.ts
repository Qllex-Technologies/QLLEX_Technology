export interface TechCategory {
  id: string;
  category: string;
  summary: string;
  items: Array<{
    name: string;
    role: string;
    description: string;
  }>;
}

export const TECH_STACK_CATEGORIES: TechCategory[] = [
  {
    id: "frontend-web",
    category: "Frontend & Modern Web Architecture",
    summary:
      "Server-first rendering, type-safe component hierarchies, and accessible design systems.",
    items: [
      {
        name: "Next.js (App Router)",
        role: "Primary Web Framework",
        description:
          "Server Components, hybrid static/dynamic rendering, route handlers, and first-class technical SEO.",
      },
      {
        name: "React 18",
        role: "UI Component Library",
        description:
          "Composable interface architecture with strict server/client boundaries and accessible interactive primitives.",
      },
      {
        name: "TypeScript",
        role: "Static Type System",
        description:
          "End-to-end compile-time safety across UI props, API payloads, and shared domain models.",
      },
      {
        name: "Tailwind CSS",
        role: "Design System Styling",
        description:
          "Tokenized utility styling with zero runtime CSS-in-JS overhead and deterministic responsive layouts.",
      },
    ],
  },
  {
    id: "backend-apis",
    category: "Backend, APIs & Full-Stack Systems",
    summary:
      "High-concurrency REST APIs, strict schema validation, and clean service boundaries.",
    items: [
      {
        name: "Node.js & Express.js",
        role: "Core REST API Engine",
        description:
          "Modular middleware pipelines, rate limiting, JWT/cookie authentication, and low-latency I/O.",
      },
      {
        name: "MERN Stack",
        role: "Full-Stack JS/TS Architecture",
        description:
          "Unified MongoDB, Express, React, and Node.js applications sharing Zod validation schemas.",
      },
      {
        name: "Python & FastAPI",
        role: "High-Throughput & Data APIs",
        description:
          "Asynchronous Python microservices, Pydantic validation, ETL pipelines, and quantitative backends.",
      },
      {
        name: "Zod & React Hook Form",
        role: "Validation & Form Integrity",
        description:
          "Client-side and server-side runtime payload validation with clear, accessible field-level errors.",
      },
    ],
  },
  {
    id: "databases-ai",
    category: "Databases, Applied AI & Mobile",
    summary:
      "Indexed data persistence, citation-backed AI pipelines, and cross-platform mobile apps.",
    items: [
      {
        name: "MongoDB & Mongoose",
        role: "Document & Time-Series Database",
        description:
          "Schema-enforced document modeling, compound indexing, aggregation pipelines, and vector search readiness.",
      },
      {
        name: "AI & Machine Learning (RAG)",
        role: "Applied Intelligence",
        description:
          "Retrieval-Augmented Generation, hybrid semantic search, document extraction, and LLM tool orchestration.",
      },
      {
        name: "Flutter & Dart",
        role: "Cross-Platform Mobile",
        description:
          "Native ARM-compiled iOS and Android applications with offline persistence and 60fps+ UI rendering.",
      },
      {
        name: "PostgreSQL & Redis",
        role: "Relational & Caching Layer",
        description:
          "ACID relational storage and distributed in-memory caching for high-throughput enterprise workloads.",
      },
    ],
  },
  {
    id: "motion-3d",
    category: "Interactive Motion & 3D WebGL",
    summary:
      "GPU-accelerated choreography and lightweight 3D scenes that respect user accessibility.",
    items: [
      {
        name: "GSAP & ScrollTrigger",
        role: "Motion Choreography",
        description:
          "Timeline-driven reveals, staggered entrances, and scroll-synchronized transitions with clean React lifecycle management.",
      },
      {
        name: "Three.js & React Three Fiber",
        role: "Interactive 3D & WebGL",
        description:
          "Lazy-loaded 3D visualizations and product configurators with static fallbacks and reduced-motion support.",
      },
    ],
  },
];

export const DEVELOPMENT_PROCESS_STEPS = [
  {
    stepNumber: "01",
    id: "discovery",
    title: "Discovery & Requirements Alignment",
    summary:
      "We clarify business objectives, user roles, technical constraints, integration dependencies, and success criteria before writing code.",
    deliverables: [
      "Stakeholder & workflow requirements brief",
      "Technical feasibility & integration assessment",
      "Risk register and initial scope boundary definition",
    ],
  },
  {
    stepNumber: "02",
    id: "planning",
    title: "Architecture & Milestone Planning",
    summary:
      "We design the system architecture, database schemas, API contracts, and a transparent milestone delivery schedule.",
    deliverables: [
      "System architecture & data model specification",
      "API endpoint contract & security blueprint",
      "Milestone schedule with verifiable acceptance criteria",
    ],
  },
  {
    stepNumber: "03",
    id: "ui-ux-design",
    title: "UI/UX Design & Interactive Prototyping",
    summary:
      "We craft an art-directed visual system, responsive layouts, accessible navigation flows, and purposeful motion specifications.",
    deliverables: [
      "Typography, color, and spacing design tokens",
      "Mobile-first wireframes and high-fidelity screen specifications",
      "Interactive state, form validation, and motion guidelines",
    ],
  },
  {
    stepNumber: "04",
    id: "development",
    title: "Full-Stack Engineering",
    summary:
      "Our engineers build the frontend, backend APIs, database models, and third-party integrations using clean, modular TypeScript and Python.",
    deliverables: [
      "Version-controlled monorepo or service repositories",
      "Server-rendered pages, client islands, and secured REST APIs",
      "Shared validation schemas and CMS management workflows",
    ],
  },
  {
    stepNumber: "05",
    id: "testing",
    title: "Quality Assurance, Accessibility & SEO Audit",
    summary:
      "Every route is verified across mobile and desktop viewports, keyboard navigation, reduced-motion preferences, form edge cases, and metadata validity.",
    deliverables: [
      "Cross-viewport responsive verification (320px to 1920px+)",
      "API validation, rate-limit, and error-handling verification",
      "Technical SEO, JSON-LD, sitemap, and Core Web Vitals check",
    ],
  },
  {
    stepNumber: "06",
    id: "deployment",
    title: "Production Deployment & Handover",
    summary:
      "We configure production environments, SSL, environment variables, security headers, and deliver complete documentation.",
    deliverables: [
      "Zero-downtime production build & deployment setup",
      "Environment variable & secrets management checklist",
      "Runbook, API documentation, and administrator training",
    ],
  },
  {
    stepNumber: "07",
    id: "support",
    title: "Six-Month Post-Launch Support",
    summary:
      "Every delivered project includes 6 months of post-handover bug support for qualifying defects within the agreed project scope.",
    deliverables: [
      "Six-month warranty coverage for scope-covered code defects",
      "Structured bug triage and resolution workflow",
      "Optional ongoing retainer for new features and enhancements",
    ],
  },
];

export const WHY_CHOOSE_US_PILLARS = [
  {
    title: "Maintainable, Strongly Typed Code",
    description:
      "We write modular TypeScript and Python with shared Zod/Pydantic schemas, clear folder structures, and zero hidden magic—so your internal team or future engineers can extend the codebase effortlessly.",
  },
  {
    title: "Mobile-First Responsive Precision",
    description:
      "Every interface is engineered and tested from 320px compact phones through 1920px widescreen monitors with touch-friendly targets and zero horizontal overflow.",
  },
  {
    title: "Transparent Milestone Communication",
    description:
      "No black-box development. You receive written scope definitions, staging preview links, clear milestone checklists, and honest technical trade-off explanations.",
  },
  {
    title: "Performance, SEO & Accessibility by Default",
    description:
      "Server-rendered HTML, semantic heading hierarchies, JSON-LD structured data, keyboard navigation, and `prefers-reduced-motion` support are built in from day one.",
  },
  {
    title: "Documented Project Delivery",
    description:
      "Every handover includes setup instructions, `.env.example` templates, database schemas, API endpoint documentation, and deployment guides.",
  },
  {
    title: "Six-Month Post-Handover Bug Support",
    description:
      "We stand behind our engineering with a clear, written 6-month support policy covering qualifying bugs attributable to our delivered work within the agreed scope.",
  },
];

export const ENGAGEMENT_MODELS = [
  {
    id: "fixed-scope-milestone",
    name: "Fixed-Scope Milestone Engagement",
    badge: "Most Popular for Defined Projects",
    idealFor:
      "Corporate websites, custom web applications, e-commerce storefronts, and MVPs with clearly defined requirements.",
    summary:
      "A structured, milestone-driven engagement with a written specification, agreed deliverables, fixed milestone pricing, and predictable handover.",
    structure: [
      "Written technical proposal and milestone schedule approved prior to kickoff",
      "Payments tied directly to verifiable milestone completions (e.g., Architecture & UI, Core Development, QA & Launch)",
      "Formal change-request procedure if you choose to add new features mid-project",
      "Includes 6-month post-handover bug support for delivered scope",
    ],
    ctaLabel: "Request a Milestone Quote",
    ctaHref: "/get-a-quote?model=fixed-scope",
  },
  {
    id: "dedicated-engineering-pod",
    name: "Dedicated Engineering Pod / Retainer",
    badge: "Best for Evolving SaaS & Product Roadmaps",
    idealFor:
      "Funded startups, growing SaaS platforms, and enterprises needing continuous full-stack, AI, or mobile feature velocity.",
    summary:
      "Reserve dedicated senior engineering capacity on a monthly sprint cadence to iterate rapidly on complex product backlogs.",
    structure: [
      "Dedicated Next.js, MERN, Python, or Flutter engineers integrated with your workflow",
      "Bi-weekly sprint planning, code reviews, and staging deployments",
      "Flexible prioritization as market feedback and product requirements evolve",
      "Transparent monthly billing with clear notice periods for scaling up or down",
    ],
    ctaLabel: "Discuss Dedicated Capacity",
    ctaHref: "/contact?service=Dedicated+Engineering+Pod",
  },
  {
    id: "architecture-advisory-sprint",
    name: "Technical Discovery & Architecture Sprint",
    badge: "Ideal Before Large Builds",
    idealFor:
      "Organizations planning a complex legacy migration, enterprise AI/RAG system, or multi-tenant platform who want a blueprint before committing to a full build.",
    summary:
      "A focused 2-to-3 week engineering engagement that produces a complete system architecture, database schema, UI prototype, and implementation roadmap.",
    structure: [
      "Deep-dive audit of existing systems, APIs, and security requirements",
      "Complete database schema, API specification, and infrastructure blueprint",
      "Interactive high-fidelity UI prototype for key user journeys",
      "Deliverables are 100% yours to execute with QLLEX Technologies or your internal team",
    ],
    ctaLabel: "Book a Discovery Sprint",
    ctaHref: "/contact?service=Architecture+Discovery+Sprint",
  },
];

export const FAQ_ITEMS = [
  {
    category: "Services & Technology",
    question: "Do you build custom software from scratch or use pre-made templates?",
    answer:
      "We engineer custom software and websites from scratch using modern frameworks like Next.js, React, TypeScript, Node.js, Express, Python, and Flutter. We do not resell generic themes or bloated page-builder templates.",
  },
  {
    category: "Services & Technology",
    question: "How do you decide between Next.js/Node.js and Python for a project?",
    answer:
      "Next.js with a Node.js/Express and MongoDB backend provides a unified TypeScript stack ideal for web applications, SaaS portals, and e-commerce. When a project involves heavy data processing, machine learning, or Retrieval-Augmented Generation (RAG), we integrate Python (FastAPI) services alongside the web platform.",
  },
  {
    category: "Process & Ownership",
    question: "Who owns the source code and intellectual property after the project is completed?",
    answer:
      "Upon full payment of the agreed contract milestones, ownership of the custom source code, designs, and documentation created specifically for your project is assigned to you, as detailed in our Terms and Conditions.",
  },
  {
    category: "Process & Ownership",
    question: "How do we track progress during development?",
    answer:
      "Every project is divided into clear milestones (Discovery, Architecture, UI/UX, Development, QA, and Deployment). We provide access to a live staging environment and regular milestone reviews so you can test real working features throughout the build.",
  },
  {
    category: "Pricing & Refunds",
    question: "How are payments structured?",
    answer:
      "For fixed-scope projects, payments are structured around agreed milestones rather than requiring 100% upfront. Each milestone corresponds to concrete deliverables defined in your written project proposal.",
  },
  {
    category: "Pricing & Refunds",
    question: "What happens if we need to cancel a project mid-way?",
    answer:
      "Our Refund and Cancellation Policy outlines a fair, milestone-based procedure. Completed and approved milestones are non-refundable as the work has been delivered, while unstarted future milestones are not billed, and any unused portion of an active milestone deposit is reviewed against documented work completed, subject to applicable law.",
  },
  {
    category: "Support & Maintenance",
    question: "What does your Six-Month Support Policy cover?",
    answer:
      "We provide 6 months of post-handover support covering qualifying bugs or defects directly attributable to our delivered code within the agreed project scope. New features, scope expansions, third-party API outages, or external hosting fees are handled separately as explained in our Support and Maintenance Policy.",
  },
  {
    category: "Support & Maintenance",
    question: "Are hosting, domain names, and third-party API subscriptions included in development quotes?",
    answer:
      "Unless explicitly itemized in a managed-hosting agreement, external third-party costs—such as cloud server hosting, domain registration, paid API usage (e.g., OpenAI, Stripe, SMS/email gateways), and SaaS subscriptions—are billed directly to your accounts so you retain full ownership and control.",
  },
];

export const FALLBACK_BLOG_POSTS = [
  {
    title: "Architecting Multi-Tenant SaaS Applications with Next.js App Router and Node.js",
    slug: "architecting-multi-tenant-saas-nextjs-nodejs",
    excerpt:
      "A practical engineering breakdown of tenant isolation, subdomain routing, RBAC enforcement, and predictable caching strategies in modern Next.js and Express architectures.",
    category: "System Architecture",
    tags: ["Next.js", "Node.js", "SaaS", "Multi-Tenancy", "Security"],
    authorName: "Principal Architecture Team",
    authorRole: "Systems Engineering, QLLEX",
    readTimeMinutes: 8,
    published: true,
    publishedAt: "2026-09-18T10:00:00.000Z",
    seoTitle: "Multi-Tenant SaaS Architecture with Next.js App Router & Node.js",
    seoDescription:
      "Learn how to design secure tenant isolation, RBAC middleware, and hybrid rendering pipelines using Next.js App Router, Express, and MongoDB.",
    content: `## Why Multi-Tenancy Fails Without Clear Boundary Contracts

When software teams transition from a single-tenant prototype to a multi-tenant B2B platform, the most common vulnerabilities do not come from exotic zero-day exploits—they stem from missing tenant context in database queries and shared cache keys.

At QLLEX Technologies, we design multi-tenant web applications around three non-negotiable architectural layers:

### 1. Edge & Middleware Tenant Resolution
Whether your product resolves organizations by custom domains (\`portal.clientdomain.com\`), subdomains (\`acme.yourplatform.com\`), or path prefixes (\`/org/acme\`), resolution should happen once at the request boundary.

- Validate the incoming hostname or route token against a fast lookup layer.
- Attach a canonical \`tenantId\` and organization policy context before downstream rendering or API invocation.
- Ensure every cache key is explicitly namespaced by \`tenantId\`.

### 2. Scoped Data Access in Express & Mongoose
Relying on individual developers to remember \`.find({ tenantId })\` in every controller eventually leads to cross-tenant data leakage. Instead:

- Enforce tenant-scoped repository helpers that require an authenticated \`TenantContext\` object.
- Create compound indexes in MongoDB starting with \`{ tenantId: 1, ... }\` so queries remain selective as collections scale.
- Validate all incoming payloads with shared Zod schemas before any database operation occurs.

### 3. Hybrid Rendering Without Sacrificing Core Web Vitals
Public marketing routes, documentation, and tenant login screens should leverage Static Generation (SSG) or Incremental Static Regeneration (ISR), while authenticated operational dashboards use streaming Server Components and targeted Client Components.

By keeping heavy state management out of the root layout and isolating interactive charts or editors into dedicated client boundaries, enterprise web applications remain responsive even on mid-tier mobile devices.`,
  },
  {
    title: "Production-Grade RAG Pipelines: Moving Beyond Fragile Prompt Wrappers",
    slug: "production-grade-rag-pipelines-python-vector-search",
    excerpt:
      "How to build reliable Retrieval-Augmented Generation systems using Python, hybrid semantic + lexical search, deterministic chunking, and strict citation verification.",
    category: "AI & Machine Learning",
    tags: ["Python", "AI/ML", "RAG", "FastAPI", "Vector Search"],
    authorName: "AI Engineering Practice",
    authorRole: "Applied AI Systems, QLLEX",
    readTimeMinutes: 7,
    published: true,
    publishedAt: "2026-09-29T09:30:00.000Z",
    seoTitle: "Building Production RAG Pipelines with Python & Hybrid Search",
    seoDescription:
      "Avoid hallucinations and high latency in enterprise AI applications with hybrid retrieval, structured evaluation, and FastAPI microservices.",
    content: `## The Gap Between AI Demos and Production Software

A proof-of-concept LLM integration can be assembled in an afternoon. However, putting an AI workflow in front of real customers or internal operations teams requires deterministic guardrails, latency budgets, and verifiable grounding.

### 1. Document Ingestion and Semantic Chunking
Splitting PDFs or knowledge-base articles at arbitrary character counts breaks tables, code blocks, and policy clauses in half. A production ingestion pipeline should:

- Parse document hierarchy (headings, tables, lists) prior to chunking.
- Preserve parent-section metadata on every vector record so retrieved passages carry full context.
- Deduplicate unchanged content using cryptographic content hashes to avoid redundant embedding costs.

### 2. Hybrid Retrieval (Dense Vectors + Lexical BM25)
Pure vector similarity often struggles with exact part numbers, SKUs, legal clauses, or error codes. Combining dense vector search with keyword/BM25 scoring and Reciprocal Rank Fusion (RRF) consistently improves retrieval precision.

### 3. Structured Outputs and Hallucination Guardrails
Rather than returning raw unstructured prose, enforce strict JSON schemas (via Pydantic in Python or Zod in TypeScript) that require:
- Direct source document IDs for every claim.
- Confidence thresholds that trigger a graceful fallback when knowledge-base coverage is insufficient.
- Full observability logging for latency, token usage, and retrieval relevance.`,
  },
  {
    title: "Choreographing High-Performance Web Motion with GSAP ScrollTrigger and WebGL",
    slug: "high-performance-web-motion-gsap-scrolltrigger-webgl",
    excerpt:
      "Engineering immersive digital experiences that maintain 60fps frame budgets, respect prefers-reduced-motion, and avoid layout shifts or hydration mismatches.",
    category: "UI/UX & Motion Engineering",
    tags: ["GSAP", "ScrollTrigger", "Three.js", "Performance", "Accessibility"],
    authorName: "Interactive Systems Team",
    authorRole: "Frontend & Creative Engineering, QLLEX",
    readTimeMinutes: 6,
    published: true,
    publishedAt: "2026-10-06T14:15:00.000Z",
    seoTitle: "High-Performance GSAP ScrollTrigger & Three.js WebGL Engineering",
    seoDescription:
      "Best practices for integrating GSAP ScrollTrigger and Three.js in Next.js without hurting Core Web Vitals, accessibility, or React hydration.",
    content: `## Motion Should Clarify Hierarchy, Not Obstruct Content

Interactive animation and 3D WebGL scenes can elevate a technology brand when engineered with restraint. When poorly implemented, they cause scroll jank, battery drain, and inaccessible interfaces.

### 1. Compositor-Friendly Properties Only
Never animate layout-triggering CSS properties such as \`top\`, \`left\`, \`width\`, or \`height\` during scroll. Restrict continuous animations to GPU-composited properties:
- \`transform: translate3d()\`
- \`transform: scale()\`
- \`opacity\`

### 2. Deterministic React Lifecycle Cleanup
In Next.js App Router applications, navigating between routes mounts and unmounts client components dynamically. Every GSAP timeline and ScrollTrigger instance must be scoped inside \`gsap.context()\` and reverted on unmount to prevent memory leaks and orphaned scroll listeners.

### 3. Accessibility & Reduced Motion as a First-Class Requirement
Users who enable \`prefers-reduced-motion: reduce\` in their operating system should never be forced through disorienting parallax or camera sweeps. Checking motion preferences before initializing timelines ensures immediate content visibility for every visitor.`,
  },
];

export const FALLBACK_PORTFOLIO_PROJECTS = [
  {
    title: "Vanguard CloudOps — Multi-Region Telemetry & Incident Portal",
    slug: "vanguard-cloudops-telemetry-portal",
    category: "Web Application & SaaS",
    projectType: "reference_architecture" as const,
    verificationLabel: "Reference Architecture / Illustrative Engineering Showcase",
    summary:
      "An illustrative enterprise observability and incident-response web application engineered with Next.js App Router, Node.js/Express microservices, and real-time WebSocket streams.",
    challenge:
      "Engineering teams managing distributed cloud infrastructure often struggle with fragmented alerting dashboards that freeze when rendering thousands of concurrent log events and incident timelines.",
    solution:
      "Designed a modular Next.js and Express reference platform featuring virtualized log inspection, role-based access control (RBAC), automated incident runbooks, and sub-100ms filtered queries backed by indexed MongoDB time-series collections.",
    architectureOverview:
      "Next.js Server Components handle initial route shell and authentication validation, while dedicated Client Components manage live WebSocket telemetry buffers. The Express API layer enforces strict Zod payload schemas, rate limiting, and structured audit trails.",
    techStack: ["Next.js", "TypeScript", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "GSAP"],
    deliverables: [
      "Multi-tenant RBAC authentication & session management",
      "Real-time incident timeline & severity triage board",
      "High-density dark-mode UI design system with keyboard shortcuts",
      "REST API with OpenAPI specification and automated health probes",
    ],
    featured: true,
    seoTitle: "Vanguard CloudOps Telemetry Portal — SaaS Reference Case Study",
    seoDescription:
      "Explore how QLLEX Technologies architects high-density SaaS dashboards and real-time telemetry web applications using Next.js, Node.js, and MongoDB.",
  },
  {
    title: "AetherDoc AI — Enterprise Contract & Policy Intelligence Engine",
    slug: "aetherdoc-ai-contract-intelligence",
    category: "AI & Machine Learning",
    projectType: "reference_architecture" as const,
    verificationLabel: "Reference Architecture / Illustrative Engineering Showcase",
    summary:
      "An illustrative hybrid-retrieval AI document analysis platform combining a Next.js workspace with Python FastAPI ingestion workers and citation-verified LLM responses.",
    challenge:
      "Legal and procurement teams reviewing hundreds of vendor agreements need rapid clause extraction and risk flagging without risking unverified AI hallucinations or data leakage.",
    solution:
      "Engineered a two-tier architecture: a Next.js document review interface paired with a Python FastAPI retrieval pipeline that performs hierarchical section chunking, hybrid vector + keyword retrieval, and clause-level source highlighting.",
    architectureOverview:
      "Uploaded documents are processed asynchronously via Python workers, indexed with structural metadata, and queried through a strict schema-validated API that binds every generated insight to an exact page and paragraph citation.",
    techStack: ["Python", "FastAPI", "Next.js", "TypeScript", "MongoDB", "Vector Search", "Tailwind CSS"],
    deliverables: [
      "Hierarchical PDF/DOCX parsing & deterministic chunking pipeline",
      "Citation-locked RAG interface with side-by-side clause verification",
      "Role-restricted document vaults & audit logging",
      "Automated evaluation suite for retrieval precision",
    ],
    featured: true,
    seoTitle: "AetherDoc AI Contract Intelligence — Python & RAG Case Study",
    seoDescription:
      "Technical breakdown of an enterprise Retrieval-Augmented Generation (RAG) system built with Python, FastAPI, Next.js, and vector search.",
  },
  {
    title: "Kinetix Commerce — Headless B2B & Direct-to-Consumer Storefront",
    slug: "kinetix-headless-commerce-platform",
    category: "E-commerce & Interactive Web",
    projectType: "reference_architecture" as const,
    verificationLabel: "Reference Architecture / Illustrative Engineering Showcase",
    summary:
      "An illustrative high-conversion headless commerce platform featuring interactive 3D product inspection, instant faceted search, and resilient multi-currency checkout.",
    challenge:
      "Traditional monolithic e-commerce themes suffer from bloated third-party scripts, slow mobile product pages, and rigid checkout flows that cannot accommodate custom B2B tiered pricing.",
    solution:
      "Built a composable storefront using Next.js App Router, GSAP micro-interactions, lazy-loaded Three.js product inspection, and an Express commerce orchestration API for inventory synchronization and webhook processing.",
    architectureOverview:
      "Product catalog pages use Incremental Static Regeneration (ISR) for instant global delivery, while cart state, B2B volume pricing rules, and payment intent creation run through secure, rate-limited Express API endpoints.",
    techStack: ["Next.js", "Three.js", "GSAP", "Node.js", "Express.js", "MongoDB", "Stripe Webhooks"],
    deliverables: [
      "Sub-second ISR product catalog with faceted filtering",
      "Lazy-loaded interactive 3D product configurator with static fallback",
      "B2B wholesale tier pricing & custom quote-to-order checkout",
      "Idempotent payment webhook processor & ERP sync layer",
    ],
    featured: true,
    seoTitle: "Kinetix Headless E-Commerce & 3D Configurator — Case Study",
    seoDescription:
      "Discover how QLLEX Technologies engineers high-speed headless e-commerce platforms with Next.js, Three.js, GSAP, and Node.js.",
  },
  {
    title: "PulseField Mobile — Offline-First Field Service & Asset Companion",
    slug: "pulsefield-offline-mobile-application",
    category: "Mobile Application",
    projectType: "reference_architecture" as const,
    verificationLabel: "Reference Architecture / Illustrative Engineering Showcase",
    summary:
      "An illustrative cross-platform Flutter mobile application and MERN synchronisation backend designed for field engineers operating in low-connectivity environments.",
    challenge:
      "Field technicians inspecting industrial equipment in remote sites frequently lose cellular connectivity, leading to lost inspection forms and sync conflicts when using standard web wrappers.",
    solution:
      "Architected a Flutter mobile client with encrypted local SQLite storage and deterministic conflict-resolution queues, backed by a Node.js, Express, and MongoDB synchronization API.",
    architectureOverview:
      "Inspection checklists, annotated photos, and barcode scans are committed locally first, then synchronized via delta-sync batch endpoints with automatic retry backoff as connectivity resumes.",
    techStack: ["Flutter", "Dart", "Node.js", "Express.js", "MongoDB", "REST API"],
    deliverables: [
      "Cross-platform iOS & Android Flutter application",
      "Offline-first local persistence & delta-sync queue engine",
      "Supervisor web dispatch dashboard in React & TypeScript",
      "End-to-end automated API & payload validation",
    ],
    featured: false,
    seoTitle: "PulseField Offline-First Flutter Mobile App — Case Study",
    seoDescription:
      "How QLLEX Technologies builds offline-resilient Flutter mobile applications backed by Node.js, Express, and MongoDB synchronization APIs.",
  },
];
