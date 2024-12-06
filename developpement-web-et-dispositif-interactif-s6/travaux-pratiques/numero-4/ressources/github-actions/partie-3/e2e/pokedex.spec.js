import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    // console.log(`Running ${test.info().title}`);
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

test("should disable load generation button when there's no generation anymore", async ({ page }) => {
    await page.waitForResponse((resp) =>
        resp.url().includes("https://tyradex.vercel.app/api/v1/gen/1")
    );
    const loadGenerationBtn = await page
        .getByTestId("load-generation-btn")
        .first();
    const fakeGeneration = "42";
    await page.evaluate(() => {
        const fakeGeneration = "42";
        const selector = document.querySelector("[data-load-generation]");
        selector.dataset.loadGeneration = fakeGeneration;
    })

    await expect(loadGenerationBtn).toHaveAttribute("data-load-generation", fakeGeneration);
    await loadGenerationBtn.click();
    await page.waitForResponse((resp) =>
        resp.url().includes(`https://tyradex.vercel.app/api/v1/gen/${fakeGeneration}`)
    );

    await expect(loadGenerationBtn).toHaveAttribute("inert", "");
});
