/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#D93636',
          redDark: '#B82828',
          redLight: '#FCEAEA',
          orange: '#F28C28',
          orangeDark: '#D97719',
          orangeLight: '#FEF3E6',
          cream: '#FFF4E6',
          creamDark: '#F5E4CD',
          brown: '#38251D',
          brownLight: '#5C4034',
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'card': '20px',
        'card-lg': '24px',
      },
      boxShadow: {
        'warm': '0 10px 30px -5px rgba(56, 37, 29, 0.08), 0 4px 12px -2px rgba(217, 54, 54, 0.05)',
        'warm-lg': '0 20px 40px -10px rgba(56, 37, 29, 0.14), 0 8px 20px -4px rgba(217, 54, 54, 0.08)',
      }
    },
  },
  plugins: [],
}
