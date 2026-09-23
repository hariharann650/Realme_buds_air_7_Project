"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight, Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenPreOrder?: () => void;
}

export default function Navbar({ onOpenPreOrder }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Navbar fades in after scrolling past initial hero view
      if (scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Check current section
      const sections = ["overview", "design", "sound", "noise-cancellation", "battery", "specs"];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Overview", href: "#hero" },
    { label: "Design", href: "#design-reveal" },
    { label: "Sound", href: "#sound" },
    { label: "Noise Cancellation", href: "#noise-cancellation" },
    { label: "Battery", href: "#battery" },
    { label: "Specs", href: "#specs" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          scrolled
            ? "bg-transparent backdrop-blur-[6px] border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-14 md:h-16 flex items-center justify-between">
          {/* Left: realme logo & Product Name */}
          <a
            href="#hero"
            className="flex items-center space-x-2.5 group cursor-pointer"
          >
            {/* Minimal realme geometric logo icon with glassy text */}
            <div className="flex items-center space-x-1.5">
              <span className="text-white font-semibold text-lg tracking-tight font-sans drop-shadow-[0_2px_12px_rgba(255,255,255,0.3)]">
                realme
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFC915] inline-block mb-0.5 shadow-[0_0_8px_#FFC915]" />
            </div>
            <span className="hidden sm:inline-block text-xs font-medium px-2.5 py-0.5 rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/[0.15] text-white/90 group-hover:text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] transition-all">
              Buds Air 7
            </span>
          </a>

          {/* Center: Apple-style minimal navigation links with glassy text & hover */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-3.5 py-1.5 rounded-full text-[13px] font-normal tracking-wide text-white/75 hover:text-white hover:bg-white/[0.07] hover:border hover:border-white/[0.16] hover:backdrop-blur-xl transition-all duration-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right: CTA Button with Glassy Finish */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenPreOrder}
              className="btn-glass-gold px-4 py-2 rounded-full text-xs font-semibold text-white flex items-center space-x-1.5 group cursor-pointer"
            >
              <span className="drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">Explore Buds Air 7</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#FFC915] transition-transform group-hover:translate-x-0.5" />
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white/80 hover:text-white rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/[0.12] transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0B0F10]/95 backdrop-blur-3xl pt-20 px-8 flex flex-col md:hidden animate-in fade-in duration-300">
          <div className="flex flex-col space-y-5 mt-4">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-white/80 hover:text-white transition-colors py-2 border-b border-white/[0.06]"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="mt-8 pt-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenPreOrder) onOpenPreOrder();
              }}
              className="w-full py-3.5 rounded-full text-sm font-semibold bg-gradient-to-r from-[#FFC915] to-[#F5A623] text-black flex items-center justify-center space-x-2"
            >
              <span>Explore Buds Air 7</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
