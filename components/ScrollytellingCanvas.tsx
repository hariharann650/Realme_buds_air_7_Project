"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { ChevronDown, Volume2, Sparkles, ShieldCheck, Zap, ArrowRight } from "lucide-react";

interface ScrollytellingCanvasProps {
  onOpenPreOrder?: () => void;
}

const TOTAL_FRAMES = 180;

export default function ScrollytellingCanvas({ onOpenPreOrder }: ScrollytellingCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const [imagesReady, setImagesReady] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Store loaded Image objects
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);

  // Preload images
  useEffect(() => {
    let isMounted = true;
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameIndex = String(i).padStart(3, "0");
      img.src = `/frames/frame_${frameIndex}.jpg`;

      img.onload = () => {
        if (!isMounted) return;
        loaded++;
        setLoadedCount(loaded);

        // Once first frame is loaded, we can already render it
        if (loaded === 1 && canvasRef.current) {
          renderFrame(0);
        }

        if (loaded >= TOTAL_FRAMES * 0.4) {
          // Ready for interactive viewing once 40% (first 72 frames) are loaded
          setImagesReady(true);
        }
      };

      img.onerror = () => {
        if (!isMounted) return;
        loaded++;
        setLoadedCount(loaded);
      };

      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      isMounted = false;
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, []);

  // Frame drawer with high-DPI and aspect-ratio containment
  const renderFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const img = imagesRef.current[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Fallback to nearest loaded frame
      let fallbackImg: HTMLImageElement | null = null;
      for (let offset = 1; offset < 20; offset++) {
        const prev = imagesRef.current[Math.max(0, frameIdx - offset)];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          fallbackImg = prev;
          break;
        }
        const next = imagesRef.current[Math.min(TOTAL_FRAMES - 1, frameIdx + offset)];
        if (next && next.complete && next.naturalWidth > 0) {
          fallbackImg = next;
          break;
        }
      }
      if (!fallbackImg) return;
      drawImgToCanvas(ctx, canvas, fallbackImg);
      return;
    }

    drawImgToCanvas(ctx, canvas, img);
  }, []);

  const drawImgToCanvas = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    img: HTMLImageElement
  ) => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    // Check size adjustment
    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Fill background with exact matching slate-black #0B0F10
    ctx.fillStyle = "#0B0F10";
    ctx.fillRect(0, 0, displayWidth, displayHeight);

    // Calculate aspect ratio containment
    const imgWidth = img.naturalWidth || 1920;
    const imgHeight = img.naturalHeight || 1080;
    const imgAspect = imgWidth / imgHeight;
    const screenAspect = displayWidth / displayHeight;

    let drawWidth: number;
    let drawHeight: number;
    let drawX: number;
    let drawY: number;

    if (displayWidth < 768) {
      // Mobile portrait: scale to fill ~140% of width for a prominent hero presentation
      drawWidth = displayWidth * 1.4;
      drawHeight = drawWidth / imgAspect;
      drawX = (displayWidth - drawWidth) / 2;
      drawY = (displayHeight - drawHeight) / 2;
    } else {
      // Desktop: take 100% full width of the screen
      drawWidth = displayWidth;
      drawHeight = displayWidth / imgAspect;
      drawX = 0;
      drawY = (displayHeight - drawHeight) / 2;

      // If screen is taller than 16:9, scale by height so it covers completely
      if (drawHeight < displayHeight) {
        drawHeight = displayHeight;
        drawWidth = displayHeight * imgAspect;
        drawX = (displayWidth - drawWidth) / 2;
        drawY = 0;
      }
    }

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    ctx.restore();
  };

  // Resize listener
  useEffect(() => {
    const handleResize = () => {
      renderFrame(Math.round(currentFrameRef.current));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [renderFrame]);

  // Scroll handler with requestAnimationFrame lerping
  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;

      let progress = scrolled / totalScrollable;
      progress = Math.max(0, Math.min(1, progress));

      setScrollProgress(progress);
      targetFrameRef.current = progress * (TOTAL_FRAMES - 1);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateScroll();

    // Animation render loop for silky smooth frame interpolation
    const loop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.05) {
        currentFrameRef.current += diff * 0.22; // Smooth buttery glide
        renderFrame(Math.round(currentFrameRef.current));
      } else if (Math.round(currentFrameRef.current) !== Math.round(targetFrameRef.current)) {
        currentFrameRef.current = targetFrameRef.current;
        renderFrame(Math.round(currentFrameRef.current));
      }

      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [renderFrame]);

  // Calculate percentage loaded for preloader
  const loadPercentage = Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100));

  // Opacity helpers for the 5 storytelling stages
  // Stage 1: 0% - 18% (Hero / Closed Case)
  const stage1Opacity = Math.max(0, Math.min(1, 1 - (scrollProgress - 0.02) / 0.16));

  // Stage 2: 20% - 38% (The Reveal - Case opens)
  const stage2Opacity =
    scrollProgress < 0.18
      ? Math.max(0, (scrollProgress - 0.14) / 0.04)
      : scrollProgress > 0.38
      ? Math.max(0, 1 - (scrollProgress - 0.38) / 0.06)
      : 1;

  // Stage 3: 40% - 62% (Elevated Sound - Earbuds rise)
  const stage3Opacity =
    scrollProgress < 0.40
      ? Math.max(0, (scrollProgress - 0.36) / 0.04)
      : scrollProgress > 0.62
      ? Math.max(0, 1 - (scrollProgress - 0.62) / 0.06)
      : 1;

  // Stage 4: 65% - 80% (Noise Cancellation & Immersion)
  const stage4Opacity =
    scrollProgress < 0.64
      ? Math.max(0, (scrollProgress - 0.60) / 0.04)
      : scrollProgress > 0.80
      ? Math.max(0, 1 - (scrollProgress - 0.80) / 0.04)
      : 1;

  // Stage 5: 82% - 100% (Final Hero & CTA)
  const stage5Opacity = Math.max(0, Math.min(1, (scrollProgress - 0.81) / 0.07));

  return (
    <div
      id="hero"
      ref={containerRef}
      className="relative w-full bg-[#0B0F10]"
      style={{ height: "450vh" }}
    >
      {/* Sticky Canvas Viewport (100vh) */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center bg-[#0B0F10]">
        {/* Hardware-accelerated HTML5 Canvas with Full Width scaling */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
        />

        {/* Ultra-soft Vignette Overlay so edges melt invisibly without blocking product */}
        <div className="absolute inset-0 z-20 vignette-overlay pointer-events-none" />

        {/* Ambient Subtle Glow behind product */}
        <div className="absolute inset-0 z-0 ambient-glow pointer-events-none" />

        {/* Minimal Apple-style Preloader */}
        {!imagesReady && loadedCount < 20 && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0B0F10] transition-opacity duration-700">
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-white font-semibold text-2xl tracking-tight">realme</span>
              <span className="w-2 h-2 rounded-full bg-[#FFC915] animate-pulse" />
              <span className="text-white/40 text-lg font-light">Buds Air 7</span>
            </div>
            {/* Elegant luxury loading bar */}
            <div className="w-48 h-[2px] bg-white/[0.08] rounded-full overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-[#FFC915] to-[#F5A623] transition-all duration-300 ease-out"
                style={{ width: `${loadPercentage}%` }}
              />
            </div>
            <p className="mt-4 text-xs font-mono tracking-widest text-white/40 uppercase">
              Loading 3D Experience {loadPercentage}%
            </p>
          </div>
        )}

        {/* ============================================================ */}
        {/* STORY CHAPTER 1: HERO / CLOSED CASE (0% - 18%)               */}
        {/* Completely unobstructed without blocking background cards   */}
        {/* ============================================================ */}
        <div
          className="absolute inset-0 z-30 flex flex-col justify-between items-center text-center px-6 py-20 md:py-24 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: stage1Opacity,
            visibility: stage1Opacity > 0.01 ? "visible" : "hidden",
          }}
        >
          {/* Top Tagline */}
          <div className="flex flex-col items-center mt-6 md:mt-10">
            <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-widest uppercase text-white/80 mb-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              <span className="w-2 h-2 rounded-full bg-[#00E599] shadow-[0_0_8px_#00E599]" />
              <span>Next-Gen Flagship Acoustic Architecture</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
              realme Buds Air 7
            </h1>
            <p className="mt-3 text-xl sm:text-2xl md:text-3xl font-light text-gradient-gold tracking-tight drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]">
              Open the sound.
            </p>
          </div>

          {/* Bottom Supporting Copy & Scroll Indicator */}
          <div className="flex flex-col items-center mb-6">
            <p className="text-sm md:text-base text-white/75 max-w-md font-light tracking-wide leading-relaxed drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
              Premium wireless audio, engineered for every moment.
            </p>
            <div className="mt-6 flex flex-col items-center space-y-2 opacity-80 animate-bounce">
              <span className="text-[11px] uppercase tracking-widest font-mono text-white/50 drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
                Scroll to explore
              </span>
              <ChevronDown className="w-4 h-4 text-[#FFC915]" />
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* STORY CHAPTER 2: THE REVEAL (20% - 38%)                      */}
        {/* Completely transparent text framing the product             */}
        {/* ============================================================ */}
        <div
          id="design-reveal"
          className="absolute inset-0 z-30 flex flex-col justify-center items-start px-8 md:px-20 lg:px-28 pointer-events-none transition-opacity duration-300 max-w-7xl mx-auto"
          style={{
            opacity: stage2Opacity,
            visibility: stage2Opacity > 0.01 ? "visible" : "hidden",
          }}
        >
          <div className="max-w-md text-left p-0 pointer-events-none">
            <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#FFC915] mb-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Precision Mechanical Craft</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
              Designed to reveal more.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-white/80 font-light leading-relaxed drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)]">
              Every detail, refined for a seamless listening experience. A magnetic tension hinge
              crafted from aerospace-grade alloy opens with effortless tactile precision.
            </p>

            {/* Clean minimal floating spec badges without background cards */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4 text-xs font-mono text-white/75 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#00E599] shadow-[0_0_6px_#00E599]" />
                <span className="text-white font-medium">Smart Optical Presence Sensor</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#FFC915] shadow-[0_0_6px_#FFC915]" />
                <span className="text-white font-medium">Satin Matte Metallic Finish</span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* STORY CHAPTER 3: ELEVATED SOUND (40% - 62%)                  */}
        {/* Clean right-aligned typography floating over space           */}
        {/* ============================================================ */}
        <div
          id="sound"
          className="absolute inset-0 z-30 flex flex-col justify-center items-end px-8 md:px-20 lg:px-28 pointer-events-none transition-opacity duration-300 max-w-7xl mx-auto"
          style={{
            opacity: stage3Opacity,
            visibility: stage3Opacity > 0.01 ? "visible" : "hidden",
          }}
        >
          <div className="max-w-md text-left md:text-right p-0 pointer-events-none">
            <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#FFC915] mb-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
              <Volume2 className="w-3.5 h-3.5" />
              <span>Acoustic Elevation</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
              Sound, elevated.
            </h2>

            <div className="mt-6 space-y-4">
              <div className="border-l-2 md:border-l-0 md:border-r-2 border-[#FFC915] pl-4 md:pl-0 md:pr-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                <p className="text-white text-base sm:text-lg font-semibold">
                  Powerful audio with rich detail.
                </p>
                <p className="text-xs sm:text-sm text-white/70 mt-1 font-light">
                  12.4mm Titanized diaphragm moves air with uncompressed fidelity.
                </p>
              </div>

              <div className="border-l-2 md:border-l-0 md:border-r-2 border-white/30 pl-4 md:pl-0 md:pr-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                <p className="text-white text-base sm:text-lg font-semibold">
                  Deep bass. Clear vocals.
                </p>
                <p className="text-xs sm:text-sm text-white/70 mt-1 font-light">
                  LHDC 5.0 24-bit/96kHz high-resolution audio processing at up to 990kbps.
                </p>
              </div>

              <div className="border-l-2 md:border-l-0 md:border-r-2 border-white/30 pl-4 md:pl-0 md:pr-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                <p className="text-white text-base sm:text-lg font-semibold">
                  Immersive listening wherever you go.
                </p>
                <p className="text-xs sm:text-sm text-white/70 mt-1 font-light">
                  360° Spatial Audio Effect with dynamic head-movement simulation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* STORY CHAPTER 4: NOISE CANCELLATION & IMMERSION (65% - 80%)  */}
        {/* Floating text & spec metrics without background block       */}
        {/* ============================================================ */}
        <div
          id="noise-cancellation"
          className="absolute inset-0 z-30 flex flex-col justify-end md:justify-center items-center md:items-start px-8 md:px-20 lg:px-28 pb-16 md:pb-0 pointer-events-none transition-opacity duration-300 max-w-7xl mx-auto"
          style={{
            opacity: stage4Opacity,
            visibility: stage4Opacity > 0.01 ? "visible" : "hidden",
          }}
        >
          <div className="max-w-md text-left p-0 pointer-events-none">
            <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#00E599] mb-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>52dB Smart Active Noise Cancellation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
              Block out the world.
              <br />
              <span className="text-gradient-gold">Tune into yours.</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-white/80 font-light leading-relaxed drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
              Advanced noise cancellation helps reduce distractions and keeps your music at the
              center. Dual-core hybrid processing cancels intrusive decibels across a 4000Hz ultra-wideband.
            </p>

            <div className="mt-6 grid grid-cols-3 gap-6 pt-4 border-t border-white/[0.18] drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
              <div>
                <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">52dB</span>
                <p className="text-[11px] text-white/60 uppercase tracking-wide mt-0.5">Focus deeper</p>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">4000Hz</span>
                <p className="text-[11px] text-white/60 uppercase tracking-wide mt-0.5">Listen clearer</p>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-bold text-[#00E599] tracking-tight">6-Mic</span>
                <p className="text-[11px] text-white/60 uppercase tracking-wide mt-0.5">Stay immersed</p>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* STORY CHAPTER 5: FINAL HERO / CTA (82% - 100%)               */}
        {/* Glassy finish buttons and floating typography                */}
        {/* ============================================================ */}
        <div
          className="absolute inset-0 z-30 flex flex-col justify-between items-center text-center px-6 py-20 md:py-24 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: stage5Opacity,
            visibility: stage5Opacity > 0.01 ? "visible" : "hidden",
          }}
        >
          {/* Top Heading */}
          <div className="mt-6 md:mt-10 max-w-3xl">
            <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#FFC915] mb-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
              <Zap className="w-3.5 h-3.5" />
              <span>Flagship Sensation</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
              Open. Connect. Listen.
            </h2>
            <p className="mt-4 text-base sm:text-xl text-white/80 font-light max-w-xl mx-auto drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)]">
              realme Buds Air 7 — designed to move with your world.
            </p>
          </div>

          {/* Bottom CTAs with Glassy Finish & Quick Info */}
          <div className="mb-6 pointer-events-auto flex flex-col items-center space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={onOpenPreOrder}
                className="btn-glass-gold px-8 py-3.5 rounded-full text-sm font-semibold text-white flex items-center space-x-2 cursor-pointer"
              >
                <span className="drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">Explore Buds Air 7</span>
                <ArrowRight className="w-4 h-4 text-[#FFC915]" />
              </button>

              <a
                href="#specs"
                className="btn-glass px-7 py-3.5 rounded-full text-sm font-medium text-white cursor-pointer"
              >
                See full specs
              </a>
            </div>

            <div className="flex items-center space-x-6 text-xs text-white/60 font-mono tracking-wider pt-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              <span>40H TOTAL PLAYBACK</span>
              <span>•</span>
              <span>38MS GAMING LATENCY</span>
              <span>•</span>
              <span>IP55 RESISTANT</span>
            </div>
          </div>
        </div>

        {/* Scroll Progress Bar at the bottom of the viewport */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/[0.04] z-40">
          <div
            className="h-full bg-gradient-to-r from-[#FFC915] via-[#00E599] to-[#FFC915] transition-all duration-100 ease-out"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
