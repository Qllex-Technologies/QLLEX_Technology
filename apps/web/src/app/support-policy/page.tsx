import React from "react";
import Link from "next/link";
import { ShieldCheck, CheckCircle2, AlertTriangle } from "lucide-react";
import { BRAND_CONFIG } from "@nexovanta/shared";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata = buildMetadata({
  title: "Six-Month Support and Maintenance Policy | Post-Handover Warranty",
  description: `Detailed Six-Month Support and Maintenance Policy for software and websites delivered by ${BRAND_CONFIG.name}, defining covered bugs, response procedures, and exclusions.`,
  path: "/support-policy",
});

export default function SupportPolicyPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            {
              name: "Support & Maintenance Policy",
              path: "/support-policy",
            },
          ]}
        />

        <article className="rounded-3xl border border-white/10 bg-obsidian-800 p-7 sm:p-12 space-y-8 text-sm sm:text-base text-slateText-secondary leading-relaxed">
          <header className="border-b border-white/10 pb-6">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent">
              <ShieldCheck className="h-4 w-4" />
              <span>6-Month Post-Handover Engineering Warranty</span>
            </div>
            <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-slateText-primary">
              Six-Month Support and Maintenance Policy
            </h1>
            <p className="mt-2 text-xs font-mono text-slateText-muted">
              Effective Date: October 13, 2026 &bull; Entity:{" "}
              {BRAND_CONFIG.legalEntityPlaceholder}
            </p>
          </header>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-slateText-primary">
              1. Six-Month Bug-Fix Support Commitment
            </h2>
            <p>
              {BRAND_CONFIG.name} stands behind the quality of our engineering.
              Every completed project includes{" "}
              <strong>six (6) months of post-handover technical support</strong>{" "}
              at no additional labor charge for{" "}
              <strong>
                qualifying bugs and defects directly attributable to our
                delivered code and covered by the agreed written project scope
              </strong>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-slateText-primary">
              2. When the Six-Month Support Period Begins
            </h2>
            <p>
              The six-month (180-calendar-day) support window begins on the
              earliest of:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                The date of written Final Milestone Sign-Off / Project Handover;
                or
              </li>
              <li>
                The date the application or website is deployed to a live
                production environment for public or commercial use.
              </li>
            </ul>
          </section>

          <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-500/30 bg-obsidian-900 p-6 space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
                <span>What Is Included</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  &bull; Resolution of reproducible code bugs where delivered
                  functionality deviates from the signed Statement of Work
                  (SOW).
                </li>
                <li>
                  &bull; Fixes for broken form submissions, validation regressions,
                  or database query errors in our delivered codebase.
                </li>
                <li>
                  &bull; Layout or responsive rendering defects on viewports and
                  browsers specified in the project agreement.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-amber-500/30 bg-obsidian-900 p-6 space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-amber-400">
                <AlertTriangle className="h-4 w-4" />
                <span>What Requires a Separate Quote</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  &bull; New features, new pages, major UI redesigns, or new
                  third-party API integrations not in the original SOW.
                </li>
                <li>
                  &bull; Issues caused by code modifications, plugin installs, or
                  database edits made by the Client or third parties after
                  handover.
                </li>
                <li>
                  &bull; Breaking changes introduced by external third-party APIs,
                  browsers, or operating system updates released after handover.
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-slateText-primary">
              3. External Hosting, Domains &amp; Third-Party Charges
            </h2>
            <p>
              Our six-month support policy covers qualifying engineering bug
              fixes only; it does not include free cloud hosting or third-party
              subscriptions. Hosting servers, domain renewals, database cluster
              fees (e.g., MongoDB Atlas, AWS, Vercel), paid API usage (e.g.,
              OpenAI, Stripe, Google Maps), SMS/email delivery charges, and third-party
              SaaS licenses are billed separately where applicable and agreed.
              Third-party outages, DNS provider downtime, or upstream API rate
              limits outside our control are not defects in our delivered code.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-slateText-primary">
              4. Support Channels &amp; Response Procedure
            </h2>
            <p>
              Clients may submit support tickets via email to{" "}
              <a
                href={`mailto:${BRAND_CONFIG.contact.supportEmail}`}
                className="text-accent underline"
              >
                {BRAND_CONFIG.contact.supportEmail}
              </a>{" "}
              including steps to reproduce the issue, affected URLs, and
              screenshots or error messages:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Critical Severity (Production Outage / Core Flow Blocked):</strong>{" "}
                Initial engineering triage within 1 business day.
              </li>
              <li>
                <strong>Standard Severity (Non-blocking UI or Functional Bug):</strong>{" "}
                Initial response within 2 business days and scheduled patch
                deployment.
              </li>
            </ul>
          </section>

          <section className="space-y-3 border-t border-white/10 pt-6">
            <h2 className="font-display text-xl font-bold text-slateText-primary">
              5. Client Responsibilities &amp; Renewal Options After Six Months
            </h2>
            <p>
              To allow our engineers to diagnose and deploy fixes during the
              support window, the Client must maintain active hosting/repository
              access and backup permissions as agreed at handover. Upon
              completion of the initial 6-month support period, Clients may opt
              into an annual or monthly{" "}
              <Link
                href="/pricing"
                className="text-accent underline hover:text-accent-hover"
              >
                Maintenance &amp; Enhancement Retainer
              </Link>{" "}
              covering proactive dependency upgrades, uptime monitoring, security
              patching, and continuous feature development.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
