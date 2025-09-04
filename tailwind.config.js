/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // páginas do app
    "./components/**/*.{js,ts,jsx,tsx}", // todos os componentes
    "./src/**/*.{js,ts,jsx,tsx}", // caso você use src
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: "#3852E7",
          dark: "#132B95",
          light: "#DAF0FF",
          lightest: "#FBFDFF",
        },
        green: {
          DEFAULT: "#38e977",
          dark: "#144827",
          mid: "#38e9768f",
        },
        gray: {
          DEFAULT: "#838383",
          darkest: "2c2c2c",
          dark: "#4c4c4c",
          light: "#c7c7c7",
          lightest: "#e5e5e5",
          w: "#f0f0f0",
        },
        black: "#0f1417",
        white: "#fdfdfdff",

        yellow: "#fdb94b",
        red: "#ff4d4f",
        boxShadow: {
          "md-gray-light": "#c7c7c7",
        },
      },
    },
  },
  plugins: [],
};
