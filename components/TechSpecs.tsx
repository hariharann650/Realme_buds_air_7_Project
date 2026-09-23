"use client";

import React, { useState } from "react";
import { SlidersHorizontal, Check, Info } from "lucide-react";

interface TechSpecsProps {
  onOpenPreOrder?: () => void;
}

export default function TechSpecs({ onOpenPreOrder }: TechSpecsProps) {
  const [selectedColor, setSelectedColor] = useState<"titan" | "obsidian" | "ivory">("titan");

  const colors = [
    {
      id: "titan",
      name: "Titan Grey",
      desc: "Aerospace satin metallic finish with dark slate accents",
      hex: "#717B84",
      bgClass: "bg-[#717B84]",
    },
    {
      id: "obsidian",
      name: "Obsidian Black",
      desc: "Stealth matte carbon with subtle gloss highlights",
      hex: "#1E2225",
      bgClass: "bg-[#1E2225]",
    },
    {
      id: "ivory",
      name: "Ivory White",
      desc: "Lustrous ceramic pearl with silver accent stems",
      hex: "#E5E7EB",
      bgClass: "bg-[#E5E7EB]",
    },
  ];

  const specsList = [
    {
      category: "Acoustic Architecture",
      items: [
        { label: "Driver Size", value: "12.4mm Titanized Diaphragm" },
        { label: "Diaphragm Material", value: "Aero-Grade Titanium Coating + Flexible PEEK" },
        { label: "Frequency Range", value: "20Hz – 40,000Hz (Hi-Res Certified)" },
        { label: "Audio Codecs", value: "LHDC 5.0 / AAC / SBC" },
        { label: "Audio Resolution", value: "Up to 24-bit / 96kHz at 990 kbps" },
      ],
    },
    {
      category: "Active Noise Cancellation",
      items: [
        { label: "Max Noise Reduction", value: "52dB Smart Active Noise Cancellation" },
        { label: "ANC Bandwidth", value: "4000Hz Ultra-Wideband Depth" },
        { label: "Microphone Array", value: "6-Mic System (3 per earbud) + AI DNN" },
        { label: "Ambient Modes", value: "Ultra ANC / Mild ANC / Transparency / Off" },
        { label: "Wind Resistance", value: "Fluid mechanics anti-wind noise mesh" },
      ],
    },
    {
      category: "Battery & Dart Charge",
      items: [
        { label: "Total Playback (ANC Off)", value: "Up to 40 Hours" },
        { label: "Total Playback (ANC On)", value: "Up to 30 Hours" },
        { label: "Single Bud Playback", value: "10 Hours (50% volume, AAC)" },
        { label: "Fast Charging Speed", value: "10 mins charge = 7 hours playback" },
        { label: "Battery Capacity", value: "Buds: 43mAh | Case: 460mAh" },
      ],
    },
    {
      category: "Connectivity & Sensor",
      items: [
        { label: "Bluetooth Version", value: "Bluetooth 5.4 (Low Energy)" },
        { label: "Gaming Latency", value: "38ms Ultra-Low Dual Channel" },
        { label: "Transmission Range", value: "Up to 10 meters (33 ft)" },
        { label: "Pairing Tech", value: "Google Fast Pair + realme Link App" },
        { label: "Dual Connection", value: "Seamless 2-Device Automatic Handover" },
      ],
    },
    {
      category: "Design & Build",
      items: [
        { label: "Earbud Weight", value: "4.1g per earbud (Featherlight)" },
        { label: "Charging Case Weight", value: "38.5g" },
        { label: "Water Resistance", value: "IP55 Dust & Water Resistant (Earbuds)" },
        { label: "Touch Controls", value: "Capacitive smart tap + long press gestures" },
      ],
    },
  ];

  return (
    <section id="specs" className="relative py-32 px-6 sm:px-8 bg-[#0B0F10] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md mb-4">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#FFC915]" />
            <span className="text-xs font-mono uppercase tracking-widest text-white/70">
              Technical Specifications
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
            Precision in every millimeter.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/60 font-light leading-relaxed">
            Engineered to exceed every standard of modern wireless acoustics.
          </p>
        </div>

        {/* Finish / Colorway Selector */}
        <div className="glass-panel p-8 rounded-3xl mb-16 border border-white/[0.08] bg-[#0E1315]/70">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#FFC915]">
                Sculpted Aesthetics
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">Available Finishes</h3>
              <p className="text-xs sm:text-sm text-white/50 mt-1">
                Triple-coat UV nano-plating resists fingerprints and retains its deep luster.
              </p>
            </div>

            {/* Color Swatches */}
            <div className="flex items-center space-x-4">
              {colors.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedColor(c.id as any)}
                  className={`group flex items-center space-x-3 px-4 py-2.5 rounded-2xl border transition-all ${
                    selectedColor === c.id
                      ? "bg-white/[0.08] border-[#FFC915] shadow-[0_0_20px_rgba(255,201,21,0.2)]"
                      : "bg-white/[0.02] border-white/[0.08] hover:border-white/20"
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full border border-white/20 flex items-center justify-center ${c.bgClass}`}
                  >
                    {selectedColor === c.id && (
                      <Check
                        className={`w-3.5 h-3.5 ${
                          c.id === "ivory" ? "text-black" : "text-white"
                        }`}
                      />
                    )}
                  </span>
                  <div className="text-left">
                    <span className="text-xs font-medium text-white block">{c.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Specifications Accordion / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {specsList.map((group, idx) => (
            <div
              key={idx}
              className="glass-panel p-7 rounded-3xl border border-white/[0.08] flex flex-col justify-between hover:border-white/[0.18] transition-colors"
            >
              <div>
                <h4 className="text-lg font-bold text-white mb-5 pb-3 border-b border-white/[0.08] flex items-center justify-between">
                  <span>{group.category}</span>
                  <span className="text-[11px] font-mono text-[#FFC915]">0{idx + 1}</span>
                </h4>
                <dl className="space-y-4">
                  {group.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex flex-col text-xs">
                      <dt className="text-white/50 font-mono tracking-wider uppercase mb-1">
                        {item.label}
                      </dt>
                      <dd className="text-white font-medium text-sm leading-snug">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          ))}

          {/* Special Box: Flagship Comparison */}
          <div className="glass-panel p-7 rounded-3xl border border-[#FFC915]/30 bg-gradient-to-br from-[#12181A] to-[#0D1214] flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-xs font-mono text-[#FFC915] mb-2 uppercase">
                <Info className="w-3.5 h-3.5" />
                <span>Generational Leap</span>
              </div>
              <h4 className="text-xl font-bold text-white mb-4">
                realme Buds Air 7 vs Air 6
              </h4>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-2 border-b border-white/[0.06]">
                  <span className="text-white/60">Noise Reduction</span>
                  <span className="text-[#00E599] font-bold">52dB (vs 50dB)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/[0.06]">
                  <span className="text-white/60">Audio Codec</span>
                  <span className="text-white font-bold">LHDC 5.0 (vs LHDC 4.0)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/[0.06]">
                  <span className="text-white/60">Total Battery</span>
                  <span className="text-white font-bold">40 Hours (vs 38h)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/[0.06]">
                  <span className="text-white/60">Low Latency</span>
                  <span className="text-white font-bold">38ms (vs 45ms)</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-white/60">Bluetooth</span>
                  <span className="text-white font-bold">v5.4 (vs v5.3)</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.08]">
              <button
                onClick={onOpenPreOrder}
                className="w-full py-3 rounded-full text-xs font-semibold bg-gradient-to-r from-[#FFC915] to-[#F5A623] text-black shadow-[0_0_20px_rgba(255,201,21,0.3)] hover:scale-[1.02] transition-transform"
              >
                Experience the Difference
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
