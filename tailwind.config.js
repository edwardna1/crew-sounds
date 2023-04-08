module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend:
    {
      fontFamily: {
        'Eczar': ['Eczar', 'sans-serif'],
        // Cedarville Cursive: ['Cedarville Cursive', 'cursive']
      },
      backgroundImage: {
        'cloud': "url('../public/cover.png')",
      }
    },
  },
  plugins: [],
};
