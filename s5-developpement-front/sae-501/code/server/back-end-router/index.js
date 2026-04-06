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

    let listSaes = [];
    const saesResponse = await fetch(`${res.locals.base_url}/api/saes?${queryParamsSAEs.toString()}`);
    const saesData = await saesResponse.json();

    let listArticles = [];
    const queryParamsArticles = new URLSearchParams({ per_page: NB_ITEMS_PER_PAGE });
    const articlesResponse = await fetch(`${res.locals.base_url}/api/articles?${queryParamsArticles.toString()}`);
    const articlesData = await articlesResponse.json();
    
    if (saesResponse.ok && articlesResponse.ok) {
        listSaes = saesData;
        listArticles = articlesData;
    }

    res.render("pages/back-end/index.njk", {
        list_saes: listSaes,
        list_articles: listArticles,
    });
});

export default router;
