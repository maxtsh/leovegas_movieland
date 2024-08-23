import { screen } from "@testing-library/react";
import renderWithProviders from "@/tests/testWrapper";
import Header from "./Header";

test("Header component renders correctly", () => {
  renderWithProviders(<Header />);

  const input = screen.getByLabelText(/search movies/i);

  expect(input).toBeInTheDocument();
});

// This component must be further tested using E2E tests because it is a critical feature and also contains navigation and complex logic
