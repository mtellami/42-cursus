/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        serif: ['Montserrat', 'serif'],
        custom: ['Tajawal', 'sans-serif'],
      }
    },
    colors: {
      'gray-10': '#6d7081',
      'gray-20': '#e9e9eb',
      'gray-40': '#53576f',
      'gray-50': '#494b60',
      'gray-60': '#5a5f7a',
      'gray-70': '#3c415a',
      'white-6' : '#d9d4d8',
      'gray-90' : '#6d7081',
      'red-77' : '#BB2525',
    },

  },
  plugins: [],
}

