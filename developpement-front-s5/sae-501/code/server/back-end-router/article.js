import express from "express";

import fs from "fs/promises";

// Models

import Article from "#models/article.js";

import SAERouter from './sae.js'

const base = "articles";
const router = express.Router();


router.get(`/${base}`, async (req, res) => {
    const page = req.query.page || 1;
    let perPage = req.query.per_page || 7;
    perPage = Math.min(perPage, 20);

    const listArticles = await Article.find()
        .skip(Math.max(page - 1, 0) * perPage)
        .limit(perPage)
        .sort({ _id: -1 })
        .lean()
        .orFail()
        .catch(() => {
            return {};
        });
    const countArticles = await Article.count();

    res.render("pages/back-end/articles/list.twig", {
        list_articles: {
            data: listArticles,
            count: countArticles,
            total_pages: Math.ceil(countArticles / perPage),
            page
        },
    });
});

export default router;
