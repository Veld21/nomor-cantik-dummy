import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mist: "#F5F7FA",
        surface: "#FFFFFF",
        ink: "#0E1526",
        sapphire: {
          50: "#EEF2FB",
          100: "#D6E0F5",
          300: "#7C93C9",
          500: "#2C4A85",
          600: "#203A6B",
          700: "#182C52",
          900: "#0E1930",
        },
        gold: {
          100: "#FBF0D9",
          300: "#E7C77C",
          500: "#C89B3C",
          600: "#A97F2B",
        },
        emerald: {
          100: "#DCF3E9",
          500: "#12805C",
          600: "#0E6849",
        },
        slate: {
          50: "#F4F5F7",
          200: "#E2E5EA",
          400: "#9AA2B1",
          500: "#6B7280",
          600: "#4B5261",
        },
      },
      fontFamily: {
        display: ["var(--font-sora)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "sapphire-gradient": "linear-gradient(135deg, #182C52 0%, #203A6B 55%, #2C4A85 100%)",
      },
      boxShadow: {
        card: "0 1px 2px rgba(14,21,38,0.04), 0 8px 24px -12px rgba(14,21,38,0.12)",
        "card-hover": "0 4px 8px rgba(14,21,38,0.06), 0 16px 32px -12px rgba(14,21,38,0.18)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
export default config;
