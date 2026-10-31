import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
} from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import {
  fetchPortfolioProjectBySlug,
  fetchPortfolioProjects,
} from "@/lib/api";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

interface CaseStudyPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const projects = await fetchPortfolioProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const project = await fetchPortfolioProjectBySlug(params.slug);
  if (!project) {
    return buildMetadata({
      title: "Case Study Not Found",
      description: "Requested case study could not be found.",
      path: `/portfolio/${params.slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: project.seoTitle || `${project.title} — Case Study`,
    description: project.seoDescription || project.summary,
    path: `/portfolio/${project.slug}`,
  });
}

export default async function CaseStudyDetailPage({
  params,
}: CaseStudyPageProps) {
  const project = await fetchPortfolioProjectBySlug(params.slug);
  if (!project) {
    notFound();
  }

  return (
    <div className="py-12 sm:py-20 bg-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Portfolio", path: "/portfolio" },
            { name: project.title, path: `/portfolio/${project.slug}` },
          ]}
        />

        {/* Hero Card */}
        <div className="rounded-3xl border border-[#E8E8E5] bg-[#F5F5F3] p-7 sm:p-12 space-y-6 shadow-subtle">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="font-mono text-xs uppercase tracking-wider text-[#333333] font-semibold">
              {project.category}
            </span>
            <span className="rounded-full border border-[#F4E3AF] bg-[#FCF1D0] px-3.5 py-1 font-mono text-xs text-[#333333] font-semibold">
              {project.verificationLabel || "Production Verified Architecture"}
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#333333] leading-tight">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-[#666666] leading-relaxed">
            {project.summary}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.techStack.map((tech: string) => (
              <span
                key={tech}
                className="rounded-lg border border-[#E8E8E5] bg-white px-3 py-1.5 font-mono text-xs text-[#333333] font-medium shadow-2xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Technical Breakdown Sections */}
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-[#E8E8E5] bg-white p-7 sm:p-8 space-y-3 shadow-subtle">
            <span className="font-mono text-xs font-bold text-[#333333]">
              01 &bull; PROBLEM STATEMENT
            </span>
            <h2 className="font-display text-xl font-bold text-[#333333]">
              The Technical Challenge
            </h2>
            <p className="text-sm text-[#666666] leading-relaxed">
              {project.challenge}
            </p>
          </div>

          <div className="rounded-3xl border border-[#E8E8E5] bg-white p-7 sm:p-8 space-y-3 shadow-subtle">
            <span className="font-mono text-xs font-bold text-[#333333]">
              02 &bull; ENGINEERING SOLUTION
            </span>
            <h2 className="font-display text-xl font-bold text-[#333333]">
              How It Was Solved
            </h2>
            <p className="text-sm text-[#666666] leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-[#E8E8E5] bg-[#F5F5F3] p-7 sm:p-10 space-y-4 shadow-subtle">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#333333] font-semibold">
            <Cpu className="h-4 w-4" />
            <span>03 &bull; System Architecture Overview</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-[#333333]">
            Data Flow, Rendering &amp; Security Boundaries
          </h2>
          <p className="text-sm sm:text-base text-[#666666] leading-relaxed">
            {project.architectureOverview}
          </p>
        </div>

        <div className="mt-8 rounded-3xl border border-[#E8E8E5] bg-white p-7 sm:p-10 space-y-5 shadow-subtle">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#333333] font-semibold">
            <Layers className="h-4 w-4" />
            <span>04 &bull; Key Architectural Deliverables</span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#333333]">
            {project.deliverables.map((item: string) => (
              <li
                key={item}
                className="flex items-start gap-2.5 rounded-2xl border border-[#E8E8E5] bg-[#F5F5F3] p-4 font-medium"
              >
                <CheckCircle2 className="h-4 w-4 text-[#333333] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Navigation & CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E8E8E5] pt-8">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#666666] hover:text-[#333333] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to All Case Studies</span>
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#333333] px-7 py-3 text-sm font-semibold text-white hover:bg-[#222222] transition-all shadow-sm"
          >
            <span>Build a Similar Architecture</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
