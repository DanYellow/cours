/** @type {import('tailwindcss').Config} */

import fs from "node:fs";

import plugin from "tailwindcss/plugin";

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
        return {
            name: `.${item}`,
            backgroundColor: theme(`colors.type_${item}`),
        };
    });

    const textColorTypesComponents = listTypes.map((item) => {
        return { name: `.text-${item}`, color: theme(`colors.type_${item}`) };
    });

    const listPossiblesTypeCombinaions = listTypes.flatMap((type1) =>
        listTypes.map((type2) => `${type1}_${type2}`)
    );

    // // To generate classes only
    // fs.writeFile('test.tmp.json', JSON.stringify(listPossiblesTypeCombinaions.map((item) => ({[item]: `border-animated-${item}`})).reduce((prev, curr) => {
    //     Object.assign(prev, curr);
    //     return prev;
    //   }, {})), err => {
    //     if (err) {
    //       console.error(err);
    //     } else {
    //       // file written successfully
    //     }
    //   })

    const listPossiblesBorderTypeCombinaionsComponents =
        listPossiblesTypeCombinaions.map((item) => {
            return {
                name: `.border-${item}`,
                borderLeftColor: theme(`colors.type_${item.split("_")[0]}`),
                borderTopColor: theme(`colors.type_${item.split("_")[0]}`),
                borderBottomColor: theme(`colors.type_${item.split("_")[1]}`),
                borderRightColor: theme(`colors.type_${item.split("_")[1]}`),
            };
        });

    const listPossiblesAnimatedBorderTypeCombinaionsComponents =
        listPossiblesTypeCombinaions.map((item) => {
            return {
                name: `.border-animated-${item}`,
                backgroundImage: `
                linear-gradient(to right, rgb(255 255 255 / 1), rgb(255 255 255 / 1)),
                conic-gradient(
                    from var(--border-type-angle),
                    ${theme(`colors.type_${item.split("_")[1]}`)} 0deg 180deg,
                    ${theme(`colors.type_${item.split("_")[0]}`)} 180deg 360deg
                )`,
            };
        });

    addComponents({
        // ...backgroundTypesComponents.reduce(
        //     (ac, { ["name"]: x, ...rest }) => ((ac[x] = rest), ac),
        //     {}
        // ),
        ...textColorTypesComponents.reduce(
            (ac, { ["name"]: x, ...rest }) => ((ac[x] = rest), ac),
            {}
        ),
        ...listPossiblesBorderTypeCombinaionsComponents.reduce(
            (ac, { ["name"]: x, ...rest }) => ((ac[x] = rest), ac),
            {}
        ),
        ...listPossiblesAnimatedBorderTypeCombinaionsComponents.reduce(
            (ac, { ["name"]: x, ...rest }) => ((ac[x] = rest), ac),
            {}
        ),
    });
});

export default {
    content: ["./src/**/*.{js,html}"],
    safelist: [],
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
    plugins: [typesClassesPlugin],
};
