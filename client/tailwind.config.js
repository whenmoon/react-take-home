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
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
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
