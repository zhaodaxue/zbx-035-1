/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1e3a5f",
          dark: "#152a44",
          light: "#2a4d7a",
        },
        accent: {
          danger: "#dc2626",
          success: "#16a34a",
        },
      },
      fontFamily: {
        sans: [
          '"Noto Sans SC"',
          '"Source Han Sans CN"',
          "system-ui",
          "sans-serif",
        ],
      },
      animation: {
        "fade-out": "fadeOut 0.3s ease-out forwards",
        "fade-in": "fadeIn 0.3s ease-out forwards",
        "slide-down": "slideDown 0.3s ease-out",
        "count-up": "countUp 0.8s ease-out",
      },
      keyframes: {
        fadeOut: {
          "0%": { opacity: "1", transform: "translateX(0)" },
          "100%": { opacity: "0", transform: "translateX(-20px)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { maxHeight: "0", opacity: "0" },
          "100%": { maxHeight: "2000px", opacity: "1" },
        },
        countUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
