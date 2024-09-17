// @ts-check
const { test, expect } = require('@playwright/test');

test('Visit one news from university\'s website', async ({ page }) => {
  await page.goto('https://www.cyu.fr/');
});
