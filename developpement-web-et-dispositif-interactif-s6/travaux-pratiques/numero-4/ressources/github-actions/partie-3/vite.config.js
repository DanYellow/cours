import { defineConfig } from "vite";
import vituum from "vituum";
import eslint from "vite-plugin-eslint";

export default defineConfig({
    base: "./",
    plugins: [
        vituum({
            pages: {
                dir: "./src",
                root: "./",
                normalizeBasePath: true
            },
        }),
        eslint({
            include: "./src/**/*.js",
            failOnError: false,
        }),
    ],
    build: {
        target: "esnext",
        rollupOptions: {
            input: ["src/index.html"],
        },
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
    test: {
        exclude: [
            "**/node_modules/**",
            "**/dist/**",
            "**/cypress/**",
            "**/worklets/**",
            "**/.{idea,git,cache,output,temp}/**",
            "**/e2e/**",
        ],
        environment: 'happy-dom',
        css: false,
    },
});
