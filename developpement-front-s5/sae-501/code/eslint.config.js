import globals from "globals";
import pluginJs from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";

export default [
    { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
    pluginJs.configs.recommended,
    stylistic.configs.customize({
        indent: 4,
        quotes: "double",
        semi: true,
        jsx: true,
    }),
    {
        rules: {
            "no-unused-vars": [
                "warn",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                },
            ],
            "no-empty": ["error", { allowEmptyCatch: true }],
            "no-var": "error",
            "@stylistic/semi": "warn",
            "@stylistic/brace-style": ["error", "1tbs"],
            "@stylistic/comma-dangle": [
                "error",
                {
                    arrays: "always-multiline",
                    objects: "always-multiline",
                    imports: "always-multiline",
                    exports: "always-multiline",
                    functions: "never",
                },
            ],
        },
    },
    {
        ignores: [
            "dist/",
            "generate-list-routes.js",
            "tailwind.config.js",
            "vite.config.js",
            "vite.config.build.js",
            "eslint.config.js",
            "postcss.config.js",
            "server/swagger.js",
            "server/swagger-schemas/",
        ],
    },
];
