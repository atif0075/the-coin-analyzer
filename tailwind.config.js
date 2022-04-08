
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
        white: "#F8F8F8",
        primary: "#100920",
        purple: "#4B16C7",
       
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [

  ],
};
