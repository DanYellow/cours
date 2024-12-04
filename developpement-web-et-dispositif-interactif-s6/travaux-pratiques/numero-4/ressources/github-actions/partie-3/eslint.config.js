import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    {
        rules: {
            "no-unused-vars": "error",
            "no-undef": "error",
            "no-magic-numbers": [
                "warn",
                { ignoreArrayIndexes: true, ignoreDefaultValues: true, ignore: [0, -1, 1] },
            ],
        },
    },
    {
        ignores: [
            "dist/",
            "tests/",
            "tailwind.config.js",
            "vite.config.js",
            "eslint.config.js",
            "postcss.config.js",
        ],
    },
];
