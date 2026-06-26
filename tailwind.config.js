/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // páginas do app
    "./components/**/*.{js,ts,jsx,tsx}", // todos os componentes
    "./src/**/*.{js,ts,jsx,tsx}", // caso você use src
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1320px",
      },
    },
    extend: {
      colors: {
        blue: {
          DEFAULT: "#3852E7",
          100: "#EDF0FF",
          300: "#B1BAF5",
          500: "#3852E7",
          700: "#25379C",
          800: "#132B95",
          900: "#121A4A",
          dark: "#132B95",
          darkest: "121A4A",
          light: "#B1BAF5",
          lightest: "#FBFDFF",
        },
        green: {
          DEFAULT: "#38E977",
          100: "#EBFDF1",
          300: "#9CF4BB",
          500: "#38E977",
          700: "#2DBA5F",
          900: "#165D30",
          dark: "#165D30",
        },
        gray: {
          DEFAULT: "#6C7A85",
          0: "#FFFFFF",
          100: "#F1F3F4",
          300: "#D1D7DB",
          500: "#6C7A85",
          700: "#3A464E",
          900: "#0F1417",
          dark: "#0F1417",
          darkest: "#0F1417",
          light: "#F1F3F4",
          lightest: "#FFFFFF",
          w: "#f0f0f0",
        },
        black: "#0f1417",
        white: "#fdfdfdff",
        yellow: {
          DEFAULT: "#FACC15",
          100: "#FEF9C3",
          500: "#FACC15",
          700: "#CA8A04",
        },
        red: {
          DEFAULT: "#EF4444",
          100: "#FEE2E2",
          500: "#EF4444",
          700: "#7F1D1D",
        },

        boxShadow: {
          "md-gray-light": "#c7c7c7",
        },
      },
    },
  },
  plugins: [],
};
