module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        bgc: '#2b2d2f',
        titlecolor: '#e2ecfe',
        textcolor: '#c3c3c3',
        boxshadow: '#a4a08e',
      },
      spacing: {
        sidebarhight: '440px',
        mainwidth: '880px',
        side: '450px',
        245: '61.25rem',
      },
    },
    fontFamily: {
      display: ['Century Gothic'],
      body: ['Century Gothic'],
    },
    boxShadow: {
      sm: '0 0 5px 1px #a4a08e',
      DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.7)',
      comment: 'rgba(100, 100, 100, 0.6) 3px 4px 3px,rgba(100, 100, 100, 0.4) -1px -2px 3px',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      none: 'none',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow': {
          textShadow: '1px 1px 2px hsla(0, 0%, 40%, 1)',
        },
        '.text-shadow-md': {
          textShadow: '3px 3px 3px white',
        },
        '.text-shadow-lg': {
          textShadow: '5px 5px 3px white',
        },
        '.text-shadow-xl': {
          textShadow: '7px 7px 3px white',
        },
        '.text-shadow-2xl': {
          textShadow: '10px 10px 3px white',
        },
        '.text-shadow-none': {
          textShadow: 'none',
        },
      };

      addUtilities(newUtilities);
    },
  ],
};
