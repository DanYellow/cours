import { test, expect } from "@playwright/test";

test("should open modal", async ({ page }) => {
    await page.goto("http://localhost:5173");
    const firstPkmn = await page.getByTestId("pokemon").first();
    const firstPkmnData = await page.evaluate(() => document.querySelectorAll('[data-pokemon-data]'))
    console.log(firstPkmnData)
    firstPkmn.click();
    await expect(page.getByTestId("pokemon-modal")).toHaveAttribute("open");
    //   await expect(page).toHaveTitle(/Playwright/);
});
