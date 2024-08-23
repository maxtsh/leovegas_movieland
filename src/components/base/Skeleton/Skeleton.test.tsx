import { render, screen } from "@testing-library/react";
import Skeleton from "./Skeleton";

test("Skeleton component should render correctly", () => {
  render(<Skeleton className="custom-skeleton" />);

  const skeleton = screen.getByRole("progressbar");

  expect(skeleton).toBeInTheDocument();
  expect(skeleton).toHaveClass("custom-skeleton");
});
