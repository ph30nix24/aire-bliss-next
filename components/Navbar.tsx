"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { SearchIcon, HeartIcon, BagIcon } from "./icons";

interface NavbarProps {
  activeTab?: string;
}

export function Navbar({ activeTab = "HOME" }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const navItems = ["HOME", "SHOP", "ABOUT", "COLLECTIONS"];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".navbar-brand",
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          delay: 0.1,
          clearProps: "all",
        }
      );

      gsap.fromTo(
        ".navbar-links",
        { y: -15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          delay: 0.2,
          clearProps: "all",
        }
      );

      gsap.fromTo(
        ".navbar-actions",
        { x: 20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          delay: 0.25,
          clearProps: "all",
        }
      );
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={headerRef}
      className="absolute top-0 left-0 right-0 z-50 w-full pt-4 sm:pt-5 pb-3 sm:pb-4 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link
          href="/"
          className="navbar-brand flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC07A] rounded-lg p-1"
          aria-label="Aire bliss Home"
        >
          <div className="relative w-8 h-8 md:w-9 md:h-9 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/logo.png"
              alt="Aire bliss emblem"
              fill
              sizes="36px"
              priority
              className="object-contain"
            />
          </div>
          <span className="font-serif text-xl sm:text-2xl md:text-[24px] font-normal tracking-wide text-[#E5C378] group-hover:text-[#F3ECE2] transition-colors duration-200 whitespace-nowrap">
            Aire bliss
          </span>
        </Link>

        {/* Center Desktop Navigation */}
        <nav
          className="navbar-links hidden lg:flex items-center gap-8 lg:gap-11"
          aria-label="Main Navigation"
        >
          {navItems.map((item) => {
            const isActive = item === activeTab;
            return (
              <div key={item} className="flex flex-col items-center">
                <Link
                  href={`#${item.toLowerCase()}`}
                  className={`text-[12px] lg:text-[13px] tracking-[0.22em] font-medium transition-colors duration-200 uppercase py-1 ${
                    isActive
                      ? "text-[#F5EFEB] font-semibold"
                      : "text-neutral-400 hover:text-[#DFC07A]"
                  }`}
                >
                  {item}
                </Link>
                {isActive && (
                  <div
                    className="flex items-center justify-center w-7 h-1 mt-0.5 relative"
                    aria-hidden="true"
                  >
                    <div className="w-6 h-[1px] bg-[#DFC07A]/90" />
                    <div className="absolute w-1 h-1 rounded-full bg-[#DFC07A]" />
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right Desktop Actions */}
        <div className="navbar-actions flex items-center gap-2 sm:gap-4 lg:gap-6 text-neutral-300">
          {/* Search Icon */}
          <button
            type="button"
            className="p-1.5 rounded-full hover:text-[#DFC07A] hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#DFC07A]"
            aria-label="Search fragrances"
          >
            <SearchIcon className="w-[18px] h-[18px] lg:w-5 lg:h-5" />
          </button>

          {/* Wishlist Icon */}
          <button
            type="button"
            className="p-1.5 rounded-full hover:text-[#DFC07A] hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#DFC07A]"
            aria-label="View saved fragrances wishlist"
          >
            <HeartIcon className="w-[18px] h-[18px] lg:w-5 lg:h-5" />
          </button>

          {/* Cart Icon with Counter */}
          <button
            type="button"
            className="p-1.5 rounded-full hover:text-[#DFC07A] hover:bg-white/5 transition-colors relative focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#DFC07A]"
            aria-label="Shopping bag with 2 items"
          >
            <BagIcon className="w-[18px] h-[18px] lg:w-5 lg:h-5" />
            <span
              className="absolute -top-1 -right-1 bg-[#D4AF37] text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm"
              aria-hidden="true"
            >
              2
            </span>
          </button>

          {/* Divider */}
          <div className="hidden lg:block h-4 w-px bg-neutral-700/70" />

          {/* Sign In Pill Button */}
          <button
            type="button"
            className="hidden lg:inline-flex items-center justify-center px-4 sm:px-5 py-1.5 border border-neutral-700 hover:border-[#DFC07A] rounded-full text-[11px] font-medium tracking-[0.16em] uppercase text-neutral-200 hover:text-white hover:bg-white/5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC07A]"
          >
            SIGN IN
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-300 hover:text-[#DFC07A] focus-visible:outline-none"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-4 pt-4 pb-6 px-6 bg-[#12110e]/95 backdrop-blur-xl border border-neutral-800/80 rounded-2xl flex flex-col gap-4 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-3" aria-label="Mobile Navigation">
            {navItems.map((item) => {
              const isActive = item === activeTab;
              return (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm tracking-[0.2em] uppercase py-2 px-3 rounded-lg transition-colors ${
                    isActive
                      ? "text-[#DFC07A] bg-white/5 font-semibold"
                      : "text-neutral-400 hover:text-[#DFC07A]"
                  }`}
                >
                  {item}
                </Link>
              );
            })}
          </nav>
          <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
            <button
              type="button"
              className="w-full py-2.5 border border-neutral-700 hover:border-[#DFC07A] rounded-full text-xs font-medium tracking-[0.16em] uppercase text-neutral-200 hover:text-white text-center transition"
            >
              SIGN IN
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
