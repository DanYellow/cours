import { test, expect } from "@playwright/test";

test("should open modal", async ({ page, request }) => {
    await page.goto("http://localhost:5173");
    const firstPkmn = await page.getByTestId("pokemon").first();
    const firstPkmnDataRaw = await firstPkmn.getAttribute("data-pokemon-data");
    const firstPkmnData = JSON.parse(firstPkmnDataRaw);
    firstPkmn.click();

    await expect(page.getByTestId("pokemon-modal")).toHaveAttribute("open", "");
    await expect(page).toHaveTitle(
        new RegExp(String.raw`\s${firstPkmnData.name.fr}\s`, "g")
    );
});

test("should close modal", async ({ page, request }) => {
    await page.goto("http://localhost:5173?id=17");
    await page.waitForResponse((resp) =>
        resp.url().includes("https://pokeapi.co/api/v2/pokemon-species/17")
    );
    await expect(page.getByTestId("pokemon-modal")).toHaveAttribute("open", "");
    
    await page.getByTestId("close-modal").first().click();
    await expect(page.getByTestId("pokemon-modal")).not.toHaveAttribute("open", "");
});
