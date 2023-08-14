/** @type {import('tailwindcss').Config} */



export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundSize: {
        'size-200': '200% 200%',
      },
      backgroundPosition: {
        'pos-0': '0% 0%',
        'pos-100': '100% 100%',
      },
      fontFamily: {
        'lato': ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [],
}




