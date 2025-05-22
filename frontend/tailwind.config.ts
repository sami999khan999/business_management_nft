import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        background: "var(--background)",
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        mutated: "var(--mutated)",
        sour_gummy: "var(--font-family-geist-mono)",
        card: "var(--card)",
        border_color: "var(--border)",
        underline: "var(--underline)",
      },
      fontFamily: {
        sour_gummy: "var(--sour-gummy)",
        baloo: "var(--baloo)",
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
      },
      screens: {
        "720p": "1366px", // Custom media query for 720p resolution
        "1080p": "1920px", // Custom media query for 1080p resolution
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};

export default config;
