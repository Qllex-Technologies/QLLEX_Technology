import React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Code2,
  ShieldCheck,
  CheckCircle2,
  Compass,
  Users,
  MessageSquare,
} from "lucide-react";
import { BRAND_CONFIG } from "@nexovanta/shared";
import { buildMetadata } from "@/lib/seo";
import { WHY_CHOOSE_US_PILLARS } from "@/data/companyContent";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { RevealWrapper } from "@/components/animations/RevealWrapper";

export const metadata = buildMetadata({
  title: `About ${BRAND_CONFIG.name} | Software Architecture & Engineering Philosophy`,
  description: `Learn how ${BRAND_CONFIG.name} designs and builds custom software, Next.js web platforms, MERN applications, Python APIs, and applied AI solutions.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "About Us", path: "/about" }]} />

        {/* Hero */}
        <div className="max-w-3xl space-y-4 pb-12 border-b border-[#E8E8E5]">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E8E8E5] bg-[#FCF1D0] px-3.5 py-1 font-mono text-xs uppercase tracking-widest text-[#333333] font-semibold">
            <span>About {BRAND_CONFIG.name}</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#333333] leading-tight">
            An Engineering-First Software Company Built on Clarity and Craft.
          </h1>
          <p className="text-base sm:text-lg text-[#666666] leading-relaxed">
            {BRAND_CONFIG.tagline} We partner with startups, small businesses,
            growing companies, agencies, and established enterprises to turn
            complex product requirements into clean, maintainable, and scalable
            software systems.
          </p>
        </div>

        {/* Mission & Operating Philosophy */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7 rounded-3xl border border-[#E8E8E5] bg-white p-7 sm:p-10 space-y-5 shadow-subtle">
            <span className="font-mono text-xs uppercase tracking-wider text-[#333333] font-semibold">
              Our Engineering Philosophy
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#333333]">
              Why We Prioritize Architecture Over Shortcuts
            </h2>
            <p className="text-sm sm:text-base text-[#666666] leading-relaxed">
              Too many digital projects start with a flashy mockup or an
              off-the-shelf template, only to stall six months later when the
              codebase cannot handle real database queries, custom business
              logic, or SEO requirements.
            </p>
            <p className="text-sm sm:text-base text-[#666666] leading-relaxed">
              At {BRAND_CONFIG.name}, every project is architected by engineers
              who care deeply about what happens under the hood. We separate
              frontend presentation from backend API logic, validate every
              request with shared schemas, document environment configurations,
              and test responsive layouts down to 320px viewports.
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-[#E8E8E5] bg-[#F5F5F3] p-5">
                <Code2 className="h-5 w-5 text-[#333333] mb-2" />
                <h3 className="font-display text-sm font-bold text-[#333333]">
                  Clean Handover &amp; Ownership
                </h3>
                <p className="mt-1 text-xs text-[#666666] leading-relaxed">
                  Readable TypeScript &amp; Python codebases with setup guides,
                  API documentation, and clear IP assignment upon milestone completion.
                </p>
              </div>
              <div className="rounded-2xl border border-[#E8E8E5] bg-[#F5F5F3] p-5">
                <ShieldCheck className="h-5 w-5 text-[#333333] mb-2" />
                <h3 className="font-display text-sm font-bold text-[#333333]">
                  Honest Technical Guidance
                </h3>
                <p className="mt-1 text-xs text-[#666666] leading-relaxed">
                  We never fabricate vanity metrics or overcomplicate your stack.
                  We recommend the right tool for your actual business goal.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-3xl border border-[#E8E8E5] bg-[#F5F5F3] p-7 sm:p-10 flex flex-col justify-between space-y-6 shadow-subtle">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#333333] font-semibold">
                Who We Partner With
              </span>
              <h2 className="mt-2 font-display text-2xl font-bold text-[#333333]">
                Tailored to Your Stage of Growth
              </h2>

              <ul className="mt-6 space-y-4 text-sm text-[#666666]">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-[#333333] shrink-0 mt-1" />
                  <div>
                    <strong className="text-[#333333] block font-semibold">
                      Startups &amp; Product Founders
                    </strong>
                    Rapid, well-architected MVPs, SaaS web apps, and cross-platform
                    mobile products built to scale after launch.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-[#333333] shrink-0 mt-1" />
                  <div>
                    <strong className="text-[#333333] block font-semibold">
                      Small &amp; Growing Businesses
                    </strong>
                    Conversion-focused websites, custom e-commerce storefronts,
                    and internal operational portals that automate manual work.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-[#333333] shrink-0 mt-1" />
                  <div>
                    <strong className="text-[#333333] block font-semibold">
                      Creative &amp; Digital Agencies
                    </strong>
                    White-label or collaborative full-stack, Next.js, GSAP, and
                    modern UI engineering execution for complex client briefs.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-[#333333] shrink-0 mt-1" />
                  <div>
                    <strong className="text-[#333333] block font-semibold">
                      Established Enterprises
                    </strong>
                    Legacy system modernization, Python data pipelines, and
                    secure software integrations.
                  </div>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-[#E8E8E5]">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#333333] hover:underline transition-colors"
              >
                <Compass className="h-4 w-4" />
                <span>Explore Our Engineering Services</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Core Standards Grid */}
        <div className="mt-16">
          <div className="mb-8">
            <span className="font-mono text-xs uppercase tracking-wider text-[#333333] font-semibold">
              Quality Commitments
            </span>
            <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-[#333333]">
              Six Standards Every {BRAND_CONFIG.shortName} Project Follows
            </h2>
          </div>

          <RevealWrapper
            staggerSelector=".about-pillar"
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {WHY_CHOOSE_US_PILLARS.map((item, idx) => (
              <div
                key={item.title}
                className="about-pillar rounded-3xl border border-[#E8E8E5] bg-white p-7 shadow-subtle hover:border-[#333333] transition-colors"
              >
                <span className="font-mono text-xs font-bold text-[#333333]">
                  0{idx + 1}
                </span>
                <h3 className="mt-2 font-display text-lg font-bold text-[#333333]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-[#666666] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </RevealWrapper>
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-3xl border border-[#E8E8E5] bg-[#F5F5F3] p-8 sm:p-12 text-center space-y-5">
          <div className="h-12 w-12 rounded-2xl bg-[#FCF1D0] text-[#333333] flex items-center justify-center mx-auto border border-[#F4E3AF]">
            <Users className="h-6 w-6" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#333333]">
            Ready to Discuss Your Roadmap With Our Team?
          </h2>
          <p className="mx-auto max-w-xl text-sm sm:text-base text-[#666666] leading-relaxed">
            Whether you need a complete digital platform or a dedicated
            engineering pod, we are ready to help you scope and build it right.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
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
              <span>WhatsApp Us: {BRAND_CONFIG.contact.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
