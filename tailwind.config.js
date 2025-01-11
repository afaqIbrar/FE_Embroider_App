/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'newBlue': '#0cbbf5',
        'customRed': '#FF0000',
        'customGreen': '#2EFF2E',
        'customBlue' : '#0000FF'
      }
    }
  },
  plugins: []
};
