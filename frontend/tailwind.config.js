/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f6ff',
          100: '#e0edff',
          200: '#b9dbfe',
          300: '#7cbbfd',
          400: '#3697fa',
          500: '#0c77eb',
          600: '#005cc9',
          700: '#004aa3',
          800: '#053f86',
          900: '#0a356f',
          950: '#07224a',
        },
        fintech: {
          dark: '#0B192C',
          navy: '#1E3E62',
          accent: '#008BFF',
          gold: '#FFB800',
          emerald: '#10B981',
          slate: '#F8FAFC',
          card: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.04), 0 10px 25px -5px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 20px rgba(12, 119, 235, 0.25)',
      },
    },
  },
  plugins: [],
};
