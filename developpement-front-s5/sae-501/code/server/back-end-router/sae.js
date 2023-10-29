import express from "express";
import mongoose from "mongoose";
import axios from "axios";

// Models
import SAE from "#models/sae.js";

import upload from "../uploader.js";

const base = "saes";
const router = express.Router();

router.get(`/${base}`, async (req, res) => {
    const queryParams = new URLSearchParams(req.query).toString();
    let options = {
        method: "GET",
        url: `${res.locals.base_url}/api/${base}?${queryParams}`,
    }
    let result = null
    try {
        result = await axios(options);
    } catch (e) {}
    

    res.render("pages/back-end/saes/list.twig", {
        list_saes: result.data,
    });
});

router.get([`/${base}/:id`, `/${base}/add`], async (req, res) => {
    const sae = await SAE.findOne({ _id: req.params.id })
        .orFail()
        .catch(() => {
            return {};
        });

    res.render("pages/back-end/saes/add-edit.twig", {
        sae,
        is_edit: mongoose.Types.ObjectId.isValid(req.params.id),
    });
});

// https://stackoverflow.com/questions/15772394/how-to-upload-display-and-save-images-using-node-js-and-express

router.post(`/${base}/:id`, upload.single("image"), async (req, res) => {
    let ressource = null;
    const isEdit = mongoose.Types.ObjectId.isValid(req.params.id)
    let listErrors = [];
    let options = {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        data: {
            ...req.body,
            file: req.file,
        },
    }

    if(isEdit) {
        options = {
            ...options,
            method: "PUT",
            url: `${res.locals.base_url}/api/saes/${req.params.id}`,
        }
    } else {
        options = {
            ...options,
            method: "POST",
            url: `${res.locals.base_url}/api/saes`,
        }
    }
    
    try {
        const result = await axios(options);
        ressource = result.data
    } catch (e) {
        listErrors = e.response.data.errors
        ressource = e.response.data.ressource || {}
    } finally {
        if (listErrors.length || isEdit) {
            res.render("pages/back-end/saes/add-edit.twig", {
                sae: ressource,
                list_errors: listErrors,
                is_edit: isEdit,
            });
        } else {
            res.redirect(`${res.locals.admin_url}/saes`);
        }
    }
});

export default router;
