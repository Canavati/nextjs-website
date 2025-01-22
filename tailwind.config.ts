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
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: {
          DEFAULT: 'rgb(41, 44, 246)',
          light: 'rgba(41, 44, 246, 0.1)',
        },
        dark: "var(--dark)",
        gray: "var(--gray)",
        "light-gray": "var(--light-gray)",
      },
      height: {
        "top-bar": "35px",
        header: "80px",
        "total-nav": "calc(35px + 80px)",
      },
      padding: {
        "top-nav": "calc(35px + 80px)",
      },
      transitionDuration: {
        normal: "var(--transition-normal)",
      },
      backgroundImage: {
        "gradient-primary": "var(--gradient-primary)",
        "gradient-hover": "var(--gradient-hover)",
        "gradient-cta": "var(--gradient-cta)",
      },
      animation: {
        "scroll-progress": "progress 1s ease-in-out infinite",
        "slide-up": "slideUp 1s ease forwards",
        rotate: "rotate 30s linear infinite",
      },
      keyframes: {
        progress: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
