import { screen } from "@testing-library/react";
import renderWithProviders from "@/tests/testWrapper";
import Starred from "./Starred";

test("Starred page renders correctly", () => {
  renderWithProviders(<Starred />);

  const wrapper = screen.getByTestId("starred-movies");
  const link = screen.getByRole("link", { name: /home/i });
  const title = screen.queryByRole("heading", { name: /starred movies/i });

  expect(link).toBeInTheDocument();
  expect(title).toBeNull();
  expect(wrapper).toBeInTheDocument();
});

// It is better to also write E2E tests for this page
