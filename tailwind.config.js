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
          300: '#ffb6c1',
          400: '#fe6e87',
          500: '#f83b60',
          600: '#e5194c',
          700: '#c20e3f',
          800: '#a20f3c',
        }
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
