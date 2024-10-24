import tailwindcss from "@vituum/vite-plugin-tailwindcss";

import eslintVite from "./eslint-vite.plugin.js";

const eslintVitePlugin = eslintVite({
    formatter: ["stylish"], // , { formatter: "json", writeOutput: true }
    include: "**/*.js",
    outputPath: "src/pages/back-end/debug/eslint.tmp.njk.json",
    fix: process.env.IS_ESLINT_AUTO_FIX_ENABLED,
});

export default {
    base: "./",
    css: {
        devSourcemap: true,
    },
    plugins: [
        tailwindcss(),
        eslintVitePlugin,
    ],
    appType: "custom",
    server: {
        // Expose the server to the network allowing access from ip address
        host: true,
        middlewareMode: true,
    },
};
