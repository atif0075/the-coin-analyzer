
module.exports = {
  content: {
    files: [
      "./components/**/*.{vue,js}",
      "./layouts/**/*.vue",
      "./pages/**/*.vue",
      "./app.vue",
      "./plugins/**/*.{js,ts}",
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', "sans-serif"],
        serif: ["DM Serif Display", "serif"],
      },
      colors: {
        primary: "#f3fcf9",
        black: "#434039",
        green: "#21a366",
        'light-black': "#9c9b9a3b",
        'light-green': '#B2DDB6',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [

  ],
};
