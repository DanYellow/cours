// @ts-check
import path from "path"
import { test, expect } from "@playwright/test";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('Visit one news from university\'s website', async ({ page, context }) => {
  await page.goto('https://www.cyu.fr/');
});
