import { render, screen, fireEvent } from "@testing-library/react";
import Notfound from "@/assets/not-found-500X750.jpeg";
import Image from "./Image";

test("Image component renders correctly", () => {
  render(<Image width={200} height={200} src="/xyz" />);

  const img = screen.getByRole("img");

  expect(img).toBeInTheDocument();
  expect(img).toHaveClass("image");
  expect(img).toHaveAttribute("src", "/xyz");

  // Load the image
  fireEvent.load(img);

  expect(img).toHaveClass("loaded");
});

test("Image component renders fallback image when src fails to load", () => {
  render(<Image src="/err" Fallback="/fallback" width={100} height={100} />);

  const img = screen.getByRole("img");

  // Trigger onError
  fireEvent.error(img);

  expect(img).toHaveAttribute("src", "/fallback");
});

test("Image component displays skeleton loader while image is loading", () => {
  render(<Image src="/something" width={100} height={100} />);

  const skeleton = screen.getByRole("progressbar");
  expect(skeleton).toBeInTheDocument();

  const img = screen.queryByRole("img");

  // Image should be loading initially
  expect(img).not.toHaveClass("loaded");
});

test("Image component applies custom loadingStyles to the skeleton loader", () => {
  const loadingStyles = { opacity: 0 };

  render(
    <Image
      width={100}
      height={100}
      src="/something"
      loadingStyles={loadingStyles}
    />,
  );

  const skeleton = screen.getByRole("progressbar");

  expect(skeleton).toHaveStyle(loadingStyles);
});

test("Image component applies custom className correctly", () => {
  render(
    <Image
      src="/something"
      width={100}
      height={100}
      className="custom-class"
    />,
  );

  const img = screen.getByRole("img");
  expect(img).toHaveClass("custom-class");
});

test("Image component renders NotFound image when both src and Fallback fail", () => {
  render(<Image width={100} height={100} />);

  const img = screen.getByRole("img");

  fireEvent.error(img);

  expect(img).toHaveAttribute("src", Notfound);
});
