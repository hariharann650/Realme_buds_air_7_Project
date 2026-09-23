"use client";

import React, { useState, useEffect, useRef } from "react";
import { Shield, VolumeX, Eye, Waves, Mic, CheckCircle } from "lucide-react";

export default function NoiseCancellationDemo() {
  const [ancMode, setAncMode] = useState<"anc" | "transparency" | "off">("anc");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | null>(null);

  // Inverted anti-noise visualizer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      const midY = h / 2;

      // Draw Grid Line
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, midY);
      ctx.lineTo(w, midY);
      ctx.stroke();

      // Ambient noise amplitude based on mode
      let noiseAmp = 35;
      let antiAmp = 35;
      let resultAmp = 2; // Flatline in ANC mode!

      if (ancMode === "transparency") {
        noiseAmp = 30;
        antiAmp = 0;
        resultAmp = 30;
      } else if (ancMode === "off") {
        noiseAmp = 25;
        antiAmp = 0;
        resultAmp = 22;
      }

      // Draw Ambient Noise Wave (Cyan / White)
      ctx.strokeStyle = "rgba(100, 200, 255, 0.4)";
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      for (let x = 0; x < w; x += 3) {
        const y = midY + Math.sin(x * 0.025 + t) * noiseAmp * Math.sin(x * 0.008);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // If ANC is active, draw inverted anti-noise wave (Amber / Gold)
      if (ancMode === "anc") {
        ctx.strokeStyle = "rgba(255, 201, 21, 0.5)";
        ctx.lineWidth = 2;
        ctx.setLineDash([2, 4]);
        ctx.beginPath();
        for (let x = 0; x < w; x += 3) {
          const y = midY - Math.sin(x * 0.025 + t) * antiAmp * Math.sin(x * 0.008);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Draw Resulting Ear Canal Wave (Green / Solid)
      ctx.strokeStyle = ancMode === "anc" ? "#00E599" : "#FFC915";
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let x = 0; x < w; x += 2) {
        let y = midY;
        if (ancMode === "anc") {
          // Near total cancellation: tiny gentle wave
          y = midY + Math.sin(x * 0.03 + t * 0.5) * resultAmp;
        } else {
          y = midY + Math.sin(x * 0.025 + t) * resultAmp * Math.sin(x * 0.008);
        }
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      t += 0.04;
      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [ancMode]);

  return (
    <section id="noise-cancellation-section" className="relative py-32 px-6 sm:px-8 bg-[#0B0F10] border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story & Switcher */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
              <Shield className="w-3.5 h-3.5 text-[#00E599]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#00E599]">
                52dB Hybrid Active Noise Cancellation
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Silence the noise.
              <br />
              <span className="text-gradient-gold">Hear what matters.</span>
            </h2>

            <p className="text-white/60 text-base sm:text-lg font-light leading-relaxed">
              Equipped with realme’s cutting-edge ultra-sensing dual-core DSP chip and high-SNR feedforward + feedback microphones. Real-time acoustic analysis generates inverted soundwaves at 40,000 times per second to obliterate ambient chaos.
            </p>

            {/* Interactive Mode Tabs */}
            <div className="pt-4">
              <p className="text-xs font-mono uppercase tracking-widest text-white/40 mb-3">
                Select Listening State:
              </p>
              <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                <button
                  onClick={() => setAncMode("anc")}
                  className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold flex flex-col items-center justify-center transition-all ${
                    ancMode === "anc"
                      ? "bg-[#00E599] text-black shadow-[0_0_25px_rgba(0,229,153,0.35)] scale-[1.02]"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  <VolumeX className="w-4 h-4 mb-1" />
                  <span>Ultra ANC 52dB</span>
                </button>

                <button
                  onClick={() => setAncMode("transparency")}
                  className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold flex flex-col items-center justify-center transition-all ${
                    ancMode === "transparency"
                      ? "bg-[#38BDF8] text-black shadow-[0_0_25px_rgba(56,189,248,0.35)] scale-[1.02]"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  <Eye className="w-4 h-4 mb-1" />
                  <span>Transparency</span>
                </button>

                <button
                  onClick={() => setAncMode("off")}
                  className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold flex flex-col items-center justify-center transition-all ${
                    ancMode === "off"
                      ? "bg-white text-black shadow-[0_0_25px_rgba(255,255,255,0.35)] scale-[1.02]"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  <Waves className="w-4 h-4 mb-1" />
                  <span>ANC Off</span>
                </button>
              </div>
            </div>

            {/* Feature Checkpoints */}
            <div className="pt-4 grid grid-cols-2 gap-4 text-xs font-mono text-white/70">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-[#00E599]" />
                <span>4000Hz Ultra-Wideband</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-[#00E599]" />
                <span>Smart Adaptive Scene AI</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-[#00E599]" />
                <span>6-Mic Deep AI Call Clarity</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-[#00E599]" />
                <span>Aerodynamic Anti-Wind Mesh</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Anti-Noise Phase Cancellation Visualizer */}
          <div className="lg:col-span-6">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/[0.08] relative overflow-hidden bg-[#0A0F11]/90">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Mic className="w-4 h-4 text-[#00E599]" />
                  <span className="text-xs font-mono uppercase tracking-widest text-white/80">
                    Phase-Cancellation Waveform
                  </span>
                </div>
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/60">
                  {ancMode === "anc"
                    ? "Noise Elimination: 99.6%"
                    : ancMode === "transparency"
                    ? "Ambient Pass-Through"
                    : "Standard Isolation"}
                </span>
              </div>

              {/* Waveform Canvas */}
              <div className="relative w-full h-48 bg-[#06090A] rounded-2xl border border-white/[0.04] overflow-hidden flex items-center justify-center p-2">
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={180}
                  className="w-full h-full"
                />

                {/* Status Overlay Badge */}
                <div className="absolute top-3 left-4 text-[10px] font-mono text-white/40 flex flex-col space-y-1">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2 h-0.5 bg-[rgba(100,200,255,0.7)] inline-block" />
                    <span>Ambient Noise</span>
                  </div>
                  {ancMode === "anc" && (
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2 h-0.5 bg-[rgba(255,201,21,0.7)] inline-block" />
                      <span>Inverse Anti-Wave</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2 h-1 bg-[#00E599] inline-block" />
                    <span className="text-white font-medium">Audible Result</span>
                  </div>
                </div>
              </div>

              {/* Real-world Scenarios */}
              <div className="mt-6 pt-5 border-t border-white/[0.06] grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <p className="text-lg font-bold text-white">-52dB</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mt-0.5">Airplane Cabin</p>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <p className="text-lg font-bold text-white">-45dB</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mt-0.5">Subway Train</p>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <p className="text-lg font-bold text-[#00E599]">-38dB</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mt-0.5">Street Chatter</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
