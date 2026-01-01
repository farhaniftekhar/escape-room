/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mystery-black': '#0a0a0f',
        'mystery-purple': '#2d1b3d',
        'mystery-gold': '#d4af37',
        'mystery-silver': '#c0c0c0',
      },
      fontFamily: {
        'cinzel': ['Cinzel', 'serif'],
        'orbitron': ['Orbitron', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
