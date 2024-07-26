/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./content/**/*.md', './content/**/*.html', './layouts/**/*.html'],
  darkMode: 'media',
  theme: {
    fontFamily: {
      serif: ['Outfit', 'sans-serif'],
      sans: ['Inter', 'sans-serif',]
    },
    extend: {
      colors: {
        green: {
          25: '#F6FEF9',
          50: '#EDFCF2',
          100: '#D3F8DF',
          200: '#AAF0C4',
          300: '#73E2A3',
          400: '#3CCB7F',
          500: '#16B364',
          600: '#099250',
          700: '#087443',
          800: '#095C37',
          900: '#084C2E',
          950: '#052E1C',
        },
        gray: {
          25: '#FDFDFC',
          50: '#FAFAF9',
          100: '#F5F5F4',
          200: '#E7E5E4',
          300: '#D7D3D0',
          400: '#A9A29D',
          500: '#79716B',
          600: '#57534E',
          700: '#44403C',
          800: '#292524',
          900: '#1C1917',
          950: '#171412',
        },
        orange: {
          25: '#FEFAF5',
          50: '#FEF6EE',
          100: '#FDEAD7',
          200: '#F9DBAF',
          300: '#F7B27A',
          400: '#F38744',
          500: '#EF6820',
          600: '#E04F16',
          700: '#B93815',
          800: '#932F19',
          900: '#772917',
          950: '#511C10',
        },
      },
      boxShadow: {
        '3xl': '8px 8px 0px 0px rgba(208, 213, 221, 1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')
  ],
}
