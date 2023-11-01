import express from "express";
import mongoose from "mongoose";

import CommentArticle from '#models/comment-article.js'
import Article from '#models/article.js'

const router = express.Router();
const base = "articles";

/**
 * @swagger
 * /articles/{id}/comments:
 *   post:
 *     tags:
 *      - Articles
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Article's _id
 *        required: true
 *        type: string
 *        pattern: '([0-9a-f]{24})'
 *      - in: body
 *        name: body
 *        description: Comment
 *        schema:
 *          type: object
 *          required: 
 *              - content
 *          properties:
 *              content:
 *                  type: string
 *     responses:
 *       201:
 *         description: Creates a comment for an article
 */
router.post(`/${base}/:id/comments`, async (req, res) => {
    try {
        const article = await Article.findById(req.params.id)
        const ressource = new CommentArticle({ ...req.body, article });
        await ressource.save()
        
        article.list_comments.push(ressource);
        await article.save();

        res.status(201).json(ressource.getClean())
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
 * /articles/{id}/comments:
 *   get:
 *     tags:
 *      - Articles
 *     description: |
 *        Returns 10 by 10 comments related to one article
 *     parameters:
 *      - name: id
 *        in: path
 *        description: article's _id
 *        required: true
 *        type: string
 *        pattern: '([0-9a-f]{24})'
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *          example: 1
 *        description: Page's number
 *     responses:
 *      200:
 *         description: Get all comments for an article
 *      400:
 *         description: Something went wrong
 *      404:
 *         description: Ressource not found
 */
router.get(`/${base}/:id/comments`, async (req, res) => {
    try {
        const page = req.query.page || 1;
        const perPage = 10

        const ressource = await Article.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
            { $limit: perPage },
            {
                $project: {
                    list_comments: 1,
                    nb_comments: { $size: "$list_comments" },
                    page: page,
                    total_pages: {
                        $ceil: {
                            $divide: [{ $size: "$list_comments" }, perPage],
                        },
                    },
                },
            },
            { $sort: { _id: 1 } },
        ]);

        if(!ressource.length) {
            return res.status(404).json({
                errors: [`L'article "${req.params.id}" n'existe pas`],
            });
        }

        await Article.populate(ressource, [{
            path: "list_comments",
            // select: ["-article"],
            options: {
                perDocumentLimit: perPage,
                skip: Math.max(page - 1, 0) * perPage,
            },
        }]);


        res.status(200).json(ressource)
    } catch (e) {
        res.status(400).json({
            errors: [
                ...Object.values(e?.errors || [{'message': "Il y a eu un problème"}]).map((val) => val.message)
            ]
        })
    }
});

export default router;
