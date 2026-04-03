import express from "express";

import routeName from "#server/utils/name-route.middleware.js";
import parseManifest from "#server/utils/parse-manifest.js";

// Routers
import saeRouter from "./sae.js";
import articleRouter from "./article.js";
import authorsRouter from "./author.js";

const router = express.Router();

router.use(async (_req, res, next) => {
    const originalRender = res.render;
    res.render = async function (view, local, callback) {
        const manifest = {
            manifest: await parseManifest("backend.manifest.json"),
        };

        const args = [view, { ...local, ...manifest }, callback];
        originalRender.apply(this, args);
    };

    next();
});

router.use(saeRouter);
router.use(articleRouter);
router.use(authorsRouter);

router.get("/", routeName("admin"), async (req, res) => {
    const NB_ITEMS_PER_PAGE = 5;
    const queryParamsSAEs = new URLSearchParams({ per_page: NB_ITEMS_PER_PAGE });

    const listSAEsReq = await fetch(`${res.locals.base_url}/api/saes?${queryParamsSAEs.toString()}`);
    const listSAEs = await listSAEsReq.json();

    console.log("listSAEs.data", listSAEs.data)

    const queryParamsArticles = new URLSearchParams({ per_page: NB_ITEMS_PER_PAGE });
    const listArticlesReq = await fetch(`${res.locals.base_url}/api/articles?${queryParamsArticles.toString()}`);
    const listArticles = await listArticlesReq.json();

    res.render("pages/back-end/index.njk", {
        list_saes: {
            data: listSAEs.data.data,
            count: listSAEs.data.count,
        },
        list_articles: {
            data: listArticles.data.data,
            count: listArticles.data.count,
        },
    });
});

export default router;
