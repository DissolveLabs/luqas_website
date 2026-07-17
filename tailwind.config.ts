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
        background: "#FFFFFF",
        foreground: "#222222",
        primary: "#4E54C8",
        accent: "#D4A95F",
        light: "#F6F6FE",
        dark: "#181A4E",
        gray: {
          light: "#E7E7F9",
          DEFAULT: "#696969"
        }
      },
      fontFamily: {
        adlam: ["var(--font-adlam)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        '4xl': '30px',
      }
    },
  },
  plugins: [],
};
export default config;
