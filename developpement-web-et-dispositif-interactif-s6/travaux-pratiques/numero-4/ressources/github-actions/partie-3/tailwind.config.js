/** @type {import('tailwindcss').Config} */

import plugin from "tailwindcss/plugin";
import containerQueriesPlugin from "@tailwindcss/container-queries";

const listTypes = [
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
];

const typesClassesPlugin = plugin(({ theme, addComponents }) => {
    const backgroundTypesComponents = listTypes.map((item) => {
        return { name: `.${item}`, backgroundColor: theme(`colors.type_${item}`) }
    });

    const textColorTypesComponents = listTypes.map((item) => {
        return { name: `.text-${item}`, color: theme(`colors.type_${item}`) }
    });
    
    addComponents({
        ...backgroundTypesComponents.reduce((ac,{["name"]: x, ...rest}) => (ac[x] = rest, ac), {}),
        ...textColorTypesComponents.reduce((ac,{["name"]: x, ...rest}) => (ac[x] = rest, ac), {}),
    });
});

export default {
    content: ["./index.html", "./src/**/*.js"],
    safelist: [...listTypes],
    theme: {
        extend: {
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
        plugin(({ addVariant }) => {
            addVariant("inert", "&:where([inert], [inert] *)");
            addVariant("hocus", ["&:hover", "&:focus-visible"]);
            addVariant("group-hocus", [
                ":merge(.group):hover &",
                ":merge(.group):focus-visible &",
            ]);

        }),
        containerQueriesPlugin,
        typesClassesPlugin,
    ],
};
