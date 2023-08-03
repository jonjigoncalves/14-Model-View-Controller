/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.hbs'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
    require('tailwindcss-ripple'),
  ],
}

