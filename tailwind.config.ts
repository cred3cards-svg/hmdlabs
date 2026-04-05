import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef7ff",
          100: "#d9eeff",
          200: "#bbdffe",
          300: "#8dcafd",
          400: "#58adfa",
          500: "#338ef7",
          600: "#1a6feb",
          700: "#1259d8",
          800: "#1548af",
          900: "#173e89",
          950: "#122754",
        },
        accent: {
          50: "#fff8ed",
          100: "#ffefd3",
          200: "#ffdba6",
          300: "#ffc16d",
          400: "#ff9d32",
          500: "#ff7f0a",
          600: "#f06205",
          700: "#c74807",
          800: "#9e390e",
          900: "#7f310f",
          950: "#451605",
        },
        trust: {
          green: "#16a34a",
          "green-light": "#dcfce7",
          gold: "#d97706",
          "gold-light": "#fef3c7",
        },
        wb: {
          // West Bengal theme colours
          primary: "#1a4d8c",
          secondary: "#e8f4f8",
          accent: "#f59e0b",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-sora)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      boxShadow: {
        card: "0 2px 8px -1px rgba(0,0,0,.08), 0 1px 3px -1px rgba(0,0,0,.05)",
        "card-hover":
          "0 8px 24px -4px rgba(0,0,0,.12), 0 4px 8px -2px rgba(0,0,0,.07)",
        glow: "0 0 20px rgba(51,142,247,.35)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          from: { opacity: "0", transform: "translateX(-12px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        pulse_slow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: ".6" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-in": "fade-in .4s ease both",
        "slide-in": "slide-in .35s ease both",
        "pulse-slow": "pulse_slow 2.4s ease infinite",
        ticker: "ticker 28s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
