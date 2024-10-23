import express from "express";
import { exec } from "child_process";
import openEditor from "launch-editor";
import util from "util";

import { generateListRoutes } from "../generate-list-routes.js";
import routeName from "#server/utils/name-route.middleware.js";

const router = express.Router();
const execPromise = util.promisify(exec);


router.get("/", routeName("debug"), async (req, res) => {
    res.render("pages/back-end/debug/index.njk", {});
});

router.get("/router", routeName("debug_router"), async (req, res) => {
    const listRoutes = generateListRoutes(res.app);
    const listMethods = [...new Set(listRoutes.map(item => item.METHOD))];
    res.render("pages/back-end/debug/router.njk", {
        list_methods: listMethods,
        list_routes: listRoutes.filter((item) => {
            if (listMethods.includes(req.query?.method)) {
                return (
                    item.METHOD === req.query?.method
                    || item.METHOD === "ANY"
                );
            }
            return true;
        }),
    });
});

router.get(
    "/open/file",
    routeName("open_editor"),
    (req, res) => {
        openEditor(`${req.query.file}:${req.query.line}:${req.query.column}`, "code");
        res.status(200).json(null);
    }
);

router.get("/eslint", routeName("eslint"), (req, res) => {
    res.render("pages/back-end/debug/eslint.njk");
});

router.get("/eslint-fix", routeName("eslint_fix"), async (req, res) => {
    try {
        await execPromise("npm run lint:fix");
    } finally {
        res.status(200).json({ url: req.query.url });
    }
});

export default router;
