import { ESLint } from "eslint";

// const diffString = (diffMe, diffBy) => diffMe.split(diffBy).join("");

export default async (req, res, next) => {
    const eslint = new ESLint();

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
    let resultJSON = JSON.parse(JSONformatter.format(results, { hour12: false }));
    resultJSON = resultJSON.filter((item) => {
        return item.messages.length > 0;
    });

    
   


    if (resultJSON.length > 0) {
        resultJSON = resultJSON.map((item) => {
            const copy = { ...item };
            // copy.filePath = diffString(item.filePath, process.cwd());
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

    if (req.app.locals.data !== JSON.stringify(eslintReport)) {
        const options = { weekday: "short", year: "numeric", month: "short", day: "numeric" };
        const today = new Date();

        // const date = today.toLocaleDateString("en-US", options);
        // const time = today.toLocaleTimeString("en-US", { hour12: false });
        console.log(today.toUTCString());
        console.log(today.getTimezoneOffset());
        const timezoneOffset = -(today.getTimezoneOffset() / 60)
        req.app.locals.last_report_time = `${today.toUTCString()}+${timezoneOffset} (${Intl.DateTimeFormat().resolvedOptions().timeZone})`;
    }

    req.app.locals.data = JSON.stringify(eslintReport);

    next();
};
