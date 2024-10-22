import express from 'express';
import axios from 'axios';
import mongoose from 'mongoose';
import querystring from 'querystring';

import upload from '../uploader.js';

const base = 'authors';
const router = express.Router();

// Get multiple authors
router.get(`/${base}`, async (req, res) => {
    const queryParams = querystring.stringify({ per_page: 7, ...req.query });
    let options = {
        method: 'GET',
        url: `${res.locals.base_url}/api/${base}?${queryParams}`,
    };
    let result = {};
    try {
        result = await axios(options);
    }
    catch {}

    res.render('pages/back-end/authors/list.njk', {
        list_authors: result.data,
    });
});

// Get or create author
router.get([`/${base}/:id`, `/${base}/add`], async (req, res) => {
    const options = {
        method: 'GET',
        url: `${res.locals.base_url}/api/${base}/${req.params.id}`,
    };
    const isEdit = mongoose.Types.ObjectId.isValid(req.params.id);

    let result = {};
    let listErrors = [];

    if (isEdit) {
        try {
            result = await axios(options);
        }
        catch (e) {
            listErrors = e.response.data.errors;
        }
    }

    res.render('/', {
        author: result?.data || {},
        list_errors: listErrors,
        is_edit: isEdit,
    });
});

// Create or update author
router.post([`/${base}/:id`, `/${base}/add`], upload.single('image'), async (req, res) => {
    let ressource = null;
    const isEdit = mongoose.Types.ObjectId.isValid(req.params.id);
    let listErrors = [];
    let options = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        data: {
            ...req.body,
            file: req.file,
        },
    };

    if (isEdit) {
        options = {
            ...options,
            method: 'PUT',
            url: `${res.locals.base_url}/api/${base}/${req.params.id}`,
        };
    }
    else {
        options = {
            ...options,
            method: 'POST',
            url: `${res.locals.base_url}/api/${base}`,
        };
    }

    try {
        const result = await axios(options);
        ressource = result.data;
    }
    catch (e) {
        listErrors = e.response.data.errors;
        ressource = e.response.data.ressource || {};
    }
    finally {
        if (listErrors.length || isEdit) {
            res.render('', {
                author: ressource,
                list_errors: listErrors,
                is_edit: isEdit,
            });
        }
        else {
            res.redirect(`${res.locals.admin_url}/${base}`);
        }
    }
});

export default router;
