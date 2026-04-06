import express from "express";
import mongoose from "mongoose";

import { ressourceNameInApi } from "./utils.js";

import upload from "#server/uploader.js";
import { buildPayload } from "#server/utils/build-payload.js";

const base = "auteurs";
const router = express.Router();

// Get multiple authors
router.get(`/${base}`, async (req, res) => {
    const queryParams = new URLSearchParams({ per_page: 7, ...req.query });

    let result = {};
    let listErrors = [];

    const response = await fetch(`${res.locals.base_url}/api/${ressourceNameInApi.authors}?${queryParams.toString()}`);
    const data = await response.json();

    if (response.ok) {
        result = data;
    } else {
        listErrors = data.list_errors;
    }
 
    res.render("pages/back-end/authors/list.njk", {
        list_authors: result,
        list_errors: listErrors,
    });
});

// Get or create author
router.get([`/${base}/:id`, `/${base}/add`], async (req, res) => {
    const isEdit = mongoose.Types.ObjectId.isValid(req.params.id);

    let result = {};
    let listErrors = [];

    if (isEdit) {
        const response = await fetch(`${res.locals.base_url}/api/${ressourceNameInApi.authors}/${req.params.id}`);
        const data = await response.json();

        if (response.ok) {
            result = data; 
        } else {
            listErrors = data.list_errors;
        }
    }

    res.render("/", {
        author: result,
        list_errors: listErrors,
        is_edit: isEdit,
    });
});

// Create or update author
router.post([`/${base}/:id`, `/${base}/add`], upload.single("image"), async (req, res) => {
    let ressource = {};
    const isEdit = mongoose.Types.ObjectId.isValid(req.params.id);
    let listErrors = [];
    let options = {
        body: buildPayload(req.body, req.file),
    };
    
    let url = '';
    if (isEdit) {
        options = {
            ...options,
            method: "PUT",
        };
        url = `${res.locals.base_url}/api/${ressourceNameInApi.authors}/${req.params.id}`;
    } else {
        options = {
            ...options,
            method: "POST",
        };
        url = `${res.locals.base_url}/api/${ressourceNameInApi.authors}`;
    }

    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
        ressource = data;
    } else {
        listErrors = data.list_errors; 
    }

    if (listErrors.length || isEdit) {
        res.render("", {
            author: ressource,
            list_errors: listErrors,
            is_edit: isEdit,
        });
    } else {
        res.redirect(`${res.locals.admin_url}/${base}`);
    }
});

export default router;
