/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
      },
    },
    fontFamily: {
      custom: ["vazir"],
      faNUm: ["FaNum"],
    },
  },
  plugins: [],
};
