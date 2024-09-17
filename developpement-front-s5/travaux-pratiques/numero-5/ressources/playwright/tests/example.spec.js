// @ts-check
import path from "path"
import { test, expect } from "@playwright/test"

test('Visit one news from university\'s website', async ({ page }) => {
  await page.goto('https://www.cyu.fr/');
});
