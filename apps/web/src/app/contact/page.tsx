import React from "react";
import { Mail, Phone, MapPin, Clock, ShieldCheck, MessageSquare } from "lucide-react";
import { BRAND_CONFIG } from "@nexovanta/shared";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata = buildMetadata({
  title: "Contact Us | Speak With Software Architects & Engineering Leads",
  description: `Contact ${BRAND_CONFIG.name} for custom software development, Next.js web applications, MERN stack projects, Python/AI systems, and technical support.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="py-12 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Contact Us", path: "/contact" }]} />

        <div className="max-w-3xl space-y-4 pb-12 border-b border-[#E8E8E5]">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E8E8E5] bg-[#FCF1D0] px-3.5 py-1 font-mono text-xs uppercase tracking-widest text-[#333333] font-semibold">
            <span>Direct Communication</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#333333] leading-tight">
            Start a Conversation With {BRAND_CONFIG.shortName}
          </h1>
          <p className="text-base sm:text-lg text-[#666666] leading-relaxed">
            Whether you have an upcoming web platform, mobile application, or
            custom backend project, submit your requirements below. Our engineering
            leads will review your scope and follow up within 1 business day.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
          {/* Left Column: Direct Channels & WhatsApp Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-[#E8E8E5] bg-white p-7 sm:p-9 space-y-6 shadow-subtle">
              <h2 className="font-display text-xl font-bold text-[#333333]">
                Direct Channels
              </h2>

              <ul className="space-y-5 text-sm">
                <li className="flex items-start gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#DCE7FF] text-[#333333] border border-[#CAD8F8]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block font-mono text-xs uppercase text-[#888888]">
                      Project Enquiries Email
                    </span>
                    <a
                      href={`mailto:${BRAND_CONFIG.contact.email}`}
                      className="font-semibold text-[#333333] hover:underline break-all transition-colors"
                    >
                      {BRAND_CONFIG.contact.email}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#C6E7D7] text-[#333333] border border-[#AFD7C4]">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block font-mono text-xs uppercase text-[#888888]">
                      Direct Phone
                    </span>
                    <a
                      href={BRAND_CONFIG.contact.phoneHref}
                      className="font-semibold text-[#333333] hover:underline transition-colors"
                    >
                      {BRAND_CONFIG.contact.phoneDisplay}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block font-mono text-xs uppercase text-[#888888]">
                      WhatsApp Quick Response
                    </span>
                    <a
                      href={BRAND_CONFIG.contact.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-emerald-800 hover:text-emerald-950 transition-colors"
                    >
                      Chat on WhatsApp: {BRAND_CONFIG.contact.phoneDisplay}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#F5F5F3] text-[#666666] border border-[#E8E8E5]">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block font-mono text-xs uppercase text-[#888888]">
                      Operating Hours
                    </span>
                    <span className="text-[#666666]">
                      {BRAND_CONFIG.contact.workingHours}
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#F5F5F3] text-[#666666] border border-[#E8E8E5]">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block font-mono text-xs uppercase text-[#888888]">
                      Office Location
                    </span>
                    <span className="text-xs text-[#666666]">
                      {BRAND_CONFIG.contact.officeLocation}
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-[#E8E8E5] bg-[#F5F5F3] p-7 space-y-3 shadow-subtle">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#333333] font-semibold">
                <ShieldCheck className="h-4 w-4 text-[#333333]" />
                <span>COMMUNICATION STANDARD</span>
              </div>
              <h3 className="font-display text-base font-bold text-[#333333]">
                Direct Engineer-to-Client Access
              </h3>
              <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
                You will discuss technical architecture, timelines, and deliverables
                directly with senior developers and architects who write code—never
                commissioned sales scripts.
              </p>
            </div>
          </div>

          {/* Right Column: Validated Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
