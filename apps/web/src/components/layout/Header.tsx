"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { BRAND_CONFIG } from "@nexovanta/shared";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-ink-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-50 w-full border-b border-[#444444] bg-[#333333] shadow-sm transition-colors">
        <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo variant="light" />

          {/* Desktop Navigation - Home, Services, Work, About, Contact */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex lg:items-center lg:gap-1.5 xl:gap-2"
          >
            {BRAND_CONFIG.navigation.main.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 text-sm rounded-full transition-all duration-200 ${
                    isActive
                      ? "text-[#333333] bg-[#FCF1D0] font-semibold shadow-xs"
                      : "text-white/85 hover:text-white hover:bg-[#444444] font-medium"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Action CTA: Prominent Start a Project button */}
          <div className="hidden lg:flex lg:items-center lg:gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-[#FCF1D0] px-5 py-2.5 text-sm font-semibold text-[#333333] shadow-sm hover:bg-white hover:text-[#222222] transition-all hover:shadow"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#333333]" aria-hidden="true" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#555555] bg-[#2B2B2B] text-white hover:bg-[#444444] focus:outline-none focus:ring-2 focus:ring-[#FCF1D0]"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-x-0 top-16 sm:top-20 bottom-0 z-50 overflow-y-auto border-t border-[#444444] bg-[#333333] px-5 py-6 lg:hidden shadow-2xl"
        >
          <div className="pb-4 mb-4 border-b border-[#444444] flex items-center justify-between">
            <Logo variant="light" />
          </div>
          <nav className="flex flex-col space-y-2">
            {BRAND_CONFIG.navigation.main.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                    isActive
                      ? "bg-[#FCF1D0] text-[#333333] font-semibold"
                      : "text-white/90 hover:bg-[#444444]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="pt-6 border-t border-[#444444] flex flex-col gap-3">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FCF1D0] px-5 py-3.5 text-base font-semibold text-[#333333] shadow hover:bg-white transition-colors"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <a
                href={BRAND_CONFIG.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-950/40 px-5 py-3 text-sm font-semibold text-emerald-300 hover:bg-emerald-900/60 transition-colors"
              >
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
