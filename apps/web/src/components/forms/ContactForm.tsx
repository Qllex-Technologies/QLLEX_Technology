"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ContactEnquirySchema,
  ContactEnquiryInput,
  BRAND_CONFIG,
} from "@nexovanta/shared";
import { API_BASE_URL } from "@/lib/api";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RotateCcw,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";

interface ContactFormProps {
  defaultService?: string;
  className?: string;
}

export function ContactForm({
  defaultService = "",
  className = "",
}: ContactFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState<{
    referenceId: string;
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactEnquiryInput>({
    resolver: zodResolver(ContactEnquirySchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      serviceRequired: defaultService || BRAND_CONFIG.servicesList[0]?.title || "Web Design & Development",
      projectDescription: "",
      websiteUrl: "",
    },
  });

  async function onSubmit(data: ContactEnquiryInput) {
    setServerError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
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
          "Could not submit your enquiry right now. Please verify your connection and retry.";
        setServerError(message);
        return;
      }

      setSubmissionSuccess({
        referenceId: result.data?.referenceId || "QLX-ENQ",
        message:
          result.message ||
          "Thank you for reaching out. We have securely saved your project enquiry and our engineering team will respond within 1 business day.",
      });
      reset();
    } catch {
      setServerError(
        "Unable to reach the API server. Your enquiry was not submitted—please check your connection and retry."
      );
    }
  }

  if (submissionSuccess) {
    return (
      <div
        role="status"
        aria-live="polite"
        className={`rounded-3xl border border-emerald-200 bg-white p-8 sm:p-10 text-left space-y-6 shadow-card ${className}`}
      >
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-emerald-700 font-semibold">
            Enquiry Recorded Successfully
          </span>
          <h3 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-ink-primary">
            We Have Received Your Enquiry
          </h3>
          <p className="mt-2 text-sm sm:text-base text-ink-secondary leading-relaxed">
            {submissionSuccess.message}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 font-mono text-xs text-ink-secondary flex items-center justify-between">
          <span className="text-ink-muted">Database Reference ID:</span>
          <span className="text-ink-primary font-bold bg-white px-2.5 py-1 rounded border border-gray-200">
            {submissionSuccess.referenceId}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            type="button"
            onClick={() => setSubmissionSuccess(null)}
            className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-5 py-2.5 text-xs font-semibold text-ink-primary hover:border-accent hover:text-accent transition-colors shadow-sm"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Send Another Enquiry</span>
          </button>

          <a
            href={BRAND_CONFIG.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors shadow-sm"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Need Immediate Response? WhatsApp Us</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={`rounded-3xl border border-gray-200 bg-white p-6 sm:p-10 space-y-6 shadow-card ${className}`}
    >
      {serverError && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        >
          <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-red-900">Submission Failed</p>
            <p className="text-xs leading-relaxed">{serverError}</p>
          </div>
        </div>
      )}

      {/* Honeypot anti-spam field */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website-url">Website URL (leave blank)</label>
        <input
          id="contact-website-url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("websiteUrl")}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Full Name */}
        <div>
          <label
            htmlFor="contact-fullName"
            className="block text-xs font-mono uppercase tracking-wider text-ink-secondary mb-2 font-semibold"
          >
            Full Name <span className="text-accent">*</span>
          </label>
          <input
            id="contact-fullName"
            type="text"
            autoComplete="name"
            placeholder="Sarah Jenkins"
            aria-invalid={Boolean(errors.fullName)}
            className="w-full rounded-xl border border-[#E8E8E5] bg-[#F5F5F3] px-4 py-3 text-sm text-[#333333] placeholder:text-gray-400 focus:border-[#333333] focus:bg-white focus:outline-none transition-all"
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="mt-1.5 text-xs text-red-600" role="alert">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Business Email */}
        <div>
          <label
            htmlFor="contact-email"
            className="block text-xs font-mono uppercase tracking-wider text-[#666666] mb-2 font-semibold"
          >
            Email Address <span className="text-[#333333]">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            placeholder="sarah@company.com"
            aria-invalid={Boolean(errors.email)}
            className="w-full rounded-xl border border-[#E8E8E5] bg-[#F5F5F3] px-4 py-3 text-sm text-[#333333] placeholder:text-gray-400 focus:border-[#333333] focus:bg-white focus:outline-none transition-all"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-600" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone Number (Optional) */}
        <div>
          <label
            htmlFor="contact-phone"
            className="block text-xs font-mono uppercase tracking-wider text-[#666666] mb-2 font-semibold"
          >
            Phone Number <span className="text-gray-400 text-[11px]">(Optional)</span>
          </label>
          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            placeholder="+91 98765 43210"
            aria-invalid={Boolean(errors.phone)}
            className="w-full rounded-xl border border-[#E8E8E5] bg-[#F5F5F3] px-4 py-3 text-sm text-[#333333] placeholder:text-gray-400 focus:border-[#333333] focus:bg-white focus:outline-none transition-all"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="mt-1.5 text-xs text-red-600" role="alert">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Service Required */}
        <div>
          <label
            htmlFor="contact-serviceRequired"
            className="block text-xs font-mono uppercase tracking-wider text-[#666666] mb-2 font-semibold"
          >
            Service Required <span className="text-[#333333]">*</span>
          </label>
          <select
            id="contact-serviceRequired"
            aria-invalid={Boolean(errors.serviceRequired)}
            className="w-full rounded-xl border border-[#E8E8E5] bg-[#F5F5F3] px-4 py-3 text-sm text-[#333333] focus:border-[#333333] focus:bg-white focus:outline-none transition-all cursor-pointer"
            {...register("serviceRequired")}
          >
            {BRAND_CONFIG.fourCoreServices.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Custom Software Solution">
              Custom Software Solution
            </option>
            <option value="Technical Consultation">
              Technical Consultation
            </option>
          </select>
          {errors.serviceRequired && (
            <p className="mt-1.5 text-xs text-red-600" role="alert">
              {errors.serviceRequired.message}
            </p>
          )}
        </div>
      </div>

      {/* Short Project Description */}
      <div>
        <label
          htmlFor="contact-projectDescription"
          className="block text-xs font-mono uppercase tracking-wider text-[#666666] mb-2 font-semibold"
        >
          Short Project Description <span className="text-[#333333]">*</span>
        </label>
        <textarea
          id="contact-projectDescription"
          rows={4}
          placeholder="Briefly describe your project goals, technical requirements, target users, and desired timeline..."
          aria-invalid={Boolean(errors.projectDescription)}
          className="w-full rounded-xl border border-[#E8E8E5] bg-[#F5F5F3] px-4 py-3 text-sm text-[#333333] placeholder:text-gray-400 focus:border-[#333333] focus:bg-white focus:outline-none transition-all"
          {...register("projectDescription")}
        />
        {errors.projectDescription && (
          <p className="mt-1.5 text-xs text-red-600" role="alert">
            {errors.projectDescription.message}
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
        <div className="flex items-center gap-2 text-xs text-[#888888]">
          <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>Permanently stored in encrypted MongoDB. NDA &amp; GDPR compliant.</span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#333333] px-7 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-[#222222] disabled:opacity-60 transition-all hover:shadow cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Recording Enquiry...</span>
            </>
          ) : (
            <>
              <span>Submit Project Enquiry</span>
              <Send className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
