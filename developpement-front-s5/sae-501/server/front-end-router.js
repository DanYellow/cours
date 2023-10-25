import express from "express";

const router = express.Router();

router.get("/", async (_req, res) => {
  res.render("pages/index.twig", {"hello": 56})
});

router.get("/hello", (_req, res) => {
  res.render("pages/index.twig");
});

export default router;
