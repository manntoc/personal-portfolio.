/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas:   '#050505',
        surface:  '#0A0A0A',
        border:   '#242424',
        ink:      '#E8E8EA',
        muted:    '#777777',
        dim:      '#393939',
        accent:   '#D5D5D5',
      },
      fontFamily: {
        sans: ['"Inter"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.05em',
        tighter:  '-0.04em',
        tight:    '-0.03em',
      },
    },
  },
  plugins: [],
}
