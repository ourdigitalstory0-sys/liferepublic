/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F5F5DC", // Beige/Cream Background
        secondary: "#333333", // Dark Grey Text
        accent: "#C5A059", // Gold/Brass - Premium Highlights
        "accent-dark": "#2B2B2B", // Charcoal - Footer/Dark Sections
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
