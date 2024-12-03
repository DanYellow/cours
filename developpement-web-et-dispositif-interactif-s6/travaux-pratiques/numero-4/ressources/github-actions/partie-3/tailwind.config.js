/** @type {import('tailwindcss').Config} */

import plugin from "tailwindcss/plugin";

export default {
  content: ["./index.html", "./src/**/*.{js}"],
  safelist: ["plante", "poison", "feu", "eau", "vol", "insecte", "normal", "sol"],
  theme: {
    extend: {
        transitionProperty: {
            "dialog": "background-color box-shadow"
        },
    },
  },
  plugins: [
    plugin(({ addVariant, addComponents, theme }) => {
        addVariant("inert", "&:where([inert], [inert] *)");
        addVariant("hocus", ["&:hover", "&:focus-visible"]);
        addComponents({
            ".plante": {
                backgroundColor: theme("colors.green.500"),
            },
            ".poison": {
                backgroundColor: theme("colors.violet.500"),
            },
            ".vol": {
                backgroundColor: theme("colors.violet.500"),
            },
            ".eau": {
                backgroundColor: theme("colors.blue.500"),
            },
            ".feu": {
                backgroundColor: theme("colors.red.500"),
            },
            ".normal": {
                backgroundColor: theme("colors.zinc.100"),
            },
            ".insecte": {
                backgroundColor: theme("colors.red.500"),
            },
            ".sol": {
                backgroundColor: theme("colors.amber.500"),
            },
            ".tenebres": {
                backgroundColor: theme("colors.gray.900"),
                color: theme("colors.white"),
            },
            ".psy": {
                backgroundColor: theme("colors.pink.500"),
            },
        });
    }),
  ],
}

