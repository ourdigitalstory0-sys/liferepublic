/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFFFFF", // Clean White
        "primary-dark": "#2C2C2C", // Dark Grey (Logo Text)
        secondary: "#4A4A4A", // Medium Grey (Body Text)
        "secondary-light": "#777777", // Light Grey
        accent: "#58A618", // Life Republic Green
        "accent-dark": "#3D7A0F", // Darker Green
        "accent-light": "#8BD650", // Lighter Green/Gradient
        "brand-blue": "#0094D8", // Droplet Blue
        surface: "#F8F9FA", // Light grey surface
        "surface-dark": "#1A1A1A", // Dark surface
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
