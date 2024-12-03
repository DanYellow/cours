/** @type {import('tailwindcss').Config} */

import plugin from "tailwindcss/plugin";

export default {
  content: ["./index.html", "./src/**/*.{js}"],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(({ addVariant }) => {
        addVariant("inert", "&:where([inert], [inert] *)");
        addVariant("hocus", ["&:hover", "&:focus-visible"]);
    }),
  ],
}

