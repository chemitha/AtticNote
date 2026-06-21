import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "Noto Color Emoji", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;