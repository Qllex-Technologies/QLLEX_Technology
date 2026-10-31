import React from "react";
import Link from "next/link";
import { BRAND_CONFIG } from "@nexovanta/shared";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata = buildMetadata({
  title: "Terms and Conditions | Project Scope, Milestones & IP Ownership",
  description: `Terms and Conditions governing software development, web applications, milestone payments, and intellectual property handover at ${BRAND_CONFIG.name}.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="py-12 sm:py-20 bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[{ name: "Terms and Conditions", path: "/terms" }]}
        />

        <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4 mb-8 text-xs text-amber-900 shadow-sm">
          <strong>Pre-Publication Legal Notice:</strong> These Terms and
          Conditions are structured for professional legal review prior to
          publication. Contact details and legal entities are centrally configured in <code>BRAND_CONFIG</code>.
        </div>

        <article className="rounded-3xl border border-gray-200 bg-white p-7 sm:p-12 space-y-8 text-sm sm:text-base text-ink-secondary leading-relaxed shadow-card">
          <header className="border-b border-gray-200 pb-6">
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              Commercial &amp; Engineering Governance
            </span>
            <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-ink-primary">
              Terms and Conditions
            </h1>
            <p className="mt-2 text-xs font-mono text-ink-muted">
              Effective Date: October 2026 &bull; Entity:{" "}
              {BRAND_CONFIG.legalEntityPlaceholder}
            </p>
          </header>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-ink-primary">
              1. Scope of Services &amp; Written Proposals
            </h2>
            <p>
              {BRAND_CONFIG.name} provides custom software engineering, website
              and web application development, mobile application development,
              AI/ML integration, UI/UX design, and technical maintenance
              services. Every client engagement is governed by a written Project
              Proposal or Statement of Work (SOW) approved in writing
              by both parties, which defines the exact deliverables, technical
              specifications, milestone schedule, and fees.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-ink-primary">
              2. Payment Milestones &amp; Invoicing
            </h2>
            <p>
              Projects are structured into discrete, verifiable milestones. Invoices
              are issued upon milestone approval. Standard payment terms are net 15
              days unless otherwise specified in your engagement agreement. Work on
              subsequent milestones begins upon receipt of payment for the preceding milestone.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-ink-primary">
              3. Intellectual Property Ownership &amp; Handover
            </h2>
            <p>
              Upon final milestone payment completion, 100% of all custom source code,
              Figma design assets, database schema definitions, and project documentation
              are transferred exclusively to the client. {BRAND_CONFIG.name} retains no
              proprietary lock-in or claim on bespoke code engineered for your business.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-ink-primary">
              4. Six-Month Post-Launch Bug Warranty
            </h2>
            <p>
              Every custom software build delivered by {BRAND_CONFIG.name} includes
              6 months of warranty coverage starting from production deployment. We
              remedy any qualifying functional defects within the agreed scope without
              additional charge.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-ink-primary">
              5. Governing Law &amp; Inquiries
            </h2>
            <p>
              For legal inquiries regarding contracts or proposals, reach out to:
            </p>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 font-mono text-xs text-ink-secondary space-y-1">
              <p>Email: <a href={`mailto:${BRAND_CONFIG.contact.email}`} className="text-accent">{BRAND_CONFIG.contact.email}</a></p>
              <p>Phone / WhatsApp: {BRAND_CONFIG.contact.phoneDisplay}</p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
