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

    try {
        const req = await fetch(`${res.locals.base_url}/api/${ressourceNameInApi.authors}?${queryParams.toString()}`);
        result = await req.json()
    } catch (error) {
        listErrors = error.response.data.errors;
    }

    res.render("pages/back-end/auteurs/list.njk", {
        list_authors: result.data,
        list_errors: listErrors,
    });
});

// Get or create author
router.get([`/${base}/:id`, `/${base}/add`], async (req, res) => {
    const isEdit = mongoose.Types.ObjectId.isValid(req.params.id);

    let result = {};
    let listErrors = [];

    if (isEdit) {
        try {
            const req = await fetch(`${res.locals.base_url}/api/${ressourceNameInApi.authors}/${req.params.id}`);
            result = await req.json();
        } catch (e) {
            listErrors = e.response.data.errors;
        }
    }

    res.render("/", {
        author: result?.data || {},
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
        headers: {
            "Content-Type": "multipart/form-data",
        },
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

    try {
        const req = await fetch(url, options);
        ressource = await req.json().data;
    } catch (e) {
        listErrors = e.response.data.errors;
        ressource = e.response.data.ressource || {};
    } finally {
        if (listErrors.length || isEdit) {
            res.render("", {
                author: ressource,
                list_errors: listErrors,
                is_edit: isEdit,
            });
        } else {
            res.redirect(`${res.locals.admin_url}/${base}`);
        }
    }
});

export default router;
