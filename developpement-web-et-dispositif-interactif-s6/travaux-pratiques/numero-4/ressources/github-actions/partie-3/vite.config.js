import { defineConfig } from "vite";
import svgLoader from "vite-svg-loader";

import eslint from "vite-plugin-eslint";

export default defineConfig({
    base: "",
    plugins: [
        eslint({
            include: "./src/**/*.js",
        }),
        svgLoader(),
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
