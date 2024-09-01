import { test, expect } from "@playwright/test";

test.describe("Watch later page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/watch-later");

    // Removing css transition and animations to ensure tests will work
    await page.addStyleTag({
      content: `
          * {
            transition: none !important;
            animation: none !important;
          }
        `,
    });
  });

  test("Shows empty page state", async ({ page }) => {
    const link = page.getByText(/home/i);

    await expect(link).toBeInViewport();
    await expect(link).toHaveAttribute("href", "/");
  });

  test("Go home to add a movie to see if it is added to the watch later page", async ({
    page,
  }) => {
    const homeNavLink = page.getByRole("link", { name: /home page/i });
    await expect(homeNavLink).toBeInViewport();
    await homeNavLink.click();

    const movieCard = page.locator("[data-testid=movie-card]").first();
    await expect(movieCard).toBeInViewport();
    await movieCard.hover();

    const watchLaterBtn = movieCard.getByRole("button", {
      name: /add movie to watch later list/i,
    });
    await expect(watchLaterBtn).toBeInViewport();
    await watchLaterBtn.click();

    const watchLaterNav = page.getByRole("link", { name: "nav-watch-later" });
    await expect(watchLaterNav).toBeInViewport();
    await watchLaterNav.click();

    const watchLaterTitle = page.getByRole("heading", {
      name: /watch later list/i,
    });
    await expect(watchLaterTitle).toBeInViewport();
  });
});
