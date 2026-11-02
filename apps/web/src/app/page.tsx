import React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Code2,
  Terminal,
  Smartphone,
  Sparkles,
  CheckCircle2,
  MessageSquare,
  Zap,
  ShieldCheck,
  Database,
  Layers,
} from "lucide-react";
import { BRAND_CONFIG } from "@nexovanta/shared";
import { buildMetadata } from "@/lib/seo";
import { fetchPortfolioProjects } from "@/lib/api";
import { RevealWrapper } from "@/components/animations/RevealWrapper";
import { HeroHeadingAnimated } from "@/components/animations/HeroHeadingAnimated";
import { HeroArchitectureVisual } from "@/components/animations/HeroArchitectureVisual";
import { ServiceCardsAnimated } from "@/components/animations/ServiceCardsAnimated";
import { HorizontalWorkScroll, ProjectCardData } from "@/components/animations/HorizontalWorkScroll";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata = buildMetadata({
  title: `${BRAND_CONFIG.name} — ${BRAND_CONFIG.tagline} | Simple & Premium Software Agency`,
  description: BRAND_CONFIG.description,
  path: "/",
});

// Essential Technology Stack Categories (Section 2)
const ESSENTIAL_TECH_GROUPS = [
  {
    category: "Frontend",
    icon: Layers,
    accentBg: "bg-[#DCE7FF]/40",
    accentBorder: "border-[#CAD8F8]",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Next.js",
      "Tailwind CSS",
    ],
  },
  {
    category: "Backend",
    icon: Terminal,
    accentBg: "bg-[#F5F5F3]",
    accentBorder: "border-[#E8E8E5]",
    technologies: ["Node.js", "Express.js", "Python", "FastAPI"],
  },
  {
    category: "Mobile",
    icon: Smartphone,
    accentBg: "bg-[#C6E7D7]/40",
    accentBorder: "border-[#AFD7C4]",
    technologies: ["Flutter", "React Native"],
  },
  {
    category: "Creative Web",
    icon: Sparkles,
    accentBg: "bg-[#F1DDF5]/40",
    accentBorder: "border-[#E2C7E7]",
    technologies: ["GSAP", "Three.js"],
  },
  {
    category: "Database and Tools",
    icon: Database,
    accentBg: "bg-[#FCF1D0]/40",
    accentBorder: "border-[#F4E3AF]",
    technologies: ["MongoDB", "PostgreSQL", "Git", "Docker"],
  },
];

export default async function HomePage() {
  const portfolioRaw = await fetchPortfolioProjects();

  const showcaseProjects: ProjectCardData[] = portfolioRaw.map((p) => ({
    title: p.title,
    slug: p.slug,
    category: p.category,
    summary: p.summary,
    techStack: p.techStack,
    verificationLabel: p.verificationLabel,
  }));

  return (
    <div className="space-y-0 text-[#333333]">
      {/* 1. CLEAN HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FCF1D0]/30 via-white to-white border-b border-[#E8E8E5] pt-12 pb-20 sm:pt-20 sm:pb-28">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Hero Copy (Charcoal & Warm Cream Aesthetic) */}
            <RevealWrapper className="lg:col-span-7 space-y-6" yOffset={16}>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#E8E8E5] bg-white px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-[#333333] font-semibold shadow-2xs">
                <span className="flex h-2 w-2 rounded-full bg-[#333333]" />
                <span>{BRAND_CONFIG.tagline}</span>
              </div>

              {/* Staggered Word Reveal Heading */}
              <HeroHeadingAnimated />

              <p className="max-w-2xl text-base sm:text-lg lg:text-xl text-[#666666] leading-relaxed font-normal">
                Websites, applications and intelligent software built for ambitious businesses.
                From Next.js platforms to mobile apps and custom APIs, we engineer scalable digital products with long-term craft.
              </p>

              {/* Two Prominent Action CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#enquiry-form"
                  className="group inline-flex items-center gap-2 rounded-full bg-[#333333] px-7 py-3.5 text-sm sm:text-base font-semibold text-white shadow hover:bg-[#222222] transition-all"
                >
                  <span>Start a Project</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </a>

                <a
                  href="#selected-work"
                  className="group inline-flex items-center gap-2 rounded-full border border-[#333333] bg-white px-7 py-3.5 text-sm sm:text-base font-semibold text-[#333333] hover:bg-[#FCF1D0] transition-all shadow-xs"
                >
                  <span>View Our Work</span>
                  <ArrowUpRight className="h-4 w-4 text-[#333333] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </a>
              </div>

              {/* Core Quality Badges */}
              <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[#E8E8E5] text-xs text-[#666666] font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#333333] shrink-0" />
                  <span>Next.js &amp; MERN Stack</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#333333] shrink-0" />
                  <span>Python &amp; REST APIs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#333333] shrink-0" />
                  <span>Verified Code Ownership</span>
                </div>
              </div>
            </RevealWrapper>

            {/* Hero Interactive Visual (Artistic Pastel Spatial Composition) */}
            <RevealWrapper className="lg:col-span-5" delay={0.15} yOffset={24}>
              <HeroArchitectureVisual />
            </RevealWrapper>
          </div>
        </div>
      </section>

      {/* 2. BRIEF INTRODUCTION */}
      <section className="border-b border-[#E8E8E5] bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
            <div className="lg:col-span-5 space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[#666666] font-semibold">
                About {BRAND_CONFIG.name}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#333333] leading-tight">
                Software Built with Clarity, Speed, and Scale.
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-4 text-sm sm:text-base text-[#666666] leading-relaxed">
              <p>
                {BRAND_CONFIG.name} is a creative software development agency. We engineer modern websites, high-performance web applications, robust backend microservices, and native mobile apps for businesses that demand reliability.
              </p>
              <p>
                Every project is crafted with type safety, clean modular architecture, and verifiable documentation—ensuring your software is easy to maintain, fast to load, and ready to scale.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-6">
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-1.5 font-semibold text-[#333333] hover:underline text-sm"
                >
                  <span>Read our engineering standards</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href={BRAND_CONFIG.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-emerald-800 hover:text-emerald-900 text-sm"
                >
                  <MessageSquare className="h-4 w-4 text-emerald-700" />
                  <span>Chat directly on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOUR SIMPLE SERVICE CATEGORIES */}
      <section className="border-b border-[#E8E8E5] bg-[#F5F5F3] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3 max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-widest text-[#666666] font-semibold">
                Our Services
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#333333]">
                Core IT &amp; Digital Services
              </h2>
              <p className="text-sm sm:text-base text-[#666666]">
                Comprehensive, high-performance technology services tailored to deliver measurable value and scale your digital presence.
              </p>
            </div>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[#333333] hover:underline"
            >
              <span>View All Services</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Animated Service Cards with Alternating Side Reveal */}
          <ServiceCardsAnimated services={BRAND_CONFIG.fourCoreServices} />
        </div>
      </section>

      {/* 4. COMPACT TECHNOLOGY SECTION */}
      <section className="border-b border-[#E8E8E5] bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12 space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[#666666] font-semibold">
              Modern Technologies
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#333333]">
              Essential Technology Stack
            </h2>
            <p className="text-sm sm:text-base text-[#666666]">
              We build exclusively with proven, enterprise-ready tools that ensure high speed, security, and long-term maintainability.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ESSENTIAL_TECH_GROUPS.map((group) => {
              const Icon = group.icon;
              return (
                <div
                  key={group.category}
                  className="rounded-2xl border border-[#E8E8E5] bg-[#F5F5F3] p-6 shadow-xs hover:border-[#333333] hover:shadow-card transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#333333] border border-[#E8E8E5] shadow-xs group-hover:border-[#333333] transition-colors">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-display text-lg font-bold text-[#333333]">
                        {group.category}
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {group.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-lg bg-white border border-[#E8E8E5] px-3 py-1.5 font-mono text-xs text-[#333333] font-medium shadow-2xs transition-colors hover:border-[#333333]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. HORIZONTALLY SCROLLING PROJECT SHOWCASE (GSAP & ScrollTrigger) */}
      <HorizontalWorkScroll projects={showcaseProjects} />

      {/* 6. SHORT CONTACT SECTION (Customer Enquiry Form) */}
      <section id="enquiry-form" className="py-20 sm:py-28 bg-[#FCF1D0]/30 border-b border-[#E8E8E5]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E8E8E5] bg-white px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-[#333333] font-semibold">
              <span>Start a Project</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#333333]">
              Have a Project in Mind? Let&apos;s Build It.
            </h2>
            <p className="text-sm sm:text-base text-[#666666] leading-relaxed">
              Tell us about your requirements, timeline, and goals. Our engineering lead will review
              your scope and respond within 1 business day.
            </p>

            <div className="pt-2 flex items-center justify-center gap-4">
              <a
                href={BRAND_CONFIG.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200 hover:bg-emerald-100 transition-colors"
              >
                <MessageSquare className="h-3.5 w-3.5 text-emerald-700" />
                <span>Instant WhatsApp: {BRAND_CONFIG.contact.phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* Connected Live Enquiry Form */}
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
