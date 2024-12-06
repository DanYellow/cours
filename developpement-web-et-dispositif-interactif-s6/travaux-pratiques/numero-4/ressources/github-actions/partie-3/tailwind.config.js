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
            colors: {
                type_plante: "#3fa129",
                type_poison: "#8f41cb",
                type_vol: "#81b9ef",
                type_eau: "#2980ef",
                type_feu: "#e62829",
                type_normal: "#9fa19f",
                type_insecte: "#91a119",
                type_sol: "#915121",
                type_tenebres: "#50413f",
                type_sol: "#915121",
                type_psy: "#ef4179",
                type_electrik: "#fac000",
                type_glace: "#3fd8ff",
                type_combat: "#ff8000",
                type_roche: "#afa981",
                type_acier: "#60a1b8",
                type_fee: "#ef71ef",
                type_dragon: "#5061e1",
                type_spectre: "#704170",
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
                    backgroundColor: theme("colors.type_plante"),
                },
                ".poison": {
                    backgroundColor: theme("colors.type_poison"),
                    color: theme("colors.slate.50"),
                },
                ".vol": {
                    backgroundColor: theme("colors.type_vol"),
                },
                ".eau": {
                    backgroundColor: theme("colors.type_eau"),
                },
                ".feu": {
                    backgroundColor: theme("colors.type_feu"),
                },
                ".normal": {
                    backgroundColor: theme("colors.type_normal"),
                },
                ".insecte": {
                    backgroundColor: theme("colors.type_insecte"),
                },
                ".sol": {
                    backgroundColor: theme("colors.type_sol"),
                    color: theme("colors.slate.50"),
                },
                ".tenebres": {
                    backgroundColor: theme("colors.type_tenebres"),
                    color: theme("colors.slate.50"),
                },
                ".psy": {
                    backgroundColor: theme("colors.type_psy"),
                },
                ".electrik": {
                    backgroundColor: theme("colors.type_electrik"),
                },
                ".glace": {
                    backgroundColor: theme("colors.type_glace"),
                    backgroundColor: "#3fd8ff",
                },
                ".roche": {
                    backgroundColor: theme("colors.type_roche"),
                },
                ".combat": {
                    backgroundColor: theme("colors.type_combat"),
                },
                ".acier": {
                    backgroundColor: theme("colors.type_acier"),
                },
                ".fee": {
                    backgroundColor: "#ef71ef",
                },
                ".dragon": {
                    backgroundColor: theme("colors.type_dragon"),
                    backgroundColor: "#5061e1",
                    color: theme("colors.slate.50"),
                },
                ".spectre": {
                    backgroundColor: theme("colors.type_spectre"),
                    color: theme("colors.slate.50"),
                },
            });
        }),
    ],
};
