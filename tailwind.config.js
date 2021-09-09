module.exports = {
  purge: 
    {
      content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
      safelist: [
        'via-gray-400',
        'via-yellow-400',
        'via-green-400',
        'via-red-400',
        'text-gray-500',
        'text-yellow-500',
        'text-green-500',
        'text-red-500',
        'text-gray-400',
        'text-yellow-400',
        'text-green-400',
        'text-red-400',
        'hover:text-gray-400',
        'hover:text-yellow-400',
        'hover:text-green-400',
        'hover:text-red-400',
        'border-gray-400',
        'border-yellow-400',
        'border-green-400',
        'border-red-400',

      ]
    },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
