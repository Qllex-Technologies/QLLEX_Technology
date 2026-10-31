import React from "react";
import Link from "next/link";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { BRAND_CONFIG } from "@nexovanta/shared";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { QuoteRequestForm } from "@/components/forms/QuoteRequestForm";

export const metadata = buildMetadata({
  title: "Request a Project Quote | Custom Software, Web & Mobile Estimation",
  description: `Request a detailed software engineering proposal and milestone estimate from ${BRAND_CONFIG.name}. Share your category, budget range, timeline, and required features.`,
  path: "/get-a-quote",
});

export default function GetAQuotePage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[{ name: "Request a Quote", path: "/get-a-quote" }]}
        />

        <div className="max-w-3xl space-y-4 pb-12 border-b border-white/10">
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            Project Scope &amp; Milestone Proposal
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-slateText-primary">
            Request an Engineering Proposal &amp; Quote
          </h1>
          <p className="text-base sm:text-lg text-slateText-secondary leading-relaxed">
            Provide your project parameters below. A senior solutions architect
            at {BRAND_CONFIG.name} will review your scope and prepare a
            structured milestone breakdown.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <QuoteRequestForm />
          </div>

          <aside className="lg:col-span-4 space-y-6">
            <div className="rounded-2xl border border-white/10 bg-obsidian-800 p-6 sm:p-7 space-y-4">
              <span className="font-mono text-xs uppercase tracking-wider text-accent">
                What Happens Next?
              </span>
              <h2 className="font-display text-xl font-bold text-slateText-primary">
                Our 3-Step Proposal Workflow
              </h2>
              <ol className="space-y-4 text-xs text-slateText-secondary">
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-accent/50 bg-accent/10 font-mono text-xs font-bold text-accent">
                    1
                  </span>
                  <div>
                    <strong className="text-slateText-primary block">
                      Architectural Triage (Within 1 Business Day)
                    </strong>
                    We review your selected capabilities, timeline, and technical
                    context.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-accent/50 bg-accent/10 font-mono text-xs font-bold text-accent">
                    2
                  </span>
                  <div>
                    <strong className="text-slateText-primary block">
                      Discovery &amp; Alignment Call
                    </strong>
                    A focused 30-minute technical session to clarify edge cases,
                    integrations, and user roles.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-accent/50 bg-accent/10 font-mono text-xs font-bold text-accent">
                    3
                  </span>
                  <div>
                    <strong className="text-slateText-primary block">
                      Written Milestone Proposal
                    </strong>
                    You receive a clear specification with recommended stack,
                    milestone schedule, and transparent pricing.
                  </div>
                </li>
              </ol>
            </div>

            <div className="rounded-2xl border border-white/10 bg-obsidian-800/70 p-6 space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-accent">
                <ShieldCheck className="h-4 w-4" />
                <span>STANDARD INCLUSIONS</span>
              </div>
              <ul className="space-y-2 text-xs text-slateText-secondary">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                  <span>Full source-code handover upon milestone completion</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                  <span>Mobile-first responsive QA (320px to 1920px+)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                  <span>
                    Written{" "}
                    <Link
                      href="/support-policy"
                      className="underline hover:text-accent"
                    >
                      6-Month Post-Handover Bug Support
                    </Link>
                  </span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
