// import express from "express";
// import path from "path";
// import ViteExpress from "vite-express";

import { TwingEnvironment, TwingLoaderFilesystem } from "twing";

let loader = new TwingLoaderFilesystem("./src");
let twing = new TwingEnvironment(loader);

// const app = express();

// const publicPath = path.join(path.resolve(), "public");

// // app.use("/", express.static(publicPath));

// app.get("/hello", (_, res) => res.send("Hello from express!"));

// app.get("/2", (_req, res) => {
//   twing.render("pages/index.twig", {}).then((output) => {
//     console.log(output);
//     res.end(output);
//   });
// });

// ViteExpress.config({
//     ignorePaths: () => true
// }) https://stackoverflow.com/questions/69339146/how-to-use-node-server-with-vue-vite-bundler

// ViteExpress.listen(app, 5000, () => console.log("Server is listening..."));

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import { createServer as createViteServer } from "vite";

// const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function createServer() {
  const app = express();

  // Create Vite server in middleware mode and configure the app type as
  // 'custom', disabling Vite's own HTML serving logic so parent server
  // can take control
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  // Use vite's connect instance as middleware. If you use your own
  // express router (express.Router()), you should use router.use
  app.use(vite.middlewares);

  app.use("/", async (req, res) => {
    twing.render("pages/index.twig", {}).then((output) => {
      res.end(output);
    });
  });

  app.listen(5000);
}

createServer();
