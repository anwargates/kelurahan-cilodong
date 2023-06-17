/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2B6777",
        secondary: "#F5F5F5",
        third: "#C8D8E4",
        // white: '#ffffff',
        // black: '#000000',
        grey: "#E0DADA",
        greySecondary: "#979797",
        greyDot: "#D9D9D9",
        greyCategory: "#525252",
        blue: "#149BFC",
        blueSecondary: "#68B0D1",
        blueBackground: "#E3F3FB",
        blueDark: "#0D4763",
      },
      backgroundImage: {
        banner: 'url("/src/assets/home/banner.png")',
      },
      fontFamily: {
        sans: ["Verdana", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
