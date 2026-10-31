import React from "react";
import { BRAND_CONFIG } from "@nexovanta/shared";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata = buildMetadata({
  title: "Refund and Cancellation Policy | Milestone & Deposit Governance",
  description: `Fair, milestone-based Refund and Cancellation Policy for software development engagements with ${BRAND_CONFIG.name}.`,
  path: "/refund-policy",
});

export default function RefundPolicyPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Refund & Cancellation Policy", path: "/refund-policy" },
          ]}
        />

        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 mb-8 text-xs text-amber-200">
          <strong>Pre-Publication Legal Notice:</strong> This policy draft is
          prepared for professional legal review before commercial publication
          to ensure alignment with your specific contracting jurisdiction.
        </div>

        <article className="rounded-3xl border border-white/10 bg-obsidian-800 p-7 sm:p-12 space-y-8 text-sm sm:text-base text-slateText-secondary leading-relaxed">
          <header className="border-b border-white/10 pb-6">
            <span className="font-mono text-xs uppercase tracking-widest text-accent">
              Transparent Cancellation &amp; Milestone Accounting
            </span>
            <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-slateText-primary">
              Refund and Cancellation Policy
            </h1>
            <p className="mt-2 text-xs font-mono text-slateText-muted">
              Effective Date: October 13, 2026 &bull; Entity:{" "}
              {BRAND_CONFIG.legalEntityPlaceholder}
            </p>
          </header>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-slateText-primary">
              1. Purpose &amp; Fair-Dealing Principle
            </h2>
            <p>
              Custom software engineering involves dedicated engineering hours,
              architectural planning, and milestone-based delivery. This Refund
              and Cancellation Policy defines a transparent, predictable
              procedure if a project is cancelled by the Client or if{" "}
              {BRAND_CONFIG.name} is unable to deliver an agreed specification.
              We do not make blanket claims that every payment is non-refundable,
              nor do we promise automatic full refunds where substantial custom
              engineering work has already been completed and delivered.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-slateText-primary">
              2. How to Initiate a Cancellation Request
            </h2>
            <p>
              Either party may initiate a project cancellation by submitting
              written notice to{" "}
              <a
                href={`mailto:${BRAND_CONFIG.contact.legalEmail}`}
                className="text-accent underline"
              >
                {BRAND_CONFIG.contact.legalEmail}
              </a>{" "}
              referencing the signed Project Proposal / Statement of Work (SOW)
              and stating the effective cancellation date and reason. Upon
              receipt of written notice, new non-essential work is paused
              immediately while a milestone accounting review is conducted.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-slateText-primary">
              3. Treatment of Completed Milestones &amp; Active Deposits
            </h2>
            <ul className="list-disc pl-6 space-y-2.5">
              <li>
                <strong>Completed and Approved Milestones:</strong> Payments for
                project milestones that have already been delivered and approved
                (or placed into production use by the Client) correspond to
                completed engineering deliverables and are non-refundable,
                except where required by applicable mandatory law.
              </li>
              <li>
                <strong>Cancellation Before Project Kickoff:</strong> If a
                Client cancels in writing after paying an initial deposit but
                before discovery, architecture, or design work has commenced,
                the deposit is eligible for a refund minus any documented,
                non-recoverable third-party expenses incurred at the Client&apos;s
                written request (where contractually agreed and legally
                permitted).
              </li>
              <li>
                <strong>Cancellation During an Active Milestone:</strong> If a
                Client cancels while a milestone is in progress, we calculate
                the pro-rata value of documented engineering, design, and
                project-management work completed up to the notice date, plus
                any documented, contractually agreed third-party costs (only
                where permitted by applicable law). Any unearned balance of the
                active milestone prepayment is refunded to the Client, and
                completed work-in-progress artifacts paid for are handed over.
              </li>
              <li>
                <strong>Unstarted Future Milestones:</strong> The Client will
                not be billed for any future milestones that have not yet begun.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-slateText-primary">
              4. Non-Delivery by {BRAND_CONFIG.name}
            </h2>
            <p>
              If {BRAND_CONFIG.name} materially fails to deliver the agreed
              project scope due to reasons attributable to us (and not caused by
              Client delays, missing Client dependencies, or unapproved scope
              changes) and fails to cure such non-delivery within a reasonable
              written cure period (typically 14 business days), the Client is
              entitled to a refund for the undelivered milestone(s) in
              accordance with the SOW and applicable law.
            </p>
          </section>

          <section className="space-y-3 border-t border-white/10 pt-6">
            <h2 className="font-display text-xl font-bold text-slateText-primary">
              5. Review, Calculation &amp; Processing Timeline
            </h2>
            <p>
              Within <strong>7 business days</strong> of receiving a written
              cancellation or refund request, we provide a written Milestone
              Accounting Statement itemizing completed deliverables, documented
              work hours, and the calculated refund amount. Approved refunds are
              processed back to the original payment method or agreed bank
              account within <strong>10 to 14 business days</strong> of
              statement confirmation. Nothing in this policy overrides mandatory
              consumer or commercial protections under applicable law where a
              deduction is prohibited.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
