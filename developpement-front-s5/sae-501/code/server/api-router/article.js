import express from "express";
import fs from "fs";

import Article from '#models/article.js'
import { imageValidator } from  "#database/validator.js";

import upload from "../uploader.js"

const router = express.Router();

const base = "articles";

router.get(`/${base}`, async (req, res) => {
    const page = req.query.page || 0

    let perPage = req.query.per_page || 5
    perPage = Math.min(perPage, 20)

    const count = await Article.count();
    
    const listArticles = await Article
        .find()
        .skip(page * perPage)
        .limit(perPage);

    res.status(200).json({
        data: listArticles,
        total_pages: Math.ceil(count / perPage),
        page
    })
});

// router.get("/saes/:id", async (req, res) => {
//     const sae = await SAE.findOne({ _id: req.params.id }).orFail().catch((err) => {
//         res.status(200).json({})
//     });

//     res.status(200).json(sae)
// });

router.post(`/${base}`, upload.single("image"), async (req, res) => {
    let listErrors = [];
    let ressource = new Article({ ...req.body });
    console.log(req.file)
    // const uploadedImage = req.file;

    // if (uploadedImage) {
    //     const error = imageValidator(uploadedImage);
    //     if(error !== null) {
    //         listErrors.push(error)
    //     } else {
    //         imagePayload = { image: req.file?.filename }
    //         targetPath = `${res.locals.upload_dir}${uploadedImage.filename}`;
    //         const tempPath = uploadedImage.path;

    //         fs.copyFile(tempPath, targetPath, err => {
    //             listErrors.push(err)
    //         })
    //     }
    // }
    
    await ressource.save({ validateBeforeSave: true }).then(() => {
        res.status(201).json(ressource)
    })
    .catch((err) => {
        res.status(400).json({errors: Object.values(err?.errors).map((val) => val.message)})
    })
});

// router.put("/saes/:id", async (req, res) => {
//     let sae = await SAE.findOneAndUpdate({ _id: req.params.id }, { ...req.body, _id: req.params.id }).orFail().catch((err) => {
//         res.status(200).json({})
//     });

//     res.status(201).json(sae)
// });



export default router;
