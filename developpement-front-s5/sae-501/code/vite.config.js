import tailwindcss from "@vituum/vite-plugin-tailwindcss";
import { ESLint } from "eslint";

const isObject = (obj) => {
    return typeof obj === "object" && obj !== null && !Array.isArray(obj);
};

export const myPlugin = (params) => {
    let config = {};

    return {
        name: "eslint-vite",
        apply: "serve",
        async configResolved(_config) {
            config = _config;
        },
        async transform() {
            const eslint = new ESLint({ fix: false });
            const filesLinted = await eslint.lintFiles(["./src/**/*.js"]);

            if (params.fix) {
                await ESLint.outputFixes(filesLinted);
            }

            const outputPayload = {};

            for (const item of params.formatter) {
                let formatter = item;
                if (isObject(item)) {
                    formatter = item.formatter;
                }

                const eslintFormatter = await eslint.loadFormatter(formatter);
                const result = eslintFormatter.format(filesLinted);

                if (formatter === "stylish" || item?.getOutput === false) {
                    console.log(result);
                } else if (item?.getOutput === true) {
                    outputPayload[formatter] = result;
                }
            }

            return outputPayload;
        },
    };
};

export default {
    base: "./",
    css: {
        // Displays the source of sass files in dev
        devSourcemap: true,
    },
    plugins: [tailwindcss()],
    appType: "custom",
    server: {
        // Expose the server to the network allowing access from ip address
        host: true,
        middlewareMode: true,
    },
};
