import React from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowUpRight,
  MessageSquare,
} from "lucide-react";
import { BRAND_CONFIG } from "@nexovanta/shared";
import { Logo } from "./Logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#444444] bg-[#333333] text-gray-300">
      {/* Upper Footer */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Column 1: Brand & Creative Agency Positioning */}
          <div className="lg:col-span-4 space-y-4">
            <Logo variant="light" />
            <p className="font-mono text-xs uppercase tracking-widest text-[#FCF1D0] font-semibold">
              {BRAND_CONFIG.tagline}
            </p>
            <p className="text-sm leading-relaxed text-gray-300 max-w-sm">
              {BRAND_CONFIG.description}
            </p>
            <div className="pt-2">
              <a
                href={BRAND_CONFIG.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-950/60 px-3.5 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-900/60 transition-colors shadow-sm"
              >
                <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
                <span>Chat on WhatsApp: {BRAND_CONFIG.contact.phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* Column 2: Core Engineering Services */}
          <div className="lg:col-span-3 space-y-4">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-white">
              Core Services
            </h2>
            <ul className="space-y-2.5 text-sm">
              {BRAND_CONFIG.fourCoreServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services#${service.slug}`}
                    className="hover:text-[#FCF1D0] transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Navigation */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-white">
              Navigation
            </h2>
            <ul className="space-y-2.5 text-sm">
              {BRAND_CONFIG.navigation.main.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-[#FCF1D0] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 font-semibold text-[#FCF1D0] hover:underline"
                >
                  <span>Start a Project</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Direct Company Contact Details */}
          <div className="lg:col-span-3 space-y-4">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-white">
              Direct Contact
            </h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 text-[#FCF1D0] mt-0.5 shrink-0" />
                <div>
                  <span className="block text-xs font-mono uppercase text-gray-400">
                    Email Enquiries
                  </span>
                  <a
                    href={`mailto:${BRAND_CONFIG.contact.email}`}
                    className="text-white font-medium hover:text-[#FCF1D0] break-all transition-colors"
                  >
                    {BRAND_CONFIG.contact.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 text-[#FCF1D0] mt-0.5 shrink-0" />
                <div>
                  <span className="block text-xs font-mono uppercase text-gray-400">
                    Phone / Call
                  </span>
                  <a
                    href={BRAND_CONFIG.contact.phoneHref}
                    className="text-white font-medium hover:text-[#FCF1D0] transition-colors"
                  >
                    {BRAND_CONFIG.contact.phoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="h-4 w-4 text-[#FCF1D0] mt-0.5 shrink-0" />
                <div>
                  <span className="block text-xs font-mono uppercase text-gray-400">
                    Working Hours
                  </span>
                  <span className="text-xs text-gray-300">
                    {BRAND_CONFIG.contact.workingHours}
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[#FCF1D0] mt-0.5 shrink-0" />
                <div>
                  <span className="block text-xs font-mono uppercase text-gray-400">
                    Location
                  </span>
                  <span className="text-xs text-gray-300">
                    {BRAND_CONFIG.contact.officeLocation}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-[#444444] bg-[#222222]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:px-6 md:flex-row lg:px-8">
          <p className="text-xs text-gray-400 text-center md:text-left">
            &copy; {currentYear} {BRAND_CONFIG.name}. All rights reserved. Built with Next.js, Express &amp; MongoDB.
          </p>

          <nav
            aria-label="Legal and Policy Pages"
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs"
          >
            {BRAND_CONFIG.navigation.legal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-400 hover:text-[#FCF1D0] transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/admin"
              className="text-gray-400 hover:text-white font-mono transition-colors"
            >
              Admin Portal
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
