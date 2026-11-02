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

  // 7 Core Service Categories
  fourCoreServices: [
    {
      slug: "web-design-development",
      title: "Web Design & Development",
      summary:
        "Responsive business websites and modern UI implementations built for performance, accessibility, and brand authority.",
      features: [
        "Responsive Business Websites",
        "Modern UI Implementation",
        "Website Maintenance",
      ],
    },
    {
      slug: "ecommerce-development",
      title: "E-commerce Development",
      summary:
        "Custom e-commerce websites with product catalogues, shopping carts, and payment integrations.",
      features: [
        "Custom E-commerce Websites",
        "Product Catalogue & Shopping Cart",
        "Payment & Order Integrations",
      ],
    },
    {
      slug: "ui-ux-design",
      title: "UI/UX Design",
      summary:
        "User research, wireframing, prototyping, and interface design creating intuitive digital experiences.",
      features: [
        "User Research & Wireframing",
        "Prototyping & Interface Design",
        "Usability Testing",
      ],
    },
    {
      slug: "digital-marketing",
      title: "Digital Marketing",
      summary:
        "SEO, social media management, and content marketing strategies to grow your online presence.",
      features: [
        "Search Engine Optimisation (SEO)",
        "Social Media Management",
        "Content Marketing",
      ],
    },
    {
      slug: "ai-agent-development",
      title: "AI Agent Development",
      summary:
        "Custom AI agents, RAG pipelines, and LLM workflow integrations for intelligent business automation.",
      features: [
        "Custom AI Agents & Chatbots",
        "RAG Pipeline Development",
        "LLM Workflow Integration",
      ],
    },
    {
      slug: "web-application-development",
      title: "Web Application Development",
      summary:
        "Scalable SaaS platforms, business portals, and full-stack web applications built with modern architecture.",
      features: [
        "SaaS Platform Development",
        "Business Portals & Dashboards",
        "Full-Stack Web Applications",
      ],
    },
    {
      slug: "mobile-application-development",
      title: "Mobile Application Development",
      summary:
        "Cross-platform iOS and Android mobile applications delivering native-grade performance.",
      features: [
        "iOS & Android Development",
        "Cross-Platform Flutter Apps",
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

  // 7 Core Services List
  servicesList: [
    {
      slug: "web-design-development",
      title: "Web Design & Development",
      shortTitle: "Web Design",
      category: "Web & Digital Platforms",
      summary:
        "Responsive business websites and modern UI implementations built for performance, accessibility, and brand authority.",
    },
    {
      slug: "ecommerce-development",
      title: "E-commerce Development",
      shortTitle: "E-commerce",
      category: "Digital Commerce",
      summary:
        "Custom e-commerce websites with product catalogues, shopping carts, and seamless payment and order integrations.",
    },
    {
      slug: "ui-ux-design",
      title: "UI/UX Design",
      shortTitle: "UI/UX Design",
      category: "Design & Creative",
      summary:
        "User research, wireframing, prototyping, and interface design to create intuitive and engaging digital experiences.",
    },
    {
      slug: "digital-marketing",
      title: "Digital Marketing",
      shortTitle: "Digital Marketing",
      category: "Growth & Marketing",
      summary:
        "SEO, social media management, and content marketing strategies designed to grow your online presence and reach.",
    },
    {
      slug: "ai-agent-development",
      title: "AI Agent Development",
      shortTitle: "AI Agents",
      category: "Applied AI",
      summary:
        "Custom AI agents, RAG pipelines, and LLM workflow integrations for intelligent business automation.",
    },
    {
      slug: "web-application-development",
      title: "Web Application Development",
      shortTitle: "Web Applications",
      category: "Custom Software Engineering",
      summary:
        "Scalable SaaS platforms, business portals, and full-stack web applications built with modern architecture.",
    },
    {
      slug: "mobile-application-development",
      title: "Mobile Application Development",
      shortTitle: "Mobile Apps",
      category: "Mobile Engineering",
      summary:
        "Cross-platform iOS and Android applications delivering native-grade performance from a unified codebase.",
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
