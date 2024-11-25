/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'nexa': ['"Nexa Rust Sans"', 'sans-serif'], // Define your custom font
      },
    },
  },
  plugins: [],
}