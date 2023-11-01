import express from "express";
import mongoose from "mongoose";
import fs from "fs";

import SAE from '#models/sae.js';

import upload, { uploadImage, deleteUpload } from "../uploader.js"

const router = express.Router();
const base = "saes";

/**
 * @openapi
 * /saes:
 *   get:
 *     tags:
 *      - SAEs
 *     responses:
 *       200:
 *         description: Returns all SAEs
 *       400:
 *         description: Something went wrong
 *     parameters:
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *          example: 1
 *        description: Page's number
 *      - in: query
 *        name: per_page
 *        required: false
 *        schema:
 *          type: integer
 *          example: 7
 *        description: Number of items per page. Max 20
 */
router.get(`/${base}`, async (req, res) => {
    const page = Math.max(1, req.query.page || 1);
    let perPage = req.query.per_page || 7;
    // Clamps the value between 1 and 20
    perPage = Math.min(Math.max(perPage, 1), 20);

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

/**
 * @openapi
 * /saes/{id}:
 *   get:
 *     tags:
 *      - SAEs
 *     parameters:
 *      - name: id
 *        in: path
 *        description: sae's _id
 *        required: true
 *        type: string
 *        pattern: '([0-9a-f]{24})'
 *     responses:
 *       200:
 *         description: Returns a specific SAE
 *       400:
 *         description: Something went wrong
 *       404:
 *         description: Ressource not found
 */
router.get(`/${base}/:id`, async (req, res) => {
    let listErrors =  []

    const ressource = await SAE.findOne({ _id: req.params.id }).orFail().catch(() => {
        res.status(404).json({ errors: [...listErrors, "Élément non trouvé"] })
    });

    return res.status(200).json(ressource)
});

/**
 * @swagger
 * /saes:
 *   post:
 *     tags:
 *      - SAEs
 *     parameters:
 *      - in: formData
 *        name: title
 *        type: string
 *        required: true
 *        description: SAE's title
 *      - in: formData
 *        name: content
 *        type: string
 *      - in: formData
 *        name: image
 *        type: file
 *     responses:
 *       201:
 *         description: Creates a SAE
 *       400:
 *         description: Something went wrong
 */
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

/**
 * @openapi
 * /saes/{id}:
 *   put:
 *     tags:
 *      - SAEs
 *     parameters:
 *      - name: id
 *        in: path
 *        description: sae's _id
 *        required: true
 *        type: string
 *        pattern: '([0-9a-f]{24})'
 *      - in: formData
 *        name: title
 *        type: string
 *        required: true
 *        description: SAE's title
 *      - in: formData
 *        name: content
 *        type: string
 *      - in: formData
 *        name: image
 *        type: file
 *     responses:
 *       200:
 *         description: Updates a specific SAE
 *       400:
 *         description: Something went wrong
 */
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

    let oldRessource = {}
    try {
        oldRessource = await SAE.findById(req.params.id).lean();
    } catch (error) {
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
        if (err instanceof mongoose.Error.DocumentNotFoundError) {
            res.status(404).json({
                errors: [`La SAÉ "${req.params.id}" n'existe pas`],
            });
        } else if(err instanceof mongoose.Error.CastError) {
            res.status(400).json({
                errors: [`"${req.params.id}" n'est pas un _id valide`],
            });
        } else {
            res.status(400).json({ 
                errors: [...listErrors, ...Object.values(err?.errors || [{'message': "Il y a eu un problème"}]).map((val) => val.message), ...deleteUpload(targetPath)], 
                ressource: { ...oldRessource, ...req.body }
            })
        }
    });

    return res.status(200).json(ressource)
});

/**
 * @openapi
 * /saes/{id}:
 *   delete:
 *     tags:
 *      - SAEs
 *     parameters:
 *      - name: id
 *        in: path
 *        description: sae's _id
 *        required: true
 *        type: string
 *        pattern: '([0-9a-f]{24})'
 *     responses:
 *       200:
 *         description: Deletes a specific SAE
 *       400:
 *         description: Something went wrong
 *       404:
 *         description: Ressource not found
 */
router.delete(`/${base}/:id`, async (req, res) => {
    try {
        const ressource = await SAE.findByIdAndDelete(req.params.id)

        if (ressource?.image) {
            const targetPath = `${res.locals.upload_dir}${ressource.image}`;
            fs.unlink(targetPath, (err) => {});
        }

        if(ressource) {
            return res.status(200).json(ressource);
        }
        return res.status(404).json({
            errors: [`La SAE "${req.params.id}" n'existe pas`],
        });
    } catch (error) {
        return res
            .status(400)
            .json({
                error: "Quelque chose s'est mal passé, veuillez recommencer",
            });
    }
});


export default router;
