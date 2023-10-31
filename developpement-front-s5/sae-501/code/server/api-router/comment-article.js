import express from "express";

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
 *        type: integer
 *      - in: body
 *        name: content
 *        type: string
 *        required: true
 *        description: Comment
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
 *     responses:
 *       200:
 *         description: Get all comments for an article.
 */
router.get(`/${base}/:id/comments`, async (req, res) => {
    try {
        const page = req.query.page || 1;
        const perPage = 10
        const ressource = await Article.findById(req.params.id)
            .select('_id')
            .populate({
                path: "list_comments",
                model: 'CommentArticle',
                options: {
                    sort: "-created_at",
                    skip: Math.max(page - 1, 0) * perPage,
                    limit: perPage
                }
            })
        const nb_comments = await Article.aggregate([
            {
                $match: {
                  _id: new mongoose.Types.ObjectId(ressource._id)
                },
            },
            {
                $project: {
                   item: 1,
                   nb_comments: { $size: "$list_comments" }
                }
            }
        ])
        const count = nb_comments[0].count;

        res.status(201).json({
            data: ressource,
            count,
            page,
            total_pages: Math.ceil(count / perPage),
        })
    } catch (e) {
        res.status(400).json({
            errors: [
                ...Object.values(e?.errors || [{'message': "Il y a eu un problème"}]).map((val) => val.message)
            ]
        })
    }
});

export default router;
