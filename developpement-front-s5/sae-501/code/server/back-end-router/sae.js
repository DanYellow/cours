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

    console.log(objectIDRegex.test(req.params.id))

    res.render("pages/back-end/saes/add-edit.twig", {
        sae,
        page_name: "saes",
        is_edit: objectIDRegex.test(req.params.id),
    });
});

const storage = multer.diskStorage({
    // dest: path.join(path.resolve(), "public/uploads/"),
    destination: function (req, file, cb) {
        cb(null, path.join(path.resolve(), "public/uploads/"))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ 
    storage: storage, 
    limits: {
        fileSize: 120, // 500kB 524288 1024 * 1024 * 0.5
    },
    fileFilter: (req, file, cb) => {
        const listAllowedMimeType = ["image/png", "image/jpg", "image/jpeg"]

        if (listAllowedMimeType.includes(file.mimetype)) {
            cb(null, true);
        } else {
            return cb(new Error('Only images are allowed'))
        }
    }
}).single("image")


router.post(`/${base}/:id`, (req, res, next) => {
    upload(req, res, (err) => {
        next(err)
    })
}, async (req, res) => {
    let sae = null;
    let listErrors = [];

    console.log("d", req)
    const tempPath = req.file?.path;
    // if(tempPath) {   
    //     console.log("err", tempPath)

    //     const targetPath = path.join(path.resolve(), "public/uploads/");
    //     fs.rename(tempPath, targetPath, (err) => {
    //         console.log(err)
    //         listErrors.push("Erreur image");
    //     });
    // }

    // We check if there's an id in the url
    const isEdit = objectIDRegex.test(req.params.id);

    if (isEdit) {
        sae = await SAE.findOneAndUpdate(
            { _id: req.params.id },
            { ...req.body, _id: req.params.id }, // image: req.file?.f
            { new: true }
        )
            .orFail()
            .catch((err) => {
                listErrors = [
                    ...Object.values(err?.errors).map((val) => val.message),
                ];
            });
    } else {
        sae = new SAE({ ...req.body });

        await sae
            .save()
            .then()
            .catch((err) => {
                listErrors = [
                    ...Object.values(err?.errors).map((val) => val.message),
                ];
            });
    }

    if (listErrors.length || isEdit) {
        res.render("pages/back-end/saes/add-edit.twig", {
            sae,
            page_name: "saes",
            list_errors: listErrors,
        });
    } else {
        res.redirect(`${res.locals.admin_url}/saes`);
    }
});

export default router;
