import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
  theme: {
    extend: {
      colors: {
        primary: {
          lightest: '#E6F8F4',
          light: '#C1F5EC',
          medium: '#78E7D8',
          DEFAULT: '#0EC4BA',
          dark: '#00828A',
        },
        negative: {
          lightest: '#E6F8F4',
          light: '#C1F5EC',
          medium: '#78E7D8',
          DEFAULT: '#FE7697',
          dark: '#FF426F',
        },
        blue: {
          lightest: '#F8F9F9',
          darkest: '#2C3E50',
        },
        gray: {
          lightest: '#F1F1F2',
          light: '#E4E5E7',
          DEFAULT: '#D1D4D6',
          dark: '#A8AEB3',
          darker: '#889197',
        },
        secondary: '#17A2B8',
        line: '#00B900',
        facebook: '#1778F2',
        twitter: '#55ACEE',
        google: '#EA4335',
        darkblue: '#2C3E50',
      },
    },
  },
  shortcuts: {
    'icon-btn': {
      '@apply': 'p-2 text-2xl inline-flex items-center',
      '&:focus': {
        '@apply': 'outline-none',
      },
    },
  },
})
