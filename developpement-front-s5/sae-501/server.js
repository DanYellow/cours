import express from "express";
import path from "path";
import { TwingEnvironment, TwingLoaderFilesystem } from "twing";

import frontendRouter from "./router/front-end-router.js";

let loader = new TwingLoaderFilesystem("./src");
let twing = new TwingEnvironment(loader);

const port = 3000;
const hostname = "127.0.0.1";
const app = express();

// app.use(express.static(path.join(__dirname, 'public')))

const publicPath = path.join(path.resolve(), "public");

console.log(publicPath);

app.use("/", express.static(publicPath));


app.use(frontendRouter);

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

// const app = express();

// const hostname = "127.0.0.1";
// const port = 3000;

// app.use(express.query()).use(express.bodyParser());
// app.listen(port);

// app.set("views", "src/pages");
// app.engine("html", Twig.__express);

// // const server = http.createServer((req, res) => {
// //   res.statusCode = 200;
// //   res.setHeader("Content-Type", "text/plain");
// //   res.end("Hello World");
// // });

// // server.listen(port, hostname, () => {
// //   console.log(`Server running at http://${hostname}:${port}/`);
// // });
