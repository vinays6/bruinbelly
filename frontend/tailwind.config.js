/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'soft-sm': '0 2px 8px rgba(0,0,0,0.06)',
        'soft':    '0 4px 20px rgba(0,0,0,0.08)',
        'soft-lg': '0 8px 40px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
}
