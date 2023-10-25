import express from "express";
import { resolve } from 'path'
import lodash from "lodash";
import fs from 'fs';
import FastGlob from 'fast-glob';

const router = express.Router();

let jsonFilesContent = {};
FastGlob.sync("./src/data/**/*.json").forEach(entry => {
    const path = resolve(entry);
    jsonFilesContent = lodash.merge(jsonFilesContent, JSON.parse(fs.readFileSync(path).toString()));
})

router.get("/", (_req, res) => {
  res.render('pages/index.twig', jsonFilesContent);
});

router.get("/hello", (_req, res) => {
  res.render('pages/index.twig', jsonFilesContent);
});

export default router;
