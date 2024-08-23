import { screen } from "@testing-library/react";
import renderWithProviders from "@/tests/testWrapper";
import InfiniteMoviesScroll from "./InfiniteMoviesScroll";

const observe = vi.fn();
const disconnect = vi.fn();

global.IntersectionObserver = vi.fn().mockImplementation(() => {
  return {
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
    takeRecords: vi.fn(),
    root: null,
    rootMargin: "",
    thresholds: [],
  };
});

afterEach(() => {
  observe.mockReset();
  disconnect.mockReset();
});

afterAll(() => {
  observe.mockClear();
  disconnect.mockClear();
});

test("Infinite scroll component renders correctly", () => {
  renderWithProviders(<InfiniteMoviesScroll initialPage={1} />);

  const wrapper = screen.getByTestId("infinite-scroll");
  const trigger = screen.getByTestId("infinite-scroll-trigger");

  expect(wrapper).toBeInTheDocument();
  expect(trigger).toBeInTheDocument();
});
