/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",'./public/index.html',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode:'class',
  theme: {
    extend: {
      colors:{
        main: '#413F3D',
        second: '#262626',
        'dark-subtle':"rgba(255,255,255,0.5)",
        'light-subtle':"rgba(39,39,39,0.5)",
        'highlight-dark': '#ffc200',
        'highlight': '058bfb'
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
