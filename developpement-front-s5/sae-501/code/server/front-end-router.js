import express from "express";
import path from "path";
import fs from "fs/promises";

const router = express.Router();

router.use(async (_req, res, next) => {
  const originalRender = res.render;
  res.render = async function (view, local, callback) {
      const manifest = {
          manifest: await parseManifest(),
        };

    const args = [view, { ...local, ...manifest }, callback];
    originalRender.apply(this, args);
  };

  next();
});

const parseManifest = async () => {
  if (process.env.NODE_ENV !== "production") {
    return {};
  }

  const manifestPath = path.join(path.resolve(), "dist", "frontend.manifest.json");
  const manifestFile = await fs.readFile(manifestPath);

  return JSON.parse(manifestFile);
};

router.get("/", async (_req, res) => {
  res.render("pages/front-end/index.twig");
});

router.get("/a-propos", async (_req, res) => {
    res.render("pages/front-end/a-propos.twig");
  });

router.get("/hello", (_req, res) => {
  res.render("pages/index.twig");
});

export default router;
