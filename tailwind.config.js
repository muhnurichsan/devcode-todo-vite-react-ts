/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#16ABF8",
        danger: "#ED4C5C",
        secondary: "#F4F4F4",
      },
    },
  },
  plugins: [],
};
