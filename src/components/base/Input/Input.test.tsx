import { createRef } from "react";
import { screen, render } from "@testing-library/react";
import Input from "./Input";

test("Input component renders correctly", () => {
  render(<Input fullWidth className="max" />);

  const input = screen.getByRole("textbox");

  expect(input).toBeInTheDocument();
  expect(input).toHaveClass("full-width");
  expect(input).toHaveClass("max");
});

test("Input component forwards ref to input element", () => {
  const ref = createRef<HTMLInputElement>();
  render(<Input ref={ref} />);

  expect(ref.current).toBeInstanceOf(HTMLInputElement);
});
