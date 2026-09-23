"use client";

import React, { useState, useEffect, useRef } from "react";
import { Disc, Activity, Radio, Cpu, Sparkles, Play, Pause } from "lucide-react";

export default function AcousticEngineering() {
  const [eqMode, setEqMode] = useState<"bass" | "vocal" | "neutral">("bass");
  const [isPlaying, setIsPlaying] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | null>(null);

  // Simulated live audio spectrum analyzer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let phase = 0;
    const numBars = 48;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / numBars) - 2;

      for (let i = 0; i < numBars; i++) {
        let heightMultiplier = 1;
        const normalizedIdx = i / numBars;

        if (eqMode === "bass") {
          // Emphasize low frequencies (left side)
          heightMultiplier = normalizedIdx < 0.35 ? 1.8 : 0.6;
        } else if (eqMode === "vocal") {
          // Emphasize mid frequencies
          heightMultiplier = normalizedIdx >= 0.3 && normalizedIdx <= 0.7 ? 1.7 : 0.7;
        } else {
          // Neutral balance
          heightMultiplier = 1.0;
        }

        const wave = isPlaying
          ? Math.sin(phase + i * 0.25) * 0.5 + 0.5
          : 0.1;
        const dynamicH = (wave * 0.7 + 0.3) * (canvas.height * 0.75) * heightMultiplier;
        const clampedH = Math.min(canvas.height - 4, Math.max(4, dynamicH));

        const x = i * (barWidth + 2);
        const y = canvas.height - clampedH;

        // Gradient coloring based on frequency spectrum
        const grad = ctx.createLinearGradient(0, canvas.height, 0, 0);
        if (eqMode === "bass") {
          grad.addColorStop(0, "#FFC915");
          grad.addColorStop(1, "#F5A623");
        } else if (eqMode === "vocal") {
          grad.addColorStop(0, "#00E599");
          grad.addColorStop(1, "#38BDF8");
        } else {
          grad.addColorStop(0, "#94A3B8");
          grad.addColorStop(1, "#E2E8F0");
        }

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, clampedH, [2, 2, 0, 0]);
        ctx.fill();
      }

      if (isPlaying) {
        phase += 0.08;
      }
      animRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [eqMode, isPlaying]);

  return (
    <section id="sound-tech" className="relative py-32 px-6 sm:px-8 bg-[#0B0F10] border-t border-white/[0.06] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#FFC915]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md mb-4">
            <Radio className="w-3.5 h-3.5 text-[#FFC915]" />
            <span className="text-xs font-mono uppercase tracking-widest text-white/70">
              Acoustic Architecture
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
            Engineered for <span className="text-gradient-gold">Sonic Purity.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/60 font-light leading-relaxed">
            Every curve, magnet, and acoustic chamber has been calibrated to deliver studio-master quality right into your ear canal.
          </p>
        </div>

        {/* 3-Column Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {/* Card 1: 12.4mm Titanized Driver */}
          <div className="glass-panel p-8 rounded-3xl relative overflow-hidden group hover:border-[#FFC915]/40 transition-colors duration-500">
            <div className="w-12 h-12 rounded-2xl bg-[#FFC915]/10 border border-[#FFC915]/20 flex items-center justify-center mb-6 text-[#FFC915]">
              <Disc className="w-6 h-6 animate-spin-slow" />
            </div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#FFC915] mb-2">
              Largest in its Class
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              12.4mm Titanized Diaphragm
            </h3>
            <p className="text-white/60 text-sm leading-relaxed mb-6 font-light">
              Featuring a high-rigidity titanium coating over an ultra-flexible polymer surround. Yields 89% stiffer response for razor-sharp transients and visceral sub-bass without distortion.
            </p>
            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-white/50">
              <span>FREQUENCY</span>
              <span className="text-white font-medium">20Hz – 40,000Hz</span>
            </div>
          </div>

          {/* Card 2: LHDC 5.0 High-Res */}
          <div className="glass-panel p-8 rounded-3xl relative overflow-hidden group hover:border-[#00E599]/40 transition-colors duration-500">
            <div className="w-12 h-12 rounded-2xl bg-[#00E599]/10 border border-[#00E599]/20 flex items-center justify-center mb-6 text-[#00E599]">
              <Cpu className="w-6 h-6" />
            </div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#00E599] mb-2">
              Hi-Res Audio Certified
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              LHDC 5.0 Studio Transmission
            </h3>
            <p className="text-white/60 text-sm leading-relaxed mb-6 font-light">
              Transmit up to 3x more audio detail than standard SBC codecs. Operating at 24-bit/96kHz at a massive 990kbps bandwidth, hear every delicate breath and guitar pluck.
            </p>
            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-white/50">
              <span>BITRATE</span>
              <span className="text-[#00E599] font-medium">990 kbps / 24-bit</span>
            </div>
          </div>

          {/* Card 3: 360 Spatial Audio */}
          <div className="glass-panel p-8 rounded-3xl relative overflow-hidden group hover:border-[#38BDF8]/40 transition-colors duration-500">
            <div className="w-12 h-12 rounded-2xl bg-[#38BDF8]/10 border border-[#38BDF8]/20 flex items-center justify-center mb-6 text-[#38BDF8]">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#38BDF8] mb-2">
              Cinema Immersion
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              360° Spatial Audio Simulation
            </h3>
            <p className="text-white/60 text-sm leading-relaxed mb-6 font-light">
              Proprietary HRTF neural algorithm places instruments and dialogue in true three-dimensional acoustic space around your head, matching theatre soundscapes.
            </p>
            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-white/50">
              <span>SPATIAL ALGORITHM</span>
              <span className="text-[#38BDF8] font-medium">Binaural HRTF 3D</span>
            </div>
          </div>
        </div>

        {/* Interactive Sound EQ Simulator Bar */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/[0.08] bg-[#0E1315]/80">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#FFC915] mb-1">
                <Activity className="w-3.5 h-3.5" />
                <span>Interactive Tuning Simulator</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-white">
                realme Master EQ Sound Profiles
              </h4>
              <p className="text-xs sm:text-sm text-white/50 mt-1">
                Toggle sound signatures to preview real-time acoustic tuning response.
              </p>
            </div>

            {/* EQ Toggles */}
            <div className="flex items-center space-x-2 bg-white/[0.04] p-1.5 rounded-full border border-white/[0.08]">
              <button
                onClick={() => setEqMode("bass")}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  eqMode === "bass"
                    ? "bg-[#FFC915] text-black font-semibold shadow-[0_0_15px_rgba(255,201,21,0.4)]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                Deep Bass Boost
              </button>
              <button
                onClick={() => setEqMode("vocal")}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  eqMode === "vocal"
                    ? "bg-[#00E599] text-black font-semibold shadow-[0_0_15px_rgba(0,229,153,0.4)]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                Pure Vocals
              </button>
              <button
                onClick={() => setEqMode("neutral")}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  eqMode === "neutral"
                    ? "bg-white text-black font-semibold shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                Studio Neutral
              </button>
            </div>
          </div>

          {/* Live Canvas Spectrum */}
          <div className="relative w-full h-32 bg-[#080B0C] rounded-2xl overflow-hidden p-3 border border-white/[0.04] flex items-center justify-center">
            <canvas
              ref={canvasRef}
              width={800}
              height={120}
              className="w-full h-full"
            />
            {/* Play/Pause Simulator Control */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute right-4 bottom-4 p-2 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-white/80 hover:text-white backdrop-blur-md transition-colors"
              title={isPlaying ? "Pause Visualizer" : "Play Visualizer"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
