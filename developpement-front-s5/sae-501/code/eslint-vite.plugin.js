import { ESLint } from "eslint";
import fs from "fs";

const isObject = (obj) => {
    return typeof obj === "object" && obj !== null && !Array.isArray(obj);
};

const formatJSONReport = (obj) => {
    let resultJSON = JSON.parse(obj);
    resultJSON = resultJSON.filter((item) => {
        return item.messages.length > 0;
    });
    resultJSON = resultJSON.map((item) => {
        const copy = { ...item };
        delete copy.source;

        return copy;
    });

    return {
        report_details: resultJSON,
        summary: {
            errorCount: resultJSON.reduce(
                (accumulator, currentValue) =>
                    accumulator + currentValue.errorCount,
                0
            ),
            warningCount: resultJSON.reduce(
                (accumulator, currentValue) =>
                    accumulator + currentValue.warningCount,
                0
            ),
        },
    };
};

export default function plugin(params) {
    return {
        name: "eslint-vite",
        apply: "serve",
        async buildStart() {
            console.log("------------------------------")
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

                if (formatter === "stylish" || item?.writeOutput === false) {
                    console.log(result);
                } else if (item?.writeOutput === true && params.outputPath) {
                    outputPayload[formatter] = result;

                    try {
                        let fileData = "{}";

                        if (fs.existsSync(params.outputPath)) {
                            fileData = await fs.promises.readFile(
                                params.outputPath
                            );
                        }

                        const myObject = JSON.parse(fileData);
                        const newContent = {
                            ...myObject,
                            ...{
                                frontend: formatJSONReport(outputPayload.json),
                            },
                        };

                        await fs.promises.writeFile(
                            params.outputPath,
                            JSON.stringify(newContent)
                        );
                    } catch (e) {
                        console.log("e", e);
                    }
                }
            }
        },
    };
}
