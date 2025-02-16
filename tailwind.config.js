/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      screens: {
        // MAX
        "2lg": { max: "2000px" },
        lg: { max: "1024px" },
        lgSM: { max: "860px" },
        md: { max: "767px" },
        sm: { max: "480px" },
        // MIN
        lgMin: { min: "1025px" },
        mdMin: { min: "767px" },
      },
      colors: {
        primary: "#fb6d3a",
        main: "#bfa25d",
        secondary: "#000",
      },
    },
    container: {
      center: true,
      screens: {
        sm: { min: "640px" },
        md: { min: "768px" },
        lg: { min: "1024px" },
        xl: { min: "1280px" },
        "2xl": { min: "1536px" },
      },
      padding: {
        DEFAULT: "1rem",
        sm: "1rem",
        lg: "2rem",
        xl: "4rem",
        "2xl": "5rem",
      },
    },
  },
  plugins: [],
};
