/**
 * CENTRAL BRAND & COMPANY CONFIGURATION
 * Single source of truth for company name, contact details, and navigation.
 */

export const BRAND_CONFIG = {
  name: "QLLEX Technologies",
  shortName: "QLLEX",
  legalEntityPlaceholder: "QLLEX Technologies Inc.",
  tagline: "Build Smarter. Scale Faster.",
  domain: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  description:
    "Engineering-first creative software agency designing and building Next.js web applications, MERN stack platforms, Python APIs, Flutter mobile apps, and interactive GSAP & 3D web experiences.",
  positioning:
    "We turn bold ideas into high-performance digital experiences for ambitious startups, small businesses, and growing companies worldwide.",

  contact: {
    // Official Updated Company Contacts
    email: "qllextechnologies@gmail.com",
    enquiriesEmail: "qllextechnologies@gmail.com",
    supportEmail: "qllextechnologies@gmail.com",
    legalEmail: "qllextechnologies@gmail.com",
    privacyEmail: "qllextechnologies@gmail.com",
    phoneDisplay: "+91 9313188307",
    phoneHref: "tel:+919313188307",
    whatsappDisplay: "+91 9313188307",
    whatsappRaw: "919313188307",
    whatsappUrl: "https://wa.me/919313188307",
    workingHours: "Monday – Friday | 10:00 AM – 6:00 PM IST",
    responseTime: "Within 1 business day",
    officeLocation: "Ahmedabad, Gujarat, India (Global Remote Delivery)",
  },

  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    x: "https://x.com",
  },

  // 4 Simple Core Service Categories (Requirement 2)
  fourCoreServices: [
    {
      slug: "web-development",
      title: "Web Development & Next.js Platforms",
      summary:
        "Modern, high-performance web applications and corporate websites built with Next.js, React, and Tailwind CSS.",
      features: [
        "Next.js App Router",
        "Server Components",
        "Responsive Across All Devices",
        "Core Web Vitals Optimized",
      ],
    },
    {
      slug: "backend-apis",
      title: "Backend Systems & REST/FastAPI",
      summary:
        "Scalable, secure backend architectures, microservices, and high-throughput APIs using Node.js, Express, and Python FastAPI.",
      features: [
        "Node.js & Express",
        "Python FastAPI",
        "Clean Documented REST APIs",
        "Secure JWT & Rate Limiting",
      ],
    },
    {
      slug: "mobile-apps",
      title: "Mobile Engineering",
      summary:
        "Cross-platform mobile applications for iOS and Android delivering 60fps native performance from a single unified codebase.",
      features: [
        "Flutter Development",
        "React Native",
        "Offline Persistence",
        "Smooth Native Device APIs",
      ],
    },
    {
      slug: "creative-motion",
      title: "Creative Web & Interactive Motion",
      summary:
        "Engaging digital experiences with smooth GSAP animations, interactive scroll choreography, and lightweight Three.js visuals.",
      features: [
        "GSAP & ScrollTrigger",
        "Lightweight Three.js",
        "Reduced-Motion Compliant",
        "Refined Micro-Interactions",
      ],
    },
  ],

  // Essential Technology Stack Categories (Requirement 2)
  essentialTechStack: [
    {
      category: "Frontend",
      technologies: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"],
    },
    {
      category: "Backend",
      technologies: ["Node.js", "Express.js", "Python", "FastAPI"],
    },
    {
      category: "Mobile",
      technologies: ["Flutter", "React Native"],
    },
    {
      category: "Creative Web",
      technologies: ["GSAP", "Three.js"],
    },
    {
      category: "Database and Tools",
      technologies: ["MongoDB", "PostgreSQL", "Git", "Docker"],
    },
  ],

  // 6 Core Essential Services
  servicesList: [
    {
      slug: "web-development",
      title: "Web Development & Next.js",
      shortTitle: "Web Development",
      category: "Frontend & Architecture",
      summary:
        "High-performance corporate websites and SaaS platforms built with Next.js App Router, TypeScript, and modern Server Components.",
    },
    {
      slug: "fullstack-mern",
      title: "Full-Stack MERN Architecture",
      shortTitle: "MERN Stack",
      category: "Full-Stack Systems",
      summary:
        "Type-safe MongoDB, Express.js, React, and Node.js applications engineered with shared Zod schemas and clean API layers.",
    },
    {
      slug: "mobile-apps",
      title: "Mobile App Development",
      shortTitle: "Mobile Apps",
      category: "Mobile Engineering",
      summary:
        "Cross-platform iOS and Android applications built with Flutter and native integrations for 60fps smoothness and offline reliability.",
    },
    {
      slug: "python-apis",
      title: "Python Backends & APIs",
      shortTitle: "Python & APIs",
      category: "Backend & Data",
      summary:
        "High-throughput asynchronous APIs and microservices using FastAPI and Django for data processing, automation, and business logic.",
    },
    {
      slug: "ai-ml",
      title: "AI & Machine Learning",
      shortTitle: "AI & ML Solutions",
      category: "Applied AI",
      summary:
        "Practical Retrieval-Augmented Generation (RAG) pipelines, document intelligence, and LLM orchestration with verifiable accuracy.",
    },
    {
      slug: "ui-ux-3d",
      title: "UI/UX & Interactive 3D",
      shortTitle: "UI/UX, GSAP & 3D",
      category: "Design & Motion",
      summary:
        "Art-directed design systems, smooth GSAP ScrollTrigger choreography, and lightweight Three.js creative web experiences.",
    },
  ],

  // Header & Main Navigation (Home, Services, Work, About, Contact)
  navigation: {
    main: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Work", href: "/portfolio" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Refund Policy", href: "/refund-policy" },
      { label: "Support Policy", href: "/support-policy" },
    ],
  },
} as const;

export type ServiceSlug = string;
