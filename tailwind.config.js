module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        display: ["Oswald", "Arial"],
        body: ['"Open Sans"', "Helvetica"],
      },
      textColor: {
        teal100: "#B2F5EA",
        teal300: "#4FD1C5",
        teal600: "#2C7A7B",
        secondary: "#ECC94B",
      },
      backgroundColor: {
        teal100: "#B2F5EA",
        teal300: "#4FD1C5",
        teal600: "#2C7A7B",
        secondary: "#ECC94B",
        backgroundColor: "#1a202c",
      },
      width: {
        94: "22rem",
      },
      maxWidth: {
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
      },
      fontSize: {
        "1vw": "1vw",
        "2vw": "2vw",
        "6vw": "6vw",
      },
      margin: {
        minus: "-2.5rem",
      },
      height: {
        200: "200px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
