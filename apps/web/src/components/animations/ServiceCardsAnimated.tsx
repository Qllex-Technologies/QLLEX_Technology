"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceItem {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly features: readonly string[];
}

interface ServiceCardsAnimatedProps {
  services: readonly ServiceItem[];
}

export function ServiceCardsAnimated({ services }: ServiceCardsAnimatedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const cards = el.querySelectorAll(".service-card-animated");
      cards.forEach((card, idx) => {
        const fromX = idx % 2 === 0 ? -32 : 32;
        gsap.fromTo(
          card,
          { opacity: 0, x: fromX, y: 16 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            clearProps: "transform,opacity",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Distinct pastel accent per card
  const serviceAccents = [
    {
      badgeBg: "bg-[#DCE7FF]",
      badgeBorder: "border-[#CAD8F8]",
      badgeText: "text-[#333333]",
      tagBg: "bg-[#DCE7FF]/40",
      label: "Web Architecture",
    },
    {
      badgeBg: "bg-[#C6E7D7]",
      badgeBorder: "border-[#AFD7C4]",
      badgeText: "text-[#333333]",
      tagBg: "bg-[#C6E7D7]/40",
      label: "High-Throughput APIs",
    },
    {
      badgeBg: "bg-[#F1DDF5]",
      badgeBorder: "border-[#E2C7E7]",
      badgeText: "text-[#333333]",
      tagBg: "bg-[#F1DDF5]/40",
      label: "Cross-Platform Native",
    },
    {
      badgeBg: "bg-[#FCF1D0]",
      badgeBorder: "border-[#F4E3AF]",
      badgeText: "text-[#333333]",
      tagBg: "bg-[#FCF1D0]/50",
      label: "Creative Motion",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 gap-6 md:grid-cols-2"
    >
      {services.map((service, index) => {
        const accent = serviceAccents[index % serviceAccents.length];

        return (
          <div
            key={service.slug}
            className="service-card-animated rounded-3xl border border-[#E8E8E5] bg-white p-8 sm:p-9 shadow-sm hover:border-[#333333] hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-6 pb-4 border-b border-[#F0F0ED]">
                <span className="font-bold text-[#333333] text-sm">
                  0{index + 1} &bull; CAPABILITY
                </span>
                <span
                  className={`rounded-full px-3 py-1 font-semibold text-[11px] border ${accent.badgeBg} ${accent.badgeBorder} ${accent.badgeText}`}
                >
                  {accent.label}
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold text-[#333333] group-hover:text-black transition-colors">
                {service.title}
              </h3>

              <p className="mt-3 text-sm text-[#666666] leading-relaxed">
                {service.summary}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {service.features.map((feature) => (
                  <span
                    key={feature}
                    className="rounded-md bg-[#F5F5F3] border border-[#E8E8E5] px-2.5 py-1 text-xs text-[#333333] font-medium transition-colors group-hover:border-[#333333]/20"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-[#F0F0ED] flex items-center justify-between text-xs font-semibold">
              <Link
                href={`/services#${service.slug}`}
                className="group/link inline-flex items-center gap-1.5 text-[#333333] hover:underline transition-colors"
              >
                <span>Learn More</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </Link>

              <a
                href="#enquiry-form"
                className="text-[#666666] hover:text-[#333333] transition-colors"
              >
                Enquire Now &rarr;
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
