import express from "express";
import fs from "fs";

import Article from '#models/article.js';
import Author from '#models/author.js';

import upload, { uploadImage, deleteUpload } from "../uploader.js"
import mongoose from "mongoose";

const router = express.Router();

const base = "articles";

/**
 * @openapi
 * /articles:
 *   get:
 *     tags:
 *      - Articles
 *     responses:
 *       200:
 *         description: Returns all articles.
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
    const page = req.query.page || 1;
    let perPage = req.query.per_page || 7;
    perPage = Math.min(perPage, 20);

    try {
        const listRessources = await Article.aggregate([
            { "$skip": Math.max(page - 1, 0) * perPage },
            { "$limit": perPage },
            {
                $project: {
                    _id:1,
                    title: 1,
                    abstract: 1,
                    content: 1,
                    image: 1,
                    yt_link_id: 1,
                    is_active: 1,
                    author: 1,
                    nb_comments: { $size: "$list_comments" }
                }
            },
            { $sort : { _id : -1 } }
        ])
    
        const count = await Article.count();
    
        res.status(200).json({
            data: listRessources,
            total_pages: Math.ceil(count / perPage),
            count,
            page,
        })
    } catch (e) {
        res.status(400).json({
            errors: [
                ...Object.values(e?.errors || [{'message': "Il y a eu un problème"}]).map((val) => val.message)
            ]
        })
    }
    
});

/**
 * @openapi
 * /articles/{id}:
 *   get:
 *     tags:
 *      - Articles
 *     parameters:
 *      - name: id
 *        in: path
 *        description: article's _id
 *        required: true
 *        schema:
 *          type: integer
 *     responses:
 *       200:
 *         description: Returns a specific article
 */
router.get(`/${base}/:id`, async (req, res) => {
    let listErrors =  []

    const ressource = await Article.findOne({ _id: req.params.id }).select(["-list_comments"]).orFail().catch((err) => {
        res.status(404).json({errors: [...listErrors, "Élément non trouvé"]})
    });

    return res.status(200).json(ressource)
});

/**
 * @openapi
 * /articles:
 *   post:
 *     tags:
 *      - Articles
 *     parameters:
 *      - name: title
 *        in: formData
 *        required: true
 *        type: string
 *      - name: abstract
 *        in: formData
 *        description: article's summary
 *        type: string
 *        format: textarea
 *      - name: content
 *        in: formData
 *        description: article's content
 *        type: string
 *        format: textarea
 *        required: true
 *      - name: image
 *        in: formData
 *        required: true
 *        type: file
 *      - name: is_active
 *        in: formData
 *        type: boolean
 *        default: false
 *      - name: yt_link_id
 *        in: formData
 *        type: string
 *        description: article's Youtube link id
 *     responses:
 *       201:
 *         description: Creates an article
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

    const computedBody = structuredClone(req.body)
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        delete computedBody.author
    }

    let ressource = new Article({ ...computedBody, ...imagePayload });

    try {
        await ressource.save()
        if(req.body.author) {
            await Author.findOneAndUpdate({ _id: req.body.author }, {"$push": { list_articles: ressource._id } });
        }
        res.status(201).json(ressource)
    } catch (err) {
        res.status(400).json({
            errors: [
                ...listErrors, 
                ...deleteUpload(targetPath), 
                ...Object.values(err?.errors).map((val) => val.message)
            ]
        })
    }
});

/**
 * @openapi
 * /articles/{id}:
 *   put:
 *     tags:
 *      - Articles
 *     parameters:
 *      - name: title
 *        in: formData
 *        required: true
 *        type: string
 *      - name: abstract
 *        in: formData
 *        description: article's summary
 *        type: string
 *        format: textarea
 *      - name: content
 *        in: formData
 *        description: article's content
 *        type: string
 *        format: textarea
 *        required: true
 *      - name: image
 *        in: formData
 *        required: true
 *        type: file
 *      - name: is_active
 *        in: formData
 *        type: boolean
 *        default: false
 *      - name: yt_link_id
 *        in: formData
 *        type: string
 *        description: article's Youtube link id
 *      - name: author
 *        in: formData
 *        type: string
 *        description: author's _id
 *     responses:
 *       200:
 *         description: Updates a specific article
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

    let oldRessource = await Article.findById(req.params.id).lean();
    if (!oldRessource) {
        oldRessource = {}
    }

    if(listErrors.length) {
        return res.status(400).json({ 
            errors: listErrors, 
            ressource: { ...oldRessource, ...req.body }
        })
    }

    const ressource = await Article.findOneAndUpdate({ _id: req.params.id }, { ...req.body, _id: req.params.id, ...imagePayload }, { new: true })
    .orFail()
    .catch((err) => {
        // err instanceof mongoose.DocumentNotFoundError
        if(err instanceof mongoose.CastError) {
            res.status(400).json({errors: [...listErrors, "Élément non trouvé", ...deleteUpload(targetPath)]})
        } else {
            res.status(400).json({ 
                errors: [...listErrors, ...Object.values(err?.errors || [{'message': "Il y a eu un problème"}]).map((val) => val.message), ...deleteUpload(targetPath)], 
                ressource: { ...oldRessource, ...req.body }
            })
        }
    });

    return res.status(201).json(ressource)
});

/**
 * @openapi
 * /articles/{id}:
 *   delete:
 *     tags:
 *      - Articles
 *     parameters:
 *      - name: id
 *        in: path
 *        description: article's _id
 *        required: true
 *        schema:
 *          type: integer
 *     responses:
 *       200:
 *         description: Deletes a specific article
 */
router.delete(`/${base}/:id`, async (req, res) => {
    const ressource = await Article.findByIdAndDelete(req.params.id).orFail().catch(() => {});

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
