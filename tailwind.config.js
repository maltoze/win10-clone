/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        zinc: {
          750: '#303036',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
};
