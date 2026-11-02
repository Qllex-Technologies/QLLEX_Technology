"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ProjectCardData {
  title: string;
  slug: string;
  category: string;
  summary: string;
  techStack: string[];
  verificationLabel?: string;
  accentColor?: string;
  gradient?: string;
}

interface HorizontalWorkScrollProps {
  projects: ProjectCardData[];
}

export function HorizontalWorkScroll({ projects }: HorizontalWorkScrollProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const triggerInstanceRef = useRef<ScrollTrigger | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  // Mobile touch gesture tracking to allow horizontal swiping to scrub vertical page scroll
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // Calculate precise travel distance so the last card aligns with exact right margin
  const getScrollDistance = useCallback((isDesktop: boolean) => {
    if (!trackRef.current) return 0;
    const track = trackRef.current;
    const cards = track.querySelectorAll("article");
    if (cards.length === 0) return 0;

    const lastCard = cards[cards.length - 1] as HTMLElement;
    const viewportWidth = window.innerWidth;
    const targetRightMargin = isDesktop
      ? 64
      : Math.max(16, Math.min(32, Math.round(viewportWidth * 0.06)));
    const lastCardRight = lastCard.offsetLeft + lastCard.offsetWidth;
    const distance = Math.max(0, lastCardRight - viewportWidth + targetRightMargin);
    return distance;
  }, []);

  // Universal GSAP ScrollTrigger configuration for BOTH Desktop & Mobile
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const container = containerRef.current;
    if (!section || !track || !container) return;

    // Check prefers-reduced-motion
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) return;

    // Responsive GSAP MatchMedia handling both Desktop (>=1024px) and Mobile (<1024px)
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1024px)",
        isMobile: "(max-width: 1023px)",
      },
      (context) => {
        const { isDesktop } = context.conditions as {
          isDesktop: boolean;
          isMobile: boolean;
        };

        const horizontalTween = gsap.to(track, {
          x: () => -getScrollDistance(isDesktop),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getScrollDistance(isDesktop)}`,
            pin: true,
            scrub: isDesktop ? 0.8 : 0.6,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const count = projects.length;
              if (count > 1) {
                const newIdx = Math.min(
                  count - 1,
                  Math.max(0, Math.round(self.progress * (count - 1)))
                );
                setActiveIndex(newIdx);
              }
            },
          },
        });

        // Store trigger instance for dot/arrow programmatic scrolling
        triggerInstanceRef.current = horizontalTween.scrollTrigger || null;

        // Subtle panel entrance animation
        const panels = track.querySelectorAll(".project-panel-inner");
        panels.forEach((panel) => {
          gsap.fromTo(
            panel,
            { opacity: 0.95, scale: 0.985 },
            {
              opacity: 1,
              scale: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: horizontalTween,
                start: "left 95%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

        return () => {
          horizontalTween.kill();
          gsap.set(track, { clearProps: "transform,x" });
          triggerInstanceRef.current = null;
        };
      }
    );

    const handleRefresh = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleRefresh);
    window.addEventListener("load", handleRefresh);

    if (document.fonts) {
      document.fonts.ready.then(handleRefresh);
    }

    const timer = setTimeout(handleRefresh, 300);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleRefresh);
      window.removeEventListener("load", handleRefresh);
      mm.revert();
    };
  }, [projects, getScrollDistance]);

  // Programmatic navigation to specific card via vertical page scroll
  const scrollToCard = (index: number) => {
    const trigger = triggerInstanceRef.current;
    if (trigger && projects.length > 1) {
      const scrollStart = trigger.start;
      const totalDistance = trigger.end - trigger.start;
      const targetScrollY =
        scrollStart + (index / (projects.length - 1)) * totalDistance;
      window.scrollTo({
        top: targetScrollY,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  // Mobile horizontal touch swipe enhancement: translates horizontal swipe to vertical window scroll
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (
      touchStartX.current === null ||
      touchStartY.current === null ||
      e.touches.length !== 1
    ) {
      return;
    }
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = touchStartX.current - currentX;
    const deltaY = touchStartY.current - currentY;

    // If gesture is predominantly horizontal, scroll the window vertically to drive ScrollTrigger
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 8) {
      window.scrollBy({ top: deltaX * 0.9, behavior: "auto" });
      touchStartX.current = currentX;
      touchStartY.current = currentY;
    }
  };

  const handleTouchEnd = () => {
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Curated pastel themes for each project card
  const cardPastelThemes = [
    {
      bg: "bg-gradient-to-br from-[#DCE7FF] via-[#EDF3FF] to-[#FCF1D0]",
      border: "border-[#CAD8F8]",
    },
    {
      bg: "bg-gradient-to-br from-[#C6E7D7] via-[#E1F4EC] to-[#F5F5F3]",
      border: "border-[#AFD7C4]",
    },
    {
      bg: "bg-gradient-to-br from-[#F1DDF5] via-[#F9EFFB] to-[#DCE7FF]",
      border: "border-[#E2C7E7]",
    },
    {
      bg: "bg-gradient-to-br from-[#FCF1D0] via-[#FDF8E8] to-[#C6E7D7]",
      border: "border-[#F4E3AF]",
    },
  ];

  return (
    <section
      id="selected-work"
      ref={sectionRef}
      className="relative bg-[#F5F5F3] border-y border-[#E8E8E5] pt-8 sm:pt-12 lg:pt-16 pb-2.5 sm:pb-3 lg:pb-4 overflow-hidden select-none"
    >
      {/* Section Header: Compact, Elegant, Zero Wasted Height */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-2 sm:mb-2.5 lg:mb-3">
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-0.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-1 rounded-full border border-[#E8E8E5] bg-[#FCF1D0] px-2.5 py-0.5 font-mono text-[10px] sm:text-xs uppercase tracking-wider text-[#333333] font-semibold shadow-xs shrink-0">
                <Sparkles className="h-3 w-3 text-[#333333]" />
                <span>Selected Work</span>
              </div>
              <h2 className="font-display text-base sm:text-xl lg:text-2xl xl:text-3xl font-bold tracking-tight text-[#333333] truncate">
                Featured Engineering Projects
              </h2>
            </div>
            <p className="text-xs text-[#666666] leading-relaxed hidden md:block">
              Vertical scroll drives automatic horizontal portfolio navigation on all devices.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-1.5 rounded-full border border-[#E8E8E5] bg-white px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-semibold text-[#333333] hover:border-[#333333] shadow-xs transition-all"
            >
              <span className="hidden sm:inline">View All Case Studies</span>
              <span className="sm:hidden">All Work</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Track: GSAP ScrollTrigger Driven on BOTH Desktop and Mobile */}
      <div
        ref={containerRef}
        id="selected-work-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="w-full overflow-hidden"
        style={{
          touchAction: "pan-y",
        }}
      >
        <div
          ref={trackRef}
          id="selected-work-track"
          className="flex flex-nowrap items-stretch gap-4 sm:gap-6 lg:gap-8 xl:gap-10 w-max px-4 sm:px-6 lg:pl-8 lg:pr-16 pb-1 pt-0.5 will-change-transform"
        >
          {projects.map((project, idx) => {
            const theme = cardPastelThemes[idx % cardPastelThemes.length];

            return (
              <article
                key={project.slug}
                className="project-panel-inner w-[88vw] sm:w-[86vw] lg:w-[580px] xl:w-[640px] 2xl:w-[680px] max-h-[calc(100vh-130px)] sm:max-h-[calc(100vh-150px)] lg:max-h-[calc(100vh-160px)] overflow-y-auto no-scrollbar shrink-0 rounded-3xl border border-[#E8E8E5] bg-white p-4 sm:p-5 lg:p-6 xl:p-7 shadow-card flex flex-col justify-between group hover:border-[#333333] transition-all hover:shadow-card-hover"
              >
                <div>
                  {/* Top Bar with Number & Category */}
                  <div className="flex items-center justify-between border-b border-[#F0F0ED] pb-1.5 sm:pb-2 mb-2 sm:mb-2.5">
                    <span className="font-mono text-[11px] sm:text-xs font-bold text-[#333333]">
                      {`0${idx + 1} // CASE STUDY`}
                    </span>
                    <span className="rounded-full bg-[#FCF1D0] border border-[#F4E3AF] px-2 py-0.5 font-mono text-[10px] sm:text-xs font-semibold text-[#333333]">
                      {project.category}
                    </span>
                  </div>

                  {/* Project Visual Art Header: Intelligently scaled to guarantee complete vertical visibility */}
                  <div
                    className={`relative h-20 sm:h-24 lg:h-[clamp(110px,15vh,140px)] xl:h-36 w-full rounded-2xl p-3 sm:p-4 mb-2 sm:mb-2.5 overflow-hidden flex flex-col justify-between border ${theme.border} ${theme.bg} shrink-0`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-[#333333]">
                      <span className="font-bold tracking-tight text-[11px] sm:text-xs">
                        {project.slug}
                      </span>
                      <span className="rounded-full bg-white/95 backdrop-blur-sm border border-black/10 px-2 py-0.5 text-[9px] sm:text-[10px] font-semibold text-[#333333] shadow-2xs">
                        {project.verificationLabel || "Production Verified"}
                      </span>
                    </div>

                    <div className="space-y-1 z-10">
                      <span className="text-[#333333]/85 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider block font-semibold">
                        Core Technologies
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md bg-white/95 backdrop-blur-md border border-black/10 px-2 py-0.5 font-mono text-[9px] sm:text-[10px] text-[#333333] font-medium shadow-2xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Subtle Geometric Graphic Overlay */}
                    <svg
                      viewBox="0 0 200 200"
                      className="absolute -right-6 -bottom-6 h-28 w-28 sm:h-32 sm:w-32 opacity-20 pointer-events-none"
                    >
                      <circle cx="100" cy="100" r="80" stroke="#333333" strokeWidth="2" fill="none" />
                      <circle cx="100" cy="100" r="50" stroke="#333333" strokeWidth="2" fill="none" />
                      <circle cx="100" cy="100" r="20" stroke="#333333" strokeWidth="2" fill="none" />
                    </svg>
                  </div>

                  {/* Project Title: Large, bold, readable, natural wrap */}
                  <h3 className="font-display text-base sm:text-lg lg:text-xl xl:text-2xl font-bold tracking-tight text-[#333333] group-hover:text-black transition-colors leading-snug break-words">
                    {project.title}
                  </h3>

                  {/* Project Description: Readable, natural multi-line wrap without ellipsis */}
                  <p className="mt-1 sm:mt-1.5 text-[12px] sm:text-xs lg:text-sm text-[#666666] leading-relaxed break-words">
                    {project.summary}
                  </p>
                </div>

                {/* Bottom Action Footer: 100% visible, never clipped */}
                <div className="mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-[#F0F0ED] flex items-center justify-between shrink-0">
                  <span className="font-mono text-[10px] sm:text-xs text-[#888888]">
                    Production Architecture
                  </span>
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="group/link inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#333333] hover:underline"
                  >
                    <span>Explore Case Study</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Synchronized Pagination Controls (Active on all screens) */}
      <div className="mt-2 sm:mt-2.5 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Pagination Dots */}
        <div className="flex items-center gap-2">
          {projects.map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={() => scrollToCard(dotIdx)}
              aria-label={`Go to project slide ${dotIdx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === dotIdx
                  ? "w-6 bg-[#333333]"
                  : "w-2 bg-[#D0D0CD] hover:bg-[#888888]"
              }`}
            />
          ))}
          <span className="ml-2 font-mono text-[11px] text-[#888888]">
            {`0${activeIndex + 1} / 0${projects.length}`}
          </span>
        </div>

        {/* Scroll Hint & Prev/Next Buttons */}
        <div className="flex items-center gap-3 text-xs text-[#666666]">
          <span className="font-mono text-[11px] text-[#888888] hidden sm:inline">
            Scroll vertically to navigate &darr;
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => scrollToCard(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              aria-label="Previous project"
              className="p-1.5 rounded-full border border-[#E8E8E5] bg-white text-[#333333] disabled:opacity-40 hover:bg-[#F5F5F3] transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() =>
                scrollToCard(Math.min(projects.length - 1, activeIndex + 1))
              }
              disabled={activeIndex === projects.length - 1}
              aria-label="Next project"
              className="p-1.5 rounded-full border border-[#E8E8E5] bg-white text-[#333333] disabled:opacity-40 hover:bg-[#F5F5F3] transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
