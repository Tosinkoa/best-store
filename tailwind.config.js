/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        button: "0.280rem",
      },
      animation: {
        "breathing-object": "breathe 3s infinite",
        "quick-dance": "quick-dance 3s infinite",
      },

      keyframes: {
        breathe: {
          "0%, 10%, 20%, 100%": { transform: "scale(1)" },
          "5%, 15%": { transform: "scale(1.1)" },
        },
        "quick-dance": {
          "0%, 20%, 100%": { transform: "rotate(-15deg)" },
          "10%": { transform: "rotate(3deg)" },
        },
      },
      colors: {
        primary: colors.purple,
        secondary: colors.neutral,
        tetiary: colors.blue,
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    plugin(function ({ addUtilities }) {
      addUtilities({
        "*::-webkit-scrollbar": {
          width: "5px",
          "border-radius": "14px",
        },
        "*::-webkit-scrollbar-track": {
          background: "#f5f5f5",
          "border-radius": "5px",
        },
        "*::-webkit-scrollbar-thumb": {
          "background-color": "yellow",
          "border-radius": "14px",
          border: "3px solid #e4e8f5",
        },
        "*::-webkit-scrollbar-thumb:hover": {
          "background-color": "purple",
        },
        "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": {
          "-webkit-appearance": "none",
          margin: "0",
        },
      });
    }),
  ],
};
