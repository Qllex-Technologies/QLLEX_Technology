"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RevealWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
  staggerSelector?: string;
  staggerAmount?: number;
}

export function RevealWrapper({
  children,
  className = "",
  delay = 0,
  yOffset = 24,
  staggerSelector,
  staggerAmount = 0.08,
}: RevealWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      if (staggerSelector) {
        const targets = el.querySelectorAll(staggerSelector);
        if (targets.length > 0) {
          gsap.fromTo(
            targets,
            { opacity: 0, y: yOffset },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              stagger: staggerAmount,
              delay,
              ease: "power2.out",
               clearProps: "transform",
              scrollTrigger: {
                trigger: el,
                start: "top 86%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      } else {
        gsap.fromTo(
          el,
          { opacity: 0, y: yOffset },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay,
            ease: "power2.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [delay, yOffset, staggerSelector, staggerAmount]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
