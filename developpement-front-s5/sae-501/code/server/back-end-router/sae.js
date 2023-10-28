import express from "express";
import path from "path";
import fs from "fs/promises";

// Models
import SAE from "#models/sae.js";

const base = "saes";

const router = express.Router();

router.get(`/${base}`, async (req, res) => {
    const listSAEs = await SAE.find();

    res.render("pages/back-end/saes/list.twig", {
        list_saes: {
            data: listSAEs,
            count: listSAEs.length,
        },
        page_name: "saes",
    });
});

router.get(`/${base}/:id`, async (req, res) => {
    const sae = await SAE.findOne({ _id: req.params.id })
        .orFail()
        .catch((err) => {
            return {};
        });

    res.render("pages/back-end/saes/edit.twig", {
        sae,
        page_name: "saes",
    });
});

router.post(`/${base}/:id`, async (req, res) => {
    let sae = await SAE.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body, _id: req.params.id },
        { new: true }
    )
        .orFail()
        .catch((err) => {
            return {};
        });

    res.render("pages/back-end/saes/edit.twig", {
        sae,
        page_name: "saes",
    });
});

export default router;