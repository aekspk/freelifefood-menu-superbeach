/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#000",
      },
      opacity: {
        0: "0",
      },
      fontFamily: {
        kanit: ["Kanit", "sans-serif"],
        sriracha: ["Sriracha", "cursive"],
      },
    },
  },
  plugins: [require("daisyui")],
};
