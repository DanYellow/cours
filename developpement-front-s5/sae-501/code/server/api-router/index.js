
import express from "express";

import SAERouter from './sae.js'
import ArticleRouter from './article.js'

const router = express.Router();

router.use(SAERouter)
router.use(ArticleRouter)

export default router;


