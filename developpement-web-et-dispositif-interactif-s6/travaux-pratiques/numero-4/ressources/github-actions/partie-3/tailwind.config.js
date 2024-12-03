/** @type {import('tailwindcss').Config} */

import plugin from "tailwindcss/plugin";

export default {
    content: ["./index.html", "./src/**/*.js"],
    safelist: [
        "plante",
        "poison",
        "feu",
        "eau",
        "vol",
        "insecte",
        "normal",
        "sol",
        "electrik",
        "tenebres",
        "glace",
        "psy",
        "roche",
        "combat",
        "acier",
        "dragon",
        "fee",
        "spectre",
        "hidden",
    ],
    theme: {
        extend: {
            transitionProperty: {
                dialog: "background-color box-shadow",
            },
        },
    },
    plugins: [
        plugin(({ addVariant, addComponents, theme }) => {
            addVariant("inert", "&:where([inert], [inert] *)");
            addVariant("hocus", ["&:hover", "&:focus-visible"]);
            addVariant('group-hocus', [':merge(.group):hover &', ':merge(.group):focus-visible &']);
            addComponents({
                ".plante": {
                    backgroundColor: theme("colors.green.500"),
                },
                ".poison": {
                    backgroundColor: theme("colors.violet.500"),
                },
                ".vol": {
                    backgroundColor: theme("colors.sky.500"),
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
                    backgroundColor: theme("colors.emerald.500"),
                },
                ".sol": {
                    backgroundColor: theme("colors.amber.500"),
                },
                ".tenebres": {
                    backgroundColor: theme("colors.gray.900"),
                    color: theme("colors.white"),
                },
                ".spectre": {
                    backgroundColor: theme("colors.black"),
                    color: theme("colors.white"),
                },
                ".psy": {
                    backgroundColor: theme("colors.pink.500"),
                },
                ".electrik": {
                    backgroundColor: theme("colors.yellow.500"),
                },
                ".glace": {
                    backgroundColor: theme("colors.blue.100"),
                },
                ".roche": {
                    backgroundColor: theme("colors.stone.500"),
                },
                ".combat": {
                    backgroundColor: theme("colors.orange.500"),
                },
                ".acier": {
                    backgroundColor: theme("colors.slate.500"),
                },
                ".fee": {
                    backgroundColor: theme("colors.fuchsia.500"),
                },
                ".dragon": {
                    backgroundColor: theme("colors.teal.500"),
                },
                ".spectre": {
                    backgroundColor: theme("colors.indigo.500"),
                },
            });
        }),
    ],
};
