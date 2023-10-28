import express from "express";
import path from "path";
import fs from "fs/promises";

// Models
import SAE from "#models/sae.js";
import Article from "#models/article.js";

import SAERouter from './sae.js'

const router = express.Router();

router.use(SAERouter)

router.use(async (_req, res, next) => {
    const originalRender = res.render;
    res.render = async function (view, local, callback) {
        const manifest = {
            manifest: await parseManifest(),
        };

        const args = [view, { ...local, ...manifest }, callback];
        originalRender.apply(this, args);
    };

    next();
});

const parseManifest = async () => {
    if (process.env.NODE_ENV !== "production") {
        return {};
    }

    const manifestPath = path.join(
        path.resolve(),
        "dist",
        "backend.manifest.json"
    );
    const manifestFile = await fs.readFile(manifestPath);

    return JSON.parse(manifestFile);
};

router.get("/", async (req, res) => {
    const listSAEs = await SAE.find();

    const listArticles = await Article.find().limit(5);
    const countArticles = await Article.count();

    res.render("pages/back-end/index.twig", {
        list_saes: {
            data: listSAEs,
            count: listSAEs.length,
        },
        list_articles: {
            data: listArticles,
            count: countArticles,
        },
        page_name: "index",
    });
});

router.get("/articles", async (req, res) => {
    const listArticles = await Article.find().limit(5);
    const countArticles = await Article.count();

    res.render("pages/back-end/articles/list.twig", {
        list_articles: {
            data: listArticles,
            count: countArticles,
        },
        page_name: "articles",
    });
});

export default router;
