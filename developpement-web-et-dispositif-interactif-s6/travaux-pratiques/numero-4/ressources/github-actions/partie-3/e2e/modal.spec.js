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

test("should load next pokemon", async ({ page }) => {
    const pkmnId = 25;
    await page.goto(`http://localhost:5173?id=${pkmnId}`);

    await Promise.all([
        page.waitForResponse((resp) =>
            resp.url().includes(`https://tyradex.vercel.app/api/v1/pokemon/${pkmnId}`)
        ),
        page.waitForResponse((resp) =>
            resp.url().includes(`https://pokeapi.co/api/v2/pokemon-species/${pkmnId}`)
        )
    ])

    await expect(page.getByTestId("pokemon-modal")).toHaveAttribute("open", "");

    await page.getByTestId("next-pkmn").first().click();
    const currentUrl = new URL(await page.url());

    const nextPokemonDataRaw = await page.getByTestId("pokemon-modal").getAttribute("data-pokemon-data");
    const nextPokemonData = JSON.parse(nextPokemonDataRaw);
    
    await expect(currentUrl.searchParams.get("id")).toEqual(String(nextPokemonData.pokedex_id));
});

test("should load previous pokemon", async ({ page }) => {
    const pkmnId = 25;
    await page.goto(`http://localhost:5173?id=${pkmnId}`);

    await Promise.all([
        page.waitForResponse((resp) =>
            resp.url().includes(`https://tyradex.vercel.app/api/v1/pokemon/${pkmnId}`)
        ),
        page.waitForResponse((resp) =>
            resp.url().includes(`https://pokeapi.co/api/v2/pokemon-species/${pkmnId}`)
        )
    ])

    await page.getByTestId("previous-pkmn").first().click();
    const currentUrl = new URL(await page.url());

    const previousPokemonDataRaw = await page.getByTestId("pokemon-modal").getAttribute("data-pokemon-data");
    const previousPokemonData = JSON.parse(previousPokemonDataRaw);
    
    await expect(currentUrl.searchParams.get("id")).toEqual(String(previousPokemonData.pokedex_id));
});
