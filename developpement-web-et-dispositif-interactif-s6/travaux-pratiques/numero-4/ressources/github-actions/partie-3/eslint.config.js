import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    ignores: [
      "dist/",
      "tailwind.config.js",
      "vite.config.js",
      "eslint.config.js",
      "postcss.config.js",
    ],
  },
];
