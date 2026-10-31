import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BRAND_CONFIG } from "@nexovanta/shared";

interface LogoProps {
  className?: string;
  variant?: "default" | "light";
  size?: "default" | "large";
}

export function Logo({
  className = "",
  variant = "default",
  size = "default",
}: LogoProps) {
  const isLight = variant === "light";
  const isLarge = size === "large";

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 sm:gap-3 group focus-visible:outline-accent ${className}`}
      aria-label={`${BRAND_CONFIG.name} — Home`}
    >
      <span
        className={`relative flex shrink-0 items-center justify-center rounded-xl overflow-hidden shadow-sm transition-transform group-hover:scale-[1.03] ${
          isLarge ? "h-12 w-12 sm:h-14 sm:w-14" : "h-10 w-10 sm:h-11 sm:w-11"
        } ${
          isLight
            ? "bg-[#FAF5E8] border border-white/20"
            : "bg-[#FAF5E8] border border-[#E8E8E5]"
        }`}
      >
        <Image
          src="/qllex-logo.jpg"
          alt="QLLEX Technologies Logo"
          width={isLarge ? 56 : 44}
          height={isLarge ? 56 : 44}
          className="h-full w-full object-contain"
          priority
        />
      </span>
      <span className="flex flex-col">
        <span
          className={`font-display font-bold tracking-tight leading-none ${
            isLarge ? "text-lg sm:text-xl" : "text-base sm:text-lg"
          } ${isLight ? "text-white" : "text-[#333333]"}`}
        >
          {BRAND_CONFIG.name}
        </span>
        <span
          className={`font-mono text-[9px] sm:text-[10px] uppercase tracking-widest mt-1 font-medium ${
            isLight ? "text-[#FCF1D0]/80" : "text-[#666666]"
          }`}
        >
          Creative Software Agency
        </span>
      </span>
    </Link>
  );
}
