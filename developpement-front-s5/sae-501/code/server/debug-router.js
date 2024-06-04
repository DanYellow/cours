import express from "express";
import { generateListRoutes } from "../generate-list-routes.js";
import routeName from "./utils/name-route.middleware.js"

const router = express.Router();

router.get("/", routeName("debug"), async (req, res) => {
    res.render("pages/back-end/debug/index.njk", {});
});

router.get("/router", routeName("debug_router"), async (req, res) => {
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
