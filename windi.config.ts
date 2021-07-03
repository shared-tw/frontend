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
    'btn': {
      '@apply': 'inline-block px-3.5 py-2 bg-primary text-white rounded-md',
      '&:focus': {
        '@apply': 'outline-none',
      },
      '&:disabled': {
        '@apply': 'bg-gray-300',
      },
      '&-outline': {
        '@apply': 'px-3.25 py-1.75 bg-white border border-primary text-primary',
      },
    },
    'icon-btn': {
      '@apply': 'p-2 text-2xl inline-flex items-center',
      '&:focus': {
        '@apply': 'outline-none',
      },
    },
    'tag': {
      '@apply': 'inline-block py-1 px-1.5 bg-primary text-white text-sm leading-4 rounded',
      '&-outline': {
        '@apply': 'bg-white py-0.75 px-1.25 border border-primary text-primary',
      },
    },
  },
})
