"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import ScrollytellingCanvas from "@/components/ScrollytellingCanvas";
import AcousticEngineering from "@/components/AcousticEngineering";
import NoiseCancellationDemo from "@/components/NoiseCancellationDemo";
import BatteryAndConnectivity from "@/components/BatteryAndConnectivity";
import TechSpecs from "@/components/TechSpecs";
import PreOrderModal from "@/components/PreOrderModal";
import Footer from "@/components/Footer";

export default function Home() {
  const [isPreOrderOpen, setIsPreOrderOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#0B0F10] text-white selection:bg-[#FFC915]/30">
      {/* Fixed Apple-style Glassmorphism Navbar */}
      <Navbar onOpenPreOrder={() => setIsPreOrderOpen(true)} />

      {/* 450vh Sticky Scrollytelling Canvas Experience */}
      <ScrollytellingCanvas onOpenPreOrder={() => setIsPreOrderOpen(true)} />

      {/* Acoustic Engineering & Titanized Driver Details */}
      <AcousticEngineering />

      {/* 52dB Hybrid Active Noise Cancellation Simulator */}
      <NoiseCancellationDemo />

      {/* 40-Hour Battery, Dart Charge & 38ms Gaming Showcase */}
      <BatteryAndConnectivity />

      {/* Technical Specifications Matrix & Colorway Selector */}
      <TechSpecs onOpenPreOrder={() => setIsPreOrderOpen(true)} />

      {/* Apple-grade Interactive Pre-Order Configuration Modal */}
      <PreOrderModal
        isOpen={isPreOrderOpen}
        onClose={() => setIsPreOrderOpen(false)}
      />

      {/* High-end Corporate Footer */}
      <Footer />
    </main>
  );
}
