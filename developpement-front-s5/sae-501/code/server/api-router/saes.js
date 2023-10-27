import express from "express";

import SAE from '#models/sae.js'

const router = express.Router();

router.get("/saes", async (_req, res) => {
    const listSAEs = await SAE.find();
    res.status(200).json(listSAEs)
});

router.post("/saes", async (_req, res) => {
    let sae = new SAE({ ...req.body });
    await sae.save();

    res.status(201).json(sae)
});


export default router;
