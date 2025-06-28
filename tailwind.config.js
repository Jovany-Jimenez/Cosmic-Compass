/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./App.tsx",
    "./index.tsx"
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        'cosmic': {
          'dark': '#020617',
          'purple': '#8b5cf6',
          'blue': '#3b82f6',
          'gold': '#f59e0b',
        }
      },
      animation: {
        'fade-in': 'fadeInAnimation 0.5s ease forwards',
      }
    },
  },
  plugins: [],
} 