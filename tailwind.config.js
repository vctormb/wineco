const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: 'var(--color-white)',
      neutral: {
        300: 'var(--color-neutral-300)',
        400: 'var(--color-neutral-400)',
        700: 'var(--color-neutral-700)',
      },
      slate: {
        100: 'var(--color-slate-100)',
      },
      yellow: {
        100: 'var(--color-yellow-100)',
      },
      red: {
        900: 'var(--color-red-900)',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
}
