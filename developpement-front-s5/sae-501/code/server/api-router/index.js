import express from "express";

import SAERouter from "./sae.js";
import ArticleRouter from "./article.js";
import AuthorRouter from "./author.js";
import ArticleCommentRouter from "./comment-article.js";

const router = express.Router();

router.use(SAERouter);
router.use(ArticleRouter);
router.use(AuthorRouter);
router.use(ArticleCommentRouter);
router.all("*", (req, res) => {
    res.status(404).json({
        errors: [
            `Erreur 404 - La route <b>"${req.path}"</b> n'existe pas. Veuillez vérifier vos routes`,
        ],
    });
});

export default router;
