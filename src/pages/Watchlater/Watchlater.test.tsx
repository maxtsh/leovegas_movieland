import { screen } from "@testing-library/react";
import renderWithProviders from "@/tests/testWrapper";
import Watchlater from "./Watchlater";

test("Watch later page renders correctly", () => {
  renderWithProviders(<Watchlater />);

  const wrapper = screen.getByTestId("watchlater-movies");
  const link = screen.getByRole("link", { name: /home/i });
  const title = screen.queryByRole("heading", { name: /watch later list/i });

  expect(link).toBeInTheDocument();
  expect(title).toBeNull();
  expect(wrapper).toBeInTheDocument();
});

// It is better to also write E2E tests for this page
