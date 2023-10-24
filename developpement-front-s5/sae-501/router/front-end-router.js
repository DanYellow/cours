import express from "express";
import { resolve } from 'path'
import lodash from "lodash";
import fs from 'fs'
import FastGlob from 'fast-glob'

import { TwingEnvironment, TwingLoaderFilesystem } from "twing";

let loader = new TwingLoaderFilesystem("./src");
let twing = new TwingEnvironment(loader);

const router = express.Router();

let jsonFilesContent = {};
FastGlob.sync("./src/data/**/*.json").forEach(entry => {
    const path = resolve(entry)

    jsonFilesContent = lodash.merge(jsonFilesContent, JSON.parse(fs.readFileSync(path).toString()))
})

router.get("/", (_req, res) => {
  twing.render("pages/index.twig", jsonFilesContent).then((output) => {
    res.end(output);
  });
});

export default router;
