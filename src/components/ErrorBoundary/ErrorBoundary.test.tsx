import { render, screen } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";

const Sample = () => {
  throw new Error("My Error!");
};

test("Error boundary renders on throwing error", () => {
  render(
    <ErrorBoundary>
      <Sample />
    </ErrorBoundary>,
  );

  const title = screen.getByRole("heading", { name: /ooooooppps/i });
  const button = screen.getByRole("button", { name: /retry/i });

  expect(title).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});
