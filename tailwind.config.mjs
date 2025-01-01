/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lightGray: "#f3f4f6",
        dark1: "#33384d",
        dark2: "#232b33",
        greenIconShopping: "#029a49",
        pink1: "#ffebf6",
        pink2: "rgba(251,0,141,1)",
        bgRedMain: "#de232a",
        background: "var(--background)",
        foreground: "var(--foreground)",
        homeIcon: "rgb(186, 255, 174)",
        productsIcon: "rgb(233, 63, 142)",
        profileIcon: "rgba(255, 165, 0, 0.6)",
        cartIcon: "rgb(220, 53, 69)",
        mainRed: "#ef4056",
        secondaryRed: "#ef4444",
      },
      boxShadow: {
        homeMain: "0 0 15px 5px rgb(186, 255, 174)",
        home: "0 7px 15px rgb(186, 255, 174)",
        productsMain: "0 0 15px 5px rgb(233, 63, 142)",
        products: "0 7px 15px rgb(233, 63, 142)",
        profileMain: "0 0 15px 5px rgba(255, 165, 0, 0.6)",
        profile: "0 7px 15px rgba(255, 165, 0, 0.6)",
        cartMain: "0 0 15px 5px rgb(220, 53, 69)",
        cart: "0 7px 15px rgb(220, 53, 69)",
      },
    },
  },
  plugins: [],
};
