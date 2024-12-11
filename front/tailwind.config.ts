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
        accent: "var(--accent-color)",
        baseC: "var(--base-color)",
        text: "var(--text-color)",
        textLight: "var(--text-light-color)",
        sub: "var(--sub-color)",
        subPale: "var(--sub-color-hover)",
        error: "var(--error-color)",
      },
      boxShadow: {
        'form': '0 0 10px rgba(0, 0, 0, 0.25)',
        'input': '4px 4px 4px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
} satisfies Config;
