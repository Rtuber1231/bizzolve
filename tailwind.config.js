/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'brand-background': '#FFFFFF',
        'brand-text': '#111827',
        'brand-primary': '#111827',
        'brand-secondary': '#6B7280',
        'brand-signature': '#3B82F6',
      },
    },
  },
  plugins: [],
}
