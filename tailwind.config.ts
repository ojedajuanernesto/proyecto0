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
        primary: {
          DEFAULT: "#1B3A6B",
          50: "#E8EDF5",
          100: "#D1DBEA",
          200: "#A3B7D5",
          300: "#7593C0",
          400: "#476FAB",
          500: "#1B3A6B",
          600: "#162E56",
          700: "#112341",
          800: "#0C172C",
          900: "#070C17",
        },
        secondary: {
          DEFAULT: "#D92027",
          50: "#FDE8E9",
          100: "#FBD1D3",
          200: "#F7A3A7",
          300: "#F3757B",
          400: "#EF474F",
          500: "#D92027",
          600: "#AE1A1F",
          700: "#821317",
          800: "#570C0F",
          900: "#2B0507",
        },
        accent: {
          DEFAULT: "#1B3A6B",
          light: "#2D5AA0",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
