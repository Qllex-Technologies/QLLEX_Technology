import React from "react";
import Link from "next/link";
import { ArrowUpRight, HelpCircle } from "lucide-react";
import { BRAND_CONFIG } from "@nexovanta/shared";
import { buildMetadata } from "@/lib/seo";
import { FAQ_ITEMS } from "@/data/companyContent";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata = buildMetadata({
  title: "Frequently Asked Questions (FAQ) | Engineering, Pricing & Support",
  description: `Answers to common questions about ${BRAND_CONFIG.name}' software development process, source code ownership, milestone payments, refund policy, and 6-month support warranty.`,
  path: "/faq",
});

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="py-12 sm:py-16">
      <JsonLd data={faqJsonLd} />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "FAQ", path: "/faq" }]} />

        <div className="space-y-4 pb-12 border-b border-white/10">
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            Clear Answers Before You Commit
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-slateText-primary">
            Frequently Asked Questions
          </h1>
          <p className="text-base sm:text-lg text-slateText-secondary leading-relaxed">
            Straightforward answers covering our technology stack, milestone
            payments, source code ownership, cancellation procedures, and
            six-month post-handover bug support.
          </p>
        </div>

        <div className="mt-12 space-y-5">
          {FAQ_ITEMS.map((item, idx) => (
            <div
              key={item.question}
              className="rounded-2xl border border-white/10 bg-obsidian-800/80 p-6 sm:p-7"
            >
              <div className="flex items-center gap-2 font-mono text-xs text-accent mb-2">
                <HelpCircle className="h-3.5 w-3.5" />
                <span>
                  0{idx + 1} {"//"} {item.category}
                </span>
              </div>
              <h2 className="font-display text-lg sm:text-xl font-bold text-slateText-primary">
                {item.question}
              </h2>
              <p className="mt-2.5 text-sm sm:text-base text-slateText-secondary leading-relaxed">
                {item.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-white/15 bg-obsidian-800 p-8 text-center space-y-4">
          <h2 className="font-display text-2xl font-bold text-slateText-primary">
            Have a Specific Technical or Contractual Question?
          </h2>
          <p className="text-sm text-slateText-secondary max-w-xl mx-auto">
            Reach out directly to our team or inspect our full written policies
            for complete details.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-hover"
            >
              <span>Ask Our Team</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/support-policy"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-obsidian-900 px-5 py-3 text-sm font-semibold text-slateText-primary hover:border-accent"
            >
              <span>Read 6-Month Support Policy</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
