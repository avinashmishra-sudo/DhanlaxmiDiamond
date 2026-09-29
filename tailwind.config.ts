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
          obsidian: "#08090B",
          card: "#121318",
          cardHover: "#181A22",
          charcoal: "#1A1B20",
          slate: "#333333",
          muted: "#8A8D98",
          subtle: "#B0B3BE",
          platinum: "#EDEDED",
          border: "#26262B",
          borderGold: "rgba(245, 158, 11, 0.25)",
          surface: "#101116",
          gold: {
            DEFAULT: "#F59E0B",
            bright: "#FDE68A",
            warm: "#F59E0B",
            amber: "#D97706",
            dark: "#B45309",
            subtle: "rgba(245, 158, 11, 0.15)",
          },
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.25em",
        editorial: "0.3em",
      },
    },
  },
  plugins: [],
};
export default config;
