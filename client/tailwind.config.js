/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#00b3ff",
          "primary-content": "#000c16",
          "secondary": "#00ac00",
          "secondary-content": "#000b00",
          "accent": "#00ffb8",
          "accent-content": "#00160c",
          "neutral": "#020b0e",
          "neutral-content": "#c4c7c8",
          "base-100": "#e1ffff",
          "base-200": "#c4dede",
          "base-300": "#a7bebe",
          "base-content": "#121616",
          "info": "#008dff",
          "info-content": "#000716",
          "success": "#58d75a",
          "success-content": "#031103",
          "warning": "#f56300",
          "warning-content": "#150300",
          "error": "#ff0049",
          "error-content": "#160002",
          screens: {
            'xs': '475px',
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
          },
          fontSize: {
            'xs': ['.75rem', '1rem'],
            'sm': ['.875rem', '1.25rem'],
            'base': ['1rem', '1.5rem'],
            'lg': ['1.125rem', '1.75rem'],
            'xl': ['1.25rem', '1.75rem'],
            '2xl': ['1.5rem', '2rem'],
            '3xl': ['1.875rem', '2.25rem'],
            '4xl': ['2.25rem', '2.5rem'],
            '5xl': ['3rem', '1'],
            '6xl': ['3.75rem', '1'],
            '7xl': ['4.5rem', '1'],
            '8xl': ['6rem', '1'],
            '9xl': ['8rem', '1'],
          },
        },
      },
    ],
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require("@tailwindcss/typography"), require("daisyui"),
  ],
}
