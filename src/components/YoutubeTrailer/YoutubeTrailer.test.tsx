import { render, screen } from "@testing-library/react";
import SetupMSWServer from "@/tests/mswServer";
import YoutubeTrailer from "./YoutubeTrailer";
import { movieAPIPath } from "@/services/constants";
import { HttpResponse } from "msw";

const mockMovieId = "123";
const mockVideoKey = "xyz";
const mockTitle = "ReactPlayer Mock";

vi.mock("react-player", () => ({
  default: vi.fn((props: { url: string }) => (
    <div data-testid="video-player">
      <h1>{mockTitle}</h1>
      {props.url && <video role="application" src={props.url} />}
    </div>
  )),
  open: vi.fn(),
  onPlay: vi.fn(),
  onEnd: vi.fn(),
}));

new SetupMSWServer([
  {
    method: "get",
    path: movieAPIPath(mockMovieId),
    resolver: () =>
      HttpResponse.json(
        {
          videos: {
            results: [{ key: mockVideoKey, type: "Trailer" }],
          },
        },
        { status: 200 },
      ),
  },
]).initialize();

test("Youtube player component renders correctly", () => {
  render(<YoutubeTrailer movieId={mockMovieId} />);

  const player = screen.getByTestId("video-player");
  const heading = screen.getByRole("heading", { name: mockTitle });

  expect(player).toBeInTheDocument();
  expect(heading).toBeInTheDocument();
});

test("Youtube player component renders correctly", async () => {
  render(<YoutubeTrailer movieId={mockMovieId} />);

  const video = await screen.findByRole("application");

  expect(video).toBeInTheDocument();
  expect(video).toHaveAttribute("src", expect.stringContaining(mockVideoKey));
});
