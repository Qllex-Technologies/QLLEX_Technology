import React from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Info, ShieldCheck } from "lucide-react";
import { BRAND_CONFIG } from "@nexovanta/shared";
import { buildMetadata } from "@/lib/seo";
import { ENGAGEMENT_MODELS } from "@/data/companyContent";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata = buildMetadata({
  title: "Pricing & Engagement Models | Fixed-Scope Milestones & Engineering Pods",
  description:
    "Transparent software development engagement models at QLLEX Technologies: Fixed-Scope Milestone projects, Dedicated Engineering Pods, and Technical Discovery Sprints.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[{ name: "Pricing & Engagement Models", path: "/pricing" }]}
        />

        <div className="max-w-3xl space-y-4 pb-12 border-b border-white/10">
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            Transparent Commercial Structure
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-slateText-primary">
            Flexible Engagement Models Aligned With Your Scope
          </h1>
          <p className="text-base sm:text-lg text-slateText-secondary leading-relaxed">
            Custom software is not a one-size-fits-all commodity. We structure
            engagements around clear written proposals, verifiable milestone
            deliverables, and zero hidden fees.
          </p>
        </div>

        {/* 3 Core Engagement Models */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {ENGAGEMENT_MODELS.map((model, idx) => (
            <div
              key={model.id}
              className={`rounded-2xl border p-7 sm:p-8 flex flex-col justify-between ${
                idx === 0
                  ? "border-accent/50 bg-obsidian-800"
                  : "border-white/10 bg-obsidian-800/70"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="rounded-md border border-accent/40 bg-accent/10 px-2.5 py-1 font-mono text-xs text-accent">
                    {model.badge}
                  </span>
                </div>

                <h2 className="font-display text-2xl font-bold text-slateText-primary">
                  {model.name}
                </h2>

                <p className="mt-3 text-sm text-slateText-secondary leading-relaxed">
                  {model.summary}
                </p>

                <div className="mt-6 rounded-xl border border-white/10 bg-obsidian-900 p-4">
                  <span className="block font-mono text-[11px] uppercase tracking-wider text-accent">
                    Ideal For
                  </span>
                  <p className="mt-1 text-xs text-slateText-primary leading-relaxed">
                    {model.idealFor}
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-slateText-muted mb-3">
                    How It Works
                  </h3>
                  <ul className="space-y-2.5 text-xs text-slateText-secondary">
                    {model.structure.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-white/10">
                <Link
                  href={model.ctaHref}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3.5 text-sm font-semibold text-white hover:bg-accent-hover transition-colors"
                >
                  <span>{model.ctaLabel}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Commercial Transparency & Policy Clarifications */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-obsidian-950 p-6 sm:p-8 space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent">
              <Info className="h-4 w-4" />
              <span>External &amp; Third-Party Costs</span>
            </div>
            <h2 className="font-display text-xl font-bold text-slateText-primary">
              No Markup on Your Cloud &amp; Third-Party Accounts
            </h2>
            <p className="text-sm text-slateText-secondary leading-relaxed">
              Cloud hosting (AWS, Vercel, DigitalOcean, MongoDB Atlas), domain
              registrations, paid third-party APIs (OpenAI, Stripe, Twilio,
              SendGrid), and app store developer accounts are registered directly
              in your organization&apos;s name and billed at cost by those
              providers unless a separate managed-hosting plan is explicitly
              requested.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-obsidian-950 p-6 sm:p-8 space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent">
              <ShieldCheck className="h-4 w-4" />
              <span>Fair Terms &amp; Support Governance</span>
            </div>
            <h2 className="font-display text-xl font-bold text-slateText-primary">
              Clear Milestone, Refund &amp; Support Policies
            </h2>
            <p className="text-sm text-slateText-secondary leading-relaxed">
              Every project is governed by a written proposal defining payment
              milestones, intellectual property handover upon final payment, our{" "}
              <Link
                href="/refund-policy"
                className="text-accent underline hover:text-accent-hover"
              >
                Refund &amp; Cancellation Policy
              </Link>
              , and our{" "}
              <Link
                href="/support-policy"
                className="text-accent underline hover:text-accent-hover"
              >
                Six-Month Support &amp; Maintenance Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
