import { test, expect } from "@playwright/test";

test("should open modal", async ({ page }) => {
    await page.goto("/");
    const firstPkmn = await page.getByTestId("pokemon").first();
    const firstPkmnDataRaw = await firstPkmn.getAttribute("data-pokemon-data");
    const firstPkmnData = JSON.parse(firstPkmnDataRaw);
    firstPkmn.click();

    await expect(page.getByTestId("pokemon-modal")).toHaveAttribute("open", "");
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

test("should load next pokemon", async ({ page }) => {
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

    await page.getByTestId("regional-forms").first().click();
    await page.getByTestId("regional-forms").getByTestId("pokemon").first().click();
    
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

    await expect(page.getByTestId("pokemon-modal")).toHaveAttribute("open", "");

    const title = await page.title()

    await page.mouse.wheel(0, 550);
    await page.waitForTimeout(2);

    await expect(page).toHaveTitle(title);
});

