"use client";

import React, { useState } from "react";
import { X, Check, ShieldCheck, Truck, RotateCcw, Sparkles } from "lucide-react";

interface PreOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PreOrderModal({ isOpen, onClose }: PreOrderModalProps) {
  const [color, setColor] = useState("titan");
  const [engraving, setEngraving] = useState("");
  const [isOrdered, setIsOrdered] = useState(false);

  if (!isOpen) return null;

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrdered(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-[#0E1315] border border-white/[0.12] rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden z-10 p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white/70 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isOrdered ? (
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#FFC915] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Flagship Launch Edition</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Order realme Buds Air 7
            </h3>
            <p className="text-white/60 text-xs sm:text-sm mt-1">
              Includes charging case, 3 pairs of antibacterial ear tips, and Type-C braided cable.
            </p>

            {/* Price Banner */}
            <div className="mt-5 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-baseline justify-between">
              <div>
                <span className="text-xs text-white/50 block font-mono">INTRODUCTORY PRICE</span>
                <div className="flex items-baseline space-x-2 mt-0.5">
                  <span className="text-3xl font-extrabold text-white">$69.00</span>
                  <span className="text-sm text-white/40 line-through">$89.00</span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#00E599]/15 border border-[#00E599]/30 text-[#00E599] text-xs font-semibold">
                Save $20 Today
              </span>
            </div>

            {/* Finish Selection */}
            <div className="mt-6">
              <label className="text-xs font-mono text-white/70 uppercase tracking-wider block mb-3">
                1. Select Finish
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "titan", name: "Titan Grey", color: "bg-[#717B84]" },
                  { id: "obsidian", name: "Obsidian Black", color: "bg-[#1E2225]" },
                  { id: "ivory", name: "Ivory White", color: "bg-[#E5E7EB]" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setColor(item.id)}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center space-y-2 ${
                      color === item.id
                        ? "border-[#FFC915] bg-white/[0.08] shadow-[0_0_15px_rgba(255,201,21,0.2)]"
                        : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full ${item.color} border border-white/20`} />
                    <span className="text-xs text-white font-medium">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Free Custom Engraving */}
            <div className="mt-6">
              <label className="text-xs font-mono text-white/70 uppercase tracking-wider flex justify-between mb-2">
                <span>2. Personalized Laser Engraving</span>
                <span className="text-[#00E599]">FREE</span>
              </label>
              <input
                type="text"
                maxLength={12}
                placeholder="Enter initials or emoji (max 12 chars)"
                value={engraving}
                onChange={(e) => setEngraving(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#FFC915]"
              />
            </div>

            {/* Value Guarantees */}
            <div className="mt-6 pt-4 border-t border-white/[0.06] grid grid-cols-3 gap-2 text-center text-[10px] font-mono text-white/50">
              <div className="flex flex-col items-center space-y-1">
                <Truck className="w-3.5 h-3.5 text-white/70" />
                <span>Free Express Delivery</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <RotateCcw className="w-3.5 h-3.5 text-white/70" />
                <span>30-Day Risk-Free Trial</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00E599]" />
                <span>1-Year Official Warranty</span>
              </div>
            </div>

            {/* Action CTA */}
            <div className="mt-6">
              <button
                onClick={handleOrder}
                className="w-full py-3.5 rounded-full text-sm font-semibold bg-gradient-to-r from-[#FFC915] to-[#F5A623] text-black shadow-[0_0_30px_rgba(255,201,21,0.35)] hover:shadow-[0_0_40px_rgba(255,201,21,0.55)] hover:scale-[1.01] transition-all"
              >
                Confirm Order • $69.00
              </button>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#00E599]/15 border border-[#00E599]/30 flex items-center justify-center text-[#00E599] mb-5 animate-bounce">
              <Check className="w-8 h-8" />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#00E599] mb-1">
              Order Confirmed
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Welcome to the Future of Sound.
            </h3>
            <p className="text-white/60 text-sm max-w-sm mb-6 font-light">
              Your realme Buds Air 7 in{" "}
              <span className="text-white font-medium capitalize">{color} Grey</span> are being
              prepared for priority dispatch.
              {engraving && (
                <span className="block text-xs text-[#FFC915] mt-1 font-mono">
                  Custom Engraving: &ldquo;{engraving}&rdquo;
                </span>
              )}
            </p>
            <button
              onClick={() => {
                setIsOrdered(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-white text-xs font-semibold tracking-wide transition-colors"
            >
              Return to Experience
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
