/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pastel: {
          peach:    '#FFD6BA',
          rose:     '#FFB5C8',
          lavender: '#D4B8FF',
          mint:     '#B8F0D4',
          sky:      '#B8E4FF',
          lemon:    '#FFF3B8',
          blush:    '#FFE4EC',
          sage:     '#C8ECDC',
        },
        brand: {
          primary:  '#FF7B54',
          soft:     '#FFF0EB',
          dark:     '#1A1412',
        },
        surface: {
          DEFAULT: '#FFFBF8',
          card:    '#FFFFFF',
          muted:   '#F5F0EB',
        },
        ink: {
          DEFAULT: '#1A1412',
          muted:   '#6B5E57',
          faint:   '#A89890',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'soft-sm': '0 2px 8px rgba(0,0,0,0.06)',
        'soft':    '0 4px 20px rgba(0,0,0,0.08)',
        'soft-lg': '0 8px 40px rgba(0,0,0,0.12)',
        'card':    '0 2px 12px rgba(255,123,84,0.10), 0 1px 4px rgba(0,0,0,0.05)',
      },
      animation: {
        'fade-up':  'fadeUp 0.4s ease both',
        'fade-in':  'fadeIn 0.3s ease both',
        'slide-up': 'slideUp 0.35s cubic-bezier(0.34,1.56,0.64,1) both',
      },
      keyframes: {
        fadeUp:  { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeIn:  { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(24px) scale(0.97)' }, to: { opacity: '1', transform: 'translateY(0) scale(1)' } },
      },
    },
  },
  plugins: [],
}
