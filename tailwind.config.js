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
      },
    },
  },
  plugins: [],
};
