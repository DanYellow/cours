import express from "express";
import mongoose from "mongoose";
import fs from "fs/promises";

import SAE from '#models/sae.js';

import upload from "../uploader.js"

const router = express.Router();

const base = "saes";

router.get(`/${base}`, async (_req, res) => {
    const listRessources = await SAE.find();
    return res.status(200).json(listRessources)
});

router.get(`/${base}/:id`, async (req, res) => {
    const ressource = await SAE.findOne({ _id: req.params.id }).orFail().catch((err) => {
        res.status(200).json({})
    });

    return res.status(200).json(ressource)
});

router.post(`/${base}`, upload.single("image"), async (req, res) => {
    let ressource = new SAE({ ...req.body });

    await ressource.save({ validateBeforeSave: true }).then(() => {
        res.status(201).json(ressource)
    })
    .catch((err) => {
        res.status(400).json({errors: Object.values(err?.errors).map((val) => val.message)})
    })
});

router.put(`/${base}/:id`, upload.single("image"), async (req, res) => {
    const ressource = await SAE.findOneAndUpdate({ _id: req.params.id }, { ...req.body, _id: req.params.id }, { new: true })
    .orFail()
    .catch((err) => {
        if(err instanceof mongoose.CastError) {
            res.status(400).json({errors: ["Élément non trouvé"]})
        } else {
            res.status(400).json({ errors: Object.values(err?.errors).map((val) => val.message), ressource: req.body })
        }
    });

    return res.status(201).json(ressource)
});

router.delete(`/${base}/:id`, async (req, res) => {
    const ressource = await SAE.findByIdAndDelete(req.params.id).orFail().catch(() => {});

    if(!ressource) {
        return res.status(404).json({ error: "Quelque chose s'est mal passé, veuillez recommencer" })
    }
    
    if(ressource.image) {
        try {
            const targetPath = `${res.locals.upload_dir}${ressource.image}`
            await fs.unlink(targetPath)
        } catch (e) {
            return res.status(404).json({ error: "L'image n'a pas pu être supprimée" })
        }
    }

    return res.status(200).json(ressource);
});

export default router;
