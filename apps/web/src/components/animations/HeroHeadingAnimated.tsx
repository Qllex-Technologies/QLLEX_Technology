"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export function HeroHeadingAnimated() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const words = el.querySelectorAll(".hero-word");
      gsap.fromTo(
        words,
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: "power3.out",
          clearProps: "transform",
        }
      );
    }, headingRef);

    return () => ctx.revert();
  }, []);

  return (
    <h1
      ref={headingRef}
      className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-[#333333] leading-[1.08]"
    >
      <span className="hero-word inline-block">We</span>{" "}
      <span className="hero-word inline-block">turn</span>{" "}
      <span className="hero-word inline-block">bold</span>{" "}
      <span className="hero-word inline-block">ideas</span>{" "}
      <span className="hero-word inline-block">into</span>{" "}
      <span className="hero-word inline-block">
        <span className="relative inline-block text-[#333333]">
          <span className="relative z-10">digital experiences.</span>
          <span
            className="absolute bottom-1 left-0 right-0 h-3 bg-[#FCF1D0] -z-0 rounded-xs"
            aria-hidden="true"
          />
        </span>
      </span>
    </h1>
  );
}
