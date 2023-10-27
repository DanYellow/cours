import express from "express";

import Article from '#models/article.js'

const router = express.Router();

const base = "articles";

router.get(`/${base}`, async (_req, res) => {
    const listArticles = await Article.find();
    res.status(200).json(listArticles)
});

// router.get("/saes/:id", async (req, res) => {
//     const sae = await SAE.findOne({ _id: req.params.id }).orFail().catch((err) => {
//         res.status(200).json({})
//     });

//     res.status(200).json(sae)
// });

router.post("/saes", async (req, res) => {
    let sae = new SAE({ ...req.body });
    await sae.save();

    res.status(201).json(sae)
});

// router.put("/saes/:id", async (req, res) => {
//     let sae = await SAE.findOneAndUpdate({ _id: req.params.id }, { ...req.body, _id: req.params.id }).orFail().catch((err) => {
//         res.status(200).json({})
//     });

//     res.status(201).json(sae)
// });



export default router;
