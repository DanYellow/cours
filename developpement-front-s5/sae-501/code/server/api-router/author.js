import express from "express";
import fs from "fs";

import Author from "#models/author.js";
import Article from "#models/article.js";

import upload, { uploadImage, deleteUpload } from "../uploader.js";

const router = express.Router();

const base = "authors";

/**
 * @openapi
 * /authors:
 *   get:
 *     tags:
 *      - Authors
 *     responses:
 *       200:
 *         description: Returns all authors.
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
        const listRessources = await Author.aggregate([
            { $skip: Math.max(page - 1, 0) * perPage },
            { $limit: perPage },
            {
                $project: {
                    _id: 1,
                    lastname: 1,
                    firstname: 1,
                    image: 1,
                    bio: 1,
                    nb_articles: { $size: "$list_articles" },
                },
            },
            { $sort: { _id: -1 } },
        ]);

        const count = await Author.count();

        res.status(200).json({
            data: listRessources,
            total_pages: Math.ceil(count / perPage),
            count,
            page,
        });
    } catch (e) {
        res.status(400).json({
            errors: [
                ...Object.values(
                    e?.errors || [{ message: "Il y a eu un problème" }]
                ).map((val) => val.message),
            ],
        });
    }
});

/**
 * @openapi
 * /authors/{id}:
 *   get:
 *     tags:
 *      - Authors
 *     parameters:
 *      - name: id
 *        in: path
 *        description: article's _id
 *        required: true
 *        schema:
 *          type: integer
 *     responses:
 *       200:
 *         description: Returns a specific author
 */
router.get(`/${base}/:id`, async (req, res) => {
    let listErrors = [];

    const page = req.query.page || 1;
    let perPage = req.query.per_page || 7;
    perPage = Math.min(perPage, 10);

    const ressource = await Author.findById(req.params.id)
        .populate({
            path: "list_articles", 
            options: { perDocumentLimit: perPage, skip: Math.max(page - 1, 0) * perPage },
            sort: { updated_at: 1 },
        })
        .orFail()
        .catch((err) => {
            res.status(404).json({
                errors: [...listErrors, "Élément non trouvé"],
            });
        });

    const listRessources = await Article.find({ author: req.params.id })
        .skip(Math.max(page - 1, 0) * perPage)
        .limit(perPage)
        .sort({ _id: -1 })
        .lean()
        .orFail()
        .catch(() => {
            return {};
        });

    ressource.foo = "fzfze";

    const count = await Article.count({ author: req.params.id });

    console.log(count);

    return res.status(200).json(ressource);
});

/**
 * @openapi
 * /authors:
 *   post:
 *     tags:
 *      - Authors
 *     parameters:
 *      - name: lastname
 *        in: formData
 *        required: true
 *        type: string
 *      - name: firstname
 *        in: formData
 *        required: true
 *        type: string
 *      - name: email
 *        in: formData
 *        type: string
 *        required: true
 *      - name: image
 *        in: formData
 *        required: true
 *        type: file
 *      - name: bio
 *        in: formData
 *        type: string
 *     responses:
 *       201:
 *         description: Creates an author
 */
router.post(`/${base}`, upload.single("image"), async (req, res) => {
    let imagePayload = {};
    let listErrors = [];
    let targetPath = undefined;

    const uploadedImage = req.body.file || req.file;

    if (uploadedImage) {
        let imageName;
        ({
            image_path: targetPath,
            errors: listErrors,
            image_name: imageName,
        } = uploadImage(uploadedImage, res.locals.upload_dir));
        imagePayload = { image: imageName };
    }

    if (listErrors.length) {
        return res.status(400).json({
            errors: listErrors,
            ressource: req.body,
        });
    }

    let ressource = new Author({ ...req.body, ...imagePayload });

    await ressource
        .save()
        .then(() => {
            res.status(201).json(ressource);
        })
        .catch((err) => {
            res.status(400).json({
                errors: [
                    ...listErrors,
                    ...deleteUpload(targetPath),
                    ...Object.values(err?.errors).map((val) => val.message),
                ],
            });
        });
});

export default router;
