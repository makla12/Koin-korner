/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderWidth: {
        DEFAULT: "0.125rem",
      },
      borderColor: {
        'normalMenu': "var(--menuBorder)",
        'normalChat': "var(--chatMessageInputBorder)"
      },
    },
    fontFamily: {
      'title': ["font-family: titleFont"]
    }
  },
  plugins: [],
};
