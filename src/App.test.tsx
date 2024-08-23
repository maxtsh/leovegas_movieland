import { render } from "@testing-library/react";
import App from "./App";
import { Mock } from "vitest";

// To remove scrollTo warning from test runner
beforeAll(() => {
  globalThis.scrollTo = vi.fn();
});

afterAll(() => {
  (globalThis.scrollTo as Mock).mockRestore();
});

test("App component renders correctly and does not crash", () => {
  render(<App />);
});
