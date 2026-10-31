"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { QuoteRequestSchema, QuoteRequestInput } from "@nexovanta/shared";
import { API_BASE_URL } from "@/lib/api";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RotateCcw,
} from "lucide-react";

const FEATURE_OPTIONS = [
  "Custom UI/UX Design System",
  "Next.js SSR & Technical SEO",
  "Multi-Role Authentication (RBAC)",
  "Admin Dashboard & CMS",
  "REST API & Database Architecture",
  "Payment Gateway / Billing Integration",
  "AI / RAG / LLM Workflow",
  "GSAP Motion & Interactive 3D (Three.js)",
  "Cross-Platform Mobile App (Flutter)",
  "Third-Party ERP / CRM Webhook Sync",
];

export function QuoteRequestForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState<{
    referenceId: string;
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<QuoteRequestInput>({
    resolver: zodResolver(QuoteRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      companyName: "",
      projectCategory: "Web Application / SaaS Platform",
      budgetRange: "$10,000 – $25,000",
      desiredTimeline: "1 – 3 Months",
      requiredFeatures: ["Custom UI/UX Design System", "REST API & Database Architecture"],
      projectDetails: "",
      websiteUrl: "",
    },
  });

  const selectedFeatures = watch("requiredFeatures") || [];

  function toggleFeature(feature: string) {
    const exists = selectedFeatures.includes(feature);
    const updated = exists
      ? selectedFeatures.filter((f) => f !== feature)
      : [...selectedFeatures, feature];
    setValue("requiredFeatures", updated, { shouldValidate: true });
  }

  async function onSubmit(data: QuoteRequestInput) {
    setServerError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/quotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        const message =
          result?.message ||
          "Could not submit your quote request right now. Please check your connection and retry.";
        setServerError(message);
        return;
      }

      setSubmissionSuccess({
        referenceId: result.data?.referenceId || "QLX-QTE",
        message: result.message,
      });
      reset();
    } catch {
      setServerError(
        "Unable to reach the QLLEX Technologies API server. Your quote request was not saved—please check your connection or retry."
      );
    }
  }

  if (submissionSuccess) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-emerald-500/40 bg-obsidian-800 p-8 text-left space-y-5"
      >
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-emerald-400">
            Quote Request Logged
          </span>
          <h3 className="mt-1 font-display text-2xl font-bold text-slateText-primary">
            Project Scope Submitted for Architecture Review
          </h3>
          <p className="mt-2 text-sm text-slateText-secondary leading-relaxed">
            {submissionSuccess.message}
          </p>
        </div>

        <div className="rounded-lg border border-white/10 bg-obsidian-900 p-4 font-mono text-xs text-slateText-secondary">
          <span className="text-slateText-muted">Quote Reference ID: </span>
          <span className="text-slateText-primary font-semibold">
            {submissionSuccess.referenceId}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setSubmissionSuccess(null)}
          className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-obsidian-900 px-4 py-2.5 text-xs font-semibold text-slateText-primary hover:border-accent"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Submit Another Scope Request</span>
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-2xl border border-white/10 bg-obsidian-800 p-6 sm:p-8 space-y-7"
    >
      {serverError && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-500/40 bg-red-950/40 p-4 text-sm text-red-200"
        >
          <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-red-100">Quote Submission Failed</p>
            <p className="text-xs leading-relaxed">{serverError}</p>
          </div>
        </div>
      )}

      {/* Honeypot field */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="quote-website-url">Website URL</label>
        <input
          id="quote-website-url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("websiteUrl")}
        />
      </div>

      {/* Section 1: Contact Details */}
      <div>
        <h3 className="font-mono text-xs uppercase tracking-wider text-accent mb-4">
          01 // Contact Information
        </h3>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="quote-name"
              className="block text-xs font-mono uppercase tracking-wider text-slateText-secondary mb-2"
            >
              Your Name <span className="text-accent">*</span>
            </label>
            <input
              id="quote-name"
              type="text"
              placeholder="Jordan Taylor"
              aria-invalid={Boolean(errors.name)}
              className="w-full rounded-lg border border-white/15 bg-obsidian-900 px-4 py-3 text-sm text-slateText-primary placeholder:text-slateText-muted focus:border-accent focus:outline-none"
              {...register("name")}
            />
            {errors.name && (
              <p className="mt-1.5 text-xs text-red-400" role="alert">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="quote-email"
              className="block text-xs font-mono uppercase tracking-wider text-slateText-secondary mb-2"
            >
              Business Email <span className="text-accent">*</span>
            </label>
            <input
              id="quote-email"
              type="email"
              placeholder="jordan@organization.com"
              aria-invalid={Boolean(errors.email)}
              className="w-full rounded-lg border border-white/15 bg-obsidian-900 px-4 py-3 text-sm text-slateText-primary placeholder:text-slateText-muted focus:border-accent focus:outline-none"
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1.5 text-xs text-red-400" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="quote-phone"
              className="block text-xs font-mono uppercase tracking-wider text-slateText-secondary mb-2"
            >
              Phone (with Country Code) <span className="text-accent">*</span>
            </label>
            <input
              id="quote-phone"
              type="tel"
              placeholder="+1 555 019 2834"
              aria-invalid={Boolean(errors.phone)}
              className="w-full rounded-lg border border-white/15 bg-obsidian-900 px-4 py-3 text-sm text-slateText-primary placeholder:text-slateText-muted focus:border-accent focus:outline-none"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="mt-1.5 text-xs text-red-400" role="alert">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="quote-companyName"
              className="block text-xs font-mono uppercase tracking-wider text-slateText-secondary mb-2"
            >
              Company / Organization <span className="text-slateText-muted">(Optional)</span>
            </label>
            <input
              id="quote-companyName"
              type="text"
              placeholder="Vertex Global Ltd."
              className="w-full rounded-lg border border-white/15 bg-obsidian-900 px-4 py-3 text-sm text-slateText-primary placeholder:text-slateText-muted focus:border-accent focus:outline-none"
              {...register("companyName")}
            />
          </div>
        </div>
      </div>

      {/* Section 2: Project Parameters */}
      <div className="border-t border-white/10 pt-6">
        <h3 className="font-mono text-xs uppercase tracking-wider text-accent mb-4">
          02 // Project Category, Budget &amp; Timeline
        </h3>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div>
            <label
              htmlFor="quote-projectCategory"
              className="block text-xs font-mono uppercase tracking-wider text-slateText-secondary mb-2"
            >
              Project Category <span className="text-accent">*</span>
            </label>
            <select
              id="quote-projectCategory"
              className="w-full rounded-lg border border-white/15 bg-obsidian-900 px-3.5 py-3 text-sm text-slateText-primary focus:border-accent focus:outline-none"
              {...register("projectCategory")}
            >
              <option value="Web Application / SaaS Platform">
                Web Application / SaaS Platform
              </option>
              <option value="Custom Corporate / Marketing Website">
                Custom Corporate / Marketing Website
              </option>
              <option value="MERN Stack / Next.js Full-Stack System">
                MERN Stack / Next.js Full-Stack System
              </option>
              <option value="AI / Machine Learning / RAG Solution">
                AI / Machine Learning / RAG Solution
              </option>
              <option value="Python Backend / Data Pipeline">
                Python Backend / Data Pipeline
              </option>
              <option value="Mobile Application (Flutter iOS & Android)">
                Mobile Application (Flutter iOS &amp; Android)
              </option>
              <option value="Headless E-Commerce / B2B Portal">
                Headless E-Commerce / B2B Portal
              </option>
              <option value="UI/UX Design, GSAP & 3D Web Experience">
                UI/UX Design, GSAP &amp; 3D Web Experience
              </option>
            </select>
            {errors.projectCategory && (
              <p className="mt-1.5 text-xs text-red-400" role="alert">
                {errors.projectCategory.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="quote-budgetRange"
              className="block text-xs font-mono uppercase tracking-wider text-slateText-secondary mb-2"
            >
              Estimated Budget Range <span className="text-accent">*</span>
            </label>
            <select
              id="quote-budgetRange"
              className="w-full rounded-lg border border-white/15 bg-obsidian-900 px-3.5 py-3 text-sm text-slateText-primary focus:border-accent focus:outline-none"
              {...register("budgetRange")}
            >
              <option value="$5,000 – $10,000">$5,000 – $10,000</option>
              <option value="$10,000 – $25,000">$10,000 – $25,000</option>
              <option value="$25,000 – $50,000">$25,000 – $50,000</option>
              <option value="$50,000 – $100,000+">$50,000 – $100,000+</option>
              <option value="Need Architecture Discovery Estimate">
                Need Architecture Discovery Estimate
              </option>
            </select>
            {errors.budgetRange && (
              <p className="mt-1.5 text-xs text-red-400" role="alert">
                {errors.budgetRange.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="quote-desiredTimeline"
              className="block text-xs font-mono uppercase tracking-wider text-slateText-secondary mb-2"
            >
              Desired Timeline <span className="text-accent">*</span>
            </label>
            <select
              id="quote-desiredTimeline"
              className="w-full rounded-lg border border-white/15 bg-obsidian-900 px-3.5 py-3 text-sm text-slateText-primary focus:border-accent focus:outline-none"
              {...register("desiredTimeline")}
            >
              <option value="Urgent (Under 4 Weeks)">
                Urgent (Under 4 Weeks)
              </option>
              <option value="1 – 3 Months">1 – 3 Months</option>
              <option value="3 – 6 Months">3 – 6 Months</option>
              <option value="6+ Months / Phased Roadmap">
                6+ Months / Phased Roadmap
              </option>
            </select>
            {errors.desiredTimeline && (
              <p className="mt-1.5 text-xs text-red-400" role="alert">
                {errors.desiredTimeline.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Section 3: Required Features */}
      <div className="border-t border-white/10 pt-6">
        <span className="block font-mono text-xs uppercase tracking-wider text-accent mb-2">
          03 // Required Capabilities &amp; Features{" "}
          <span className="text-accent">*</span>
        </span>
        <p className="text-xs text-slateText-secondary mb-4">
          Select all capabilities needed for your project:
        </p>
        <div
          role="group"
          aria-label="Required project features"
          className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
        >
          {FEATURE_OPTIONS.map((feature) => {
            const active = selectedFeatures.includes(feature);
            return (
              <button
                key={feature}
                type="button"
                onClick={() => toggleFeature(feature)}
                aria-pressed={active}
                className={`flex items-center justify-between rounded-lg border px-3.5 py-2.5 text-left text-xs font-medium transition-colors ${
                  active
                    ? "border-accent bg-accent/15 text-slateText-primary"
                    : "border-white/10 bg-obsidian-900 text-slateText-secondary hover:border-white/25"
                }`}
              >
                <span>{feature}</span>
                <span
                  className={`ml-2 h-2 w-2 rounded-full ${
                    active ? "bg-accent" : "bg-white/15"
                  }`}
                />
              </button>
            );
          })}
        </div>
        {errors.requiredFeatures && (
          <p className="mt-2 text-xs text-red-400" role="alert">
            {errors.requiredFeatures.message}
          </p>
        )}
      </div>

      {/* Section 4: Detailed Scope */}
      <div className="border-t border-white/10 pt-6">
        <label
          htmlFor="quote-projectDetails"
          className="block font-mono text-xs uppercase tracking-wider text-accent mb-2"
        >
          04 // Project Details &amp; Technical Context{" "}
          <span className="text-accent">*</span>
        </label>
        <textarea
          id="quote-projectDetails"
          rows={5}
          placeholder="Describe your core user workflows, any existing codebase or APIs, target audience, compliance requirements, or reference links..."
          aria-invalid={Boolean(errors.projectDetails)}
          className="w-full rounded-lg border border-white/15 bg-obsidian-900 px-4 py-3 text-sm text-slateText-primary placeholder:text-slateText-muted focus:border-accent focus:outline-none"
          {...register("projectDetails")}
        />
        {errors.projectDetails && (
          <p className="mt-1.5 text-xs text-red-400" role="alert">
            {errors.projectDetails.message}
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
        <p className="text-xs text-slateText-muted">
          All quote submissions are reviewed by senior engineers and covered by strict confidentiality.
        </p>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-accent-hover disabled:opacity-60 transition-colors"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Submitting Scope...</span>
            </>
          ) : (
            <>
              <span>Submit Quote Request</span>
              <Send className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
