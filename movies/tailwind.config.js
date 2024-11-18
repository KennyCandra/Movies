/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        'loginBackGround': '#C0C0BC',
        'thelastSection': '#EDEDEC',
        'buttonColor': '#F5C518',
        'navBg': '#121212',
        'imgHover': 'rgba(255, 255, 255, 0.5)',
        'buttonHover': 'rgba(255, 255, 255, 0.1)',
      },
      scale: {
        '10': '1.1',
        '20': '1.2',
        '30': '1.3',
        '40': '1.4',
        '50': '1.5',
        '60': '1.6',
        '70': '1.7',
        '80': '1.8',
        '90': '1.9',
        '100': '2',
      }
    },
  },
  plugins: [],
}

