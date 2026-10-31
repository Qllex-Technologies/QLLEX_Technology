import React from "react";
import Link from "next/link";
import { ArrowUpRight, Layers, MessageSquare } from "lucide-react";
import { BRAND_CONFIG } from "@nexovanta/shared";
import { buildMetadata } from "@/lib/seo";
import { TECH_STACK_CATEGORIES } from "@/data/companyContent";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata = buildMetadata({
  title: "Technology Stack | Next.js, MERN, Python, Flutter, GSAP & Three.js",
  description:
    "Inspect the programming languages, frameworks, and databases used by QLLEX Technologies: Next.js, React, TypeScript, Node.js, Express, MongoDB, Python, Flutter, GSAP, and Three.js.",
  path: "/technologies",
});

export default function TechnologiesPage() {
  return (
    <div className="py-12 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[{ name: "Technologies", path: "/technologies" }]}
        />

        <div className="max-w-3xl space-y-4 pb-12 border-b border-[#E8E8E5]">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E8E8E5] bg-[#FCF1D0] px-3.5 py-1 font-mono text-xs uppercase tracking-widest text-[#333333] font-semibold">
            <span>Technology Stack &amp; Capabilities</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#333333] leading-tight">
            Proven Technologies Selected for Reliability and Scale
          </h1>
          <p className="text-base sm:text-lg text-[#666666] leading-relaxed">
            At {BRAND_CONFIG.name}, we standardize on strongly typed,
            production-tested ecosystems so your software remains fast,
            secure, and straightforward to maintain years after handover.
          </p>
        </div>

        <div className="mt-12 space-y-12">
          {TECH_STACK_CATEGORIES.map((category, idx) => (
            <section
              key={category.id}
              className="rounded-3xl border border-[#E8E8E5] bg-[#F5F5F3] p-7 sm:p-10 shadow-subtle"
            >
              <div className="flex items-center gap-2 font-mono text-xs text-[#333333] font-semibold mb-2">
                <Layers className="h-4 w-4" />
                <span>STACK LAYER // 0{idx + 1}</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#333333]">
                {category.category}
              </h2>
              <p className="mt-1 text-sm text-[#666666]">
                {category.summary}
              </p>

              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                {category.items.map((tech) => (
                  <div
                    key={tech.name}
                    className="rounded-2xl border border-[#E8E8E5] bg-white p-6 shadow-sm hover:border-[#333333] transition-colors"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-display text-lg font-bold text-[#333333]">
                        {tech.name}
                      </h3>
                      <span className="rounded-full border border-[#F4E3AF] bg-[#FCF1D0] px-3 py-0.5 font-mono text-xs text-[#333333] font-semibold">
                        {tech.role}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-[#666666] leading-relaxed">
                      {tech.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Advisory CTA */}
        <div className="mt-16 rounded-3xl border border-[#E8E8E5] bg-[#F5F5F3] p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#333333]">
              Need Technology Stack Advisory?
            </h2>
            <p className="text-sm sm:text-base text-[#666666] leading-relaxed">
              If you are unsure whether Next.js or standard React, Node or Python,
              or Flutter or React Native fits your upcoming product, discuss your
              roadmap directly with our lead architects.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#333333] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#222222] transition-all shadow-sm"
            >
              <span>Schedule Architecture Review</span>
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
