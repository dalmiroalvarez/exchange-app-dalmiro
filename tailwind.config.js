/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightBluePrimary: '#1A8DFF',
        lightBlueSecondary: '#E8F3FF',
      },
    },
  },
  plugins: [],
}