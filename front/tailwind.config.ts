import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        accent: "var(--accent-color)",
        baseC: "var(--base-color)",
        text: "var(--text-color)",
        sub: "var(--sub-color)",
        subPale: "var(--sub-color-hover)"
      },
    },
  },
  plugins: [],
} satisfies Config;
