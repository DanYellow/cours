import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Models
import SAE from "#models/sae.js";

const base = "saes";
const router = express.Router();

const objectIDRegex = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get(`/${base}`, async (req, res) => {
    const page = req.query.page || 1;
    let perPage = req.query.per_page || 5; // 5
    perPage = Math.min(perPage, 20);

    const listSAEs = await SAE.find()
        .skip(Math.max(page - 1, 0) * perPage)
        .limit(perPage)
        .sort({ _id: -1 })
        .lean()
        .orFail()
        .catch(() => {
            return {};
        });

    const count = await SAE.count();

    res.render("pages/back-end/saes/list.twig", {
        list_saes: {
            data: listSAEs,
            total_pages: Math.ceil(count / perPage),
            count,
            page,
        },
        page_name: "saes",
    });
});

router.get([`/${base}/:id`, `/${base}/add`], async (req, res) => {
    const sae = await SAE.findOne({ _id: req.params.id })
        .orFail()
        .catch(() => {
            return {};
        });

    res.render("pages/back-end/saes/add-edit.twig", {
        sae,
        page_name: "saes",
        is_edit: objectIDRegex.test(req.params.id),
    });
});

const storage = multer.diskStorage({
    // dest: path.join(path.resolve(), "public/uploads/"),
    destination: function (req, file, cb) {
        cb(null, path.join(path.resolve(), "public/uploads"))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ 
    storage: storage, 
    limits: {
        // fileSize: 150, // 500kB 524288 1024 * 1024 * 0.5
    },
    fileFilter: (req, file, callback) => {
        const listAllowedMimeType = ["image/png", "image/jpg", "image/jpeg"]

        if (!listAllowedMimeType.includes(file.mimetype)) {
            return callback(new Error('Format incorrect uploadé'))
        }
        callback(null, true);
    }
}).single("image")


// https://stackoverflow.com/questions/15772394/how-to-upload-display-and-save-images-using-node-js-and-express

router.post(
    `/${base}/:id`, upload, 
    async (req, res, next) => {
        const uploadedImage = req.file;

        if (uploadedImage) {
            throw new Error('some custom error message')
        }

        // console.log(uploadedImage);
        // console.log(req.get("test"))
    let sae = null;
    let listErrors = [];

    // upload(req, res, (err) => {
    //     if(err) {
    //         listErrors.push(err.message)
    //     }
    // })

    // We check if there's an id in the url
    const isEdit = objectIDRegex.test(req.params.id);

    if (isEdit) {
        sae = await SAE.findByIdAndUpdate(
            req.params.id,
            { ...req.body, _id: req.params.id, image: req.file?.filename },
            { new: true }
        )
            .orFail()
            .catch((err) => {
                listErrors = [
                    ...Object.values(err?.errors).map((val) => val.message),
                ];
            });
    } else {
        sae = new SAE({ ...req.body, image: req.file?.filename });

        await sae
            .save()
            .then()
            .catch((err) => {
                listErrors = [
                    ...Object.values(err?.errors).map((val) => val.message),
                ];
            });
    }

    console.log(req.body)

    if (listErrors.length || isEdit) {
        res.render("pages/back-end/saes/add-edit.twig", {
            sae: (listErrors.length ? req.body : sae),
            page_name: "saes",
            list_errors: listErrors,
        });
    } else {
        res.redirect(`${res.locals.admin_url}/saes`);
    }
});

export default router;
