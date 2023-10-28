import express from "express";

import SAE from '#models/sae.js'

const router = express.Router();

const base = "saes";

router.get(`/${base}`, async (_req, res) => {
    const listSAEs = await SAE.find();
    return res.status(200).json(listSAEs)
});

router.get(`/${base}/:id`, async (req, res) => {
    const sae = await SAE.findOne({ _id: req.params.id }).orFail().catch((err) => {
        res.status(200).json({})
    });

    return res.status(200).json(sae)
});

router.post(`/${base}`, async (req, res) => {
    let sae = new SAE({ ...req.body });
    await sae.save();

    return res.status(201).json(sae)
});

router.put(`/${base}/:id`, async (req, res) => {
    let sae = await SAE.findOneAndUpdate({ _id: req.params.id }, { ...req.body, _id: req.params.id }).orFail().catch((err) => {
        res.status(200).json({})
    });

    return res.status(201).json(sae)
});

router.delete(`/${base}/:id`, async (req, res) => {
    const deletedDog = await SAE.findByIdAndDelete(req.params.id).orFail()
    .then(() => {
        return res.status(200).json(deletedDog);
    })
    .catch((err) => {
        return res.status(404).json({error: "Quelque chose s'est mal passé, veuillez recommencer"});
    });
});



export default router;
