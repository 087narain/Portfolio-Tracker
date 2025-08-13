/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode support
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        accentBlue: '#1DA1F2',
        accentGreen: '#00B894',
      
        darkbg: '#0B0F1A',       // almost black with blue tint, base bg
      
        darkBlue1: '#0C1220',    // darkest card bg, nearly black-blue
        darkBlue2: '#121A2B',    // slight lightening, deep blue-black
        darkBlue3: '#182338',    // smoother gradient, still very dark blue
        darkBlue4: '#1E2D46',    // lightest card shade but still very dark blue
      
        darkGreen1: '#081B12',
        darkGreen2: '#0D2B1E',
        darkGreen3: '#114329',
        darkGreen4: '#165735',
      },
      spacing: {
        '72': '18rem',
      },
      fontFamily: {
        // 'sans' is the default class for Tailwind's sans-serif
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        poppins: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};