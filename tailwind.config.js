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
    supports: {
      ncontainer: 'not (container-type: inline-size)',
      container: 'container-type: inline-size',
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
};
