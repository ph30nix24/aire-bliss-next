"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import {
  ArrowRightIcon,
  StarIcon,
  LeafIcon,
  CommunityIcon,
  ClockIcon,
} from "./icons";
import { PerfumeSprayEffect } from "./PerfumeSprayEffect";
import { InteractiveBottle } from "./InteractiveBottle";

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          // Trigger a celebratory perfume mist spray from the bottle upon arrival
          window.dispatchEvent(
            new CustomEvent("perfume-spritz", {
              detail: {
                burstCount: 38,
              },
            })
          );
        },
      });

      // 1. Atmospheric lighting & background vignette
      tl.fromTo(
        ".hero-vignette",
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: "power2.inOut", clearProps: "opacity" },
        0
      );

      tl.fromTo(
        ".hero-glow",
        { scale: 0.75, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.4, ease: "power2.out", clearProps: "transform,opacity" },
        0.1
      );

      // 2. Background "Fragrance" script typography
      tl.fromTo(
        ".hero-script-svg",
        { scale: 0.9, y: 20, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 1.5, ease: "power2.out", clearProps: "all" },
        0.2
      );

      // 3. Golden tabletop light streak & reflection puddle
      tl.fromTo(
        ".hero-light-streak",
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 1.1, ease: "power2.inOut", clearProps: "all" },
        0.35
      );

      tl.fromTo(
        ".hero-reflection",
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.0, clearProps: "all" },
        0.4
      );

      // 4. Hero Perfume Bottle rises smoothly onto the table plane
      tl.fromTo(
        ".hero-bottle-wrap",
        { y: 50, scale: 0.94, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 1.3, ease: "power3.out", clearProps: "all" },
        0.35
      );

      // 5. Left Editorial Content (Desktop)
      tl.fromTo(
        ".hero-editorial-kicker",
        { x: -22, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, clearProps: "all" },
        0.6
      );

      tl.fromTo(
        ".hero-editorial-title",
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: "power3.out", clearProps: "all" },
        0.7
      );

      tl.fromTo(
        ".hero-editorial-sub",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, clearProps: "all" },
        0.85
      );

      // 6. Right CTA Capsule Button (Desktop)
      tl.fromTo(
        ".hero-cta-wrap",
        { x: 35, scale: 0.92, opacity: 0 },
        {
          x: 0,
          scale: 1,
          opacity: 1,
          duration: 0.9,
          ease: "back.out(1.2)",
          clearProps: "all",
        },
        0.8
      );

      // 7. Mobile Content (for < lg)
      tl.fromTo(
        ".hero-mobile-content",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", clearProps: "all" },
        0.6
      );

      // 8. Bottom Feature & Trust Strip
      tl.fromTo(
        ".hero-feature-item",
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          clearProps: "all",
        },
        0.95
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full max-w-7xl mx-auto min-h-screen lg:h-screen min-h-[560px] flex flex-col justify-between overflow-x-clip overflow-hidden bg-[#0c0b0a] select-none"
    >
      {/* ─────────────────────────────────────────────────────────────
          PERFUME SPRAY EFFECT: Fine golden aerosol mist following cursor
      ────────────────────────────────────────────────────────────── */}
      <PerfumeSprayEffect />

      {/* ─────────────────────────────────────────────────────────────
          LAYER 0: Atmospheric Lighting & Surface Vignette
      ────────────────────────────────────────────────────────────── */}
      {/* Deep luxury vignette */}
      <div
        className="hero-vignette absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 32%, rgba(28, 24, 20, 0.45) 0%, rgba(12, 11, 10, 0.95) 75%, #080706 100%)",
        }}
        aria-hidden="true"
      />

      {/* Ambient warm radial glow centered behind the perfume bottle */}
      <div
        className="hero-glow absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[500px] md:w-[650px] lg:w-[850px] xl:w-[1050px] h-[280px] sm:h-[380px] md:h-[480px] lg:h-[580px] xl:h-[650px] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(225, 165, 60, 0.24) 0%, rgba(160, 105, 30, 0.09) 38%, rgba(12, 11, 10, 0) 70%)",
        }}
        aria-hidden="true"
      />

      {/* Soft horizontal golden light streak across the glossy tabletop plane */}
      <div
        className="hero-light-streak hidden lg:block absolute bottom-[92px] sm:bottom-[100px] lg:bottom-[108px] xl:bottom-[118px] left-1/2 -translate-x-1/2 w-[76%] max-w-4xl h-[1.5px] pointer-events-none z-15 origin-center"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(223, 192, 122, 0.1) 15%, rgba(250, 225, 160, 0.85) 50%, rgba(223, 192, 122, 0.1) 85%, transparent 100%)",
          filter: "drop-shadow(0 0 8px rgba(226, 184, 110, 0.6))",
        }}
        aria-hidden="true"
      />

      {/* Diffuse warm reflection puddle at the bottle base */}
      <div
        className="hero-reflection hidden lg:block absolute bottom-[82px] sm:bottom-[90px] lg:bottom-[98px] xl:bottom-[108px] left-1/2 -translate-x-1/2 w-[440px] lg:w-[540px] xl:w-[620px] h-[42px] pointer-events-none z-15"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(235, 190, 105, 0.35) 0%, rgba(180, 120, 35, 0.12) 50%, transparent 75%)",
          filter: "blur(14px)",
        }}
        aria-hidden="true"
      />

      {/* ─────────────────────────────────────────────────────────────
          LAYER 1: Background Typography with Story Script Font
          Expressive, romantic calligraphic script at z-10 behind bottle
      ────────────────────────────────────────────────────────────── */}
      <div
        className="absolute top-[8%] sm:top-[9%] lg:top-[8%] xl:top-[9%] left-0 right-0 w-full flex items-center justify-center pointer-events-none select-none z-10 px-4"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1000 240"
          className="hero-script-svg w-[88%] sm:w-[86%] max-w-[1120px] h-auto select-none pointer-events-none drop-shadow-[0_12px_35px_rgba(0,0,0,0.65)] origin-center"
          preserveAspectRatio="xMidYMid meet"
        >
          <text
            x="500"
            y="175"
            textAnchor="middle"
            fill="#F5EFEB"
            fontFamily="'Story Script', cursive"
            fontSize="210"
            fontWeight="400"
            textLength="940"
            lengthAdjust="spacingAndGlyphs"
          >
            Fragrance
          </text>
        </svg>
      </div>

      {/* Accessible semantic heading for SEO and screen readers */}
      <h1 className="sr-only">Aire bliss — Fragrance</h1>

      {/* ─────────────────────────────────────────────────────────────
          LAYER 2: Hero Perfume Bottle (/hero/hero.webp) IN FRONT
          Interactive 3D Parallax Tilt, Specular Sheen & Spritz Effect
      ────────────────────────────────────────────────────────────── */}
      <div className="hero-bottle-wrap hidden lg:flex absolute left-1/2 -translate-x-1/2 bottom-[92px] sm:bottom-[100px] lg:bottom-[108px] xl:bottom-[118px] z-25 items-end justify-center pointer-events-auto">
        <InteractiveBottle className="w-[440px] sm:w-[500px] md:w-[540px] lg:w-[580px] xl:w-[640px] 2xl:w-[680px] h-[340px] sm:h-[400px] md:h-[450px] lg:h-[490px] xl:h-[540px] 2xl:h-[580px] max-h-[66vh]" />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          LAYER 3: Left Editorial Content (Desktop)
          Styled with modern high-fashion Playfair Display + Plus Jakarta Sans
      ────────────────────────────────────────────────────────────── */}
      <div className="hidden lg:block absolute left-6 sm:left-8 lg:left-10 xl:left-12 bottom-[150px] sm:bottom-[165px] lg:bottom-[180px] xl:bottom-[205px] max-w-xs lg:max-w-sm xl:max-w-md z-30">
        {/* Kicker */}
        <div className="hero-editorial-kicker flex items-center gap-2 mb-2.5 sm:mb-3">
          <span className="text-[11px] xl:text-xs font-semibold tracking-[0.32em] text-[#C5A059] uppercase font-sans">
            SCENTS THAT STAY
          </span>
        </div>

        {/* Editorial Headline */}
        <h2 className="hero-editorial-title font-serif text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-[3.25rem] font-medium leading-[1.08] text-[#FBF8F2] tracking-tight mb-3 sm:mb-4">
          A fragrance <br />
          that feels like{" "}
          <span className="italic font-normal text-[#E2B86E] drop-shadow-[0_0_24px_rgba(226,184,110,0.4)]">
            you.
          </span>
        </h2>

        {/* Subtitle */}
        <p className="hero-editorial-sub text-xs lg:text-[13.5px] xl:text-[14px] leading-relaxed text-[#A39E93] font-normal max-w-xs xl:max-w-sm font-sans">
          Discover timeless perfumes crafted to make every moment extraordinary.
        </p>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          LAYER 3: Right Capsule CTA Button (Desktop)
      ────────────────────────────────────────────────────────────── */}
      <div className="hero-cta-wrap hidden lg:block absolute right-6 sm:right-8 lg:left-auto lg:right-10 xl:right-12 bottom-[180px] sm:bottom-[195px] lg:bottom-[215px] xl:bottom-[235px] z-30">
        <Link
          href="#collections"
          className="group relative inline-flex items-center gap-4 xl:gap-5 pl-7 xl:pl-8 pr-2.5 py-2.5 xl:py-3 rounded-full bg-[#F3ECE2] hover:bg-white text-neutral-900 transition-all duration-300 shadow-[0_12px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_16px_40px_rgba(226,184,110,0.3)] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC07A]"
          aria-label="Explore perfume collections"
        >
          <span className="text-[11px] xl:text-[12px] font-bold tracking-[0.18em] uppercase text-neutral-900 font-sans">
            EXPLORE COLLECTIONS
          </span>
          <div
            className="w-10 h-10 xl:w-11 xl:h-11 rounded-full bg-[#1C1A17] flex items-center justify-center text-[#E5C378] group-hover:bg-black group-hover:text-white transition-all duration-300 group-hover:translate-x-0.5 shadow-sm"
            aria-hidden="true"
          >
            <ArrowRightIcon className="w-4 h-4 text-inherit" />
          </div>
        </Link>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MOBILE / TABLET ADAPTIVE LAYOUT (< lg)
      ────────────────────────────────────────────────────────────── */}
      <div className="lg:hidden relative z-20 flex-1 flex flex-col justify-end pt-20 pb-6 px-4 sm:px-6">
        {/* Mobile Bottle with Interactive Tap-to-Spritz */}
        <div className="hero-bottle-wrap relative w-full h-[260px] sm:h-[340px] flex items-end justify-center mb-4">
          <InteractiveBottle
            isMobile
            className="w-[240px] sm:w-[320px] h-full"
          />
        </div>

        {/* Mobile Left & Right Content Stacked */}
        <div className="hero-mobile-content text-center max-w-lg mx-auto w-full px-2">
          <span className="text-[11px] font-semibold tracking-[0.25em] text-[#C5A059] uppercase block mb-2 font-sans">
            SCENTS THAT STAY
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal leading-tight text-[#FBF8F2] mb-2.5">
            A fragrance that feels like{" "}
            <span className="italic text-[#E2B86E]">you.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#A39E93] leading-relaxed mb-4 max-w-sm mx-auto font-sans">
            Discover timeless perfumes crafted to make every moment extraordinary.
          </p>
          <Link
            href="#collections"
            className="inline-flex items-center gap-3.5 pl-6 pr-2.5 py-2 rounded-full bg-[#F3ECE2] text-neutral-900 font-bold text-xs tracking-wider uppercase shadow-lg font-sans hover:bg-white active:scale-95 transition"
          >
            <span>EXPLORE COLLECTIONS</span>
            <div className="w-8 h-8 rounded-full bg-[#1C1A17] flex items-center justify-center text-[#E5C378]">
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          LAYER 4: BOTTOM FEATURE & TRUST STRIP
      ────────────────────────────────────────────────────────────── */}
      <footer
        className="relative lg:absolute lg:bottom-0 lg:left-0 lg:right-0 z-40 w-full border-t border-neutral-800/80 bg-[#0c0b0a]/92 backdrop-blur-md"
        aria-label="Key features and social proof"
      >
        <div className="w-full max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 divide-neutral-800/70 sm:divide-x">
          
          {/* Feature 1: Rating */}
          <div className="hero-feature-item py-3 sm:py-5 px-3 sm:px-6 lg:px-8 flex flex-col justify-center items-center lg:items-start text-center lg:text-left transition-colors duration-200 hover:bg-white/[0.02] min-w-0">
            <div className="flex items-center gap-2 sm:gap-3 mb-1">
              <span className="text-xl sm:text-2xl lg:text-[25px] font-bold text-[#FBF8F2] tracking-tight font-sans">
                4.9
              </span>
              <div className="flex items-center gap-0.5 sm:gap-1" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                ))}
              </div>
            </div>
            <p className="text-[11px] sm:text-xs text-neutral-400 font-normal tracking-wide font-sans truncate max-w-full">
              Loved for its lasting impression
            </p>
          </div>

          {/* Feature 2: Ingredients */}
          <div className="hero-feature-item py-3 sm:py-5 px-3 sm:px-6 lg:px-8 flex items-center justify-center lg:justify-start gap-2.5 sm:gap-4 transition-colors duration-200 hover:bg-white/[0.02] min-w-0">
            <div className="flex-shrink-0 text-[#DFC07A]" aria-hidden="true">
              <LeafIcon className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div className="flex flex-col text-left font-sans min-w-0">
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.14em] uppercase text-[#FBF8F2] truncate">
                PREMIUM
              </span>
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.14em] uppercase text-[#DFC07A] truncate">
                INGREDIENTS
              </span>
            </div>
          </div>

          {/* Feature 3: Community */}
          <div className="hero-feature-item py-3 sm:py-5 px-3 sm:px-6 lg:px-8 flex items-center justify-center lg:justify-start gap-2.5 sm:gap-4 transition-colors duration-200 hover:bg-white/[0.02] min-w-0">
            <div className="flex-shrink-0 text-[#DFC07A]" aria-hidden="true">
              <CommunityIcon className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div className="flex flex-col text-left font-sans min-w-0">
              <span className="text-lg sm:text-xl font-bold text-[#FBF8F2] leading-tight tracking-tight">
                5K+
              </span>
              <span className="text-[11px] sm:text-xs text-neutral-400 font-normal tracking-wide truncate">
                Fragrance lovers
              </span>
            </div>
          </div>

          {/* Feature 4: Long-Lasting */}
          <div className="hero-feature-item py-3 sm:py-5 px-3 sm:px-6 lg:px-8 flex items-center justify-center lg:justify-start gap-2.5 sm:gap-4 transition-colors duration-200 hover:bg-white/[0.02] min-w-0">
            <div className="flex-shrink-0 text-[#DFC07A]" aria-hidden="true">
              <ClockIcon className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div className="flex flex-col text-left font-sans min-w-0">
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.14em] uppercase text-[#FBF8F2] truncate">
                LONG-LASTING
              </span>
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.14em] uppercase text-[#DFC07A] truncate">
                SCENT
              </span>
            </div>
          </div>

        </div>
      </footer>
    </section>
  );
}
