import { ESLint } from "eslint";

const isObject = (obj) => {
    return typeof obj === "object" && obj !== null && !Array.isArray(obj);
};

export default (params) => {
    return {
        name: "eslint-vite",
        apply: "serve",
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
