"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  growth: number;
  color: { r: number; g: number; b: number };
  isSparkle: boolean;
  sparkleAngle: number;
  sparkleSpeed: number;
}

export function PerfumeSprayEffect() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    // Luxury perfume color palette: Champagne, warm amber gold, luminous gold
    const PALETTE = [
      { r: 255, g: 242, b: 215 }, // Warm champagne glow
      { r: 226, g: 184, b: 110 }, // Brand gold
      { r: 240, g: 210, b: 145 }, // Radiant amber
      { r: 223, g: 192, b: 122 }, // Soft sunlight gold
      { r: 255, g: 255, b: 245 }, // Pure mist highlight
    ];

    const particles: Particle[] = [];
    const MAX_PARTICLES = 280;

    let animationId: number | null = null;
    let isRunning = false;

    // Resize handling with devicePixelRatio for sharp rendering
    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;
      height = rect.height;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // Previous cursor position for velocity-aware spraying
    let prevX: number | null = null;
    let prevY: number | null = null;
    let lastTime = performance.now();

    const spawnParticles = (x: number, y: number, vx: number, vy: number) => {
      const speed = Math.hypot(vx, vy);
      // Spawn count proportional to cursor speed (3 to 8 particles per step)
      const count = Math.min(8, Math.max(3, Math.floor(speed * 0.35) + 3));

      for (let i = 0; i < count; i++) {
        if (particles.length >= MAX_PARTICLES) {
          particles.shift(); // Keep within budget
        }

        const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
        const randType = Math.random();
        const isSparkle = randType < 0.16; // 16% micro-sparkle stars
        const isVaporCloud = !isSparkle && randType < 0.65; // 49% diffuse expanding vapor

        // Spray in natural cone trailing the movement direction + random mist dispersion
        const coneSpread = Math.PI * 0.65;
        const angle =
          speed > 0.5
            ? Math.atan2(vy, vx) + Math.PI + (Math.random() - 0.5) * coneSpread
            : Math.random() * Math.PI * 2;

        const sprayForce = Math.random() * (speed * 0.22 + 1.6) + 0.4;

        // Sub-pixel jitter around cursor
        const offsetX = (Math.random() - 0.5) * 12;
        const offsetY = (Math.random() - 0.5) * 12;

        particles.push({
          x: x + offsetX,
          y: y + offsetY,
          vx: Math.cos(angle) * sprayForce * 0.65 + (Math.random() - 0.5) * 0.8,
          // Gentle upward buoyancy drift like fine perfume vapor in air
          vy: Math.sin(angle) * sprayForce * 0.65 - Math.random() * 0.6,
          size: isSparkle
            ? Math.random() * 1.5 + 0.9
            : isVaporCloud
            ? Math.random() * 3.5 + 2.2
            : Math.random() * 1.8 + 1.0,
          alpha: isSparkle
            ? Math.random() * 0.35 + 0.65
            : isVaporCloud
            ? Math.random() * 0.25 + 0.35
            : Math.random() * 0.35 + 0.55,
          decay: isSparkle
            ? Math.random() * 0.018 + 0.014
            : isVaporCloud
            ? Math.random() * 0.015 + 0.01
            : Math.random() * 0.018 + 0.012,
          growth: isSparkle ? -0.008 : isVaporCloud ? Math.random() * 0.07 + 0.04 : 0.01,
          color,
          isSparkle,
          sparkleAngle: Math.random() * Math.PI,
          sparkleSpeed: (Math.random() - 0.5) * 0.12,
        });
      }

      startLoop();
    };

    // Draw frame
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Use lighter blending for luminous perfume mist glow
      ctx.globalCompositeOperation = "lighter";

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Particle physics
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.94; // Air resistance / drag
        p.vy = p.vy * 0.94 - 0.03; // Gentle upward vapor lift
        p.size = Math.max(0.1, p.size + p.growth);
        p.alpha -= p.decay;

        if (p.alpha <= 0.01 || p.size <= 0.1) {
          particles.splice(i, 1);
          continue;
        }

        const { r, g, b } = p.color;

        if (p.isSparkle) {
          // Delicate 4-point sparkle star
          p.sparkleAngle += p.sparkleSpeed;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.sparkleAngle);

          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.alpha})`;

          // Central gleaming dot
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.8, 0, Math.PI * 2);
          ctx.fill();

          // 4-point cross glint
          const glintLength = p.size * 2.8;
          ctx.strokeStyle = `rgba(255, 250, 230, ${p.alpha * 0.85})`;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(-glintLength, 0);
          ctx.lineTo(glintLength, 0);
          ctx.moveTo(0, -glintLength);
          ctx.lineTo(0, glintLength);
          ctx.stroke();

          ctx.restore();
        } else {
          // Soft diffuse mist vapor droplet (radial gradient)
          const grad = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            p.size * 2.4
          );
          grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${p.alpha * 0.85})`);
          grad.addColorStop(0.45, `rgba(${r}, ${g}, ${b}, ${p.alpha * 0.4})`);
          grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalCompositeOperation = "source-over";

      // If particles remain, keep rendering; otherwise stop loop to save CPU
      if (particles.length > 0) {
        animationId = requestAnimationFrame(render);
      } else {
        isRunning = false;
        animationId = null;
      }
    };

    const startLoop = () => {
      if (!isRunning) {
        isRunning = true;
        animationId = requestAnimationFrame(render);
      }
    };

    // Pointer move listener on hero container
    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      // Ignore movements outside the canvas boundaries
      if (
        clientX < 0 ||
        clientX > width ||
        clientY < 0 ||
        clientY > height
      ) {
        prevX = null;
        prevY = null;
        return;
      }

      const now = performance.now();
      const dt = Math.max(1, now - lastTime);
      lastTime = now;

      if (prevX !== null && prevY !== null) {
        const dx = clientX - prevX;
        const dy = clientY - prevY;
        const dist = Math.hypot(dx, dy);

        // Interpolate along movement vector for smooth continuous spray stream
        const steps = Math.min(8, Math.max(1, Math.floor(dist / 14)));
        const vx = (dx / dt) * 16;
        const vy = (dy / dt) * 16;

        for (let s = 1; s <= steps; s++) {
          const t = s / steps;
          const interpX = prevX + dx * t;
          const interpY = prevY + dy * t;
          spawnParticles(interpX, interpY, vx, vy);
        }
      } else {
        spawnParticles(clientX, clientY, 0, 0);
      }

      prevX = clientX;
      prevY = clientY;
    };

    const handlePointerLeave = () => {
      prevX = null;
      prevY = null;
    };

    // Listen for interactive bottle spritz events
    const handleSpritzEvent = (e: Event) => {
      const customEvt = e as CustomEvent<{
        clientX?: number;
        clientY?: number;
        burstCount?: number;
      }>;
      const rect = canvas.getBoundingClientRect();
      const clientX =
        customEvt.detail?.clientX != null
          ? customEvt.detail.clientX - rect.left
          : width / 2;
      const clientY =
        customEvt.detail?.clientY != null
          ? customEvt.detail.clientY - rect.top
          : height * 0.45;
      const count = customEvt.detail?.burstCount || 45;

      for (let i = 0; i < count; i++) {
        if (particles.length >= MAX_PARTICLES) {
          particles.shift();
        }

        const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
        const isSparkle = Math.random() < 0.28; // Rich sparkling micro-glints
        const isVaporCloud = !isSparkle && Math.random() < 0.6;

        // Upward spray cone from nozzle (between -140deg and -40deg, centered on -90deg upward)
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.5;
        const sprayForce = Math.random() * 6.5 + 2.5;

        particles.push({
          x: clientX + (Math.random() - 0.5) * 16,
          y: clientY + (Math.random() - 0.5) * 10,
          vx: Math.cos(angle) * sprayForce + (Math.random() - 0.5) * 1.4,
          vy: Math.sin(angle) * sprayForce - Math.random() * 1.8,
          size: isSparkle
            ? Math.random() * 2.0 + 1.1
            : isVaporCloud
            ? Math.random() * 4.8 + 2.8
            : Math.random() * 2.4 + 1.2,
          alpha: isSparkle
            ? Math.random() * 0.3 + 0.7
            : isVaporCloud
            ? Math.random() * 0.3 + 0.4
            : Math.random() * 0.35 + 0.6,
          decay: isSparkle
            ? Math.random() * 0.016 + 0.011
            : isVaporCloud
            ? Math.random() * 0.013 + 0.009
            : Math.random() * 0.015 + 0.011,
          growth: isSparkle
            ? -0.006
            : isVaporCloud
            ? Math.random() * 0.09 + 0.05
            : 0.015,
          color,
          isSparkle,
          sparkleAngle: Math.random() * Math.PI,
          sparkleSpeed: (Math.random() - 0.5) * 0.16,
        });
      }

      startLoop();
    };

    window.addEventListener("perfume-spritz", handleSpritzEvent);

    // Listen on hero section (canvas.parentElement)
    const targetElement = canvas.parentElement || window;
    targetElement.addEventListener(
      "pointermove",
      handlePointerMove as EventListener,
      { passive: true }
    );
    targetElement.addEventListener(
      "pointerleave",
      handlePointerLeave as EventListener,
      { passive: true }
    );

    return () => {
      window.removeEventListener("perfume-spritz", handleSpritzEvent);
      targetElement.removeEventListener(
        "pointermove",
        handlePointerMove as EventListener
      );
      targetElement.removeEventListener(
        "pointerleave",
        handlePointerLeave as EventListener
      );
      resizeObserver.disconnect();
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-35 w-full h-full"
      aria-hidden="true"
    />
  );
}
