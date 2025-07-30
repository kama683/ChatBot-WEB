export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
   extend: {
  animation: {
    pulseOnce: 'pulseOnce 1.2s ease-in-out infinite',
  },
  keyframes: {
    pulseOnce: {
      '0%, 100%': { opacity: 0.3 },
      '50%': { opacity: 1 },
    },
  },
}

  },
 plugins: [
  require("tailwindcss-animate"),
],

}
