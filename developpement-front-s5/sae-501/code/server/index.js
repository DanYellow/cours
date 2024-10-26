import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import fs from "fs";
import _ from "lodash";
import ip from "ip";
import FastGlob from "fast-glob";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import nunjucks from "nunjucks";
import { DateTime } from "luxon";
import helmet from "helmet";
import cors from "cors";
import expressFlash from "express-flash";
import expressSession from "express-session";
import { spawn } from "child_process";

import mongoServer from "#database/index.js";

import swaggerSpec from "./swagger.js";
import frontendRouter from "./front-end-router.js";
import backendRouter from "./back-end-router/index.js";
import apiRouter from "./api-router/index.js";
import debugRouter from "./debug-router.js";

import viteConfig from "../vite.config.js";
import { generateUrl } from "../generate-list-routes.js";

let envFilePath = ".env.prod.local";
if (process.env.NODE_ENV === "development") {
    envFilePath = ".env.dev.local";
}

const envVars = dotenv.config({ path: envFilePath });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const hostip = ip.address();

// To improve security
app.use(
    helmet({
        contentSecurityPolicy: false,
        crossOriginResourcePolicy: false,
    })
);
app.use(cookieParser());
app.use(expressFlash());
app.use(cors());
app.use(
    expressSession({
        secret: "secret",
        resave: false,
        saveUninitialized: false,
    })
);

let publicPath = path.join(path.resolve(), "public");
if (process.env.NODE_ENV === "production") {
    publicPath = path.join(path.resolve(), "dist");
}

mongoServer()
    .then((res) => {
        console.log("---------------------------");
        console.log(`• \x1b[36m${res}\x1b[0m`);
        console.log("---------------------------");
    })
    .catch((err) => {
        console.log("\x1b[31m---------------------------");
        console.log(`• \x1b[31m${err}\x1b[0m`);
        console.log("\x1b[31m---------------------------");
    });

app.use(
    bodyParser.json({
        type: [
            "application/json",
            "application/csp-report",
            "application/reports+json",
        ],
    })
);
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

let jsonFilesContent = {};
FastGlob.sync("./src/data/**/*.json").forEach((entry) => {
    try {
        const filePath = path.resolve(entry);
        jsonFilesContent = _.merge(
            jsonFilesContent,
            JSON.parse(fs.readFileSync(filePath).toString())
        );
    } catch {}
});

const getCurrentURL = (url) => {
    let computedURL = url;
    if (url.at(-1) === "/") {
        computedURL = computedURL.substring(0, computedURL.length - 1);
    }

    return computedURL;
};

const getAllCookies = (cookie) => {
    const res = cookie?.split("; ").map((item) => {
        return { [item.split("=")[0]]: item.split("=")[1] };
    });

    return res?.reduce((result, curr) => Object.assign(result, curr), {}) || {};
};

app.use(function (req, res, next) {
    const current_url = getCurrentURL(
        `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path}`
    );
    const base_url = `${req.protocol}://${req.get("host")}`;

    const context = {
        NODE_ENV: process.env.NODE_ENV,
        HOST_IP: hostip,
        current_url,
        base_url,
        admin_url: `${base_url}/admin${envVars.parsed?.ADMIN_SUFFIX || ""}`,
        upload_dir: "/uploads/",
        upload_path: `${publicPath}/uploads/`,
        upload_url: `${base_url}/uploads/`,
        query_string_params: req.query,
        list_cookies: getAllCookies(req.headers.cookie),
    };

    res.locals = {
        ...jsonFilesContent,
        ...context,
        ...envVars.parsed,
    };

    const originalRender = res.render;
    res.render = function (view, local, callback) {
        let tplContent = {};

        const tplContentPath = path.join(__dirname, "..", `/src/${view}.json`);

        const tplTmpFilename = path.format({ ...path.parse(view), base: "", ext: ".tmp.njk" });
        const tplTmpContentPath = path.join(__dirname, "..", `/src/${tplTmpFilename}.json`);

        if (fs.existsSync(tplContentPath)) {
            tplContent = JSON.parse(fs.readFileSync(tplContentPath).toString());
        } else if (fs.existsSync(tplTmpContentPath)) {
            tplContent = JSON.parse(fs.readFileSync(tplTmpContentPath).toString());
        }

        const args = [view, { ...local, ...tplContent }, callback];

        originalRender.apply(this, args);
    };

    next();
});

app.use(express.static(publicPath));

app.set("view engine", "nunjucks");
app.set("views", path.join(__dirname, "..", "/src"));

app.use(`/admin${envVars.parsed?.ADMIN_SUFFIX || ""}`, backendRouter);
app.use("/api", apiRouter);
app.use(frontendRouter);

if (process.env.NODE_ENV === "development") {
    const options = {
        customSiteTitle: "Swagger SAE 501",
    };

    fs.watchFile(".env.dev.local", async () => {
        const out = fs.openSync("./out.log", "a");
        const err = fs.openSync("./err.log", "a");

        setTimeout(() => {            
            process.on("exit", function () {
                spawn(process.argv[0], process.argv.splice(1), {
                    cwd: process.cwd(),
                    detached: true,
                    stdio: ["pipe", out, err],
                }).unref();
            });
            process.exit();
        }, 0);
    });

    app.use(function (req, res, next) {
        res.on("finish", async function () {
            if (req.route !== undefined) {
                const useEslintAutoFix = (envVars.parsed?.IS_ESLINT_AUTO_FIX_ENABLED === "true");
                const { ESLint } = await import("eslint");
                const eslint = new ESLint({ fix: useEslintAutoFix });
                
                const results = await eslint.lintFiles([
                    "./server/**/*.js",
                    "./database/**/*.js",
                    "./src/**/*.js",
                ]);
        
                if (useEslintAutoFix) {
                    await ESLint.outputFixes(results);
                }        
            }
        });
        next();
    });

    const swaggerUi = await import("swagger-ui-express")

    app.use(["/swagger", "/api-docs"], swaggerUi.serve, swaggerUi.setup(swaggerSpec, options));
    app.use("/debug", debugRouter);
    app.use(async (err, req, res, _next) => {
        res.status(500);
        const response = {
            error: err,
            statusCode: res.statusCode,
            sourceCode: null,
        };

        try {
            const regexErrorLineAndFile
                = /\((([A-z]:)?.*)\).*\[Line\s*(\d+).*Column\s*(\d+)/gs;
            const results = [
                ...err.toString().matchAll(regexErrorLineAndFile),
            ].flat();
            const filePath = results[1];
            const lineError = Number(results[3] || 1);
            const columnError = Number(results[4] || 1);

            const data = fs.readFileSync(filePath, "utf8");
            const location = {
                start: { line: lineError, column: columnError },
            };

            const { codeFrameColumns } = await import("@babel/code-frame")

            const result = codeFrameColumns(data, location, {
                linesAbove: 5,
                linesBelow: 5,
            });
            response.sourceCode = result;
            const listFileName = {
                njk: "nunjucks",
                js: "javascript",
            };
            response.fileType
                = listFileName?.[filePath.split(".").at(-1)] || "";
            response.details = {
                file_path: filePath,
                line: lineError,
                column: columnError,
            };
        } catch (err) {
            console.error(err);
        }

        res.render("pages/error.njk", response);
    });

    ;(async () => {
        const { ESLint } = await import("eslint");
        const eslint = new ESLint();
        
        const results = await eslint.lintFiles([
            "./server/**/*.js",
            "./database/**/*.js",
            "./src/**/*.js",
        ]);

        const formatter = await eslint.loadFormatter("stylish");
        const resultText = formatter.format(results);

        if (resultText.length) {
            console.log("\x1b[30m\x1b[33m\x1b[4m---------- ESLint ---------\x1b[0m");
            console.log(resultText);
            console.log("\x1b[30m\x1b[33m\x1b[4m---------------------------\x1b[0m");
        }
    })().catch((error) => {
        process.exitCode = 1;
        console.error(error);
    });
}

const nunjucksEnv = nunjucks.configure(app.get("views"), {
    autoescape: true,
    express: app,
    noCache: process.env.NODE_ENV === "development",
    web: {
        useCache: process.env.NODE_ENV !== "development",
    },
});

nunjucksEnv.addFilter("date", (value, format) => {
    return DateTime.fromISO(value).toFormat(format);
});

const getContextData = (root) => {
    let res = {};
    const getThroughObj = (obj, parentKey) => {
        const pathKey = [];
        pathKey.push(parentKey);
        Object.entries(obj).forEach(([key, value]) => {
            if (!["settings"].includes(key) && !_.isFunction(value)) {
                if (
                    value
                    && typeof value === "object"
                    && !Array.isArray(value)
                ) {
                    return getThroughObj(value, key);
                }

                const objKeyPath = pathKey.filter(Boolean);
                res = {
                    ...res,
                    ...objKeyPath.reduceRight(
                        (acc, obj) => {
                            return { [obj]: acc };
                        },
                        {
                            [key]: value,
                            ...objKeyPath.reduce(
                                (acc, resKey) => acc[resKey],
                                res
                            ),
                        }
                    ),
                };
            }
        });
    };

    getThroughObj(root);

    return res;
};

nunjucksEnv.addGlobal("context", function () {
    if (process.env.NODE_ENV === "development") {
        return getContextData(this.ctx);
    }
    return {};
});

nunjucksEnv.addGlobal("routeName", function (name, params = {}) {
    const finalURL = generateUrl(app, name, params);

    return `/${finalURL}`;
});

nunjucksEnv.addGlobal("getEslintLink", function (rule) {
    const baseURLStylistic = "https://eslint.style/rules/js";
    const baseURLEslint = "https://eslint.org/docs/latest/rules";

    if (rule.includes("stylistic")) {
        const cleanedRule = rule.replace("@stylistic/", "");
        return `${baseURLStylistic}/${cleanedRule}`;
    }

    return `${baseURLEslint}/${rule}`;
});

console.log(`
        ███████╗ █████╗ ███████╗    ███████╗ ██████╗  ██╗
        ██╔════╝██╔══██╗██╔════╝    ██╔════╝██╔═████╗███║
        ███████╗███████║█████╗      ███████╗██║██╔██║╚██║
        ╚════██║██╔══██║██╔══╝      ╚════██║████╔╝██║ ██║
        ███████║██║  ██║███████╗    ███████║╚██████╔╝ ██║
        ╚══════╝╚═╝  ╚═╝╚══════╝    ╚══════╝ ╚═════╝  ╚═╝
`);

if (process.env.NODE_ENV === "production") {
    console.log(`
    ██████╗ ██████╗  ██████╗ ██████╗ ██╗   ██╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗
    ██╔══██╗██╔══██╗██╔═══██╗██╔══██╗██║   ██║██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
    ██████╔╝██████╔╝██║   ██║██║  ██║██║   ██║██║        ██║   ██║██║   ██║██╔██╗ ██║
    ██╔═══╝ ██╔══██╗██║   ██║██║  ██║██║   ██║██║        ██║   ██║██║   ██║██║╚██╗██║
    ██║     ██║  ██║╚██████╔╝██████╔╝╚██████╔╝╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
    ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═════╝  ╚═════╝  ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
`);
}

const listDomains = [hostip];
const port = envVars?.parsed?.PORT || 3900;

if (process.env.NODE_ENV === "development") {
    (async () => {
        const { createServer: createViteServer } = await import("vite");
        const vite = await createViteServer(viteConfig);
        app.use(vite.middlewares);
    })();
}

app.listen(port, listDomains, () => {
    console.log("---------------------------");
    console.log(
        "Express server running at (ctrl/cmd + click to open in your browser):"
    );
    ["localhost", "127.0.0.1", ...listDomains]
        .filter(Boolean)
        .forEach((item) => {
            console.log(`• \x1b[33mhttp://${item}:${port}/\x1b[0m`);
        });
    if (process.env.NODE_ENV === "development") {
        console.log(
            "\nSwagger running at (ctrl/cmd + click to open in your browser):"
        );
        ["localhost", "127.0.0.1", ...listDomains]
            .filter(Boolean)
            .forEach((item) => {
                console.log(`• \x1b[35mhttp://${item}:${port}/api-docs\x1b[0m`);
                console.log(`• \x1b[35mhttp://${item}:${port}/swagger\x1b[0m`);
            });
    }
    console.log("---------------------------");
});
