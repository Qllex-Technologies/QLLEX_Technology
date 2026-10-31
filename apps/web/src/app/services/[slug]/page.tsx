import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowUpRight,
  CheckCircle2,
  Layers,
  ShieldCheck,
  Terminal,
  HelpCircle,
} from "lucide-react";
import { BRAND_CONFIG, ServiceSlug } from "@nexovanta/shared";
import { SERVICES_DATA, SERVICES_ARRAY } from "@/data/services";
import { buildMetadata, buildServiceJsonLd } from "@/lib/seo";
import { fetchServiceSeoOverride } from "@/lib/api";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";

interface ServicePageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return SERVICES_ARRAY.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const service = SERVICES_DATA[params.slug as ServiceSlug];
  if (!service) {
    return buildMetadata({
      title: "Service Not Found",
      description: "Requested service page could not be found.",
      path: `/services/${params.slug}`,
      noIndex: true,
    });
  }

  const override = await fetchServiceSeoOverride(service.slug);

  return buildMetadata({
    title: override?.seoTitle || service.seoTitle,
    description: override?.seoDescription || service.seoDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function DedicatedServicePage({
  params,
}: ServicePageProps) {
  const service = SERVICES_DATA[params.slug as ServiceSlug];
  if (!service) {
    notFound();
  }

  const override = await fetchServiceSeoOverride(service.slug);
  const headline = override?.heroHeadline || service.heroHeadline;
  const subheadline = override?.heroSubheadline || service.heroSubheadline;

  const relatedServices = SERVICES_ARRAY.filter(
    (s) => s.slug !== service.slug
  ).slice(0, 3);

  const serviceJsonLd = buildServiceJsonLd({
    title: service.title,
    description: override?.seoDescription || service.seoDescription,
    slug: service.slug,
    category: service.category,
  });

  return (
    <div className="py-12 sm:py-16">
      <JsonLd data={serviceJsonLd} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Services", path: "/services" },
            { name: service.title, path: `/services/${service.slug}` },
          ]}
        />

        {/* Hero Section */}
        <div className="rounded-3xl border border-white/10 bg-obsidian-800/80 p-7 sm:p-12 mb-14">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3.5 py-1 font-mono text-xs text-accent">
              <Terminal className="h-3.5 w-3.5" />
              <span>{service.category}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-slateText-primary leading-tight">
              {headline}
            </h1>

            <p className="text-base sm:text-lg text-slateText-secondary leading-relaxed">
              {subheadline}
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-4">
              <Link
                href={`/get-a-quote?service=${encodeURIComponent(service.title)}`}
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3.5 text-sm font-semibold text-white hover:bg-accent-hover transition-colors"
              >
                <span>Request a {service.shortTitle} Quote</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              <Link
                href={`/contact?service=${encodeURIComponent(service.title)}`}
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-obsidian-900 px-6 py-3.5 text-sm font-semibold text-slateText-primary hover:border-accent transition-colors"
              >
                <span>Schedule Technical Consultation</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Problem vs Architectural Approach */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 mb-16">
          <div className="lg:col-span-6 rounded-2xl border border-white/10 bg-obsidian-800/50 p-6 sm:p-8 space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider text-slateText-muted">
              01 // Industry Challenge
            </span>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-slateText-primary">
              Why Conventional Approaches Fall Short
            </h2>
            <p className="text-sm sm:text-base text-slateText-secondary leading-relaxed">
              {service.problemStatement}
            </p>
          </div>

          <div className="lg:col-span-6 rounded-2xl border border-accent/30 bg-obsidian-800 p-6 sm:p-8 space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider text-accent">
              02 // The {BRAND_CONFIG.shortName} Engineering Standard
            </span>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-slateText-primary">
              How We Architect {service.title}
            </h2>
            <p className="text-sm sm:text-base text-slateText-secondary leading-relaxed">
              {service.architecturalApproach}
            </p>
          </div>
        </div>

        {/* Core Capabilities Grid */}
        <div className="mb-16">
          <div className="mb-8">
            <span className="font-mono text-xs uppercase tracking-wider text-accent">
              03 // Technical Capabilities
            </span>
            <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-slateText-primary">
              What We Engineer Within {service.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {service.capabilities.map((cap, i) => (
              <div
                key={cap.title}
                className="rounded-2xl border border-white/10 bg-obsidian-800/80 p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs text-accent">
                    CAPABILITY // 0{i + 1}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-bold text-slateText-primary">
                    {cap.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-slateText-secondary leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables + Ideal For + Tech Stack */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 mb-16">
          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-obsidian-800 p-6 sm:p-8 space-y-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-accent">
                04 // Concrete Project Deliverables
              </span>
              <h2 className="mt-1 font-display text-2xl font-bold text-slateText-primary">
                What You Receive Upon Handover
              </h2>
            </div>

            <ul className="space-y-3 text-sm text-slateText-primary">
              {service.deliverables.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-obsidian-900 p-3.5"
                >
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-white/10 bg-obsidian-800 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent">
                <Layers className="h-4 w-4" />
                <span>Ideal Use Cases</span>
              </div>
              <h2 className="font-display text-xl font-bold text-slateText-primary">
                Who This Service Is Built For
              </h2>
              <ul className="space-y-2.5 text-sm text-slateText-secondary">
                {service.idealFor.map((target) => (
                  <li key={target} className="flex items-start gap-2">
                    <span className="text-accent font-bold">&rarr;</span>
                    <span>{target}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-obsidian-800 p-6 sm:p-8 space-y-4">
              <span className="font-mono text-xs uppercase tracking-wider text-accent">
                Core Technologies Used
              </span>
              <div className="flex flex-wrap gap-2">
                {service.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-white/15 bg-obsidian-900 px-3 py-1.5 font-mono text-xs text-slateText-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-xs text-slateText-secondary pt-2">
                Backed by our{" "}
                <Link
                  href="/support-policy"
                  className="text-accent underline hover:text-accent-hover"
                >
                  Six-Month Post-Handover Support Policy
                </Link>{" "}
                for qualifying bugs attributable to delivered scope.
              </p>
            </div>
          </div>
        </div>

        {/* Service-Specific FAQs */}
        {service.faqs.length > 0 && (
          <div className="mb-16 rounded-2xl border border-white/10 bg-obsidian-950 p-6 sm:p-10">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent mb-2">
              <HelpCircle className="h-4 w-4" />
              <span>Service FAQ</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-slateText-primary mb-6">
              Common Questions About {service.title}
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {service.faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-xl border border-white/10 bg-obsidian-800 p-5"
                >
                  <h3 className="font-display text-base font-bold text-slateText-primary">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-sm text-slateText-secondary leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Services */}
        <div className="border-t border-white/10 pt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-bold text-slateText-primary">
              Complementary Engineering Practices
            </h2>
            <Link
              href="/services"
              className="text-xs font-mono text-accent hover:underline"
            >
              All 9 Services &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {relatedServices.map((rel) => (
              <Link
                key={rel.slug}
                href={`/services/${rel.slug}`}
                className="surface-card rounded-xl p-5 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-[11px] text-accent">
                    {rel.category}
                  </span>
                  <h3 className="mt-1 font-display text-base font-bold text-slateText-primary">
                    {rel.title}
                  </h3>
                  <p className="mt-2 text-xs text-slateText-secondary line-clamp-2">
                    {rel.heroSubheadline}
                  </p>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-accent">
                  <span>Explore Service</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
