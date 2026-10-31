import React from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { BRAND_CONFIG } from "@nexovanta/shared";
import { buildMetadata } from "@/lib/seo";
import { DEVELOPMENT_PROCESS_STEPS } from "@/data/companyContent";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { RevealWrapper } from "@/components/animations/RevealWrapper";

export const metadata = buildMetadata({
  title: "Our 7-Stage Software Development Process | Discovery to Support",
  description:
    "Inspect QLLEX Technologies' transparent 7-stage engineering methodology: Discovery, Planning, UI/UX Design, Development, QA Testing, Deployment, and 6-Month Support.",
  path: "/process",
});

export default function ProcessPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Our Process", path: "/process" }]} />

        <div className="max-w-3xl space-y-4 pb-12 border-b border-white/10">
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            Engineering Delivery Methodology
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-slateText-primary">
            A Structured, Transparent 7-Stage Engineering Lifecycle
          </h1>
          <p className="text-base sm:text-lg text-slateText-secondary leading-relaxed">
            Software projects succeed when scope, architecture, and verification
            criteria are established upfront. Every {BRAND_CONFIG.name}{" "}
            engagement follows seven documented phases with tangible
            deliverables at each milestone.
          </p>
        </div>

        <RevealWrapper
          staggerSelector=".process-stage-card"
          className="mt-12 space-y-6"
        >
          {DEVELOPMENT_PROCESS_STEPS.map((step) => (
            <div
              key={step.id}
              className="process-stage-card rounded-2xl border border-white/10 bg-obsidian-800/80 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
            >
              <div className="lg:col-span-4 space-y-2">
                <span className="inline-block rounded-md border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-xs font-semibold text-accent">
                  STAGE {step.stepNumber}
                </span>
                <h2 className="font-display text-2xl font-bold text-slateText-primary">
                  {step.title}
                </h2>
              </div>

              <div className="lg:col-span-4">
                <h3 className="font-mono text-xs uppercase tracking-wider text-slateText-muted mb-2">
                  Phase Objective
                </h3>
                <p className="text-sm text-slateText-secondary leading-relaxed">
                  {step.summary}
                </p>
              </div>

              <div className="lg:col-span-4 rounded-xl border border-white/10 bg-obsidian-900 p-4">
                <h3 className="font-mono text-xs uppercase tracking-wider text-accent mb-2.5">
                  Concrete Milestone Outputs
                </h3>
                <ul className="space-y-2 text-xs text-slateText-primary">
                  {step.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </RevealWrapper>

        {/* Bottom Guarantee Banner */}
        <div className="mt-16 rounded-2xl border border-white/15 bg-obsidian-800 p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-accent">
              <ShieldCheck className="h-4 w-4" />
              <span>POST-LAUNCH PEACE OF MIND</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-slateText-primary">
              Backed by Our Written Six-Month Support Policy
            </h2>
            <p className="text-sm text-slateText-secondary">
              Handover is not the end of our responsibility. Every completed
              project includes 6 months of bug-fix support for qualifying
              defects attributable to our delivered code within the agreed
              project scope.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/get-a-quote"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3.5 text-sm font-semibold text-white hover:bg-accent-hover"
            >
              <span>Start Stage 01 (Discovery)</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/support-policy"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-obsidian-900 px-5 py-3.5 text-sm font-semibold text-slateText-primary hover:border-accent"
            >
              <span>Read Support Policy</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
