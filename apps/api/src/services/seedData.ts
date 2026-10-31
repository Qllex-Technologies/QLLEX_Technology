import { BlogPostInput, PortfolioProjectInput } from "@nexovanta/shared";

export const INITIAL_BLOG_POSTS: Array<BlogPostInput & { publishedAt: string }> = [
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
- Ensure every cache key (` + "`unstable_cache`" + ` or Redis key) is explicitly namespaced by \`tenantId\`.

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

export const INITIAL_PORTFOLIO_PROJECTS: PortfolioProjectInput[] = [
  {
    title: "Vanguard CloudOps — Multi-Region Telemetry & Incident Portal",
    slug: "vanguard-cloudops-telemetry-portal",
    category: "Web Application & SaaS",
    projectType: "reference_architecture",
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
    projectType: "reference_architecture",
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
    projectType: "reference_architecture",
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
    projectType: "reference_architecture",
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
