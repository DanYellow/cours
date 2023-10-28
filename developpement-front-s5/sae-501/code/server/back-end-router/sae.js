import express from "express";

// Models
import SAE from "#models/sae.js";

const base = "saes";
const router = express.Router();

const objectIDRegex = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i

router.get(`/${base}`, async (req, res) => {
    const page = req.query.page || 1;
    let perPage = req.query.per_page || 2; // 5
    perPage = Math.min(perPage, 20);

    const listSAEs = await SAE.find()
        .skip(Math.max((page - 1), 0) * perPage)
        .limit(perPage).orFail().catch(() => {
            return {}
        })

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
    });
});

router.post(`/${base}/:id`, async (req, res) => {
    let sae = null
    if(objectIDRegex.test(req.params.id)) {
        sae = await SAE.findOneAndUpdate(
            { _id: req.params.id },
            { ...req.body, _id: req.params.id },
            { new: true }
        )
            .orFail()
            .catch((err) => {
                return {};
            });
    } else {
        sae = new SAE({ ...req.body });
        await sae.save();
    }
    
    res.render("pages/back-end/saes/add-edit.twig", {
        sae,
        page_name: "saes",
    });
});

export default router;
