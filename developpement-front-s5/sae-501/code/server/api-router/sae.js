import express from "express";
import fs from "fs/promises";
import path from "path";

import SAE from '#models/sae.js';

const router = express.Router();

const base = "saes";

const uploadDir = path.join(path.resolve(), "public/uploads/")

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

router.post(`/${base}`, async (req, res) => {
    let ressource = new SAE({ ...req.body });
    await ressource.save();

    return res.status(201).json(ressource)
});

router.put(`/${base}/:id`, async (req, res) => {
    const ressource = await SAE.findOneAndUpdate({ _id: req.params.id }, { ...req.body, _id: req.params.id }).orFail().catch((err) => {
        res.status(200).json({})
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
            const targetPath = `${uploadDir}${ressource.image}`
            await fs.unlink(targetPath)
        } catch (e) {
            return res.status(404).json({ error: "L'image n'a pas pu être supprimée" })
        }
    }

    return res.status(200).json(ressource);
});

export default router;
