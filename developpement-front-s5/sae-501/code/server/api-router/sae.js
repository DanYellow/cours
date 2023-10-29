import express from "express";
import fs from "fs/promises";

import SAE from '#models/sae.js';

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

router.post(`/${base}`, async (req, res) => {
    let ressource = new SAE({ ...req.body });
    await ressource.save().then()
        .catch((err) => {
            console.log("fefef")
            // fs.unlink(targetPath, (err) => {
            //     listErrors.push(err)
            // })
            // listErrors = [
            //     ...listErrors,
            //     ...Object.values(err?.errors).map((val) => val.message),
            // ];
        });

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
            const targetPath = `${res.locals.upload_dir}${ressource.image}`
            await fs.unlink(targetPath)
        } catch (e) {
            return res.status(404).json({ error: "L'image n'a pas pu être supprimée" })
        }
    }

    return res.status(200).json(ressource);
});

export default router;
