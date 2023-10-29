import express from "express";
import path from "path";
import fs from "fs";
import lodash from "lodash";
import FastGlob from "fast-glob";
import livereload from "livereload";
import connectLiveReload from "connect-livereload";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import ip from "ip";
import bodyParser from "body-parser";

import frontendRouter from "./front-end-router.js";
import backendRouter from "./back-end-router/index.js";
import apiRouter from "./api-router/index.js";

import mongoServer from "#database/index.js";


let envFilePath = '.env.prod.local';
if(process.env.NODE_ENV === "development") {
  envFilePath = '.env.dev.local';
}
const envVars = dotenv.config({ path: envFilePath })

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// console.log("fefzze", path.resolve(__dirname))
// const liveReloadServer = livereload.createServer();
// liveReloadServer.server.once("connection", () => {
//   setTimeout(() => {
//     liveReloadServer.refresh("/");
//   }, 600);
// });

const port = envVars?.parsed?.PORT || 3000;
const hostip = (process.env.NODE_ENV === "development") ? ip.address() : undefined;
const app = express();

mongoServer().then((res) => {
    console.log("---------------------------")
    console.log(`- \x1b[36m${res}\x1b[0m`);
    console.log("---------------------------")
}).catch(console.error);

// app.use(
//   connectLiveReload({
//     port: 35729,
//   })
// );
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

let jsonFilesContent = {};
FastGlob.sync("./src/data/**/*.json").forEach((entry) => {
  const filePath = path.resolve(entry);
  jsonFilesContent = lodash.merge(
    jsonFilesContent,
    JSON.parse(fs.readFileSync(filePath).toString())
  );
});

const getCurrentURL = (url) => {
    let computedURL = url
    if(url.at(-1) === "/") {
        computedURL = computedURL.substring(0, computedURL.length - 1);
    }

    return computedURL;
}

app.use(function (req, res, next) {
    const current_url = getCurrentURL(`${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`)

    res.locals = {...jsonFilesContent, ...{
    NODE_ENV: process.env.NODE_ENV,
    HOST_IP: hostip,
    current_url,
    base_url: `${req.protocol}://${req.get('host')}`,
    admin_url: `${current_url.substring(0, current_url.indexOf("/admin"))}/admin`,
    ...envVars.parsed
  }};

  const originalRender = res.render;
  res.render = function (view, local, callback) {
    let tplContent = {};

    const tplContentPath = path.join(__dirname, "..", `/src/${path}.json`);
    if (fs.existsSync(tplContentPath)) {
      tplContent = JSON.parse(fs.readFileSync(tplContentPath).toString());
    }

    const args = [view, { ...local, ...tplContent }, callback];

    originalRender.apply(this, args);
  };

  next();
});

let publicPath = path.join(path.resolve(), "public");
if (process.env.NODE_ENV === "production") {
    publicPath = path.join(path.resolve(), "dist");
}

app.use("/", express.static(publicPath));

app.set("view engine", "twig");
app.set("views", path.join(__dirname, "..", "/src"));

app.use(frontendRouter);
app.use('/admin', backendRouter);
app.use('/api', apiRouter);

const listDomains = [hostip]

console.log(`
        ███████╗ █████╗ ███████╗    ███████╗ ██████╗  ██╗
        ██╔════╝██╔══██╗██╔════╝    ██╔════╝██╔═████╗███║
        ███████╗███████║█████╗      ███████╗██║██╔██║╚██║
        ╚════██║██╔══██║██╔══╝      ╚════██║████╔╝██║ ██║
        ███████║██║  ██║███████╗    ███████║╚██████╔╝ ██║
        ╚══════╝╚═╝  ╚═╝╚══════╝    ╚══════╝ ╚═════╝  ╚═╝
`)

app.listen(port, listDomains, () => {
    console.log("---------------------------")
    console.log("Express server running at :");
    ["localhost", "127.0.0.1", ...listDomains].filter( Boolean ).forEach((item) => {
        console.log(`- \x1b[33mhttp://${item}:${port}/\x1b[0m`);
    })
    console.log("---------------------------")
});
  
