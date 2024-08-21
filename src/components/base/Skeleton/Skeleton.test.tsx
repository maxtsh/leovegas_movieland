import { render, screen } from "@testing-library/react";
import Skeleton from "./Skeleton";

test("Skeleton component should render correctly", () => {
  render(<Skeleton />);
  const skeleton = screen.getByRole("progressbar");
  expect(skeleton).toBeInTheDocument();
});
