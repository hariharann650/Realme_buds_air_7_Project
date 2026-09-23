import type { Metadata } from "next";
import "./globals.css";

export const viewport = {
  themeColor: "#0B0F10",
};

export const metadata: Metadata = {
  title: "realme Buds Air 7 — Open the Sound | Flagship Wireless Audio",
  description:
    "Experience realme Buds Air 7 wireless earbuds. Cinematic scrollytelling reveal featuring 52dB Hybrid Active Noise Cancellation, 12.4mm Titanized Deep Bass driver, LHDC 5.0 High-Res Audio, and 40h battery life.",
  keywords: [
    "realme Buds Air 7",
    "realme earbuds",
    "wireless earbuds",
    "active noise cancellation",
    "52dB ANC",
    "Hi-Res Audio",
    "LHDC 5.0",
    "Titanized driver",
  ],
  openGraph: {
    title: "realme Buds Air 7 — Open the Sound",
    description: "Cinematic product reveal and high-end wireless audio experience.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#0B0F10] text-white selection:bg-[#FFC915]/30 selection:text-white antialiased">
        {children}
      </body>
    </html>
  );
}
