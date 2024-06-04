import express from "express";
import { generateListRoutes } from "../generate-list-routes.js";

const router = express.Router();

router.get("/", async (req, res) => {
    res.render("pages/debug/index.njk", {});
});

const routeName = (routeName) => {
    return function namedRoute(req, res, next) {
        if(next) {
            next();
            return;
        }

        return routeName;
    };
};

router.get("/router/:foo?", routeName("test"), async (req, res) => {
    const listRoutes = generateListRoutes(res.app);
    const listMethods = [...new Set(listRoutes.map((item) => item.METHOD))];
    res.render("pages/back-end/debug/router.njk", {
        list_methods: listMethods,
        list_routes: listRoutes.filter((item) => {
            if (listMethods.includes(req.query?.method)) {
                return (
                    item.METHOD === req.query?.method ||
                    item.METHOD === "ANY"
                );
            }
            return true;
        }),
    });
});

router.get("/router2", routeName("debug2"), async (req, res) => {
    const listRoutes = generateListRoutes(res.app);
    const listMethods = [...new Set(listRoutes.map((item) => item.METHOD))];
    res.render("pages/back-end/debug/router.njk", {
        list_methods: listMethods,
        list_routes: listRoutes.filter((item) => {
            if (listMethods.includes(req.query?.method)) {
                return (
                    item.METHOD === req.query?.method ||
                    item.METHOD === "ANY"
                );
            }
            return true;
        }),
    });
});

export default router;
