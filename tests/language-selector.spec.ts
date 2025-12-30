import { expect, test } from "@playwright/test";

test.describe("Language selector flags", () => {
  test("renders two flags and switches language with persistence", async ({
    page,
    context,
  }) => {
    await page.goto("/");

    const flagButtons = page.locator("[data-lang-button]");
    const esButton = page.getByRole("button", { name: /Español|Spanish/i });
    const enButton = page.getByRole("button", { name: /Inglés|English/i });

    await expect(flagButtons).toHaveCount(2);
    await expect(esButton).toBeVisible();
    await expect(enButton).toBeVisible();

    await enButton.click();
    await page.waitForURL(/\/en\/$/);
    await expect(page).toHaveURL(/\/en\/$/);
    await expect(enButton).toHaveAttribute("aria-pressed", "true");

    const secondPage = await context.newPage();
    await secondPage.goto("/");
    await secondPage.waitForURL(/\/en\/$/);
    await expect(secondPage).toHaveURL(/\/en\/$/);
    await secondPage.close();
  });
});
