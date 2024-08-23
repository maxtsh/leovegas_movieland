import { screen, render } from "@testing-library/react";
import Button from "./Button";

test("Button component renders correctly", () => {
  render(
    <Button fullWidth size="md" variant="primary">
      Click
    </Button>,
  );

  const button = screen.getByRole("button");

  expect(button).toBeInTheDocument();
  expect(button).toHaveClass("btn-md");
  expect(button).toHaveClass("btn-primary");
  expect(button).toHaveTextContent(/click/i);
  expect(button).toHaveClass("full-width");
});
