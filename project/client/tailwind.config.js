/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}"
];
export const theme = {
  extend: {
    colors: {
      accentBlue: '#1DA1F2',
      accentGreen: '#00B894',

      darkbg: '#121212',        
      darkcard: '#1E1E2F',       

      darkGray900: '#121212',    
      darkGray800: '#1A1A2E',
      darkGray700: '#23233F',
      darkGray600: '#2D2D53',
      darkGray500: '#3B3B6F',
      darkGray400: '#4E4E8A',
      darkGray300: '#6666A6',
      darkGray200: '#8484C2',
      darkGray100: '#A5A5DD',    
    },
    spacing: {
      '72': '18rem',
    },
  },
};
export const plugins = [];