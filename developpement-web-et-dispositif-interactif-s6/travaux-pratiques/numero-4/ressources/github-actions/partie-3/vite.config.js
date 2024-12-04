import { defineConfig } from "vite";

import eslint from "vite-plugin-eslint";

export default defineConfig({
    base: "",
    plugins: [
        eslint({
            include: "./src/**/*.js",
        }),
    ],
    build: {
        target: "esnext",
    },
    define: {
        "import.meta.env.VERSION": JSON.stringify(process.env.npm_package_version),
    }
});
