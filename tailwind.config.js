/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans:  ["DM Sans", "sans-serif"],
      },
      colors: {
        gold:  "#C9A84C",
        ink:   "#1A160E",
        cream: "#FAF7F0",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)"    },
        },
        popIn: {
          "0%":   { opacity: "0", transform: "scale(0.5)" },
          "100%": { opacity: "1", transform: "scale(1)"   },
        },
        shimmer: {
          "0%":   { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        fadeUp:  "fadeUp 0.4s ease both",
        popIn:   "popIn 0.2s ease both",
        shimmer: "shimmer 1.5s infinite linear",
      },
    },
  },
  plugins: [],
};