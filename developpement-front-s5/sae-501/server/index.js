import express from "express";
import path from "path";
import livereload from "livereload";
import connectLiveReload from "connect-livereload";
import { TwingEnvironment, TwingLoaderFilesystem } from "twing";
import { fileURLToPath } from 'url';

import frontendRouter from "./front-end-router.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let loader = new TwingLoaderFilesystem("./src");
let twing = new TwingEnvironment(loader);

var liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

const port = 3000;
const hostname = "127.0.0.1";
const app = express();

app.use(
  connectLiveReload({
    port: 35729,
  })
);

const publicPath = path.join(path.resolve(), "public");
app.use("/", express.static(publicPath));
app.set("view engine", "twig");

app.use(frontendRouter);

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
