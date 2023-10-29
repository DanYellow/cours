import express from "express";

import CommentArticle from '#models/comment-article.js'
import Article from '#models/article.js'

const router = express.Router();
const base = "articles";

router.post(`/${base}/comment`, async (req, res) => {
    try {
        const article = await Article.findById(req.body.article_id)
        const ressource = new CommentArticle({ ...req.body, article });
        await ressource.save()
        
        article.list_comments.push(ressource);
        await article.save();

        res.status(201).json(ressource)
    } catch (e) {
        res.status(400).json({
            errors: [
                ...Object.values(e?.errors || [{'message': "Il y a eu un problème"}]).map((val) => val.message)
            ]
        })
    }
});

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
                  _id: ressource._id
                },
            },
            {
                $project: {
                   item: 1,
                   count: { $size: "$list_comments" }
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
        console.log(e)
        res.status(400).json({
            errors: [
                ...Object.values(e?.errors || [{'message': "Il y a eu un problème"}]).map((val) => val.message)
            ]
        })
    }
});

export default router;
