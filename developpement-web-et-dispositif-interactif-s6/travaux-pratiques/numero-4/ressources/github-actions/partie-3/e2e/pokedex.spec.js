import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    console.log(`Running ${test.info().title}`);
    await page.goto("http://localhost:5173");
});

test("should add new Pokedex", async ({ page }) => {
    await page.waitForResponse((resp) =>
        resp.url().includes("https://tyradex.vercel.app/api/v1/gen/1")
    );
    const pokedexOnPage = await page.getByTestId("pokedex");
    const nbPokedexOnPage = await pokedexOnPage.count();

    await page.getByTestId("load-generation-btn").first().click();
    await expect(pokedexOnPage).toHaveCount(nbPokedexOnPage + 1);
    await expect(page.getByTestId("load-generation-btn")).toHaveAttribute(
        "data-load-generation",
        String(nbPokedexOnPage + 2)
    );
});

test("should disable load generation button", async ({ page }) => {
    await page.waitForResponse((resp) =>
        resp.url().includes("https://tyradex.vercel.app/api/v1/gen/1")
    );
    const loadGenerationBtn = await page
        .getByTestId("load-generation-btn")
        .first();

    await page.evaluate(() => {
        const selector = document.querySelector("[data-load-generation]");
        selector.dataset.loadGeneration = "45";
    })

    await loadGenerationBtn.click();
    await expect(loadGenerationBtn).toHaveAttribute("data-load-generation", "45");
    await page.waitForResponse((resp) =>
        resp.url().includes("https://tyradex.vercel.app/api/v1/gen/45")
    );

    await expect(loadGenerationBtn).toHaveAttribute("inert", "");
});
