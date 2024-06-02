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
import swaggerUi from "swagger-ui-express";
import { DateTime } from "luxon";
import helmet from "helmet";
import cors from "cors";
import expressFlash from "express-flash";
import expressSession from "express-session";

import mongoServer from "#database/index.js";

import swaggerSpec from "./swagger.js";
import frontendRouter from "./front-end-router.js";
import backendRouter from "./back-end-router/index.js";
import apiRouter from "./api-router/index.js";

import { generateListRoutes } from "../generate-list-routes.js";

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
    .catch(console.error);

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
    const filePath = path.resolve(entry);
    jsonFilesContent = _.merge(
        jsonFilesContent,
        JSON.parse(fs.readFileSync(filePath).toString())
    );
});

const getCurrentURL = (url) => {
    let computedURL = url;
    if (url.at(-1) === "/") {
        computedURL = computedURL.substring(0, computedURL.length - 1);
    }

    return computedURL;
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
        admin_url: `${current_url.substring(
            0,
            current_url.indexOf("/admin")
        )}/admin`,
        upload_dir: "/uploads/",
        upload_path: `${publicPath}/uploads/`,
        upload_url: `${base_url}/uploads/`,
        query_string_params: req.query,
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

        if (fs.existsSync(tplContentPath)) {
            tplContent = JSON.parse(fs.readFileSync(tplContentPath).toString());
        }

        const args = [view, { ...local, ...tplContent }, callback];

        originalRender.apply(this, args);
    };

    next();
});

app.use(express.static(publicPath));

app.set("view engine", "nunjucks");
app.set("views", path.join(__dirname, "..", "/src"));

if (process.env.NODE_ENV === "development") {
    app.use(cors());
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.get("/debug", async (req, res) => {
        const listRoutes = generateListRoutes(app);
        const listMethods = [...new Set(listRoutes.map((item) => item.METHOD))];
        res.render("pages/debug-router.njk", {
            list_methods: listMethods,
            list_routes: listRoutes.filter((item) => {
                if (listMethods.includes(req.query?.method)) {
                    return item.METHOD === req.query?.method || item.METHOD === "ANY";
                }
                return true;
            }),
        });
    });
}

app.use("/admin", backendRouter);
app.use("/api", apiRouter);
app.use(frontendRouter);

const nunjucksEnv = nunjucks.configure(path.join(__dirname, "..", "/src"), {
    autoescape: true,
    express: app,
    noCache: process.env.NODE_ENV !== "development",
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
        let pathKey = [];
        pathKey.push(parentKey);
        Object.entries(obj).forEach(([key, value]) => {
            if (!["settings"].includes(key) && !_.isFunction(value)) {
                if (
                    value &&
                    typeof value === "object" &&
                    !Array.isArray(value)
                ) {
                    return getThroughObj(value, key);
                } else {
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
            }
        });
    };

    getThroughObj(root);

    return res;
};

nunjucksEnv.addGlobal("context", function () {
    return getContextData(this.ctx);
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

export { app };
