import { ServiceSlug } from "@nexovanta/shared";

export interface ServiceDetail {
  slug: ServiceSlug;
  title: string;
  shortTitle: string;
  category: string;
  seoTitle: string;
  seoDescription: string;
  heroHeadline: string;
  heroSubheadline: string;
  problemStatement: string;
  architecturalApproach: string;
  idealFor: string[];
  capabilities: Array<{
    title: string;
    description: string;
  }>;
  deliverables: string[];
  techStack: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export const SERVICES_DATA: Record<string, ServiceDetail> = {
  "website-development": {
    slug: "website-development",
    title: "Website Development",
    shortTitle: "Website Development",
    category: "Web & Digital Platforms",
    seoTitle:
      "Custom Website Development Services | Fast, Accessible & SEO-Engineered",
    seoDescription:
      "QLLEX Technologies engineers custom, responsive, server-rendered corporate and product websites built for Core Web Vitals, accessibility, and search visibility.",
    heroHeadline:
      "High-Performance Websites Engineered for Clarity, Speed, and Conversion",
    heroSubheadline:
      "We replace bloated page-builder templates with custom-architected web platforms that load fast, rank cleanly in search engines, and represent your brand with authority.",
    problemStatement:
      "Many business websites rely on heavy multipurpose themes and dozens of conflicting third-party plugins. The result is slow mobile rendering, poor Core Web Vitals, fragile updates, and generic layouts that fail to earn enterprise trust.",
    architecturalApproach:
      "We engineer websites from the ground up using semantic HTML5, modern React/Next.js server rendering, custom design tokens, and structured content workflows. Every page is built with strict asset budgets, clean heading hierarchies, and verifiable schema markup.",
    idealFor: [
      "B2B technology companies and SaaS brands needing an authoritative digital presence",
      "Growing enterprises migrating away from slow legacy CMS templates",
      "Organizations requiring multilingual, multi-region, or high-accessibility web platforms",
      "Marketing and product teams who need editable content without sacrificing code quality",
    ],
    capabilities: [
      {
        title: "Custom Design System & Component Architecture",
        description:
          "Bespoke typography scales, color tokens, and reusable UI primitives engineered specifically for your brand rather than adapted from off-the-shelf themes.",
      },
      {
        title: "Server-Rendered & Static Hybrid Performance",
        description:
          "Pages are pre-rendered at build time or on the server with Incremental Static Regeneration (ISR) so visitors and search crawlers receive instant HTML.",
      },
      {
        title: "Technical SEO & Structured Data Foundation",
        description:
          "Canonical tags, XML sitemaps, OpenGraph metadata, semantic landmarks, and JSON-LD structured data built directly into the routing layer.",
      },
      {
        title: "CMS & Headless Content Workflows",
        description:
          "Admin interfaces and structured content APIs that empower your team to publish articles, case studies, and landing pages safely.",
      },
      {
        title: "Conversion-Focused Lead Capture & CRM Integration",
        description:
          "Validated enquiry and quote workflows with spam protection, database persistence, instant email notifications, and webhook integrations.",
      },
      {
        title: "WCAG AA Accessibility & Responsive Precision",
        description:
          "Tested across 320px mobile viewports through 1920px+ displays with full keyboard navigation, screen-reader labels, and high-contrast legibility.",
      },
    ],
    deliverables: [
      "Custom UI/UX design specifications and interactive component library",
      "Production-ready Next.js / TypeScript frontend codebase",
      "Backend API for forms, dynamic content, and integrations",
      "Technical SEO implementation (sitemap.xml, robots.txt, JSON-LD, meta tags)",
      "Responsive QA across mobile, tablet, laptop, and widescreen breakpoints",
      "Deployment pipeline setup and 6-month post-handover bug support",
    ],
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "GSAP",
    ],
    faqs: [
      {
        question: "Do you use pre-made website templates or page builders?",
        answer:
          "No. Every website we deliver is custom-engineered in code using React, Next.js, TypeScript, and Tailwind CSS so you get clean markup, superior speed, and complete design control.",
      },
      {
        question: "Will our team be able to edit blog posts and portfolio items?",
        answer:
          "Yes. We include a structured content management workflow so your team can publish articles, update case studies, and edit SEO metadata without touching code.",
      },
      {
        question: "How do you ensure mobile responsiveness?",
        answer:
          "We design mobile-first and verify layouts across 320px, 375px, 430px, 768px, 1024px, 1440px, and 1920px viewports to guarantee zero horizontal overflow or broken navigation.",
      },
    ],
  },

  "web-applications": {
    slug: "web-applications",
    title: "Web Application Development",
    shortTitle: "Web Applications",
    category: "Custom Software Engineering",
    seoTitle:
      "Custom Web Application Development | SaaS, Portals & Enterprise Software",
    seoDescription:
      "Design and build secure, scalable custom web applications, multi-tenant SaaS platforms, and internal business portals with QLLEX Technologies.",
    heroHeadline:
      "Custom Web Applications Built for Complex Workflows and Long-Term Scale",
    heroSubheadline:
      "From multi-tenant SaaS products to mission-critical internal operations portals, we architect web applications with clean domain boundaries, strict security, and maintainable code.",
    problemStatement:
      "Off-the-shelf SaaS tools often force businesses into rigid workflows, expensive per-seat licensing, and disconnected data silos. Conversely, poorly architected custom apps quickly accumulate technical debt when authentication, state management, and API validation are bolted on as afterthoughts.",
    architecturalApproach:
      "We separate presentation, business logic, and data access into well-defined modules. Every API route is protected by schema validation, role-based access control (RBAC), rate limiting, and structured error handling before a single line of UI state is wired.",
    idealFor: [
      "Founders and product teams launching multi-tenant B2B or B2C SaaS platforms",
      "Established businesses replacing spreadsheet chains and legacy desktop software",
      "Operations teams needing custom client portals, booking engines, or analytics dashboards",
      "Agencies and enterprises requiring secure third-party ERP, CRM, or payment integrations",
    ],
    capabilities: [
      {
        title: "Multi-Tenant SaaS Architecture & RBAC",
        description:
          "Organization-level data isolation, granular role permissions, audit trails, and secure session/token lifecycle management.",
      },
      {
        title: "High-Density Operational Dashboards",
        description:
          "Fast data tables, multi-criteria filtering, real-time status streams, and keyboard-accessible workflows designed for daily power users.",
      },
      {
        title: "Resilient REST API & Microservice Layer",
        description:
          "Idempotent endpoints, shared TypeScript/Zod contracts between frontend and backend, pagination, and background job queues.",
      },
      {
        title: "Third-Party API & Webhook Orchestration",
        description:
          "Reliable integration with payment processors, accounting platforms, cloud storage, identity providers, and messaging services.",
      },
      {
        title: "Database Modeling & Query Optimization",
        description:
          "Carefully indexed MongoDB or relational schemas designed around actual query patterns to prevent performance degradation as records grow.",
      },
      {
        title: "Security-First Engineering Practices",
        description:
          "Input sanitization, CORS allowlisting, HTTP security headers, encrypted secrets management, and protection against OWASP Top 10 vulnerabilities.",
      },
    ],
    deliverables: [
      "System architecture blueprint and database schema documentation",
      "Frontend web application (Next.js / React / TypeScript)",
      "Backend REST API (Node.js / Express or Python / FastAPI)",
      "Role-Based Access Control (RBAC) and authentication suite",
      "API documentation and environment configuration templates",
      "Automated build verification and 6-month post-handover bug support",
    ],
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Python",
      "FastAPI",
    ],
    faqs: [
      {
        question: "Who owns the source code and intellectual property upon completion?",
        answer:
          "Upon full payment of agreed project milestones, full ownership of the custom source code and project deliverables transfers to your organization as detailed in our Terms and Conditions.",
      },
      {
        question: "Can you integrate our web application with existing internal systems?",
        answer:
          "Yes. We routinely build custom REST and webhook integrations connecting with ERPs, CRMs, payment gateways, identity providers, and legacy databases.",
      },
    ],
  },

  "mobile-app-development": {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    shortTitle: "Mobile Apps",
    category: "Mobile Engineering",
    seoTitle:
      "Mobile App Development Services | Cross-Platform Flutter & iOS/Android Apps",
    seoDescription:
      "Build reliable, high-performance iOS and Android mobile applications using Flutter and scalable Node.js/Python backends with QLLEX Technologies.",
    heroHeadline:
      "Cross-Platform Mobile Applications Engineered for Reliability on Every Device",
    heroSubheadline:
      "We build responsive iOS and Android mobile experiences using Flutter and modern backend APIs—delivering native-grade smoothness from a unified, maintainable codebase.",
    problemStatement:
      "Maintaining two completely separate native codebases doubles engineering cost and slows feature parity, while low-quality webview wrappers feel sluggish and fail when network connectivity drops.",
    architecturalApproach:
      "Using Flutter and a strongly typed backend API (Node.js/Express or Python), we engineer mobile applications that compile to native ARM machine code, maintain 60fps/120fps animations, cache critical data locally for offline resilience, and synchronize cleanly with cloud databases.",
    idealFor: [
      "Startups launching a customer-facing iOS and Android product simultaneously",
      "Field-service, logistics, and operations teams needing offline-capable mobile tools",
      "E-commerce and booking brands expanding into dedicated mobile retention channels",
      "Companies extending an existing web platform with a companion mobile app",
    ],
    capabilities: [
      {
        title: "Single-Codebase iOS & Android Engineering with Flutter",
        description:
          "Consistent UI rendering, platform-aware navigation patterns, and rapid feature delivery across both Apple App Store and Google Play ecosystems.",
      },
      {
        title: "Offline-First Local Persistence & Delta Sync",
        description:
          "Local encrypted storage and retry queues so users can continue working in low-signal environments without losing data.",
      },
      {
        title: "Secure Mobile API & Token Lifecycle",
        description:
          "Biometric authentication hooks, secure token storage, refresh-token rotation, and rate-limited backend endpoints.",
      },
      {
        title: "Push Notifications & Deep Linking",
        description:
          "Event-driven push notifications and universal deep links that route users directly to relevant in-app screens.",
      },
      {
        title: "Hardware & Native SDK Integration",
        description:
          "Camera, QR/barcode scanning, geolocation, file uploads, and secure payment sheet integrations.",
      },
      {
        title: "App Store & Play Store Release Readiness",
        description:
          "Build signing configuration, privacy manifest compliance, store asset preparation, and release pipeline guidance.",
      },
    ],
    deliverables: [
      "Cross-platform Flutter mobile source code for iOS and Android",
      "Dedicated backend REST API and database models",
      "Authentication, push notification, and offline storage modules",
      "Signed release builds (IPA / AAB) and store submission assistance",
      "6-month post-handover bug support for delivered scope",
    ],
    techStack: [
      "Flutter",
      "Dart",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Python",
      "REST APIs",
    ],
    faqs: [
      {
        question: "Why do you recommend Flutter for cross-platform mobile development?",
        answer:
          "Flutter compiles directly to native machine code and uses its own high-speed rendering engine, allowing you to ship a consistent, 60fps+ experience on both iOS and Android without maintaining two separate teams.",
      },
      {
        question: "Do you also build the backend server for the mobile app?",
        answer:
          "Yes. We architect the complete stack—including the Node.js/Express or Python API, MongoDB database, authentication system, and admin web dashboard.",
      },
    ],
  },

  "mern-stack": {
    slug: "mern-stack",
    title: "MERN Stack Development",
    shortTitle: "MERN Stack",
    category: "Full-Stack JavaScript/TypeScript",
    seoTitle:
      "MERN Stack Development Company | MongoDB, Express, React & Node.js",
    seoDescription:
      "Full-stack MERN development in TypeScript. We build modular MongoDB, Express.js, React, and Node.js applications with end-to-end schema validation.",
    heroHeadline:
      "Type-Safe MERN Stack Engineering Built for Speed and Maintainability",
    heroSubheadline:
      "We elevate the classic MongoDB, Express.js, React, and Node.js stack with strict TypeScript contracts, shared Zod validation schemas, and modular monorepo architecture.",
    problemStatement:
      "Many MERN stack projects suffer from untyped JavaScript spaghetti, inconsistent API responses, unindexed MongoDB queries, and duplicated validation logic between React forms and Express controllers.",
    architecturalApproach:
      "At QLLEX Technologies, every MERN system is built with TypeScript end-to-end. Frontend React components and backend Express controllers share a unified validation package (`Zod` + TypeScript interfaces), while Mongoose schemas enforce database-level integrity and indexing.",
    idealFor: [
      "SaaS products and real-time collaborative web platforms",
      "Custom CRM, ERP, and inventory management systems",
      "Marketplaces, booking engines, and multi-role customer portals",
      "Engineering teams looking to modernize legacy JavaScript apps to TypeScript",
    ],
    capabilities: [
      {
        title: "Shared TypeScript & Zod Contract Architecture",
        description:
          "Write validation rules once and enforce them automatically in both React Hook Form on the client and Express middleware on the server.",
      },
      {
        title: "Modular Express.js REST API Design",
        description:
          "Clean separation of routes, controllers, services, repositories, and central error handling middleware with consistent JSON envelopes.",
      },
      {
        title: "Indexed MongoDB & Mongoose Data Modeling",
        description:
          "Schema validation, compound indexing, aggregation pipelines, and lean query execution for predictable low-latency responses.",
      },
      {
        title: "Modern React UI & State Management",
        description:
          "Accessible component hierarchies, optimistic UI updates, form state validation, and responsive Tailwind CSS layouts.",
      },
      {
        title: "Production Hardening & API Security",
        description:
          "Helmet security headers, CORS allowlists, request size limits, rate limiting, and bcrypt/JWT authentication.",
      },
      {
        title: "Monorepo & CI-Ready Project Structure",
        description:
          "Logically separated frontend (`apps/web`), backend (`apps/api`), and shared types (`packages/shared`) for frictionless team scaling.",
      },
    ],
    deliverables: [
      "Monorepo codebase with React/Next.js frontend and Express API backend",
      "Shared TypeScript & Zod validation package",
      "Mongoose models with production indexes and seed scripts",
      "Secured authentication and admin management endpoints",
      "Complete API documentation and deployment configuration",
    ],
    techStack: [
      "MongoDB",
      "Mongoose",
      "Express.js",
      "React",
      "Node.js",
      "TypeScript",
      "Zod",
      "Tailwind CSS",
    ],
    faqs: [
      {
        question: "Do you build MERN applications with TypeScript or plain JavaScript?",
        answer:
          "We use strict TypeScript across the entire stack—React frontend, Express backend, and shared schema packages—to catch bugs at compile time and make long-term maintenance significantly safer.",
      },
      {
        question: "Can you combine Next.js with an Express and MongoDB backend?",
        answer:
          "Yes, that is our flagship architecture. Next.js handles server-side rendering, routing, and SEO on the frontend, while a dedicated Express.js + Mongoose API handles business logic and database operations.",
      },
    ],
  },

  nextjs: {
    slug: "nextjs",
    title: "Next.js Development",
    shortTitle: "Next.js",
    category: "Modern Web Architecture",
    seoTitle:
      "Next.js Development Services | App Router, SSR, Technical SEO & Performance",
    seoDescription:
      "Expert Next.js App Router development. We build server-rendered, static, and hybrid React applications engineered for Core Web Vitals and search visibility.",
    heroHeadline:
      "Production Next.js Architecture for High-Traffic Web Platforms",
    heroSubheadline:
      "We leverage Next.js App Router, React Server Components, and hybrid caching strategies to build web applications that combine instant page loads with rich interactivity.",
    problemStatement:
      "Single-Page Applications (SPAs) built purely with client-side React often ship massive JavaScript bundles, suffer from blank loading screens, and struggle with search engine indexing and social metadata previews.",
    architecturalApproach:
      "We default to React Server Components so data fetching and heavy rendering stay on the server. Client Components (`'use client'`) are introduced surgically only where browser interactivity, forms, or GSAP/WebGL animations are needed—minimizing client JavaScript and maximizing Core Web Vitals.",
    idealFor: [
      "Content-rich platforms, media sites, and B2B marketing websites where SEO is critical",
      "E-commerce storefronts requiring instant product page rendering and dynamic cart state",
      "Companies migrating slow Create-React-App (CRA) or legacy SPAs to SSR/SSG",
      "Enterprise web applications needing unified public marketing and authenticated portals",
    ],
    capabilities: [
      {
        title: "App Router & React Server Components Architecture",
        description:
          "Zero-bundle-cost server rendering for static and data-driven content with clean streaming boundaries.",
      },
      {
        title: "Dynamic Metadata, Sitemaps & JSON-LD",
        description:
          "Programmatic generation of page titles, canonical URLs, OpenGraph cards, XML sitemaps, and Schema.org structured data.",
      },
      {
        title: "Incremental Static Regeneration (ISR) & Caching",
        description:
          "Serve static speeds from the edge while revalidating CMS articles, case studies, and pricing updates in the background.",
      },
      {
        title: "Core Web Vitals Optimization (LCP, INP, CLS)",
        description:
          "Next/Font zero-layout-shift typography, Next/Image responsive formats (AVIF/WebP), and code-split dynamic imports.",
      },
      {
        title: "Seamless Backend API Integration",
        description:
          "Clean integration with standalone Express.js, Node.js, or Python FastAPI backends using typed fetch wrappers.",
      },
      {
        title: "Hydration-Safe Motion & Interactive Islands",
        description:
          "Carefully isolated GSAP ScrollTrigger and Three.js client islands that never cause React hydration mismatches.",
      },
    ],
    deliverables: [
      "Next.js App Router application with TypeScript and Tailwind CSS",
      "Dynamic SEO metadata engine, sitemap.ts, and robots.ts",
      "Server Component data-fetching layer with graceful error boundaries",
      "Optimized typography, SVG assets, and responsive image pipelines",
      "Production build verification and deployment configuration",
    ],
    techStack: [
      "Next.js App Router",
      "React 18",
      "TypeScript",
      "Tailwind CSS",
      "GSAP",
      "Node.js",
    ],
    faqs: [
      {
        question: "Can you migrate our existing React SPA to Next.js App Router?",
        answer:
          "Yes. We audit your current routes, state dependencies, and SEO requirements, then incrementally migrate pages to Next.js Server and Client Components while preserving URL structures and setting up proper redirects.",
      },
      {
        question: "How do you prevent hydration errors when using animations in Next.js?",
        answer:
          "We initialize GSAP timelines inside `useEffect` / `gsap.context()` after mount, avoid branching initial HTML on `window` properties during SSR, and respect `prefers-reduced-motion`.",
      },
    ],
  },

  python: {
    slug: "python",
    title: "Python Development",
    shortTitle: "Python Development",
    category: "Backend, APIs & Data Engineering",
    seoTitle:
      "Python Development Services | FastAPI, Django, Data Pipelines & Automation",
    seoDescription:
      "Custom Python backend development using FastAPI and Django. We build high-concurrency APIs, data processing pipelines, and automation systems.",
    heroHeadline:
      "High-Throughput Python Backends, APIs, and Data Processing Systems",
    heroSubheadline:
      "When your product requires asynchronous APIs, complex data transformations, financial modeling, or AI orchestration, our Python engineering practice delivers clean, type-checked systems.",
    problemStatement:
      "Rapidly written Python scripts and notebooks often break when exposed to production traffic due to missing type validation, blocking I/O calls, unhandled exceptions, and lack of structured logging.",
    architecturalApproach:
      "We engineer production Python services using FastAPI or Django with strict Pydantic schema validation, async/await concurrency, modular service layers, automated health checks, and clean integration with Next.js frontends and MongoDB/PostgreSQL databases.",
    idealFor: [
      "Data-intensive SaaS platforms and analytics engines",
      "High-concurrency REST microservices built with FastAPI",
      "Automated document parsing, ETL pipelines, and scheduled reporting workflows",
      "Products combining a Next.js/React frontend with Python AI/ML capabilities",
    ],
    capabilities: [
      {
        title: "FastAPI Asynchronous Microservices",
        description:
          "High-speed REST APIs with automatic OpenAPI/Swagger documentation and strict Pydantic request/response validation.",
      },
      {
        title: "Data Processing & ETL Pipelines",
        description:
          "Reliable ingestion, cleaning, transformation, and aggregation of structured and unstructured datasets.",
      },
      {
        title: "Background Workers & Task Queues",
        description:
          "Offload heavy report generation, document indexing, and batch third-party API syncs to asynchronous worker queues.",
      },
      {
        title: "Workflow & Business Process Automation",
        description:
          "Eliminate repetitive manual operations with scheduled, audited Python automation services and webhook listeners.",
      },
      {
        title: "Polyglot Integration with Next.js & Node.js",
        description:
          "Clean service-to-service communication allowing your Next.js web application to call specialized Python compute endpoints.",
      },
      {
        title: "Type-Checked & Tested Codebases",
        description:
          "Structured logging, environment validation, unit/integration testing, and containerized deployment readiness.",
      },
    ],
    deliverables: [
      "Production Python API or data pipeline codebase (FastAPI / Django)",
      "Pydantic validation schemas and OpenAPI specification",
      "Asynchronous task processing and error recovery workflows",
      "Integration layer connecting with frontend and database systems",
      "Deployment documentation and 6-month post-handover bug support",
    ],
    techStack: [
      "Python",
      "FastAPI",
      "Django",
      "Pydantic",
      "MongoDB",
      "PostgreSQL",
      "Docker",
      "REST APIs",
    ],
    faqs: [
      {
        question: "When should we choose Python (FastAPI) vs Node.js (Express) for our backend?",
        answer:
          "Node.js/Express with TypeScript is ideal when you want a unified language across your Next.js frontend and API. Python/FastAPI is ideal when your backend performs heavy data science, machine learning, document parsing, or quantitative computation—or we can run both in a hybrid architecture.",
      },
    ],
  },

  "ai-ml": {
    slug: "ai-ml",
    title: "AI and Machine Learning",
    shortTitle: "AI & ML Solutions",
    category: "Applied Intelligence",
    seoTitle:
      "AI & Machine Learning Development Services | RAG, LLM Integration & Automation",
    seoDescription:
      "Practical enterprise AI and Machine Learning engineering. We build citation-backed RAG pipelines, custom LLM workflows, and intelligent software integrations.",
    heroHeadline:
      "Applied AI and Machine Learning Systems Focused on Verifiable Business Utility",
    heroSubheadline:
      "We cut through AI hype to engineer reliable Retrieval-Augmented Generation (RAG) systems, intelligent document workflows, and LLM-powered product features with strict accuracy guardrails.",
    problemStatement:
      "Generic chatbot wrappers frequently hallucinate facts, expose sensitive company data, and fail to integrate with real business workflows. Organizations need AI systems that are grounded in their verified data and enforce strict access controls.",
    architecturalApproach:
      "We treat AI models as bounded reasoning components inside a deterministic software architecture. By combining hybrid vector + keyword retrieval, structured schema outputs, citation verification, and role-based permissions, we build AI features that users can actually trust.",
    idealFor: [
      "Enterprises wanting internal knowledge assistants grounded in company SOPs and policies",
      "SaaS products adding intelligent search, summarization, or classification features",
      "Operations teams automating extraction of structured data from PDFs, invoices, and contracts",
      "Customer support organizations implementing triage and draft-response copilot workflows",
    ],
    capabilities: [
      {
        title: "Retrieval-Augmented Generation (RAG) Architecture",
        description:
          "Hierarchical document parsing, semantic chunking, vector embeddings, and hybrid search that cites exact source passages.",
      },
      {
        title: "Structured Data Extraction & Document Intelligence",
        description:
          "Convert unstructured PDFs, forms, and emails into schema-validated JSON records ready for your database or ERP.",
      },
      {
        title: "Custom LLM Orchestration & Tool Calling",
        description:
          "Multi-step agentic workflows that safely query internal APIs, validate parameters, and require human-in-the-loop approval for sensitive actions.",
      },
      {
        title: "Semantic Search & Recommendation Engines",
        description:
          "Help users discover products, articles, or technical records by meaning and intent rather than exact keyword matches alone.",
      },
      {
        title: "Hallucination Guardrails & Evaluation Suites",
        description:
          "Deterministic schema validation, confidence thresholds, fallback responses, and automated test cases to monitor response quality.",
      },
      {
        title: "Privacy-Conscious & Cost-Controlled Deployment",
        description:
          "Token budget rate limiting, response caching, PII redaction pipelines, and configurable model provider routing.",
      },
    ],
    deliverables: [
      "Ingestion and vector indexing pipeline for your proprietary documents",
      "API endpoints for RAG query, semantic search, or structured extraction",
      "Interactive Next.js/React UI with source citations and feedback controls",
      "Rate-limiting, caching, and cost-monitoring guardrails",
      "Technical documentation and 6-month post-handover bug support",
    ],
    techStack: [
      "Python",
      "FastAPI",
      "Node.js",
      "TypeScript",
      "Vector Databases",
      "MongoDB Atlas Vector Search",
      "Next.js",
    ],
    faqs: [
      {
        question: "How do you prevent AI features from inventing inaccurate answers?",
        answer:
          "We use Retrieval-Augmented Generation (RAG) with strict system constraints so responses are synthesized only from retrieved source passages, accompanied by clickable citations and fallback handling when confidence is low.",
      },
      {
        question: "Are third-party AI API usage fees included in development quotes?",
        answer:
          "Our development quote covers the engineering, integration, and testing of your AI system. Ongoing third-party LLM token usage or cloud vector database hosting costs are billed directly by your chosen provider so you retain full control and transparency.",
      },
    ],
  },

  "ui-ux-animation": {
    slug: "ui-ux-animation",
    title: "UI/UX and Interactive Websites",
    shortTitle: "UI/UX, GSAP & 3D",
    category: "Design Systems & Creative Engineering",
    seoTitle:
      "UI/UX Design, GSAP Animation & Three.js 3D Web Experiences | QLLEX Technologies",
    seoDescription:
      "Premium UI/UX design systems, smooth GSAP ScrollTrigger animations, and performance-conscious Three.js WebGL experiences engineered for accessibility and conversion.",
    heroHeadline:
      "Art-Directed Interfaces, Choreographed GSAP Motion, and WebGL Experiences",
    heroSubheadline:
      "We bridge the gap between design and frontend engineering—crafting distinctive dark and light design systems, tactile micro-interactions, and lightweight 3D visuals that never compromise usability.",
    problemStatement:
      "Many websites fall into one of two extremes: lifeless, cookie-cutter templates that look identical to every competitor, or over-animated showcase sites that hijack scrolling, drain laptop batteries, and frustrate users trying to find information.",
    architecturalApproach:
      "Our design and motion engineers work under a strict rule: motion must guide attention and clarify hierarchy. We use GPU-composited GSAP transforms, clean up ScrollTrigger contexts on route transitions, lazy-load Three.js scenes with static fallbacks, and honor `prefers-reduced-motion`.",
    idealFor: [
      "Technology, AI, fintech, and hardware brands launching flagship digital products",
      "SaaS teams needing a cohesive, accessible multi-component design system",
      "Interactive product showcases requiring 3D inspection or architectural visualization",
      "Companies redesigning outdated interfaces to improve user trust and conversion rates",
    ],
    capabilities: [
      {
        title: "Design Systems & Tokenized Component Libraries",
        description:
          "Consistent typography scales, spacing grids, elevation tokens, focus states, and reusable React primitives.",
      },
      {
        title: "GSAP & ScrollTrigger Choreography",
        description:
          "Smooth hero reveals, staggered card entrances, pinned storytelling sections, and responsive timeline cleanup in React.",
      },
      {
        title: "Performance-Conscious Three.js & React Three Fiber",
        description:
          "Interactive 3D geometry and shader accents that lazy-load on capable devices and degrade gracefully on low-power hardware.",
      },
      {
        title: "Information Architecture & Conversion Flows",
        description:
          "Clear navigation structures, frictionless multi-step forms, and visual hierarchy designed to turn visitors into qualified enquiries.",
      },
      {
        title: "Accessibility-First Interaction Design",
        description:
          "WCAG AA contrast ratios, keyboard tab order, ARIA landmarks, and instant animation bypass when reduced motion is enabled.",
      },
      {
        title: "Micro-Interactions & Tactile Feedback",
        description:
          "Subtle border highlights, button states, form validation cues, and smooth drawer transitions.",
      },
    ],
    deliverables: [
      "Complete UI design system tokens and reusable React component library",
      "GSAP ScrollTrigger animation modules with full lifecycle cleanup",
      "Optional lazy-loaded Three.js / React Three Fiber interactive scenes",
      "Cross-viewport and reduced-motion accessibility verification",
      "Production Next.js implementation with high Lighthouse performance",
    ],
    techStack: [
      "GSAP",
      "ScrollTrigger",
      "Three.js",
      "React Three Fiber",
      "Tailwind CSS",
      "Next.js",
      "TypeScript",
    ],
    faqs: [
      {
        question: "Will GSAP animations or Three.js 3D visuals slow down our website?",
        answer:
          "Not when engineered properly. We only animate GPU-friendly properties (`transform` and `opacity`), lazy-load 3D scenes only on pages that use them, provide static SVG/CSS fallbacks, and never block user interaction.",
      },
      {
        question: "Do you hijack the browser's native scrollbar?",
        answer:
          "No. We preserve native browser scrolling responsiveness and keyboard accessibility (`PageUp`, `PageDown`, `Space`, trackpad momentum) while synchronizing reveals cleanly with ScrollTrigger.",
      },
    ],
  },

  ecommerce: {
    slug: "ecommerce",
    title: "E-commerce Development",
    shortTitle: "E-commerce",
    category: "Digital Commerce",
    seoTitle:
      "Custom E-commerce Development Services | Headless Storefronts & B2B Portals",
    seoDescription:
      "Build fast, conversion-focused custom e-commerce storefronts, B2B wholesale portals, and secure checkout integrations with QLLEX Technologies.",
    heroHeadline:
      "Custom E-Commerce Storefronts and B2B Ordering Platforms Built to Convert",
    heroSubheadline:
      "Sub-second product discovery, tailored checkout flows, multi-tier B2B pricing, and reliable payment and inventory integrations engineered without theme bloat.",
    problemStatement:
      "Heavy plugin-laden e-commerce stores suffer from slow mobile product pages, checkout drop-offs, and inability to support custom product configurators, wholesale pricing tiers, or ERP synchronization.",
    architecturalApproach:
      "We build custom and headless commerce platforms using Next.js for instant server-rendered product catalogs and an Express/Node.js backend for cart validation, idempotent payment webhook processing, and inventory synchronization.",
    idealFor: [
      "Direct-to-consumer (DTC) brands needing a fast, distinctive storefront and custom product configurator",
      "B2B wholesalers and manufacturers requiring tiered pricing, quote-to-order workflows, and bulk ordering",
      "Merchants migrating from slow legacy platforms while preserving SEO rankings and URL redirects",
      "Businesses needing custom subscription, booking, or multi-vendor payment split logic",
    ],
    capabilities: [
      {
        title: "High-Speed ISR Product Catalogs & Faceted Search",
        description:
          "Instant category filtering, SKU lookup, and dynamic SEO metadata + Product structured data for every item.",
      },
      {
        title: "Custom Checkout & Payment Gateway Integration",
        description:
          "Secure server-verified payment intents, webhook signature verification, and support for major global and regional gateways.",
      },
      {
        title: "B2B Wholesale Portals & Quote-to-Order Flows",
        description:
          "Customer-specific price lists, minimum order quantities (MOQ), net-terms invoicing, and approval workflows.",
      },
      {
        title: "ERP, Warehouse & Inventory Synchronization",
        description:
          "Real-time stock level updates, automated order routing, and tax/shipping calculation integrations.",
      },
      {
        title: "Interactive Product Visualizers",
        description:
          "High-resolution gallery zoom, variant switching, and optional 3D product inspection.",
      },
      {
        title: "Order Management & Admin Analytics",
        description:
          "Protected administrative dashboards for catalog management, order status tracking, and customer support.",
      },
    ],
    deliverables: [
      "Custom Next.js storefront optimized for mobile conversion and SEO",
      "Backend commerce API for cart, pricing rules, and order lifecycle",
      "Verified payment gateway and webhook processing integration",
      "Product and BreadcrumbList JSON-LD structured data",
      "6-month post-handover bug support for delivered scope",
    ],
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Payment Webhooks",
      "Tailwind CSS",
    ],
    faqs: [
      {
        question: "Can you build a store that supports both retail checkout and B2B wholesale quotes?",
        answer:
          "Yes. We frequently architect hybrid commerce systems where retail visitors complete instant online checkout while authenticated wholesale accounts access tiered pricing and quote-to-invoice workflows.",
      },
    ],
  },

  "web-design-development": {
    slug: "web-design-development",
    title: "Web Design & Development",
    shortTitle: "Web Design & Dev",
    category: "Web & Digital Platforms",
    seoTitle: "Web Design & Development Services | QLLEX Technologies",
    seoDescription:
      "Professional web design and development services. We build responsive business websites, modern UI implementations, and provide ongoing website maintenance.",
    heroHeadline:
      "Modern Web Design & Development for Growing Businesses",
    heroSubheadline:
      "We build responsive, accessible, and high-converting business websites engineered with modern UI frameworks and continuous maintenance support.",
    problemStatement:
      "Generic website templates suffer from slow loading speeds, rigid styling, broken mobile layouts, and difficult ongoing maintenance.",
    architecturalApproach:
      "We craft responsive websites with component-driven architecture using Next.js, React, and Tailwind CSS, ensuring pixel-perfect UI execution and seamless cross-device compatibility.",
    idealFor: [
      "Businesses seeking a modern, authoritative corporate web presence",
      "Startups requiring fast, scalable product landing experiences",
      "Companies needing reliable, ongoing website maintenance and security updates",
    ],
    capabilities: [
      {
        title: "Responsive Business Websites",
        description:
          "Mobile-first responsive layouts that display flawlessly across smartphones, tablets, laptops, and ultra-wide screens.",
      },
      {
        title: "Modern UI Implementation",
        description:
          "Clean visual hierarchy, bespoke design tokens, smooth transitions, and high-performance frontend code.",
      },
      {
        title: "Website Maintenance & Support",
        description:
          "Proactive performance audits, security patching, dependency updates, and continuous content support.",
      },
    ],
    deliverables: [
      "Responsive business website codebase with Next.js & Tailwind CSS",
      "Modern UI component library and typography system",
      "Ongoing website maintenance plan and technical support",
      "Search-engine-optimized semantic markup and metadata",
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    faqs: [
      {
        question: "Will our website look great on all mobile devices?",
        answer:
          "Yes. Every website is engineered mobile-first and tested rigorously across diverse viewport sizes to guarantee flawless rendering.",
      },
    ],
  },

  "ecommerce-development": {
    slug: "ecommerce-development",
    title: "E-commerce Development",
    shortTitle: "E-commerce Dev",
    category: "Digital Commerce",
    seoTitle: "Custom E-commerce Development Services | QLLEX Technologies",
    seoDescription:
      "Custom e-commerce website development, product catalogues, shopping carts, and seamless payment and order integrations.",
    heroHeadline:
      "High-Performance Custom E-Commerce Solutions",
    heroSubheadline:
      "Tailor-made online stores, structured product catalogues, and reliable payment and order processing designed for high conversion.",
    problemStatement:
      "Standard storefronts become bloated with excessive third-party plugins, causing sluggish checkouts and cart abandonment.",
    architecturalApproach:
      "We engineer custom e-commerce experiences with optimized catalog schemas, fast cart state management, and direct API integrations with leading payment gateways.",
    idealFor: [
      "DTC brands launching dedicated, fast online stores",
      "Wholesalers and B2B businesses requiring custom product catalogues and orders",
      "Merchants needing custom checkout and workflow integrations",
    ],
    capabilities: [
      {
        title: "Custom E-commerce Websites",
        description:
          "Fully bespoke storefronts designed around your brand identity without the limitations of standard templates.",
      },
      {
        title: "Product Catalogue & Shopping Cart",
        description:
          "Fast, faceted product filtering, inventory-aware catalogues, and friction-free shopping cart experiences.",
      },
      {
        title: "Payment and Order Integrations",
        description:
          "Secure payment gateway integrations, order management pipelines, and automated customer order notifications.",
      },
    ],
    deliverables: [
      "Custom e-commerce frontend with fast catalog browsing",
      "Integrated shopping cart and checkout pipeline",
      "Payment gateway and webhook processing configuration",
      "Order tracking and administrative management views",
    ],
    techStack: ["Next.js", "Node.js", "Express.js", "MongoDB", "Payment APIs"],
    faqs: [
      {
        question: "Can we integrate custom payment gateways?",
        answer:
          "Yes. We support direct integration with major regional and global payment providers with verified webhooks.",
      },
    ],
  },

  "ui-ux-design": {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    shortTitle: "UI/UX Design",
    category: "Design & Creative",
    seoTitle: "UI/UX Design Services | Wireframing, Prototyping & Testing | QLLEX Technologies",
    seoDescription:
      "User research, wireframing, prototyping, interface design, and usability testing to craft intuitive digital experiences.",
    heroHeadline:
      "Intuitive UI/UX Design Grounded in User Research",
    heroSubheadline:
      "We create beautiful, functional, and user-centric interfaces from initial wireframes to interactive prototypes and usability testing.",
    problemStatement:
      "Confusing user journeys and cluttered interfaces frustrate users and lead to low conversion rates and customer churn.",
    architecturalApproach:
      "We apply human-centered design principles, validating user workflows through iterative wireframing, high-fidelity Figma prototypes, and empirical usability tests.",
    idealFor: [
      "SaaS founders designing new product interfaces from scratch",
      "Companies revamping existing web and mobile apps for better usability",
      "Teams needing a cohesive, reusable design system",
    ],
    capabilities: [
      {
        title: "User Research & Wireframing",
        description:
          "In-depth user flow mapping, persona research, and low-fidelity wireframing to establish intuitive navigation.",
      },
      {
        title: "Prototyping & Interface Design",
        description:
          "High-fidelity visual design, responsive design systems, and interactive clickable prototypes in Figma.",
      },
      {
        title: "Usability Testing",
        description:
          "Structured usability evaluations and feedback synthesis to identify friction points and optimize task completion.",
      },
    ],
    deliverables: [
      "Complete Figma design files and component system",
      "Interactive clickable prototypes for user testing and stakeholder review",
      "Usability audit report with actionable optimization recommendations",
      "Developer handoff documentation with design tokens and assets",
    ],
    techStack: ["Figma", "Design Systems", "Prototyping", "Usability Testing"],
    faqs: [
      {
        question: "Do you provide design files ready for developer handoff?",
        answer:
          "Yes. All designs include organized components, color and typography tokens, layout grids, and interactive states.",
      },
    ],
  },

  "digital-marketing": {
    slug: "digital-marketing",
    title: "Digital Marketing",
    shortTitle: "Digital Marketing",
    category: "Growth & Marketing",
    seoTitle: "Digital Marketing Services | SEO, Social Media & Content | QLLEX Technologies",
    seoDescription:
      "Comprehensive digital marketing services: Search Engine Optimisation (SEO), social media management, and content marketing.",
    heroHeadline:
      "Data-Driven Digital Marketing to Scale Your Reach",
    heroSubheadline:
      "We combine technical SEO, targeted social media management, and high-impact content marketing to build brand visibility and drive qualified leads.",
    problemStatement:
      "Great digital products often fail to gain traction without consistent search visibility, social brand presence, and compelling content.",
    architecturalApproach:
      "We implement technical on-page and architectural SEO, create strategic social media content calendars, and publish informative articles that rank and convert.",
    idealFor: [
      "Growing companies wanting higher search rankings and organic inbound traffic",
      "Brands looking to build an engaged social media community",
      "B2B businesses requiring thought leadership and authoritative content",
    ],
    capabilities: [
      {
        title: "Search Engine Optimisation (SEO)",
        description:
          "Technical site audits, keyword strategy, schema markup implementation, and on-page optimization for Google rankings.",
      },
      {
        title: "Social Media Management",
        description:
          "Channel strategy, consistent branded post creation, community engagement, and performance analytics.",
      },
      {
        title: "Content Marketing",
        description:
          "Educational blog posts, case study articles, and conversion-focused copywriting that establish market authority.",
      },
    ],
    deliverables: [
      "Technical SEO audit and optimization implementation",
      "Monthly social media content schedule and creative assets",
      "High-value blog articles and case studies tailored for organic search",
      "Monthly performance and analytics reporting",
    ],
    techStack: ["Technical SEO", "Schema Markup", "Analytics", "Content Strategy"],
    faqs: [
      {
        question: "How quickly can we expect to see SEO results?",
        answer:
          "Technical fixes deliver immediate crawl improvements, while keyword rankings and organic traffic growth typically show measurable gains within 3 to 6 months.",
      },
    ],
  },

  "ai-agent-development": {
    slug: "ai-agent-development",
    title: "AI Agent Development",
    shortTitle: "AI Agents",
    category: "Applied AI",
    seoTitle: "AI Agent Development Services | Autonomous Agents & RAG | QLLEX Technologies",
    seoDescription:
      "Custom AI agent development, intelligent chatbots, Retrieval-Augmented Generation (RAG) pipelines, and LLM workflow integrations.",
    heroHeadline:
      "Custom AI Agents & Intelligent Automation Workflows",
    heroSubheadline:
      "We design and deploy purpose-built AI agents, enterprise RAG pipelines, and tool-augmented LLM workflows that automate complex business tasks.",
    problemStatement:
      "Generic chatbots lack domain context, hallucinate answers, and cannot securely interact with internal enterprise databases and APIs.",
    architecturalApproach:
      "We construct autonomous AI agents with bounded tool-calling capabilities, deterministic vector retrieval (RAG), strict privacy boundaries, and verified structured outputs.",
    idealFor: [
      "Enterprises wanting internal knowledge copilots grounded in proprietary SOPs",
      "Customer support teams automating Tier-1 inquiry resolution",
      "Operations teams requiring automated data extraction and task execution",
    ],
    capabilities: [
      {
        title: "Custom AI Agents & Chatbots",
        description:
          "Domain-specific conversational agents with conversational memory, persona alignment, and multi-turn reasoning.",
      },
      {
        title: "Retrieval-Augmented Generation (RAG) Pipelines",
        description:
          "Document ingestion, semantic chunking, vector indexing, and citation-backed answer generation.",
      },
      {
        title: "Workflow & Tool Integrations",
        description:
          "Safe agentic function calling connecting AI models to internal databases, REST APIs, and third-party SaaS services.",
      },
    ],
    deliverables: [
      "Custom AI agent backend with Python / FastAPI or Node.js",
      "Vector search pipeline and document indexing infrastructure",
      "API integrations for automated multi-step tool execution",
      "Testing suite for accuracy verification and prompt guardrails",
    ],
    techStack: ["Python", "FastAPI", "Vector Search", "LLMs", "RAG", "Node.js"],
    faqs: [
      {
        question: "Can AI agents safely execute tasks in our existing software?",
        answer:
          "Yes. We implement strict parameter validation, role-based permissions, and optional human-in-the-loop approvals for sensitive operations.",
      },
    ],
  },

  "web-application-development": {
    slug: "web-application-development",
    title: "Web Application Development",
    shortTitle: "Web Applications",
    category: "Custom Software Engineering",
    seoTitle: "Custom Web Application Development Services | SaaS & Cloud | QLLEX Technologies",
    seoDescription:
      "Scalable SaaS platform development, business portals, operational dashboards, and full-stack web applications built on modern architecture.",
    heroHeadline:
      "Custom Web Applications Engineered for Scale and Reliability",
    heroSubheadline:
      "From multi-tenant SaaS platforms to mission-critical internal business portals, we engineer custom web applications that support complex workflows.",
    problemStatement:
      "Outdated software and fragmented spreadsheets slow operations, create data security risks, and restrict business growth.",
    architecturalApproach:
      "We architect full-stack applications with clean separation of concerns, robust REST APIs, role-based access control (RBAC), and optimized database schemas.",
    idealFor: [
      "Founders launching new multi-tenant SaaS platforms",
      "Businesses replacing legacy tools with centralized web applications",
      "Enterprises requiring real-time analytics and operational dashboards",
    ],
    capabilities: [
      {
        title: "SaaS Platform Development",
        description:
          "Multi-tenant architectures, subscription lifecycle handling, user onboarding, and granular tenant isolation.",
      },
      {
        title: "Business Portals & Dashboards",
        description:
          "High-density operational dashboards, interactive data visualization, role-based permissions, and audit logs.",
      },
      {
        title: "Full-Stack Web Applications",
        description:
          "Unified TypeScript full-stack systems with type-safe APIs, database indexing, and automated deployment pipelines.",
      },
    ],
    deliverables: [
      "Production-ready Next.js / React frontend application",
      "Scalable backend REST API (Express / Node.js or Python)",
      "Database schema definitions with performance indexes",
      "Role-based authentication, user management, and security suite",
    ],
    techStack: ["Next.js", "React", "TypeScript", "Node.js", "Express.js", "MongoDB"],
    faqs: [
      {
        question: "Can our web application scale as user numbers grow?",
        answer:
          "Yes. We build with modular, stateless API designs and optimized database query patterns designed for high concurrency.",
      },
    ],
  },

  "mobile-application-development": {
    slug: "mobile-application-development",
    title: "Mobile Application Development",
    shortTitle: "Mobile Apps",
    category: "Mobile Engineering",
    seoTitle: "Mobile Application Development Services | Flutter, iOS & Android | QLLEX Technologies",
    seoDescription:
      "Cross-platform iOS and Android mobile app development using Flutter. High-performance, offline-capable mobile apps with scalable backends.",
    heroHeadline:
      "Cross-Platform Mobile Apps Engineered for Performance",
    heroSubheadline:
      "We design and build engaging iOS and Android applications using Flutter and native SDK integrations, ensuring 60fps smoothness from a single codebase.",
    problemStatement:
      "Maintaining separate native applications doubles engineering overhead, while low-quality hybrid wrappers lead to poor performance.",
    architecturalApproach:
      "We utilize Flutter to compile directly to native machine code, paired with offline-first local storage, biometric security, and clean REST API synchronization.",
    idealFor: [
      "Startups wanting to launch on both the Apple App Store and Google Play simultaneously",
      "Companies extending their web platforms to mobile users",
      "Field teams needing resilient offline mobile capabilities",
    ],
    capabilities: [
      {
        title: "iOS & Android Development",
        description:
          "Platform-adaptive UI components, hardware feature integrations, and store-ready signing and distribution.",
      },
      {
        title: "Cross-Platform Development (Flutter)",
        description:
          "A single, high-efficiency Dart codebase delivering unified business logic and consistent high-frame-rate rendering.",
      },
    ],
    deliverables: [
      "Cross-platform Flutter mobile source code for iOS and Android",
      "Backend REST API endpoints and database synchronization",
      "Authentication, push notifications, and local offline caching modules",
      "Store submission readiness and release documentation",
    ],
    techStack: ["Flutter", "Dart", "iOS", "Android", "REST APIs", "Node.js"],
    faqs: [
      {
        question: "Will the app feel native on both iOS and Android?",
        answer:
          "Yes. Flutter renders directly to native canvas and adapts platform conventions like navigation transitions and modal sheets.",
      },
    ],
  },
};

export const SERVICES_ARRAY: ServiceDetail[] = Object.values(SERVICES_DATA);
