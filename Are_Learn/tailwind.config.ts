import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // AreLuna Brand Colors
        gold: {
          50: '#fffef7',
          100: '#fffce8',
          200: '#fff8c1',
          300: '#fff18c',
          400: '#ffe54c',
          500: '#ffd700', // Gold Leaf
          600: '#e6c200',
          700: '#cc9900',
          800: '#b38600',
          900: '#996600',
          950: '#4d3300',
        },
        grey: {
          50: '#f8f9fa',
          100: '#f1f3f4',
          200: '#e8eaed',
          300: '#dadce0',
          400: '#bdc1c6',
          500: '#858585', // Battleship Grey
          600: '#6c757d',
          700: '#495057',
          800: '#343a40',
          900: '#292929', // Jet
          950: '#1a1a1a',
        },
        glossy: {
          50: '#f5f4f7',
          100: '#ebe8f0',
          200: '#d6d1e0',
          300: '#b8aec7',
          400: '#a295b3', // Glossy Grey
          500: '#8b7ba0',
          600: '#7a6b8d',
          700: '#6b5c7a',
          800: '#5a4d66',
          900: '#4a3e52',
          950: '#2d252f',
        },
        // Legacy colors for compatibility
        primary: {
          50: '#fffef7',
          100: '#fffce8',
          200: '#fff8c1',
          300: '#fff18c',
          400: '#ffe54c',
          500: '#ffd700', // Gold Leaf
          600: '#e6c200',
          700: '#cc9900',
          800: '#b38600',
          900: '#996600',
          950: '#4d3300',
        },
        secondary: {
          50: '#f5f4f7',
          100: '#ebe8f0',
          200: '#d6d1e0',
          300: '#b8aec7',
          400: '#a295b3', // Glossy Grey
          500: '#8b7ba0',
          600: '#7a6b8d',
          700: '#6b5c7a',
          800: '#5a4d66',
          900: '#4a3e52',
          950: '#2d252f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'], // Kindelsherif alternative
        brand: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'], // For AreLuna branding
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config

