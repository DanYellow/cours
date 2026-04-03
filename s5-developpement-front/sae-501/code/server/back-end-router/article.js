import express from "express";
import mongoose from "mongoose";

import { ressourceNameInApi } from "./utils.js";

import upload from "#server/uploader.js";
import { buildPayload } from "#server/utils/build-payload.js";

const base = "articles";
const router = express.Router();

// Get multiple articles
router.get(`/${base}`, async (req, res) => {
    const queryParams = new URLSearchParams(req.query);

    let result = {};
    let listErrors = [];

    try {
        result = await fetch(`${res.locals.base_url}/api/${ressourceNameInApi.articles}?${queryParams.toString()}`);
    } catch (error) {
        listErrors = error.response.data.errors;
    }

    res.render("pages/back-end/articles/list.njk", {
        list_articles: result.data,
        list_errors: listErrors,
    });
});

// Get or create article
router.get([`/${base}/:id`, `/${base}/add`], async (req, res) => {
    const isEdit = req.params.id !== "add";

    let result = {};
    let listErrors = [];

    try {
        if (isEdit) {
            const req = await fetch(`${res.locals.base_url}/api/${ressourceNameInApi.articles}/${req.params.id}`);
            result = await req.json();
        }
    } catch (error) {
        listErrors = error.response.data.errors;
    }

    res.render("", {
        article: result?.data || {},
        list_errors: listErrors,
        is_edit: isEdit,
    });
});

// Create or update article
router.post([`/${base}/:id`, `/${base}/add`], upload.single("image"), async (req, res) => {
    let ressource = {};

    const isEdit = mongoose.Types.ObjectId.isValid(req.params.id);

    let listErrors = [];
    let listAuthors = [];

    let options = {
        body: buildPayload(req.body, req.file),
    };

    let url = '';

    if (isEdit) {
        options = {
            ...options,
            method: "PUT",
        };
        url = `${res.locals.base_url}/api/${ressourceNameInApi.articles}/${req.params.id}`;
    } else {
        options = {
            ...options,
            method: "POST",
        };
        url = `${res.locals.base_url}/api/${ressourceNameInApi.articles}`;
    }

    try {
        const req = await fetch(url, options);
        const result = await req.json();
        ressource = result.data;

        const reqAuthors = await fetch(`${res.locals.base_url}/api/${ressourceNameInApi.authors}`);
        const listAuthorsReq = await reqAuthors.json();
        listAuthors = listAuthorsReq.data.data;
    } catch (e) {
        listErrors = e.response.data.errors;
        ressource = e.response.data.ressource || {};
    } finally {
        if (listErrors.length || isEdit) {
            res.render("", {
                article: ressource,
                list_errors: listErrors,
                list_authors: listAuthors,
                is_edit: isEdit,
            });
        } else {
            res.redirect(`${res.locals.admin_url}/${base}`);
        }
    }
});

export default router;
