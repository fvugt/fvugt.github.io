/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        text: '#ffffff',
        card: {
          DEFAULT: '#1a1a1a',
          hover: '#2a2a2a',
        },
        accent: {
          DEFAULT: '#ffffff',
          muted: '#666666',
        }
      },
    },
  },
  plugins: [],
} 