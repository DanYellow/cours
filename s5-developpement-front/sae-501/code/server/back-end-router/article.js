import express from "express";
import mongoose from "mongoose";

import upload from "#server/uploader.js";
import { buildPayload } from "#server/utils/build-payload.js";

import { ressourceNameInApi } from "./utils.js";

const base = "articles";
const router = express.Router();

// Get multiple articles
router.get(`/${base}`, async (req, res) => {
    let result = {};
    let listErrors = [];
    
    const queryParams = new URLSearchParams(req.query);
    const response = await fetch(`${res.locals.base_url}/api/${ressourceNameInApi.articles}?${queryParams.toString()}`);
    const data = await response.json();
    
    if (response.ok) {
        result = data;
    } else {
        listErrors = data.list_errors;
    }

    res.render("pages/back-end/articles/list.njk", {
        list_articles: result,
        list_errors: listErrors,
    });
});

// Get or create article
router.get([`/${base}/:id`, `/${base}/add`], async (req, res) => {
    const isEdit = req.params.id !== "add";

    let result = {};
    let listErrors = [];

    if (isEdit) {
        const response = await fetch(`${res.locals.base_url}/api/${ressourceNameInApi.articles}/${req.params.id}`);
        const data = await response.json();
        
        if (response.ok) {
            result = data;
        } else {
            listErrors = data.list_errors;
        }
    }

    res.render("", {
        article: result,
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

    const response = await fetch(url, options);
    const data = await response.json();

    const responseAuthors = await fetch(`${res.locals.base_url}/api/${ressourceNameInApi.authors}`);
    const listAuthorsData = await responseAuthors.json();

    if (response.ok && responseAuthors.ok) {
        ressource = data;
    } else if (!response.ok) {
        listErrors = data.list_errors; 
    } else {
        listErrors = listAuthorsData.list_errors; 
    }

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
});

export default router;
