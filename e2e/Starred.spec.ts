import { test, expect } from "@playwright/test";

test.describe("Starred page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/starred");

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

  test("Go home to star a movie to see if it is added to the starred page", async ({
    page,
  }) => {
    const homeNavLink = page.getByRole("link", { name: /home page/i });
    await expect(homeNavLink).toBeInViewport();
    await homeNavLink.click();

    const movieCard = page.locator("[data-testid=movie-card]").first();
    await expect(movieCard).toBeInViewport();
    await movieCard.hover();

    const starBtn = movieCard.getByRole("button", { name: /star movie/i });
    await expect(starBtn).toBeInViewport();
    await starBtn.click();

    const starCounter = page.getByRole("link", { name: "nav-starred" });
    await expect(starCounter).toBeInViewport();
    await starCounter.click();

    const starredTitle = page.getByRole("heading", { name: /starred movies/i });
    await expect(starredTitle).toBeInViewport();
  });
});
