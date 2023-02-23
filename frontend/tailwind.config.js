/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-color':'#FFCD00',
        'secondary-color':'#054168',
        'light-grey':'#F5F5F5',
        'dark-grey':'#434343',
        
      },
      fontFamily: {
        'chango': ['Chango']
      },
    },
  },
  plugins: [],
}