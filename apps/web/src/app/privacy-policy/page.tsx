import React from "react";
import { BRAND_CONFIG } from "@nexovanta/shared";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata = buildMetadata({
  title: "Privacy Policy | Data Collection, Security & User Rights",
  description: `Privacy Policy for ${BRAND_CONFIG.name}. Learn how we collect, process, store, and protect personal and business enquiry data.`,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 sm:py-20 bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[{ name: "Privacy Policy", path: "/privacy-policy" }]}
        />

        <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4 mb-8 text-xs text-amber-900 shadow-sm">
          <strong>Pre-Publication Legal Notice:</strong> This policy draft is
          prepared for operational transparency and professional legal counsel
          review prior to commercial publication. Contact details are managed
          centrally in <code>BRAND_CONFIG</code>.
        </div>

        <article className="rounded-3xl border border-gray-200 bg-white p-7 sm:p-12 space-y-8 text-sm sm:text-base text-ink-secondary leading-relaxed shadow-card">
          <header className="border-b border-gray-200 pb-6">
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              Data Protection &amp; Privacy Governance
            </span>
            <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-ink-primary">
              Privacy Policy
            </h1>
            <p className="mt-2 text-xs font-mono text-ink-muted">
              Effective Date: October 2026 &bull; Entity:{" "}
              {BRAND_CONFIG.legalEntityPlaceholder}
            </p>
          </header>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-ink-primary">
              1. Information We Collect
            </h2>
            <p>
              When you interact with the {BRAND_CONFIG.name} website, submit a
              contact enquiry, or request a project quote, we collect only the
              information necessary to evaluate your request and communicate
              with you professionally:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Identity &amp; Contact Information:</strong> Full name,
                business email address, telephone number (with country code),
                company or organization name, and preferred contact method.
              </li>
              <li>
                <strong>Project &amp; Commercial Context:</strong> Service
                category required, estimated budget range, desired delivery
                timeline, and technical descriptions provided in enquiry forms.
              </li>
              <li>
                <strong>Technical Telemetry:</strong> Standard HTTP server logs,
                IP hashes for rate-limiting protection, and aggregate browser
                metrics to ensure zero-layout-shift and high performance.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-ink-primary">
              2. How We Use Submitted Information
            </h2>
            <p>
              We treat all project briefs, contact details, and technical
              inquiries as strictly confidential under industry-standard non-disclosure
              practices. Data submitted through our forms is used solely to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Review your technical requirements and respond with architectural scope.</li>
              <li>Generate milestone proposals, contracts, and invoices.</li>
              <li>Notify internal engineering leads via secured email and WhatsApp Business automation.</li>
              <li>Prevent automated spam, brute-force requests, and abuse.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-ink-primary">
              3. Data Retention &amp; Security
            </h2>
            <p>
              Enquiries are permanently persisted in our encrypted MongoDB
              cluster with role-based access control (RBAC). We do not sell,
              rent, or monetize your contact or business information. Data is
              retained for legitimate commercial follow-up and legal accounting
              purposes, and will be deleted upon written request to{" "}
              <a href={`mailto:${BRAND_CONFIG.contact.email}`} className="text-accent underline">
                {BRAND_CONFIG.contact.email}
              </a>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-ink-primary">
              4. Contact for Privacy Inquiries
            </h2>
            <p>
              For questions regarding this policy or to request data deletion, contact:
            </p>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 font-mono text-xs text-ink-secondary space-y-1">
              <p>Email: <a href={`mailto:${BRAND_CONFIG.contact.email}`} className="text-accent">{BRAND_CONFIG.contact.email}</a></p>
              <p>Phone / WhatsApp: {BRAND_CONFIG.contact.phoneDisplay}</p>
              <p>Address: {BRAND_CONFIG.contact.officeLocation}</p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
