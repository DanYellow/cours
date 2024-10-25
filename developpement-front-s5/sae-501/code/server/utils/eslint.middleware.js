import { ESLint } from "eslint";

const eslint = new ESLint();

export default async (req, res, next) => {
    const results = await eslint.lintFiles([
        "./server/**/*.js",
        "./database/**/*.js",
        "./src/**/*.js",
    ]);

    const eslintReport = {
        server: {
            report_details: [],
            summary: {
                errorCount: 0,
                warningCount: 0,
            },
        },
        frontend: {
            report_details: [],
            summary: {
                errorCount: 0,
                warningCount: 0,
            },
        },
    };

    const JSONformatter = await eslint.loadFormatter("json");
    let resultJSON = JSON.parse(JSONformatter.format(results));
    resultJSON = resultJSON.filter((item) => {
        return item.messages.length > 0;
    });

    if (resultJSON.length > 0) {
        resultJSON = resultJSON.map((item) => {
            const copy = { ...item };
            delete copy.source;

            return copy;
        });

        const frontendResult = resultJSON.filter((item) =>
            item.filePath.includes("src")
        );
        const serverResult = resultJSON.filter(
            (item) => !item.filePath.includes("src")
        );

        eslintReport["server"] = {
            report_details: serverResult,
            summary: {
                errorCount: serverResult.reduce(
                    (accumulator, currentValue) =>
                        accumulator + currentValue.errorCount,
                    0
                ),
                warningCount: serverResult.reduce(
                    (accumulator, currentValue) =>
                        accumulator + currentValue.warningCount,
                    0
                ),
            },
        };
        eslintReport["frontend"] = {
            report_details: frontendResult,
            summary: {
                errorCount: frontendResult.reduce(
                    (accumulator, currentValue) =>
                        accumulator + currentValue.errorCount,
                    0
                ),
                warningCount: frontendResult.reduce(
                    (accumulator, currentValue) =>
                        accumulator + currentValue.warningCount,
                    0
                ),
            },
        };
    }

    res.locals.data = JSON.stringify(eslintReport);

    next();
};
