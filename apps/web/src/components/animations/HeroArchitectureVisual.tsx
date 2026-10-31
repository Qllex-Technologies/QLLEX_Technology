"use client";

import React, { useRef, useState, useEffect } from "react";
import { Sparkles, Code2, ArrowUpRight, Zap, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function HeroArchitectureVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle tilt: max 5 degrees
    const rotateY = ((x - centerX) / centerX) * 5;
    const rotateX = -((y - centerY) / centerY) * 5;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
      {/* Soft atmospheric ambient glow with cream and soft blue */}
      <div
        className="absolute -top-12 -left-12 -right-12 -bottom-12 rounded-3xl bg-gradient-to-tr from-[#FCF1D0]/60 via-[#DCE7FF]/40 to-[#F1DDF5]/30 blur-2xl -z-10 pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Art-Directed Editorial Frame with 3D tilt */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: reducedMotion
            ? "none"
            : `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isHovered
            ? "transform 0.1s ease-out"
            : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="relative rounded-3xl border border-[#E8E8E5] bg-white p-6 sm:p-7 shadow-card overflow-hidden transition-shadow duration-300 hover:shadow-card-hover"
      >
        {/* Top Header Strip */}
        <div className="flex items-center justify-between border-b border-[#F0F0ED] pb-4 mb-5">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-[#333333]" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#333333]">
              Creative Engineering Studio
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FCF1D0] px-3 py-1 font-mono text-[11px] font-semibold text-[#333333] border border-[#F4E3AF]">
            <Sparkles className="h-3 w-3 text-[#C8963E]" />
            <span>Digital Craft</span>
          </span>
        </div>

        {/* Layered Composition Stage: Pastel ribbons, organic shapes, and typography reveals */}
        <div className="relative h-72 sm:h-80 w-full rounded-2xl bg-gradient-to-br from-[#FAFAF9] via-[#F5F5F3] to-[#FFFFFF] border border-[#E8E8E5] overflow-hidden flex items-center justify-center p-6">
          {/* Subtle architectural grid pattern */}
          <div
            className="absolute inset-0 bg-architectural-grid opacity-40 pointer-events-none"
            aria-hidden="true"
          />

          {/* Layer 1: Soft Blue Sweeping Abstract Ribbon */}
          <div
            className={`absolute -top-6 -left-6 w-56 h-56 rounded-full bg-gradient-to-tr from-[#DCE7FF] to-[#DCE7FF]/40 blur-lg opacity-80 pointer-events-none ${
              reducedMotion ? "" : "animate-float-slow"
            }`}
            style={{
              transform: reducedMotion
                ? "none"
                : `translate3d(${tilt.y * -1.5}px, ${tilt.x * 1.5}px, 0)`,
            }}
          />

          {/* Layer 2: Sage Green Abstract Geometric Flow */}
          <div
            className={`absolute -bottom-8 -right-8 w-60 h-60 rounded-full bg-gradient-to-bl from-[#C6E7D7] to-[#C6E7D7]/40 blur-lg opacity-70 pointer-events-none ${
              reducedMotion ? "" : "animate-float-reverse"
            }`}
            style={{
              transform: reducedMotion
                ? "none"
                : `translate3d(${tilt.y * 1.8}px, ${tilt.x * -1.8}px, 0)`,
            }}
          />

          {/* Layer 3: Soft Lavender Accent Shape */}
          <div
            className="absolute top-1/2 left-1/4 -translate-y-1/2 w-40 h-40 rounded-full bg-[#F1DDF5]/50 blur-xl pointer-events-none"
            aria-hidden="true"
          />

          {/* Layer 4: Elegant Floating Curving Ribbons (SVG Art) */}
          <svg
            viewBox="0 0 400 240"
            className="absolute inset-0 h-full w-full pointer-events-none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="ribbonGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#DCE7FF" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#FCF1D0" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#C6E7D7" stopOpacity="0.85" />
              </linearGradient>
              <linearGradient id="ribbonGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F1DDF5" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#DCE7FF" stopOpacity="0.85" />
              </linearGradient>
            </defs>
            {/* Primary smooth organic ribbon wave */}
            <path
              d="M 20,160 C 90,60 160,200 240,110 C 310,30 360,150 390,100"
              fill="none"
              stroke="url(#ribbonGrad1)"
              strokeWidth="12"
              strokeLinecap="round"
              className="drop-shadow-xs"
            />
            {/* Secondary intertwining pastel wave */}
            <path
              d="M 30,80 C 110,180 180,40 270,140 C 330,210 370,90 390,130"
              fill="none"
              stroke="url(#ribbonGrad2)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="4 6"
              className="opacity-70"
            />
          </svg>

          {/* Layer 5: Foreground Floating Composition & Glass Typography Badge */}
          <div
            className="relative z-10 w-full max-w-xs space-y-3 transition-transform duration-200"
            style={{
              transform: reducedMotion
                ? "none"
                : `translate3d(${tilt.y * 2.2}px, ${tilt.x * -2.2}px, 0)`,
            }}
          >
            {/* Main Creative Card */}
            <div className="rounded-2xl border border-white/80 bg-white/85 backdrop-blur-md p-4 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#666666] font-semibold">
                  System Blueprint
                </span>
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              <div className="space-y-0.5">
                <h4 className="font-display text-sm font-bold text-[#333333]">
                  Modern Agency Architecture
                </h4>
                <p className="text-[11px] text-[#666666] leading-relaxed">
                  Next.js 14 App Router, TypeScript, and high-throughput Python / Node.js backends.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-1.5 border-t border-[#F0F0ED]">
                <span className="rounded-md bg-[#FCF1D0] px-2 py-0.5 font-mono text-[10px] font-semibold text-[#333333]">
                  99% Lighthouse
                </span>
                <span className="rounded-md bg-[#DCE7FF] px-2 py-0.5 font-mono text-[10px] font-semibold text-[#333333]">
                  Strict Types
                </span>
                <span className="rounded-md bg-[#C6E7D7] px-2 py-0.5 font-mono text-[10px] font-semibold text-[#333333]">
                  Zero Bloat
                </span>
              </div>
            </div>

            {/* Subtle interactive hint */}
            <div className="text-center">
              <span className="inline-block font-mono text-[10px] text-[#888888] bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-[#E8E8E5] shadow-2xs">
                Interactive spatial movement
              </span>
            </div>
          </div>
        </div>

        {/* Supporting Micro-Badges */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-[#E8E8E5] bg-[#F5F5F3] p-3 text-left">
            <span className="font-display text-xs font-bold text-[#333333] block">
              Full-Stack Next.js
            </span>
            <span className="text-[11px] text-[#666666]">
              Modern App Router &amp; Server Components
            </span>
          </div>
          <div className="rounded-xl border border-[#E8E8E5] bg-[#F5F5F3] p-3 text-left">
            <span className="font-display text-xs font-bold text-[#333333] block">
              Python &amp; REST APIs
            </span>
            <span className="text-[11px] text-[#666666]">
              FastAPI, Express &amp; MongoDB
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
