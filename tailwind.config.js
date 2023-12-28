/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {},
    backgroundColor : {
      mainleft : '#263b95' ,
      mainright : '#07d0c9' ,
      overlay : 'rgba(0,0,0,0.3)'
    },
    colors : {
      main : '#76ffff',
      colorRgb: "rgba(255, 255, 255, 0.6)"
    },
    flex : {
      '2': '2 2 0%',
      '3': '3 3 0%',
      '4': '4 4 0%',
      '5': '5 5 0%',
      '6': '6 6 0%',
      '7': '7 7 0%',
      '8': '8 8 0%',
    },
  },
  plugins: [],
}

