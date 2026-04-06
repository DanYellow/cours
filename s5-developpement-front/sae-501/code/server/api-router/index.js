import express from "express";

import SaeApiRouter from "./sae.api.js";
import ArticleApiRouter from "./article.api.js";
import AuthorApiRouter from "./author.api.js";
import ArticleCommentApiRouter from "./comment-article.api.js";

const router = express.Router();

router.use(SaeApiRouter);
router.use(ArticleApiRouter);
router.use(AuthorApiRouter);
router.use(ArticleCommentApiRouter);
router.all("*", (req, res) => {
    res.status(404).json({
        list_errors: [
            `Erreur 404 : La route "${req.path}" ne fait pas partie de l'API du projet. Veuillez vérifier vos routes.`,
        ],
    });
});

export default router;
