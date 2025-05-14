/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#ffffff",
          dark: "#1a1a1a"
        },
        foreground: {
          DEFAULT: "#000000",
          dark: "#ffffff"
        },
        primary: {
          DEFAULT: "#2F5A3D",
          dark: "#4a8a5e"
        },
        secondary: {
          DEFAULT: "#6B4D3D",
          dark: "#8b6d5d"
        }
      },
      keyframes: {
        slideshow: {
          '0%, 28%': { opacity: '1' },
          '33%, 61%': { opacity: '0' },
          '66%, 94%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      },
      animation: {
        slideshow: 'slideshow 15s infinite'
      }
    }
  },
  plugins: [],
}