import React from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, ShieldCheck, ArrowRight, MessageSquare } from "lucide-react";
import { BRAND_CONFIG } from "@nexovanta/shared";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { RevealWrapper } from "@/components/animations/RevealWrapper";

export const metadata = buildMetadata({
  title: "Software Engineering & IT Services | Web, Mobile, MERN, Next.js & AI",
  description:
    "Explore QLLEX Technologies' core software development services: Next.js websites, MERN stack applications, Flutter mobile apps, Python APIs, AI/ML, and UI/UX design.",
  path: "/services",
});

const DETAILED_SERVICES = [
  {
    slug: "web-design-development",
    title: "Web Design & Development",
    category: "Web & Digital Platforms",
    summary:
      "Modern, responsive business websites and high-performance user interfaces crafted for credibility, speed, and continuous reliability.",
    deliverables: [
      "Responsive business websites",
      "Modern UI implementation",
      "Website maintenance",
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    accentBg: "bg-[#DCE7FF]/40",
  },
  {
    slug: "ecommerce-development",
    title: "E-commerce Development",
    category: "Digital Commerce",
    summary:
      "Bespoke digital storefronts and wholesale platforms engineered for seamless purchasing experiences, conversions, and secure ordering.",
    deliverables: [
      "Custom e-commerce websites",
      "Product catalogue and shopping cart",
      "Payment and order integrations, where required",
    ],
    techStack: ["Next.js", "Node.js", "Express.js", "MongoDB", "Payment APIs"],
    accentBg: "bg-[#C6E7D7]/40",
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    category: "Design & Creative",
    summary:
      "Human-centered design systems, clean wireframes, interactive prototypes, and usability testing that drive user satisfaction.",
    deliverables: [
      "User research and wireframing",
      "Prototyping and interface design",
      "Usability testing",
    ],
    techStack: ["Figma", "Design Systems", "Wireframing", "Prototyping"],
    accentBg: "bg-[#F1DDF5]/40",
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    category: "Growth & Visibility",
    summary:
      "Data-driven SEO strategies, active social media management, and engaging content marketing that expand reach and elevate brand authority.",
    deliverables: [
      "Search Engine Optimisation (SEO)",
      "Social media management",
      "Content marketing",
    ],
    techStack: ["Technical SEO", "Schema Markup", "Analytics", "Content Strategy"],
    accentBg: "bg-[#FCF1D0]/40",
  },
  {
    slug: "ai-agent-development",
    title: "AI Agent Development",
    category: "Applied AI & Automation",
    summary:
      "Intelligent autonomous agents, RAG knowledge retrieval systems, and custom LLM workflows designed for business process efficiency.",
    deliverables: [
      "Custom AI agents and chatbots",
      "Retrieval-Augmented Generation (RAG) pipelines",
      "Workflow and tool integrations",
    ],
    techStack: ["Python", "FastAPI", "Vector Search", "LLMs", "RAG"],
    accentBg: "bg-[#DCE7FF]/40",
  },
  {
    slug: "web-application-development",
    title: "Web Application Development",
    category: "Custom Software Engineering",
    summary:
      "Enterprise-grade SaaS platforms, operational dashboards, and full-stack web applications built on scalable modern architectures.",
    deliverables: [
      "SaaS platforms",
      "Business portals and dashboards",
      "Full-stack web applications",
    ],
    techStack: ["Next.js", "React", "Node.js", "Express.js", "MongoDB"],
    accentBg: "bg-[#C6E7D7]/40",
  },
  {
    slug: "mobile-application-development",
    title: "Mobile Application Development",
    category: "Mobile Engineering",
    summary:
      "Smooth, native-performance iOS and Android mobile applications delivered from a maintainable, high-efficiency cross-platform codebase.",
    deliverables: [
      "iOS and Android apps",
      "Cross-platform development (e.g., Flutter)",
    ],
    techStack: ["Flutter", "Dart", "iOS", "Android", "REST APIs"],
    accentBg: "bg-[#F1DDF5]/40",
  },
];

export default function ServicesOverviewPage() {
  return (
    <div className="py-12 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Services", path: "/services" }]} />

        {/* Page Header */}
        <div className="max-w-3xl space-y-4 pb-12 border-b border-[#E8E8E5]">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E8E8E5] bg-[#FCF1D0] px-3.5 py-1 font-mono text-xs uppercase tracking-widest text-[#333333] font-semibold">
            <span>Core Engineering Practices</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#333333] leading-tight">
            Dedicated Services for Modern Software Products
          </h1>
          <p className="text-base sm:text-lg text-[#666666] leading-relaxed">
            Every engagement at {BRAND_CONFIG.name} is delivered by experienced
            software architects using type-safe engineering standards and a written
            6-month post-handover warranty.
          </p>
        </div>

        {/* 6 Essential Services Grid */}
        <RevealWrapper
          staggerSelector=".service-detail-card"
          className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2"
        >
          {DETAILED_SERVICES.map((service, idx) => (
            <article
              key={service.slug}
              id={service.slug}
              className="service-detail-card rounded-3xl border border-[#E8E8E5] bg-white p-7 sm:p-9 flex flex-col justify-between shadow-subtle hover:border-[#333333] hover:shadow-card-hover transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 font-mono text-xs mb-4 pb-3 border-b border-[#F0F0ED]">
                  <span className="font-bold text-[#333333]">
                    {`SERVICE // 0${idx + 1}`}
                  </span>
                  <span className="rounded-full bg-[#FCF1D0] border border-[#F4E3AF] px-3 py-0.5 text-[#333333] text-[11px] font-semibold">
                    {service.category}
                  </span>
                </div>

                <h2 className="font-display text-2xl font-bold text-[#333333]">
                  {service.title}
                </h2>

                <p className="mt-3 text-sm text-[#666666] leading-relaxed">
                  {service.summary}
                </p>

                {/* Key Deliverables */}
                <div className="mt-6 pt-5 border-t border-[#F0F0ED]">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-[#888888] mb-3 font-semibold">
                    Core Capabilities &amp; Deliverables
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#666666]">
                    {service.deliverables.map((del) => (
                      <li key={del} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#333333] shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stack Pills */}
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {service.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-[#E8E8E5] bg-[#F5F5F3] px-2.5 py-1 font-mono text-[11px] text-[#333333] font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-[#F0F0ED] flex flex-wrap items-center justify-between gap-4">
                <Link
                  href={`/contact?service=${encodeURIComponent(service.title)}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#333333] hover:underline transition-colors"
                >
                  <span>Enquire for {service.title}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </RevealWrapper>

        {/* Bottom CTA */}
        <div className="mt-16 rounded-3xl border border-[#E8E8E5] bg-[#F5F5F3] p-8 sm:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#333333] font-semibold">
              <ShieldCheck className="h-4 w-4 text-[#333333]" />
              <span>MULTIDISCIPLINARY ARCHITECTURE &amp; SUPPORT</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#333333]">
              Ready to Discuss Your Project Requirements?
            </h2>
            <p className="text-sm sm:text-base text-[#666666] leading-relaxed">
              Tell us about your technical goals, target release timeline, and system
              requirements. You will speak directly with senior engineering architects.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#333333] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#222222] transition-all shadow-sm"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            <a
              href={BRAND_CONFIG.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-6 py-3.5 text-sm font-semibold text-emerald-800 hover:bg-emerald-100 transition-colors shadow-sm"
            >
              <MessageSquare className="h-4 w-4 text-emerald-600" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
