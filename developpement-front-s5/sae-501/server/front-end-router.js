import express from "express";
import path, { resolve, dirname, basename, join } from "path";
import lodash from "lodash";
import FastGlob from "fast-glob";
import fs from "fs";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// router.use(function (_req, res, next) {
//   res.locals = jsonFilesContent;
//   res.injectRender = (path, data) => {
//     let tplContent = {}
//     const tplContentPath = join(__dirname, "..", `/src/${path}.json`)
//     if(fs.existsSync(tplContentPath)) {
//       tplContent = JSON.parse(fs.readFileSync(tplContentPath).toString())
//     }

//     res.render(path, {...data, ...tplContent});
//   }
//   next();
// });

router.get("/", async (_req, res) => {
  res.injectRender("pages/index.twig", {"hello": 56})
});

// router.get('/', (req, res, next) => {
//   console.log('the response will be sent by the next function ...')
//   next()
// }, (req, res) => {
//   res.render('pages/index.twig', jsonFilesContent);
// })

router.get("/hello", (_req, res) => {
  res.render("pages/index.twig", jsonFilesContent);
});

export default router;
