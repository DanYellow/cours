
import express from "express";

import SAERouter from './sae.js'
import ArticleRouter from './article.js'
import ArticleCommentRouter from './comment-article.js'

const router = express.Router();

router.use(SAERouter)
router.use(ArticleRouter)
router.use(ArticleCommentRouter)

export default router;


