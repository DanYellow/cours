import { test, expect } from "@playwright/test";

test("should open modal", async ({ page }) => {
    await page.goto("http://localhost:5173");
    const firstPkmn = await page.getByTestId("pokemon").first();
    const firstPkmnDataRaw = await firstPkmn.getAttribute("data-pokemon-data");
    const firstPkmnData = JSON.parse(firstPkmnDataRaw);
    firstPkmn.click();
    await expect(page.getByTestId("pokemon-modal")).toHaveAttribute("open");
    await expect(page).toHaveTitle(
        new RegExp(String.raw`\s${firstPkmnData.name.fr}\s`, "g")
    );
});
