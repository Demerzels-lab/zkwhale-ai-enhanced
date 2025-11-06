/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        monochrome: {
          0: '#0A0A0A',
          1: '#111111',
          2: '#222222',
          3: '#666666',
          4: '#f8f8f8'
        },
        'dark': '#0A0A0A',
        'dark-gray': '#111111',
        'medium-gray': '#222222',
        'light-gray': '#666666',
        'text-gray': '#f8f8f8',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'satoshi': ['Satoshi', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'typing': 'typing 1s steps(40, end)',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'zk-verification': 'zk-verification 2s linear infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(255, 255, 255, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(255, 255, 255, 0.4)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 5px rgba(248, 248, 248, 0.3)' 
          },
          '50%': { 
            boxShadow: '0 0 20px rgba(248, 248, 248, 0.6), 0 0 30px rgba(248, 248, 248, 0.3)' 
          },
        },
        'zk-verification': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}