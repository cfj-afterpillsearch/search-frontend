/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        turquoise: {
          300: '#0192A8'
        },
        slate: {
          750: '#3e3e3e'
        },
        primary: {
          300: '#8dc4ec',
          400: '#6eb5e5',
          500: '#2A8ACD',
          600: '#1b6eae',
          700: '#17588d',
          800: '#174b75',
        }
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require("daisyui")
  ],
}
