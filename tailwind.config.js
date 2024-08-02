/** @type {import('tailwindcss').Config} */
export default {
  content: ["../index.html", "./src/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      translate: {
        "30rem": "480px",
        "35rem": "560px",
        "100%": "100%",
      },
      gridTemplateColumns: {
        "auto-fit-20rem": "repeat(auto-fit, minmax(20rem, auto))",
      },
      padding: {
        "56.25%": "56.25%",
      },
    },
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
    },
  },
  plugins: [],
};
