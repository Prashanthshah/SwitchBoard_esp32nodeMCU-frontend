module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        mainbg: {
          DEFAULT: "#222A3F",
        },
        secondary: {
          DEFAULT: "#001E3C",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
