import express from "express";

import SAE from '#models/sae.js'

const router = express.Router();

router.get("/saes", async (_req, res) => {
    const listSAEs = await SAE.find({});
    res.status(200).json(listSAEs)
});


export default router;
