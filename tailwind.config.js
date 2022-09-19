/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    screens: {
      mobile: { min: '320px', max: '480px' },
      tablet: { min: '481px', max: '768px' },
      laptop: { min: '796px', max: '1024px' },
      desktop: { min: '1025px', max: '1440px' }
    },
    extend: {}
  },
  plugins: []
}
