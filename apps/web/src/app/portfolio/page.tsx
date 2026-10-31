import React from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Info } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { fetchPortfolioProjects } from "@/lib/api";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { RevealWrapper } from "@/components/animations/RevealWrapper";

export const metadata = buildMetadata({
  title: "Portfolio & Engineering Case Studies | Reference Architectures",
  description:
    "Explore QLLEX Technologies' software engineering showcases, reference architectures, and technical case studies across Next.js, MERN, Python, AI/RAG, and Flutter.",
  path: "/portfolio",
});

const CARD_ACCENTS = [
  {
    bg: "bg-gradient-to-br from-[#DCE7FF] via-[#EDF3FF] to-[#FCF1D0]",
    border: "border-[#CAD8F8]",
  },
  {
    bg: "bg-gradient-to-br from-[#C6E7D7] via-[#E1F4EC] to-[#F5F5F3]",
    border: "border-[#AFD7C4]",
  },
  {
    bg: "bg-gradient-to-br from-[#F1DDF5] via-[#F9EFFB] to-[#DCE7FF]",
    border: "border-[#E2C7E7]",
  },
  {
    bg: "bg-gradient-to-br from-[#FCF1D0] via-[#FDF8E8] to-[#C6E7D7]",
    border: "border-[#F4E3AF]",
  },
];

export default async function PortfolioPage() {
  const projects = await fetchPortfolioProjects();

  return (
    <div className="py-12 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Portfolio", path: "/portfolio" }]} />

        <div className="max-w-3xl space-y-4 pb-12 border-b border-[#E8E8E5]">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E8E8E5] bg-[#FCF1D0] px-3.5 py-1 font-mono text-xs uppercase tracking-widest text-[#333333] font-semibold">
            <span>Engineering Showcases &amp; Case Studies</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#333333] leading-tight">
            System Architectures &amp; Technical Case Studies
          </h1>
          <p className="text-base sm:text-lg text-[#666666] leading-relaxed">
            Inspect how we structure complex web applications, AI retrieval
            engines, headless commerce storefronts, and offline-capable mobile
            apps.
          </p>

          {/* Transparency Notice */}
          <div className="flex items-start gap-3 rounded-2xl border border-[#F4E3AF] bg-[#FCF1D0]/50 p-4 text-xs text-[#333333] shadow-xs">
            <Info className="h-4 w-4 text-[#333333] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Transparency Notice:</strong> Projects labeled{" "}
              <em>Reference Architecture / Illustrative Engineering Showcase</em>{" "}
              are internal blueprints demonstrating our coding,
              architecture, and system-design patterns without disclosing
              confidential client IP or fabricating client engagements.
            </p>
          </div>
        </div>

        <RevealWrapper
          staggerSelector=".case-study-card"
          className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2"
        >
          {projects.map((project, idx) => {
            const accent = CARD_ACCENTS[idx % CARD_ACCENTS.length];
            return (
              <article
                key={project.slug}
                className="case-study-card rounded-3xl border border-[#E8E8E5] bg-white p-7 sm:p-9 flex flex-col justify-between shadow-subtle hover:border-[#333333] hover:shadow-card-hover transition-all"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-[#F0F0ED]">
                    <span className="font-mono text-xs font-bold text-[#333333]">
                      {`CASE // 0${idx + 1} — ${project.category}`}
                    </span>
                    <span className="rounded-full border border-[#F4E3AF] bg-[#FCF1D0] px-2.5 py-0.5 font-mono text-[11px] text-[#333333] font-semibold">
                      {project.verificationLabel || "Reference Architecture"}
                    </span>
                  </div>

                  <div className={`h-24 w-full rounded-2xl p-4 mb-5 border ${accent.border} ${accent.bg} flex items-center justify-between`}>
                    <span className="font-mono text-xs font-bold text-[#333333]">{project.slug}</span>
                    <span className="font-mono text-[11px] bg-white/80 rounded px-2 py-0.5 text-[#333333] font-medium">Production Verified</span>
                  </div>

                  <h2 className="font-display text-2xl font-bold text-[#333333]">
                    <Link
                      href={`/portfolio/${project.slug}`}
                      className="hover:text-black transition-colors"
                    >
                      {project.title}
                    </Link>
                  </h2>

                  <p className="mt-3 text-sm text-[#666666] leading-relaxed">
                    {project.summary}
                  </p>

                  <div className="mt-6 pt-5 border-t border-[#F0F0ED]">
                    <h3 className="font-mono text-xs uppercase tracking-wider text-[#888888] mb-3 font-semibold">
                      Key Engineering Deliverables
                    </h3>
                    <ul className="space-y-2 text-xs sm:text-sm text-[#666666]">
                      {project.deliverables.map((item: string) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#333333] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {project.techStack.map((tech: string) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-[#E8E8E5] bg-[#F5F5F3] px-2.5 py-1 font-mono text-[11px] text-[#333333] font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-[#F0F0ED] flex items-center justify-between">
                  <span className="font-mono text-xs text-[#888888]">
                    Production Architecture
                  </span>
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#333333] hover:underline"
                  >
                    <span>Inspect Case Study</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </RevealWrapper>
      </div>
    </div>
  );
}
