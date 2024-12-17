import { defineConfig } from "vite";

import eslint from "vite-plugin-eslint";

export default defineConfig({
    base: "",
    plugins: [
        eslint({
            include: "./src/**/*.js",
            failOnError: false,
        }),
    ],
    build: {
        target: "esnext",
    },
    define: {
        "import.meta.env.VERSION": JSON.stringify(
            process.env.npm_package_version
        ),
    },
    server: {
        // Expose the server to the network allowing access from ip address
        host: true,
        open: true,
    },
});
