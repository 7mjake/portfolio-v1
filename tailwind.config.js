/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#006FFF',
        'secondary': '#324359',
        'background': '#F6FCFF',
      },
      outlineWidth: {
        3: '3px',
      },
      fontFamily: {
        'climate-crisis': ['Climate Crisis', 'sans-serif'],
        'figtree': ['var(--font-figtree)', 'sans-serif'],
        'sans': ['var(--font-figtree)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
