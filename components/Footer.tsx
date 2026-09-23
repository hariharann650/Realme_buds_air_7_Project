"use client";

import React from "react";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#060809] text-white/50 text-xs border-t border-white/[0.06] pt-16 pb-12 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Footnotes / Disclaimers (Apple-style fine print) */}
        <div className="space-y-3 pb-12 border-b border-white/[0.08] text-[11px] leading-relaxed font-light text-white/40">
          <p>
            1. 52dB is the maximum theoretical depth of active noise reduction verified in the realme Acoustic Laboratory. Testing conducted under standard artificial head simulator conditions across high-frequency human voice and low-frequency engine rumbling. Actual noise cancellation performance may vary based on ear tip fit, ear canal anatomy, and wearing angle.
          </p>
          <p>
            2. LHDC 5.0 High-Definition transmission requires a compatible smartphone operating system running Android 12 or above with LHDC support enabled in developer audio settings.
          </p>
          <p>
            3. 40 hours total battery life and 10 hours single-use battery life data is calculated based on 50% volume, AAC audio playback, and Active Noise Cancellation disabled. Actual duration depends on volume level, network interference, and ambient temperature.
          </p>
          <p>
            4. 38ms ultra-low latency requires Game Mode activated via the realme Link app on compatible devices.
          </p>
          <p>
            5. IP55 water resistance applies exclusively to the earbuds and does not cover the charging case. Please ensure earbuds are completely dry before placing them back into the case.
          </p>
        </div>

        {/* Brand & Links Grid */}
        <div className="py-10 grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 space-y-3">
            <div className="flex items-center space-x-2 text-white">
              <span className="font-bold text-lg tracking-tight">realme</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFC915]" />
              <span className="text-white/40 text-sm">Audio Division</span>
            </div>
            <p className="text-xs text-white/50 max-w-sm font-light leading-relaxed">
              Dare to Leap. Pioneering next-generation acoustic hardware, cinematic industrial design, and intelligent everyday audio technology.
            </p>
          </div>

          <div>
            <h5 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">
              Explore
            </h5>
            <ul className="space-y-2 text-xs">
              <li><a href="#hero" className="hover:text-white transition-colors">Buds Air 7</a></li>
              <li><a href="#sound-tech" className="hover:text-white transition-colors">12.4mm Titanized Driver</a></li>
              <li><a href="#noise-cancellation-section" className="hover:text-white transition-colors">52dB Hybrid ANC</a></li>
              <li><a href="#battery" className="hover:text-white transition-colors">Dart Charge</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">
              Support
            </h5>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-white transition-colors">User Manual & Guides</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Warranty & Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">realme Link App</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Firmware Updates</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">
              Connect
            </h5>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-white transition-colors">realme Global Community</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-colors">X / Twitter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">YouTube</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright Bar & Back to top */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/40">
            Copyright &copy; 2026 realme Inc. All rights reserved. Designed for flagship audiophiles.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-xs text-white/60 hover:text-white transition-colors group cursor-pointer"
          >
            <span>Back to top</span>
            <div className="w-7 h-7 rounded-full bg-white/[0.06] group-hover:bg-white/[0.12] flex items-center justify-center transition-colors">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
