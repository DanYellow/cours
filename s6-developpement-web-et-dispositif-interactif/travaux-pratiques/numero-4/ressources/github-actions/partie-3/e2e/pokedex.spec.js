import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto("/");
});

test("should add new Pokedex", { tag: "@smoke" }, async ({ page }) => {
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

test("should disable load generation button when there's no generation anymore", async ({
    page,
}) => {
    await page.waitForResponse((resp) =>
        resp.url().includes("https://tyradex.vercel.app/api/v1/gen/1")
    );
    const loadGenerationBtn = await page
        .getByTestId("load-generation-btn")
        .first();
    const fakeGeneration = "42";
    await loadGenerationBtn.evaluate((node) => {
        const fakeGeneration = "42";
        return node.setAttribute("data-load-generation", fakeGeneration);
    });

    const dexRequest = page.waitForResponse(
        `https://tyradex.vercel.app/api/v1/gen/${fakeGeneration}`
    );

    await expect(loadGenerationBtn).toHaveAttribute(
        "data-load-generation",
        fakeGeneration
    );
    await loadGenerationBtn.click();
    await dexRequest;

    await expect(loadGenerationBtn).toHaveAttribute("inert", "");
});

test("should not reload the page after select a Pokemon", { tag: "@smoke" }, async ({
    page,
}) => {
    await page.waitForResponse((resp) =>
        resp.url().includes("https://tyradex.vercel.app/api/v1/gen/1")
    );

        const firstPkmn = page.getByTestId("pokemon").first();
        await firstPkmn.waitFor();
        await firstPkmn.click();

        await expect(page).not.toHaveTitle("Pokédex v1.0.0");
    }
);

test("should change title's value according to current generation displayed", async ({
    page,
}) => {
    await page.waitForResponse((resp) =>
        resp.url().includes("https://tyradex.vercel.app/api/v1/gen/1")
    );

    const loadGenerationButton = await page
        .getByTestId("load-generation-btn")
        .first();
    loadGenerationButton.click();
    const nextGenerationNumber = await loadGenerationButton.getAttribute(
        "data-load-generation"
    );

    await page.waitForResponse((resp) =>
        resp
            .url()
            .includes(
                `https://tyradex.vercel.app/api/v1/gen/${nextGenerationNumber}`
            )
    );

    const nextHeader = page.locator(`[data-header-pokedex="${nextGenerationNumber}"]`).first();
    await nextHeader.waitFor();

    await page.waitForTimeout(2);

    await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
    });

    await expect(page).toHaveTitle(
        new RegExp(String.raw`Génération #${nextGenerationNumber}`, "g")
    );
});

test("should listen to query string params @smoke", async ({ page }) => {
    await page.waitForResponse((resp) =>
        resp.url().includes("https://tyradex.vercel.app/api/v1/gen/1")
    );

    const firstPkmn = page.getByTestId("pokemon").first();
    await firstPkmn.waitFor();
    await firstPkmn.click();

    await expect(page.getByTestId("pokemon-modal")).toHaveAttribute("open", "");

    await page.goBack();

    await expect(page.getByTestId("pokemon-modal")).not.toHaveAttribute(
        "open",
        ""
    );
});

test("should indicate the right gen in the navigation shortcut", async ({
    page,
}) => {
    await page.waitForResponse((resp) =>
        resp.url().includes("https://tyradex.vercel.app/api/v1/gen/1")
    );

    const loadGenerationButton = await page
        .getByTestId("load-generation-btn")
        .first();
    await loadGenerationButton.click();
    const nextGenerationNumber = await loadGenerationButton.getAttribute(
        "data-load-generation"
    );

    await page.waitForResponse((resp) =>
        resp
            .url()
            .includes(
                `https://tyradex.vercel.app/api/v1/gen/${nextGenerationNumber}`
            )
    );

    const gen2Shortcut = await page
        .locator(`[data-id="pokedex-${nextGenerationNumber}"]`)
        .first();
    await gen2Shortcut.click();

    await page.waitForTimeout(1.5);

    await expect(gen2Shortcut).toHaveClass(/font-bold/);
});
