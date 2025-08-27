import { test, expect } from "@playwright/test";

test("should set list layout", async ({ page }) => {
    await page.goto("/");

    const firstLayoutSwitch = await page.getByTestId("switch-layout").first();
    await firstLayoutSwitch.waitFor();
    await firstLayoutSwitch.click();

    const isGridLayout = await page.evaluate(async () =>
        localStorage.getItem("is_grid_layout")
    );

    await expect(JSON.parse(isGridLayout)).toBeFalsy();
});

test("should set grid layout", async ({ page }) => {
    await page.goto("/");

    const firstLayoutSwitch = await page.getByTestId("switch-layout").first();
    await firstLayoutSwitch.waitFor();
    await firstLayoutSwitch.click();
    await firstLayoutSwitch.click();

    const isGridLayout = await page.evaluate(async () =>
        localStorage.getItem("is_grid_layout")
    );

    await expect(JSON.parse(isGridLayout)).toBeTruthy();
});

