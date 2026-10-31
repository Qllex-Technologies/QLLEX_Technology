import React from "react";
import Link from "next/link";
import { ArrowLeft, Compass, Terminal } from "lucide-react";
import { BRAND_CONFIG } from "@nexovanta/shared";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-accent">
          <Terminal className="h-3.5 w-3.5" />
          <span>HTTP 404 — Route Not Found</span>
        </div>

        <h1 className="mt-6 font-display text-4xl sm:text-6xl font-bold tracking-tight text-slateText-primary">
          This Endpoint Does Not Exist
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-base sm:text-lg text-slateText-secondary leading-relaxed">
          The page you requested may have been moved, renamed, or never existed.
          Explore our core engineering services or return to the{" "}
          {BRAND_CONFIG.name} homepage.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3.5 text-sm font-semibold text-white hover:bg-accent-hover transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-obsidian-800 px-6 py-3.5 text-sm font-semibold text-slateText-primary hover:border-accent transition-colors"
          >
            <Compass className="h-4 w-4 text-accent" />
            <span>Explore Services</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
