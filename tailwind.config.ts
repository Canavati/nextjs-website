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
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "scroll-progress": "progress 1s ease-in-out infinite",
        "slide-up": "slideUp 1s ease forwards",
        rotate: "rotate 30s linear infinite",
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'cosmic-shift': 'cosmicShift 20s ease infinite',
        'network-flow': 'networkFlow 15s linear infinite',
        'particle-wave': 'particleWave 8s ease-in-out infinite'
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
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        cosmicShift: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '33%': { transform: 'rotate(120deg) scale(1.2)' },
          '66%': { transform: 'rotate(240deg) scale(0.8)' },
          '100%': { transform: 'rotate(360deg) scale(1)' }
        },
        networkFlow: {
          '0%': { 
            'background-position': '0% 50%',
            'transform': 'perspective(500px) rotateX(10deg)'
          },
          '50%': { 
            'background-position': '100% 50%',
            'transform': 'perspective(500px) rotateX(-10deg)'
          },
          '100%': { 
            'background-position': '0% 50%',
            'transform': 'perspective(500px) rotateX(10deg)'
          }
        },
        particleWave: {
          '0%, 100%': { 
            'transform': 'translateY(0) scale(1)',
            'opacity': '0.3'
          },
          '50%': { 
            'transform': 'translateY(-20px) scale(1.2)',
            'opacity': '0.8'
          }
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} satisfies Config;

export default config;
