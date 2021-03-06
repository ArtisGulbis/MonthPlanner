module.exports = {
  important: true,
  purge: {
    enabled: false,
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      zIndex: {
        '-10': '-10',
        '-20': '-20',
      },
    },
    fontFamili: {
      sans: ['"Exo 2"'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
