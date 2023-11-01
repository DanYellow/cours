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
 *     responses:
 *       200:
 *         description: Returns all articles
 *       400:
 *         description: Something went wrong
 */
router.get(`/${base}`, async (req, res) => {
    const page = Math.max(1, req.query.page || 1);
    let perPage = req.query.per_page || 7;
    perPage = Math.min(Math.max(perPage, 1), 20);

    try {
        const listRessources = await Article.aggregate([
            { "$skip": Math.max(page - 1, 0) * perPage },
            { "$limit": perPage },
            {
                $addFields: {
                    nb_comments: { $size: "$list_comments" }
                }
            },
            { $unset: "list_comments" },
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
 *       400:
 *         description: Something went wrong
 */
router.get(`/${base}/:id`, async (req, res) => {
    try {
        const ressource = await Article.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
            {
                $addFields: {
                   nb_comments: { $size: "$list_comments" }
                }
            },
            { $unset: "list_comments" },
        ])
    
        const ressourceWithAuthor = await Author.populate(ressource, {
            path: "author",
            model: 'Author',
        })

        if(ressourceWithAuthor?.[0]) {
            return res.status(200).json(ressourceWithAuthor?.[0])
        }
        return res.status(404).json({
            errors: [`L'article "${req.params.id}" n'existe pas`],
        });
    } catch(e) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                errors: [`"${req.params.id}" n'est pas un id valide`],
            });
        }
        return res.status(400).json({errors: ["Quelque chose s'est mal passé"]})
    }
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
 *      - name: author
 *        in: formData
 *        type: string
 *        description: author's _id
 *     responses:
 *       201:
 *         description: Creates an article
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
    
    const computedBody = structuredClone(req.body)
    if(!mongoose.Types.ObjectId.isValid(req.body.author)) {
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
 *     description: |
 *      If the author change, the previous author lose the article
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
 *        description: author's _id. If the _id is not valid or null, the article won't have a author anymore
 *     responses:
 *       200:
 *         description: Updates a specific article
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
        oldRessource = await Article.findById(req.params.id).lean();
    } catch (error) {
        oldRessource = {}
    }

    if(listErrors.length) {
        return res.status(400).json({ 
            errors: listErrors, 
            ressource: { ...oldRessource, ...req.body }
        })
    }

    try {
        let ressource = await Article.findById(req.params.id)
        
        if(Object.keys(imagePayload).length) {
            ressource.image = imagePayload.image
        }
        if(req.body.author !== ressource.author) {
            // Unlink article with author
            await Author.findOneAndUpdate({ _id: ressource.author }, {"$pull": { list_articles: ressource._id } });
            
            if(req.body.author && mongoose.Types.ObjectId.isValid(req.body.author)) {
                ressource.author = req.body.author;
                await Author.findOneAndUpdate({ _id: req.body.author }, {"$addToSet": { list_articles: ressource._id } });
            } else {
                // Unlink with any author
                ressource.author = null;
            }
        }
        await ressource.save();

        res.status(200).json(ressource)
    } catch (err) {
        // err instanceof mongoose.DocumentNotFoundError
        if(err instanceof mongoose.CastError) {
            res.status(400).json({errors: [...listErrors, "Élément non trouvé", ...deleteUpload(targetPath)]})
        } else {
            res.status(400).json({ 
                errors: [...listErrors, ...Object.values(err?.errors || [{'message': "Il y a eu un problème"}]).map((val) => val.message), ...deleteUpload(targetPath)], 
                ressource: { ...oldRessource, ...req.body }
            })
        }
    }
});

/**
 * @openapi
 * /articles/{id}:
 *   delete:
 *     tags:
 *      - Articles
 *     description: |
 *      On deletion all comments related are deleted
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
 *       400:
 *         description: Something went wrong
 *       404:
 *         description: Ressource not found
 */
router.delete(`/${base}/:id`, async (req, res) => {
    try {
        const ressource = await Article.findByIdAndDelete(req.params.id)

        if (ressource?.image) {
            const targetPath = `${res.locals.upload_dir}${ressource.image}`;
            fs.unlink(targetPath, (err) => {});
        }

        if(ressource) {
            return res.status(200).json(ressource)
        }
        return res.status(404).json({
            errors: [`L'article "${req.params.id}" n'existe pas`],
        });
    } catch (error) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                errors: [`"${req.params.id}" n'est pas un id valide`],
            });
        } 
        return res.status(400).json({errors: ["Quelque chose s'est mal passé"]})
    }
});

export default router;
