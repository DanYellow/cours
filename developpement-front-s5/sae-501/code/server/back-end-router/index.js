import express from "express";
import path from "path";
import fs from "fs/promises";

// Models
import SAE from "#models/sae.js";
import Article from "#models/article.js";

// Routers
import SAERouter from './sae.js'
import ArticleRouter from './article.js'

const router = express.Router();

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

router.use(SAERouter)
router.use(ArticleRouter)


router.get("/", async (_req, res) => {
    const listSAEs = await SAE.find().limit(5).sort({ _id: -1 }).lean();
    const countSAEs = await SAE.count();

    const listArticles = await Article.find().limit(5).sort({ _id: -1 }).lean();
    const countArticles = await Article.count();

    res.render("pages/back-end/index.njk", {
        list_saes: {
            data: listSAEs,
            count: countSAEs,
        },
        list_articles: {
            data: listArticles,
            count: countArticles,
        },
    });
});


export default router;
