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
    },
    spacing: {
      '72': '18rem',
    },
  },
};
export const plugins = [];