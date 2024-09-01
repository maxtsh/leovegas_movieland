import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");

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

  test("Should load correctly", async ({ page }) => {
    await expect(page).toHaveTitle("LeoVegas");

    const heading = page.getByRole("heading", { name: /searching/i });
    const moviesList = page.getByTestId("movies-list");

    await expect(heading).toBeInViewport();
    await expect(moviesList).toBeInViewport();
  });

  test("Add to starred", async ({ page }) => {
    const movieCard = page.locator("[data-testid=movie-card]").first();
    await expect(movieCard).toBeInViewport();
    await movieCard.hover();

    const starBtn = movieCard.getByRole("button", { name: /star movie/i });
    await expect(starBtn).toBeInViewport();

    await starBtn.click();

    const starCounter = page.getByRole("link", { name: "nav-starred" });

    await expect(starCounter).toBeInViewport();
    await expect(starCounter).toHaveText("1");

    const unStarBtn = movieCard.getByRole("button", {
      name: /remove star from movie/i,
    });

    await expect(unStarBtn).toBeInViewport();

    await unStarBtn.click();

    await expect(starBtn).toBeInViewport();

    await expect(starCounter).toBeEmpty();
  });

  test("Add to watch list", async ({ page }) => {
    const movieCard = page.locator("[data-testid=movie-card]").first();
    await movieCard.hover();

    const watchLaterBtn = movieCard.getByRole("button", {
      name: /add movie to watch later list/i,
    });
    await expect(watchLaterBtn).toBeInViewport();

    await watchLaterBtn.click();

    const removeWatchLaterBtn = movieCard.getByRole("button", {
      name: /remove movie from watch later list/i,
    });

    await expect(removeWatchLaterBtn).toBeInViewport();

    await removeWatchLaterBtn.click();

    await expect(watchLaterBtn).toBeInViewport();
  });

  test("Search bar should add search params", async ({ page }) => {
    const searchValue = "maxpayne";
    const searchBox = page.getByLabel(/search movies/i);

    await expect(searchBox).toBeInViewport();
    await searchBox.fill(searchValue);

    await page.waitForURL(`**/?search=${searchValue}`);

    const currentURL = page.url();
    const url = new URL(currentURL);
    const searchParam = url.searchParams.get("search");

    expect(searchParam).toBe(searchValue);

    const moviesList = page.getByTestId("movies-list");

    await expect(moviesList).toBeInViewport();

    const homeLink = page.getByRole("link", { name: /home page/i });
    await expect(homeLink).toBeInViewport();

    await homeLink.click();
    await page.waitForURL("/");

    const homeURL = page.url();
    const newURL = new URL(homeURL);
    const newSearchParam = newURL.searchParams.get("search");

    expect(newSearchParam).toBeNull();
  });

  test("Scroll to bottom of the page and infinite scrolling works", async ({
    page,
  }) => {
    const moviesList = page.getByTestId("movies-list");

    await expect(moviesList).toBeInViewport();

    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    const request = await page.waitForRequest((req) =>
      req.url().includes("page=2"),
    );

    expect(request.url()).toContain("page=2");

    const response = await request.response();

    expect(response?.status()).toBe(200);
  });
});
