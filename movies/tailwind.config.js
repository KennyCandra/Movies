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
        '1': '1.1',
        '2': '1.2',
        '3': '1.3',
        '4': '1.4',
        '5': '1.5',
        '6': '1.6',
        '7': '1.7',
        '8': '1.8',
        '9': '1.9',
        '10': '2',
      }
    },
  },
  plugins: [],
}

