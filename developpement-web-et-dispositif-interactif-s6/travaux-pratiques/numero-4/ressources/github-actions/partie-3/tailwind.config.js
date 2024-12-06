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
    ],
    theme: {
        extend: {
            transitionProperty: {
                dialog: "background-color box-shadow",
            },
            gridTemplateColumns: {
                fluid: "repeat(auto-fit, minmax(0, 1fr))",
            },
        },
    },
    plugins: [
        plugin(({ addVariant, addComponents, theme }) => {
            addVariant("inert", "&:where([inert], [inert] *)");
            addVariant("hocus", ["&:hover", "&:focus-visible"]);
            addVariant("group-hocus", [
                ":merge(.group):hover &",
                ":merge(.group):focus-visible &",
            ]);
            addComponents({
                ".plante": {
                    backgroundColor: "#3fa129",
                },
                ".poison": {
                    backgroundColor: "#8f41cb",
                    color: theme("colors.slate.50"),
                },
                ".vol": {
                    backgroundColor: "#81b9ef",
                },
                ".eau": {
                    backgroundColor: "#2980ef",
                },
                ".feu": {
                    backgroundColor: "#e62829",
                },
                ".normal": {
                    backgroundColor: "#9fa19f",
                },
                ".insecte": {
                    backgroundColor: "#91a119",
                },
                ".sol": {
                    backgroundColor: "#915121",
                    color: theme("colors.slate.50"),
                },
                ".tenebres": {
                    backgroundColor: "#50413f",
                    color: theme("colors.slate.50"),
                },
                ".psy": {
                    backgroundColor: "#ef4179",
                },
                ".electrik": {
                    backgroundColor: "#fac000",
                },
                ".glace": {
                    backgroundColor: "#3fd8ff",
                },
                ".roche": {
                    backgroundColor: "#afa981",
                },
                ".combat": {
                    backgroundColor: "#ff8000",
                },
                ".acier": {
                    backgroundColor: "#60a1b8",
                },
                ".fee": {
                    backgroundColor: "#ef71ef",
                },
                ".dragon": {
                    backgroundColor: "#5061e1",
                    color: theme("colors.slate.50"),
                },
                ".spectre": {
                    backgroundColor: "#704170",
                    color: theme("colors.slate.50"),
                },
            });
        }),
    ],
};
