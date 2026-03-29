/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent:      '#00c07a',
        'accent-dark': '#009960',
        'accent-light': '#ecfdf5',
        brand:       '#0F799B',
        dark:        '#0f172a',
        dark2:       '#1e293b',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      maxWidth: {
        container: '1160px',
      },
    },
  },
  plugins: [],
}
