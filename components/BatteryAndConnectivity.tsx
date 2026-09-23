"use client";

import React, { useState } from "react";
import { BatteryCharging, Zap, Gamepad2, Bluetooth, Droplets, Smartphone } from "lucide-react";

export default function BatteryAndConnectivity() {
  const [chargeMinutes, setChargeMinutes] = useState(10);

  // 10 minutes = 7 hours playback (approx 0.7 hrs per min of charge)
  const playbackHours = ((chargeMinutes / 10) * 7).toFixed(1);

  return (
    <section id="battery" className="relative py-32 px-6 sm:px-8 bg-[#0B0F10] border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md mb-4">
            <Zap className="w-3.5 h-3.5 text-[#FFC915]" />
            <span className="text-xs font-mono uppercase tracking-widest text-white/70">
              Power & Performance
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
            Unstoppable Endurance.
            <br />
            <span className="text-gradient-gold">Instant Power.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/60 font-light leading-relaxed">
            Engineered with high-energy density cells and smart power-saving algorithms to keep your music alive for days on end.
          </p>
        </div>

        {/* Big Highlight: 40 Hours and Dart Charge */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* 40 Hours Total Card */}
          <div className="lg:col-span-7 glass-panel p-8 sm:p-12 rounded-3xl border border-white/[0.08] relative overflow-hidden flex flex-col justify-between group">
            <div className="relative z-10">
              <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#FFC915] mb-4">
                <BatteryCharging className="w-4 h-4" />
                <span>Extended Battery Architecture</span>
              </div>
              <div className="flex items-baseline space-x-3 mb-4">
                <span className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-white">
                  40
                </span>
                <span className="text-2xl sm:text-3xl font-bold text-gradient-gold">Hours</span>
              </div>
              <p className="text-white/70 text-base sm:text-lg max-w-md font-light leading-relaxed">
                Up to 10 hours of non-stop playback on a single bud charge, and a full 40 hours backed by the aerospace-finish charging case.
              </p>
            </div>

            {/* Breakdown Mini-Bars */}
            <div className="mt-10 pt-6 border-t border-white/[0.08] grid grid-cols-2 gap-4 relative z-10">
              <div>
                <span className="text-2xl font-bold text-white">10 Hours</span>
                <p className="text-xs text-white/50 uppercase tracking-wider mt-1">Single Charge (Buds)</p>
              </div>
              <div>
                <span className="text-2xl font-bold text-[#00E599]">40 Hours</span>
                <p className="text-xs text-white/50 uppercase tracking-wider mt-1">With Charging Case</p>
              </div>
            </div>

            {/* Subtle background battery glow */}
            <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-[#FFC915]/10 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* Interactive Dart Charge Slider Card */}
          <div className="lg:col-span-5 glass-panel p-8 sm:p-10 rounded-3xl border border-white/[0.08] flex flex-col justify-between bg-[#0D1214]/80">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#00E599] mb-4">
                <Zap className="w-4 h-4" />
                <span>realme Dart Fast Charge</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                10 mins charge = 7 hours music.
              </h3>
              <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed mb-8">
                In a rush? Plug in via USB-C for just 10 minutes while sipping morning espresso and get enough power for a full day of listening.
              </p>

              {/* Interactive Slider */}
              <div className="space-y-4 bg-white/[0.03] p-5 rounded-2xl border border-white/[0.06]">
                <div className="flex justify-between text-xs font-mono text-white/70">
                  <span>Charge Duration:</span>
                  <span className="text-[#00E599] font-bold text-sm">{chargeMinutes} Minutes</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="5"
                  value={chargeMinutes}
                  onChange={(e) => setChargeMinutes(Number(e.target.value))}
                  className="w-full h-2 bg-white/[0.1] rounded-lg appearance-none cursor-pointer accent-[#00E599]"
                />
                <div className="flex justify-between text-[11px] font-mono text-white/40">
                  <span>5 min</span>
                  <span>15 min</span>
                  <span>30 min</span>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-white/[0.06]">
                  <span className="text-xs text-white/60">Estimated Playback:</span>
                  <span className="text-lg font-bold text-white">~{playbackHours} Hours</span>
                </div>
              </div>
            </div>

            <div className="mt-6 text-[11px] font-mono text-white/40 flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E599]" />
              <span>Type-C Universal Rapid Protocol</span>
            </div>
          </div>
        </div>

        {/* 3 Smaller Feature Columns: Gaming, Bluetooth 5.4, IP55 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: 38ms Gaming Latency */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/[0.08] hover:border-white/20 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-[#FFC915]/10 border border-[#FFC915]/20 flex items-center justify-center mb-5 text-[#FFC915]">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#FFC915]">
              Dual-Channel Transmission
            </span>
            <h4 className="text-xl font-bold text-white mt-1 mb-2">
              38ms Ultra-Low Latency
            </h4>
            <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">
              Step into Game Mode with lightning synchronization. Gunshots, footsteps, and team communication sync with zero perceptible delay.
            </p>
          </div>

          {/* Card 2: Bluetooth 5.4 & Dual Connect */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/[0.08] hover:border-white/20 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-[#38BDF8]/10 border border-[#38BDF8]/20 flex items-center justify-center mb-5 text-[#38BDF8]">
              <Bluetooth className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#38BDF8]">
              Seamless Ecosystem
            </span>
            <h4 className="text-xl font-bold text-white mt-1 mb-2">
              Bluetooth 5.4 + Dual Connection
            </h4>
            <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">
              Pairs instantly with Google Fast Pair. Connect simultaneously to your phone and laptop; audio switches effortlessly when a call arrives.
            </p>
          </div>

          {/* Card 3: IP55 Rating */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/[0.08] hover:border-white/20 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-[#00E599]/10 border border-[#00E599]/20 flex items-center justify-center mb-5 text-[#00E599]">
              <Droplets className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#00E599]">
              All-Weather Durability
            </span>
            <h4 className="text-xl font-bold text-white mt-1 mb-2">
              IP55 Dust & Water Resistant
            </h4>
            <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">
              Nano-coated mesh vents and precision sealing protect against intense workouts, sweat, and sudden rainstorms.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
