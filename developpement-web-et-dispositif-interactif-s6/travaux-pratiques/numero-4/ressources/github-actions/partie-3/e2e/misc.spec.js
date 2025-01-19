import { test, expect } from "@playwright/test";

test("should set list layout", async ({ page }) => {
    await page.goto("/");

    const firstLayoutSwitch = await page.getByTestId("switch-layout").first();
    await firstLayoutSwitch.waitFor();
    await firstLayoutSwitch.click();

    const sessionStorage = await page.evaluate(() => {
        console.log(JSON.stringify(window.localStorage));
    });
    // console.log(sessionStorage);
    // await page.waitForTimeout(2000);
    // await page.context().storageState({ path: "./user.tmp.json" });

    const isGridLayout = await page.evaluate(async () =>
        localStorage.getItem("is_grid_layout")
    );

    await expect(isGridLayout).toBeFalsy();
});
