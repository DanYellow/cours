import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    {
        rules: {
            "no-undef": "error",
            "no-unused-vars": [
                "warn",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                },
            ],
            "no-magic-numbers": [
                "warn",
                {
                    ignoreArrayIndexes: true,
                    ignoreDefaultValues: true,
                    ignore: [0, -1, 1],
                },
            ],
            "no-empty": ["error", { allowEmptyCatch: true }],
        },
    },
    {
        ignores: [
            "dist/",
            "tests/",
            "test-results/",
            "e2e/",
            "playwright-report/",
            "tailwind.config.js",
            "vite.config.js",
            "eslint.config.js",
            "playwright.config.js",
            "postcss.config.js",
        ],
    },
    {
        languageOptions: {
            globals: {
                process: "readonly",
                registerPaint: "readonly",
            },
        },
    },
];
