/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./app.js"],
  theme: {
    extend: {
      colors: {
        cream: "#FDFBF7",
        forest: "#1E332A",
        forestdeep: "#1B2E24",
        gold: "#C5A059",
        goldbright: "#D4AF37",
        graphite: "#1A1A1A"
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
