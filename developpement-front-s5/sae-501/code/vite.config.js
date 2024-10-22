import tailwindcss from "@vituum/vite-plugin-tailwindcss";
import eslint from "vite-plugin-eslint";

export default {
    base: "./",
    css: {
        // Displays the source of sass files in dev
        devSourcemap: true,
    },
    plugins: [
        tailwindcss(),
        eslint({
            include: "**/*.js",
        }),
    ],
    appType: "custom",
    server: {
        // Expose the server to the network allowing access from ip address
        host: true,
        middlewareMode: true,
    },
};
