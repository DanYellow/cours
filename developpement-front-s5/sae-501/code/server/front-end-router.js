import express from "express";
import path from "path";
import fs from "fs/promises";

// Models
import SAE from "#models/sae.js";
import Article from "#models/article.js";

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

  const manifestPath = path.join(
    path.resolve(),
    "dist",
    "frontend.manifest.json"
  );
  const manifestFile = await fs.readFile(manifestPath);

  return JSON.parse(manifestFile);
};

router.get("/", async (_req, res) => {
  const listArticles = await Article.find();
  res.render("pages/front-end/index.twig", {
    page_name: "index",
    list_articles: listArticles,
  });
});

router.get("/a-propos(.html)?", async (_req, res) => {
  // Get all sae items in the db
  const listSAEs = await SAE.find();
  res.render("pages/front-end/a-propos.twig", {
    list_saes: {
        data: listSAEs,
        count: listSAEs.length
    },
    page_name: "a-propos",
  });
});

export default router;
