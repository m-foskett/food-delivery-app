/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      primary: '#C70039',
      secondary: '#FF5733',
      white: '#ffffff',
      grey: '#b3b3b3',
      offgrey: '#F3F3F4',
      green: '#00b300',
      offgreen: "#01A296",
    },
    extend: {},
  },
  plugins: [],
}
