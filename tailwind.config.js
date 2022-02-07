module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'mainbg': "url('images/background.jpg')",
      },
      fontFamily: {
        'mainfont': ['"Roboto Mono"', 'monospace']
      }
    },
  },
  plugins: [],
}