/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#0B0F10",
          deep: "#06090A",
          surface: "#12181A",
          card: "rgba(22, 28, 32, 0.6)",
          border: "rgba(255, 255, 255, 0.08)",
          textMuted: "rgba(255, 255, 255, 0.55)",
          textHeading: "rgba(255, 255, 255, 0.94)",
        },
        realme: {
          yellow: "#FFC915",
          gold: "#F5A623",
          green: "#00E599",
          slate: "#717B84",
          titan: "#8E9AA4",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Inter"',
          "system-ui",
          "sans-serif",
        ],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        wide: "0.04em",
        widest: "0.12em",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-gentle": "float 6s ease-in-out infinite",
        "glow": "glow 3s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        glow: {
          "0%": { opacity: "0.4" },
          "100%": { opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
};
