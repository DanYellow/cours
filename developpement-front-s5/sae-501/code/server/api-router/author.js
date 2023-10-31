import express from "express";
import fs from "fs";
import mongoose from "mongoose";

import Author from "#models/author.js";

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
 *         description: Returns a specific author
 */
router.get(`/${base}/:id`, async (req, res) => {
    const page = req.query.page || 1;
    let perPage = req.query.per_page || 2;
    perPage = Math.min(perPage, 20);

    try {
        const ressource = await Author.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
            { $limit: perPage },
            {
                $addFields: {
                    nb_articles: { $size: "$list_articles" },
                    page: page,
                    total_pages: {
                        $ceil: {
                            $divide: [{ $size: "$list_articles" }, perPage],
                        },
                    },
                },
            },
        ]);

        const ressourceWithArticles = await Author.populate(ressource, {
            path: "list_articles",
            options: {
                perDocumentLimit: perPage,
                skip: Math.max(page - 1, 0) * perPage,
            },
        });

        return res.status(200).json(ressourceWithArticles?.[0] || {});
    } catch (err) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                errors: [`"${req.params.id}" n'est pas un id valide`],
            });
        } else {
            return res.status(400).json({
                errors: [
                    ...Object.values(
                        err?.errors || [
                            { message: "Quelque chose s'est mal passé" },
                        ]
                    ).map((val) => val.message),
                ],
            });
        }
    }
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
 *      - name: color
 *        in: formData
 *        type: string
 *        description: Author's **hexadecimal** used on his page for the bubble in the front
 *        default: "#ff0000"
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
                    ...Object.values(err?.errors || [{"message": "Quelque chose s'est mal passé"}]).map((val) => val.message),
                ],
            });
        });
});

/**
 * @openapi
 * /authors/{id}:
 *   put:
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
 *      - name: color
 *        in: formData
 *        type: string
 *        description: Author's **hexadecimal** color used on his page for the bubble in the front
 *        default: "#ff0000"
 *     responses:
 *       200:
 *         description: Updates a specific SAE
 */
router.put(`/${base}/:id`, upload.single("image"), async (req, res) => {
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

    let oldRessource = {};
    try {
        oldRessource = await Author.findById(req.params.id).lean();
    } catch (error) {
        oldRessource = {};
    }

    if (listErrors.length) {
        return res.status(400).json({
            errors: listErrors,
            ressource: { ...oldRessource, ...req.body },
        });
    }

    const ressource = await Author.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body, _id: req.params.id, ...imagePayload },
        { new: true }
    )
        .orFail()
        .catch((err) => {
            // err instanceof mongoose.DocumentNotFoundError
            if (err instanceof mongoose.CastError) {
                res.status(400).json({
                    errors: [
                        ...listErrors,
                        "Élément non trouvé",
                        ...deleteUpload(targetPath),
                    ],
                });
            } else {
                console.log(err)
                res.status(400).json({
                    errors: [
                        ...listErrors,
                        ...Object.values(
                            err?.errors || [
                                { message: "Il y a eu un problème" },
                            ]
                        ).map((val) => val.message),
                        ...deleteUpload(targetPath),
                    ],
                    ressource: { ...oldRessource, ...req.body },
                });
            }
        });

    return res.status(200).json(ressource);
});

/**
 * @openapi
 * /authors/{id}:
 *   delete:
 *     tags:
 *      - Authors
 *     parameters:
 *      - name: id
 *        in: path
 *        description: author's _id
 *        required: true
 *        schema:
 *          type: integer
 *     responses:
 *       200:
 *         description: Deletes a specific author
 */
router.delete(`/${base}/:id`, async (req, res) => {
    const ressource = await Author.findByIdAndDelete(req.params.id)
        .orFail()
        .catch(() => {});

    if (!ressource) {
        return res
            .status(404)
            .json({
                error: "Quelque chose s'est mal passé, veuillez recommencer",
            });
    }

    if (ressource.image) {
        try {
            const targetPath = `${res.locals.upload_dir}${ressource.image}`;
            await fs.unlink(targetPath);
        } catch (e) {
            // return res.status(404).json({ error: "L'image n'a pas pu être supprimée" })
        }
    }

    return res.status(200).json(ressource);
});

export default router;
