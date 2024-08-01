/** @type {import('tailwindcss').Config} */
export default {
  content: ["../index.html", "./src/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      translate: {
        "30rem": "480px",
        "35rem": "560px",
      },
    },
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
    },
  },
  plugins: [],
};
