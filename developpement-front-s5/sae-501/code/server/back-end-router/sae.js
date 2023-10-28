import express from "express";

// Models
import SAE from "#models/sae.js";

const base = "saes";
const router = express.Router();

router.get(`/${base}`, async (req, res) => {
    const page = req.query.page || 1;
    let perPage = req.query.per_page || 1; // 5
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
        .catch((err) => {
            return {};
        });

    res.render("pages/back-end/saes/edit.twig", {
        sae,
        page_name: "saes",
    });
});

router.post(`/${base}/(:id)?`, async (req, res) => {
    
    let sae = null
    console.log("req.params.id", req.params.id)
    if(req.params.id) {
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
        console.log('"efefefef test')
        sae = new SAE({ ...req.body });
        await sae.save();
    }
    
    res.render("pages/back-end/saes/edit.twig", {
        sae,
        page_name: "saes",
    });
});

export default router;
