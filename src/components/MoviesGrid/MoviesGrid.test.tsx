import { screen } from "@testing-library/react";
import { movie1, movie2 } from "@/data/movies.mocks";
import MoviesGrid from "./MoviesGrid";
import renderWithProviders from "@/tests/testWrapper";

test("Movies Grid renders correctly", () => {
  renderWithProviders(<MoviesGrid movies={[]} />);

  const imgs = screen.queryAllByRole("img");

  expect(imgs).toHaveLength(0);
});

test("Movies Grid renders items correcly", () => {
  renderWithProviders(<MoviesGrid movies={[movie1, movie2]} />);

  const imgs = screen.getAllByRole("img");

  expect(imgs).toHaveLength(2);
});
