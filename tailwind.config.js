/** @type {import('tailwindcss').Config} */
export default {
  content: [
    //
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'pure-green': '#00ff00',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}
