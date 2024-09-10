import { render, screen, renderHook } from "@testing-library/react";
import usePortal from "./usePortal";

test("Render portal hook works correctly", () => {
  const { result } = renderHook(() => usePortal());

  render(
    result.current.renderPortal(
      <div>
        <h1>Portal</h1>
      </div>,
    ),
  );

  const heading = screen.getByRole("heading", { name: /portal/i });

  expect(heading).toBeInTheDocument();
});
