"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface InteractiveBottleProps {
  className?: string;
  isMobile?: boolean;
}

export function InteractiveBottle({
  className = "",
  isMobile = false,
}: InteractiveBottleProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bottleRef = useRef<HTMLDivElement | null>(null);

  const [tilt, setTilt] = useState({
    rotX: 0,
    rotY: 0,
    rotZ: 0,
    shiftX: 0,
    shiftY: 0,
    sheenX: 50,
    sheenY: 35,
    sheenOpacity: 0,
  });

  const [isHovered, setIsHovered] = useState(false);
  const [isSpritzing, setIsSpritzing] = useState(false);
  const [showFlash, setShowFlash] = useState(false);

  // Animation frame target & current values for buttery 60fps lerp
  const animRef = useRef({
    currentRotX: 0,
    currentRotY: 0,
    currentRotZ: 0,
    currentShiftX: 0,
    currentShiftY: 0,
    currentSheenX: 50,
    currentSheenY: 35,
    currentSheenOpacity: 0,
    targetRotX: 0,
    targetRotY: 0,
    targetRotZ: 0,
    targetShiftX: 0,
    targetShiftY: 0,
    targetSheenX: 50,
    targetSheenY: 35,
    targetSheenOpacity: 0,
    rafId: null as number | null,
    isRunning: false,
  });

  const loopRef = useRef<() => void>(() => {});

  const updateLoop = useCallback(() => {
    const s = animRef.current;
    const lerpFactor = 0.09;

    s.currentRotX += (s.targetRotX - s.currentRotX) * lerpFactor;
    s.currentRotY += (s.targetRotY - s.currentRotY) * lerpFactor;
    s.currentRotZ += (s.targetRotZ - s.currentRotZ) * lerpFactor;
    s.currentShiftX += (s.targetShiftX - s.currentShiftX) * lerpFactor;
    s.currentShiftY += (s.targetShiftY - s.currentShiftY) * lerpFactor;
    s.currentSheenX += (s.targetSheenX - s.currentSheenX) * lerpFactor;
    s.currentSheenY += (s.targetSheenY - s.currentSheenY) * lerpFactor;
    s.currentSheenOpacity +=
      (s.targetSheenOpacity - s.currentSheenOpacity) * lerpFactor;

    setTilt({
      rotX: s.currentRotX,
      rotY: s.currentRotY,
      rotZ: s.currentRotZ,
      shiftX: s.currentShiftX,
      shiftY: s.currentShiftY,
      sheenX: s.currentSheenX,
      sheenY: s.currentSheenY,
      sheenOpacity: s.currentSheenOpacity,
    });

    const isSettled =
      Math.abs(s.targetRotX - s.currentRotX) < 0.02 &&
      Math.abs(s.targetRotY - s.currentRotY) < 0.02 &&
      Math.abs(s.targetShiftX - s.currentShiftX) < 0.05 &&
      Math.abs(s.targetShiftY - s.currentShiftY) < 0.05 &&
      Math.abs(s.targetSheenOpacity - s.currentSheenOpacity) < 0.01;

    if (!isSettled) {
      s.rafId = requestAnimationFrame(loopRef.current);
    } else {
      s.isRunning = false;
      s.rafId = null;
    }
  }, []);

  useEffect(() => {
    loopRef.current = updateLoop;
  }, [updateLoop]);

  const startAnimationLoop = useCallback(() => {
    if (!animRef.current.isRunning) {
      animRef.current.isRunning = true;
      animRef.current.rafId = requestAnimationFrame(loopRef.current);
    }
  }, []);

  // Track cursor across hero or over bottle
  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height * 0.55;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      // Distance from bottle center
      const dist = Math.hypot(deltaX, deltaY);
      const maxInfluence = isMobile ? 220 : 500;

      if (dist < maxInfluence) {
        const normX = Math.max(-1, Math.min(1, deltaX / (rect.width * 0.75)));
        const normY = Math.max(-1, Math.min(1, deltaY / (rect.height * 0.75)));

        const maxTilt = isMobile ? 6 : 14;
        const maxShift = isMobile ? 6 : 12;

        animRef.current.targetRotX = -normY * (maxTilt * 0.8);
        animRef.current.targetRotY = normX * maxTilt;
        animRef.current.targetRotZ = normX * 1.5;
        animRef.current.targetShiftX = normX * maxShift;
        animRef.current.targetShiftY = normY * (maxShift * 0.6);

        // Specular sheen highlight follows light direction
        animRef.current.targetSheenX = 50 + normX * 28;
        animRef.current.targetSheenY = 38 + normY * 22;
        animRef.current.targetSheenOpacity = isHovered ? 0.35 : 0.2;

        startAnimationLoop();
      } else if (!isHovered) {
        // Return to neutral
        animRef.current.targetRotX = 0;
        animRef.current.targetRotY = 0;
        animRef.current.targetRotZ = 0;
        animRef.current.targetShiftX = 0;
        animRef.current.targetShiftY = 0;
        animRef.current.targetSheenOpacity = 0;
        startAnimationLoop();
      }
    },
    [isMobile, isHovered, startAnimationLoop]
  );

  useEffect(() => {
    const animState = animRef.current;
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (animState.rafId !== null) {
        cancelAnimationFrame(animState.rafId);
      }
    };
  }, [handlePointerMove]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    animRef.current.targetSheenOpacity = 0.35;
    startAnimationLoop();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    animRef.current.targetRotX = 0;
    animRef.current.targetRotY = 0;
    animRef.current.targetRotZ = 0;
    animRef.current.targetShiftX = 0;
    animRef.current.targetShiftY = 0;
    animRef.current.targetSheenOpacity = 0;
    startAnimationLoop();
  };

  // Spritz trigger on click or tap
  const triggerSpritz = (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e && "key" in e && e.key !== "Enter" && e.key !== " ") {
      return;
    }

    if (e) {
      e.preventDefault();
    }

    setIsSpritzing(true);
    setShowFlash(true);

    const container = containerRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();
      // Atomizer nozzle location at top-center of the bottle cap
      const nozzleX = rect.left + rect.width * 0.5;
      const nozzleY = rect.top + rect.height * (isMobile ? 0.36 : 0.32);

      window.dispatchEvent(
        new CustomEvent("perfume-spritz", {
          detail: {
            clientX: nozzleX,
            clientY: nozzleY,
            burstCount: isMobile ? 32 : 48,
          },
        })
      );
    }

    setTimeout(() => {
      setShowFlash(false);
    }, 180);

    setTimeout(() => {
      setIsSpritzing(false);
    }, 400);
  };

  const transformStyle = `
    perspective(1200px)
    rotateX(${tilt.rotX.toFixed(2)}deg)
    rotateY(${tilt.rotY.toFixed(2)}deg)
    rotateZ(${tilt.rotZ.toFixed(2)}deg)
    translate3d(${tilt.shiftX.toFixed(1)}px, ${tilt.shiftY.toFixed(1)}px, 0)
    scale(${isSpritzing ? 0.96 : isHovered ? 1.025 : 1})
  `;

  return (
    <div
      ref={containerRef}
      className={`group relative select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC07A] rounded-3xl ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={triggerSpritz}
      onKeyDown={triggerSpritz}
      role="button"
      tabIndex={0}
      aria-label="Aire bliss Eau de Parfum - Click to spray fragrance mist"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {/* ─────────────────────────────────────────────────────────────
          INTERACTION HINT BADGE (Desktop)
      ────────────────────────────────────────────────────────────── */}
      {!isMobile && (
        <div
          className={`absolute -top-7 left-1/2 -translate-x-1/2 z-40 pointer-events-none transition-all duration-300 ease-out flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-[#DFC07A]/50 bg-[#14120e]/90 text-[#F5EFEB] shadow-[0_8px_20px_rgba(0,0,0,0.7)] backdrop-blur-md ${
            isHovered
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2"
          }`}
          aria-hidden="true"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#E2B86E] animate-pulse" />
          <span className="text-[10px] font-sans font-medium tracking-[0.2em] uppercase text-[#E5C378]">
            CLICK TO SPRITZ
          </span>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          ATOMIZER NOZZLE FLASH (Golden glint pulse upon spritz)
      ────────────────────────────────────────────────────────────── */}
      {showFlash && (
        <div
          className="absolute left-1/2 -translate-x-1/2 top-[32%] -translate-y-1/2 z-50 pointer-events-none w-16 h-16 rounded-full animate-ping"
          style={{
            background:
              "radial-gradient(circle, rgba(255,245,210,0.95) 0%, rgba(226,184,110,0.6) 45%, transparent 75%)",
          }}
          aria-hidden="true"
        />
      )}

      {/* ─────────────────────────────────────────────────────────────
          BOTTLE CONTAINER with 3D Parallax Tilt & Organic Breathing
      ────────────────────────────────────────────────────────────── */}
      <div
        ref={bottleRef}
        className="relative w-full h-full transition-transform duration-100 ease-out will-change-transform flex items-end justify-center"
        style={{
          transform: transformStyle,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Soft dynamic aura behind bottle when hovered */}
        <div
          className={`absolute inset-0 pointer-events-none z-0 rounded-full transition-opacity duration-500 blur-2xl ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "radial-gradient(circle at 50% 55%, rgba(226,184,110,0.22) 0%, rgba(160,105,30,0.06) 50%, transparent 75%)",
          }}
          aria-hidden="true"
        />

        {/* Perfume Bottle Image */}
        <Image
          src="/hero/hero.webp"
          alt="Aire bliss Eau de Parfum - Luxury Perfume Bottle"
          fill
          priority
          sizes={
            isMobile
              ? "(max-width: 640px) 240px, 320px"
              : "(max-width: 1280px) 580px, 680px"
          }
          className="object-contain object-bottom drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] transition-filter duration-300"
        />

        {/* ─────────────────────────────────────────────────────────────
            SPECULAR GLASS SHEEN OVERLAY (Dynamic light reflection)
        ────────────────────────────────────────────────────────────── */}
        <div
          className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
          style={{
            opacity: tilt.sheenOpacity,
            background: `radial-gradient(circle at ${tilt.sheenX}% ${tilt.sheenY}%, rgba(255, 250, 235, 0.35) 0%, rgba(226, 184, 110, 0.12) 35%, transparent 65%)`,
            mixBlendMode: "overlay",
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
