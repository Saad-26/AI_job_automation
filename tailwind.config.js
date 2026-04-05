/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'surface': 'var(--color-surface)',
        'surface-container-low': 'var(--color-surface-container-low)',
        'surface-container': 'var(--color-surface-container)',
        'surface-container-high': 'var(--color-surface-container-high)',
        'surface-container-highest': 'var(--color-surface-container-highest)',
        
        'on-surface': 'var(--color-on-surface)',
        'on-surface-variant': 'var(--color-on-surface-variant)',
        
        'primary': 'var(--color-primary)',
        'primary-container': 'var(--color-primary-container)',
        
        'tertiary-fixed': 'var(--color-tertiary-fixed)',
        'on-tertiary-fixed-variant': 'var(--color-on-tertiary-fixed-variant)',
        
        'surface-dim': 'var(--color-surface-dim)',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
