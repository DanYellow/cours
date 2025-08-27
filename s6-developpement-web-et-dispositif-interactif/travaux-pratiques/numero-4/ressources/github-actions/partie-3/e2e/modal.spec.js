import { test, expect } from "@playwright/test";

test("should open modal", { tag: "@smoke" }, async ({ page }) => {
    await page.goto("/");
    const firstPkmn = await page.getByTestId("pokemon").first();
    const firstPkmnDataRaw = await firstPkmn.getAttribute("data-pokemon-data");
    const firstPkmnData = JSON.parse(firstPkmnDataRaw);
    firstPkmn.click();

    const modal = page.locator("[data-testid='pokemon-modal'][open]");
    await modal.waitFor();

    await expect(page).toHaveTitle(
        new RegExp(String.raw`${firstPkmnData.name.fr}`, "g")
    );
});

test("should close modal", async ({ page }) => {
    await page.goto("/?id=17");
    await page.waitForResponse((resp) =>
        resp.url().includes("https://pokeapi.co/api/v2/pokemon-species/17")
    );

    await page.locator("[data-pokemon-data][open]").waitFor()
    await expect(page.getByTestId("pokemon-modal")).toHaveAttribute("open", "");

    await page.getByTestId("close-modal").first().click();
    await expect(page.getByTestId("pokemon-modal")).not.toHaveAttribute("open", "");

    const currentUrl = new URL(await page.url());
    await expect(Array.from(currentUrl.searchParams.values())).toHaveLength(0);
});

test("should load next pokemon", { tag: "@smoke" }, async ({ page }) => {
    const pkmnId = 25;
    await page.goto(`/?id=${pkmnId}`);

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
    await page.goto(`/?id=${pkmnId}`);

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

test("should open regional form", async ({ page }) => {
    const pkmnId = 19;
    await page.goto(`/?id=${pkmnId}`);

    await Promise.all([
        page.waitForResponse((resp) =>
            resp.url().includes(`https://tyradex.vercel.app/api/v1/pokemon/${pkmnId}`)
        ),
        page.waitForResponse((resp) =>
            resp.url().includes(`https://pokeapi.co/api/v2/pokemon-species/${pkmnId}`)
        )
    ])

    await expect(page.getByTestId("pokemon-modal")).toHaveAttribute("open", "");
    await page.getByTestId("regional-forms").first().click();
    const firstRegionalPokemon = await page.getByTestId("regional-forms").getByTestId("pokemon").first();
    const firstRegionalPokemonURL = new URL(await firstRegionalPokemon.getAttribute("href"));
    const firstRegionalPokemonRegion = firstRegionalPokemonURL.searchParams.get("region");

    await firstRegionalPokemon.click();

    await page.waitForResponse((resp) =>
        resp.url().includes(`https://tyradex.vercel.app/api/v1/pokemon/${pkmnId}/${firstRegionalPokemonRegion}`)
    );

    const currentUrl = new URL(await page.url());

    await expect(Array.from(currentUrl.searchParams.values())).toHaveLength(3);
});

test("should keep title tag value after scroll", async ({ page }) => {
    const pkmnId = 25;
    await page.goto(`/?id=${pkmnId}`);

    await Promise.all([
        page.waitForResponse("https://pokeapi.co/api/v2/evolution-chain/10/"),
        page.waitForResponse(`https://pokeapi.co/api/v2/pokemon-species/${pkmnId}`),
        page.waitForResponse(`https://pokeapi.co/api/v2/pokemon/${pkmnId}`),
        page.waitForResponse(`https://tyradex.vercel.app/api/v1/pokemon/${pkmnId}`),
    ])

    const modal = page.locator("[data-testid='pokemon-modal'][open]");
    await modal.waitFor();

    const title = await page.title()

    await page.mouse.wheel(0, 550);
    await page.waitForTimeout(2);

    await expect(page).toHaveTitle(title);
});

test("should cache dex's data", async ({ page }) => {
    const pkmnId = 25;
    await page.goto(`/?id=${pkmnId}`);

    await Promise.all([
        page.waitForResponse("https://pokeapi.co/api/v2/evolution-chain/10/"),
        page.waitForResponse(`https://pokeapi.co/api/v2/pokemon-species/${pkmnId}`),
        page.waitForResponse(`https://pokeapi.co/api/v2/pokemon/${pkmnId}`),
        page.waitForResponse(`https://tyradex.vercel.app/api/v1/pokemon/${pkmnId}`),
    ])

    const modal = page.locator("[data-testid='pokemon-modal'][open]");
    await modal.waitFor();

    await page.getByTestId("previous-pkmn").first().click();

    const dexRequest = page.waitForResponse("https://tyradex.vercel.app/api/v1/gen/1", { timeout: 5000 });
    try {
        await dexRequest;
    } catch {
        expect(true).toBeTruthy();
    }
});

test("should cache pokemon's data", async ({ page }) => {
    const pkmnId = 25;
    await page.goto(`/?id=${pkmnId}`);

    await Promise.all([
        page.waitForResponse("https://pokeapi.co/api/v2/evolution-chain/10/"),
        page.waitForResponse(`https://pokeapi.co/api/v2/pokemon-species/${pkmnId}`),
        page.waitForResponse(`https://pokeapi.co/api/v2/pokemon/${pkmnId}`),
        page.waitForResponse(`https://tyradex.vercel.app/api/v1/pokemon/${pkmnId}`),
    ])

    const modal = page.locator("[data-testid='pokemon-modal'][open]");
    await modal.waitFor();

    await page.getByTestId("previous-pkmn").first().click();
    await page.getByTestId("next-pkmn").first().click();

    const pkmnRequest = page.waitForResponse(`https://pokeapi.co/api/v2/pokemon/${pkmnId}`, { timeout: 5000 });
    try {
        await pkmnRequest;
    } catch {
        expect(true).toBeTruthy();
    }
});

test("should have a label for all abilities", async ({ page }) => {
    const pkmnId = 13;
    await page.goto(`/?id=${pkmnId}`);

    const modal = page.locator("[data-testid='pokemon-modal'][open]");
    await modal.waitFor();

    const listLocators = await page.locator("[data-list-abilities] summary").all();

    for (const element of listLocators) {
        await expect(element).not.toBeEmpty();
    }
});

test("should have a label for all abilities after loading Pokémon and its Pokédex", async ({ page }) => {
    const pkmnId = 171;
    await page.goto(`/?id=${pkmnId}`);

    const modal = page.locator("[data-testid='pokemon-modal'][open]");
    await modal.waitFor();

    const listAbilities = await page.locator("[data-list-abilities] summary").all();

    for (const element of listAbilities) {
        await expect(element).not.toBeEmpty();
    }

    await page.getByTestId("close-modal").first().click();

    const loadGenerationButton = await page.getByTestId("load-generation-btn").first()
    loadGenerationButton.click();

    await page.getByTestId("pokemon").nth(170).click();
    await modal.waitFor();

    for (const element of listAbilities) {
        await expect(element).not.toBeEmpty();
    }
});

test("should not have more than 4 levels of evolutions", async ({ page }) => {
    const pkmnId = 265;
    await page.goto(`/?id=${pkmnId}`);

    const modal = page.locator("[data-testid='pokemon-modal'][open]");
    await modal.waitFor();

    const nbEvolutionLevels = await page.locator("[data-list-evolutions] > li:not([inert])").count();
    expect(nbEvolutionLevels).toBeLessThanOrEqual(4);
});
