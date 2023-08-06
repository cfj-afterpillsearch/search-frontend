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
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
