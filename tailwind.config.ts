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
        muted: "rgba(0, 0, 0, 0.1)",
        primary: "#272937",
        main: "#1d1f29",
        accent: "#36384A",
        "accent-secondary": "#0A2737",
      },
      backgroundImage: {
        "accent-gradient":
          "linear-gradient(0deg, rgba(254, 137, 31, 1) 0%, rgba(254, 182, 35,1) 100%)",
      },
    },
    fontFamily: {
      display: "var(--heading-font)",
      sans: "var(--body-font)",
    },
  },
  plugins: [],
} satisfies Config;
