import { screen } from "@testing-library/react";
import { HttpResponse } from "msw";
import SetupMSWServer from "@/tests/mswServer";
import renderWithProviders from "@/tests/testWrapper";
import { discoverAPIPath } from "@/services/constants";
import { movie1, movie2 } from "@/data/movies.mocks";
import Home from "./Home";

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

const msw = new SetupMSWServer([
  {
    method: "get",
    path: discoverAPIPath(1, "vote_count.desc"),
    resolver: () =>
      HttpResponse.json(
        {
          page: 1,
          total_pages: 1,
          total_results: 2,
          results: [movie1, movie2],
        },
        { status: 200 },
      ),
  },
]);

const server = msw.initialize();

test("Home page renders correctly", () => {
  renderWithProviders(<Home />);

  const homeContainer = screen.getByTestId("home-page");

  expect(homeContainer).toBeInTheDocument();
});

test("Home page loading state", () => {
  renderWithProviders(<Home />);

  const loading = screen.getByRole("progressbar");

  expect(loading).toBeInTheDocument();
});

test("Home page success state", async () => {
  renderWithProviders(<Home />);

  const list = await screen.findByTestId("moives-list");

  expect(list).toBeInTheDocument();
});

test("Home page error state", async () => {
  const message = "failed to load";

  server.use(
    ...msw.getMswHandlers([
      {
        method: "get",
        path: discoverAPIPath(1, "vote_count.desc"),
        resolver: () =>
          HttpResponse.json(undefined, { status: 400, statusText: message }),
      },
    ]),
  );
  renderWithProviders(<Home />);

  const error = await screen.findByRole("alert");

  expect(error).toBeInTheDocument();
  expect(error).toHaveTextContent(message);
});

// It is better to also write E2E tests for this page
