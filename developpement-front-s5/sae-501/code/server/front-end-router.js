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

router.get("/", async (req, res) => {
  const page = req.query.page || 0;

  let perPage = req.query.per_page || 7;
  perPage = Math.min(perPage, 20);

  const listArticles = await Article.find()
    .skip(page * perPage)
    .limit(perPage);

  const count = await Article.count();

  res.render("pages/front-end/index.twig", {
    page_name: "index",
    list_articles: {
      data: listArticles,
      total_pages: Math.ceil(count / perPage),
      count,
      page,
    },
  });
});

// "(.html)?" makes ".html" optional
router.get("/a-propos(.html)?", async (_req, res) => {
  // Get all sae items in the db
  const listSAEs = await SAE.find();
  res.render("pages/front-end/a-propos.twig", {
    list_saes: {
      data: listSAEs,
      count: listSAEs.length,
    },
    page_name: "a-propos",
  });
});

export default router;
