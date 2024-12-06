import { test, expect } from "@playwright/test";

test("should open modal", async ({ page, request }) => {
    await page.goto("http://localhost:5173");
    const firstPkmn = await page.getByTestId("pokemon").first();
    const firstPkmnDataRaw = await firstPkmn.getAttribute("data-pokemon-data");
    const firstPkmnData = JSON.parse(firstPkmnDataRaw);
    firstPkmn.click();

    // let fooRequestWasMade = false;
    // page.on('request', request => {
    //     // console.log(request.url(), request.url().includes("/api/v2/pokemon-species/1"))
    //     if (request.url().includes("/api/v2/pokemon-species/1")) {
    //         console.log("efzfezfz")
    //         fooRequestWasMade = true

    //     }
    // });

    // page.on('response', (response) =>
    //     console.log('<<', response.status(), response.url())
    //   )
//     const issues = await request.get(`https://pokeapi.co/api/v2/pokemon-species/170`);
//   expect(issues.ok()).toBeTruthy();
//   console.log(await request.method())
// console.log(fooRequestWasMade)
// await expect(fooRequestWasMade).toBe(false);

    await expect(page.getByTestId("pokemon-modal")).toHaveAttribute("open", "");
    await expect(page).toHaveTitle(
        new RegExp(String.raw`\s${firstPkmnData.name.fr}\s`, "g")
    );
});

test("should close modal", async ({ page, request }) => {
    await page.goto("http://localhost:5173?id=17");
    await expect(page.getByTestId("pokemon-modal")).toHaveAttribute("open", "");
    
    await page.getByTestId("close-modal").first().click();
    await expect(page.getByTestId("pokemon-modal")).not.toHaveAttribute("open", "");
});
