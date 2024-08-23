import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { movie1 } from "@/data/movies.mocks";
import { renderWithProviders } from "@/tests/testWrapper";
import Movie from "./Movie";

vi.mock("react-player", () => ({
  default: vi.fn(() => <div data-testid="video-player">React Player</div>),
  open: vi.fn(),
  onPlay: vi.fn(),
  onEnd: vi.fn(),
}));

test("Movie component renders correctly with inital states", () => {
  renderWithProviders(<Movie movie={movie1} />);

  const img = screen.getByRole("img");
  const wrapper = screen.getByTestId("movie-wrapper");
  const movieTitles = screen.getAllByRole("heading", { name: movie1.title });
  const viewTrailerBtn = screen.getByRole("button", { name: /view trailer/i });
  const watchLaterBtn = screen.getByRole("button", { name: /watch later/i });
  const starrMovieBtn = screen.getByRole("button", { name: /star movie/i });
  const removeStarFromMovieBtn = screen.queryByRole("button", {
    name: /remove star from movie/i,
  });
  const removeMovieFromWatchLaterBtn = screen.queryByRole("button", {
    name: /Remove movie from watch later list/i,
  });

  expect(img).toBeInTheDocument();
  expect(wrapper).toBeInTheDocument();
  expect(movieTitles).toHaveLength(2);
  expect(viewTrailerBtn).toBeInTheDocument();
  expect(watchLaterBtn).toBeInTheDocument();
  expect(starrMovieBtn).toBeInTheDocument();
  expect(removeStarFromMovieBtn).toBeNull();
  expect(removeMovieFromWatchLaterBtn).toBeNull();
});

test("Movie component add to watch later functionality", async () => {
  renderWithProviders(<Movie movie={movie1} />);

  const watchLaterBtn = screen.getByRole("button", { name: /watch later/i });

  await waitFor(async () => {
    await userEvent.click(watchLaterBtn);
  });

  const removeMovieFromWatchLaterBtn = screen.queryByRole("button", {
    name: /Remove movie from watch later list/i,
  });

  expect(removeMovieFromWatchLaterBtn).toBeInTheDocument();
});

test("Movie component add to starred functionality", async () => {
  renderWithProviders(<Movie movie={movie1} />);

  const starrMovieBtn = screen.getByRole("button", { name: /star movie/i });

  await waitFor(async () => {
    await userEvent.click(starrMovieBtn);
  });

  const removeStarFromMovieBtn = screen.queryByRole("button", {
    name: /remove star from movie/i,
  });

  expect(removeStarFromMovieBtn).toBeInTheDocument();
});

test("Movie component click on card make it open", async () => {
  renderWithProviders(<Movie movie={movie1} />);

  const movieCard = screen.getByTestId("movie-card");

  await waitFor(async () => {
    await userEvent.click(movieCard);
  });

  expect(movieCard).toHaveClass("opened");
});

test("Movie component clicking on view trailer will open trailer modal", async () => {
  renderWithProviders(<Movie movie={movie1} />);

  const viewTrailerBtn = screen.getByRole("button", { name: /view trailer/i });

  await waitFor(async () => {
    await userEvent.click(viewTrailerBtn);
  });

  const dialog = screen.getByRole("dialog");

  expect(dialog).toBeInTheDocument();
});

// Here we need to write E2E tests for actual scenario of adding movie to starred and watch later list
// Checking if the header indicators change for them since this functionality is also critical and important
