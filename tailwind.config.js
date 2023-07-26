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
        rose: {
          450: '#ed7171'
        },
        slate: {
          750: '#3e3e3e'
        },
        gray: {
          350: '#d9d9d9'
        }
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
