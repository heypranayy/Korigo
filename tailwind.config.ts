import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },
    extend: {
      colors: {
        korigo: {
          green: "#528663", // Exact brand logo green
          forest: "#3a794a", // Darkest green from logo (max as dark as logo)
          deep: "#3a794a",
          darkGreen: "#3a794a",
          emerald: "#457453",
          mint: "#629774",
          brightGreen: "#528663",
          lightGreen: "#eef5f0",
          lightBg: "#f6faf7",
          glassGreen: "rgba(82, 134, 99, 0.12)",
          black: "#000000",
          price: "#010101",
          muted: "#78877c",
          border: "#d1e2d6",
          sale: "#fa0000",
          saleBadge: "#e33131",
          teal: "#457453",
          cyan: "#56cfe1",
          gold: "#f59e0b",
        },
      },
      fontFamily: {
        serif: ["var(--font-andada)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      maxWidth: {
        container: "1200px",
        wrapper: "1440px",
      },
      boxShadow: {
        "3d": "0 20px 40px -15px rgba(0, 0, 0, 0.12), 0 0 25px -5px rgba(20, 143, 44, 0.2)",
        "3d-float": "0 30px 60px -15px rgba(20, 143, 44, 0.35), 0 10px 20px -5px rgba(0, 0, 0, 0.15)",
        "glow-green": "0 0 30px rgba(20, 143, 44, 0.35)",
        "glow-lg": "0 0 50px rgba(20, 143, 44, 0.45)",
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "float-reverse": "floatReverse 7s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "marquee": "marquee 25s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(2deg)" },
        },
        floatReverse: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(14px) rotate(-2deg)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.05)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
