import express from "express";
import mongoose from "mongoose";
import fs from "fs/promises";

import SAE from '#models/sae.js';

import upload, { uploadImage, deleteUpload } from "../uploader.js"

const router = express.Router();
const base = "saes";

// https://stackoverflow.com/questions/15772394/how-to-upload-display-and-save-images-using-node-js-and-express

router.get(`/${base}`, async (req, res) => {
    const page = req.query.page || 1;
    let perPage = req.query.per_page || 7;
    perPage = Math.min(perPage, 20);

    const listRessources = await SAE.find()
        .skip(Math.max(page - 1, 0) * perPage)
        .limit(perPage)
        .sort({ _id: -1 })
        .lean()
        .orFail()
        .catch(() => {
            return {};
        });

    const count = await SAE.count();

    return res.status(200).json({
        data: listRessources,
        total_pages: Math.ceil(count / perPage),
        count,
        page,
    })
});

router.get(`/${base}/:id`, async (req, res) => {
    let listErrors =  []

    const ressource = await SAE.findOne({ _id: req.params.id }).orFail().catch(() => {
        res.status(404).json({ errors: [...listErrors, "Élément non trouvé"] })
    });

    return res.status(200).json(ressource)
});

router.post(`/${base}`, upload.single("image"), async (req, res) => {
    let imagePayload = {}
    let listErrors =  []
    let targetPath = undefined;
    const uploadedImage = req.body.file || req.file;

    if (uploadedImage) {
        let imageName;
        ({image_path: targetPath, errors: listErrors, image_name: imageName} = uploadImage(uploadedImage, res.locals.upload_dir))
        imagePayload = { image: imageName }
    }

    if(listErrors.length) {
        return res.status(400).json({ 
            errors: listErrors, 
            ressource: req.body 
        })
    }

    const ressource = new SAE({ ...req.body, ...imagePayload });

    await ressource.save().then(() => {
        res.status(201).json(ressource)
    })
    .catch((err) => {
        res.status(400).json({
            errors: [
                ...listErrors, 
                ...deleteUpload(targetPath), 
                ...Object.values(err?.errors).map((val) => val.message)
            ]
        })
    })
});

router.put(`/${base}/:id`, upload.single("image"), async (req, res) => {
    let imagePayload = {}
    let listErrors =  []
    let targetPath = undefined;

    const uploadedImage = req.body.file || req.file;
    
    if (uploadedImage) {
        let imageName;
        ({image_path: targetPath, errors: listErrors, image_name: imageName} = uploadImage(uploadedImage, res.locals.upload_dir))
        imagePayload = { image: imageName }
    }

    let oldRessource = await SAE.findById(req.params.id).lean();
    if (!oldRessource) {
        oldRessource = {}
    }

    if(listErrors.length) {
        return res.status(400).json({ 
            errors: listErrors, 
            ressource: { ...oldRessource, ...req.body }
        })
    }

    const ressource = await SAE.findOneAndUpdate({ _id: req.params.id }, { ...req.body, _id: req.params.id, ...imagePayload }, { new: true })
    .orFail()
    .catch((err) => {
        // err instanceof mongoose.DocumentNotFoundError
        if(err instanceof mongoose.CastError) {
            res.status(400).json({errors: [...listErrors, "Élément non trouvé", ...deleteUpload(targetPath)]})
        } else {
            res.status(400).json({ 
                errors: [...listErrors, ...Object.values(err?.errors || [{'message': "Il y a eu un problème"}]).map((val) => val.message), ...deleteUpload(targetPath), "Erreur"], 
                ressource: { ...oldRessource, ...req.body }
            })
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
            // return res.status(404).json({ error: "L'image n'a pas pu être supprimée" })
        }
    }

    return res.status(200).json(ressource);
});

export default router;
