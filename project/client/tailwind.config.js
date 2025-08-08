/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        accentBlue: '#1DA1F2',
        accentGreen: '#00B894',
        darkbg: '#121212',
        darkBlue1: '#101827',
        darkBlue2: '#2C3E60',
        darkBlue3: '#3F5274',
        darkBlue4: '#507394',
        darkGreen1: '#123826',
        darkGreen2: '#1F4B36',
        darkGreen3: '#2C6A47',
        darkGreen4: '#3AA75E',
      },
      spacing: {
        '72': '18rem',
      },
    },
  },
  plugins: [],
};